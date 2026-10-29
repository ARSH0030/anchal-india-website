import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
const MAX_REQUEST_BYTES = 16 * 1024 * 1024;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const allowedExtensions = new Set(["xlsx", "xls", "csv", "pdf", "jpg", "jpeg", "png"]);
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function text(form: FormData, name: string, maxLength: number) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function requestIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimits.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS_PER_WINDOW;
}

function createReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `RFQ-${date}-${suffix}`;
}

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_REQUEST_BYTES) return jsonError("The submission is too large.", 413);
  if (isRateLimited(requestIp(request))) return jsonError("Too many enquiries were sent from this connection. Please try again later.", 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError("The enquiry could not be read.", 400);
  }

  if (text(form, "website", 200)) return NextResponse.json({ reference: createReference() });

  const name = text(form, "name", 100);
  const company = text(form, "company", 120);
  const email = text(form, "email", 160);
  const country = text(form, "country", 100);
  const phone = text(form, "phone", 40);
  const message = text(form, "message", 5000);
  const enquiryType = text(form, "enquiryType", 100) || "General Enquiry";
  const consent = text(form, "consent", 10);

  if (!name || !company || !email || !country || !message) return jsonError("Please complete every required field.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return jsonError("Please enter a valid email address.", 400);
  if (consent !== "yes") return jsonError("Privacy consent is required.", 400);

  const files = form.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0);
  if (files.length > 3) return jsonError("Attach no more than three files.", 400);
  let totalBytes = 0;
  const attachments: Array<{ filename: string; content: string }> = [];
  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedExtensions.has(extension)) return jsonError(`Unsupported attachment: ${file.name}`, 400);
    if (file.size > MAX_FILE_BYTES) return jsonError(`${file.name} is larger than 5 MB.`, 400);
    totalBytes += file.size;
    if (totalBytes > MAX_TOTAL_BYTES) return jsonError("The combined attachments are larger than 10 MB.", 400);
    attachments.push({ filename: file.name.slice(0, 180), content: Buffer.from(await file.arrayBuffer()).toString("base64") });
  }

  const context = {
    vehicle: text(form, "vehicle", 120),
    group: text(form, "group", 120),
    code: text(form, "code", 160),
    brand: text(form, "brand", 120),
    sector: text(form, "sector", 120),
  };
  const contextRows = Object.entries(context).filter((entry) => entry[1]);
  const reference = createReference();
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RFQ_FROM_EMAIL;
  const to = process.env.RFQ_TO_EMAIL || "info@anchalpiston.com";
  if (!apiKey || !from) return jsonError("Email delivery is not configured yet. Please use WhatsApp or email us directly.", 503);

  const lines = [
    `Reference: ${reference}`,
    `Type: ${enquiryType}`,
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Country: ${country}`,
    `Phone / WhatsApp: ${phone || "Not provided"}`,
    ...contextRows.map(([key, value]) => `${key}: ${value}`),
    "",
    message,
  ];
  const htmlContext = contextRows.map(([key, value]) => `<tr><th align="left">${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`).join("");
  const html = `<h1>New Anchal India requirement</h1><p><strong>Reference:</strong> ${escapeHtml(reference)}</p><table cellpadding="6" cellspacing="0"><tr><th align="left">Type</th><td>${escapeHtml(enquiryType)}</td></tr><tr><th align="left">Name</th><td>${escapeHtml(name)}</td></tr><tr><th align="left">Company</th><td>${escapeHtml(company)}</td></tr><tr><th align="left">Email</th><td>${escapeHtml(email)}</td></tr><tr><th align="left">Country</th><td>${escapeHtml(country)}</td></tr><tr><th align="left">Phone / WhatsApp</th><td>${escapeHtml(phone || "Not provided")}</td></tr>${htmlContext}</table><h2>Requirement</h2><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  let resendResponse: Response;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[${reference}] ${enquiryType} — ${company}`,
        text: lines.join("\n"),
        html,
        attachments,
      }),
      cache: "no-store",
    });
  } catch {
    return jsonError("Email delivery is temporarily unavailable. Please use WhatsApp or email us directly.", 502);
  }

  if (!resendResponse.ok) return jsonError("Email delivery was rejected. Please use WhatsApp or email us directly.", 502);
  return NextResponse.json({ reference });
}
