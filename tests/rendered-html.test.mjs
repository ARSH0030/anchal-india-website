import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

const port = Number(process.env.TEST_PORT || 4317);
const origin = `http://127.0.0.1:${port}`;
const routes = ["/", "/about", "/products", "/brand-network", "/global-presence", "/beyond-automotive", "/contact", "/privacy", "/terms", "/es"];

test("production site passes route and RFQ smoke checks", { timeout: 60_000 }, async (t) => {
  let serverOutput = "";
  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, RESEND_API_KEY: "", RFQ_FROM_EMAIL: "" },
  });
  server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
  server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });
  t.after(() => server.kill());

  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    try {
      const response = await fetch(`${origin}/`);
      if (response.ok) { ready = true; break; }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  assert.equal(ready, true, `production server did not become ready\n${serverOutput}`);

  for (const route of routes) {
    const response = await fetch(`${origin}${route}`);
    assert.equal(response.status, 200, `${route} should render`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, /Anchal India/i);
    assert.doesNotMatch(html, />\s*PHOTO\s*</i, `${route} should not expose photo placeholders`);
    assert.doesNotMatch(html, /verified image pending|replace this text treatment/i, `${route} should not expose pending copy`);
  }

  const home = await fetch(`${origin}/`);
  assert.equal(home.headers.get("x-content-type-options"), "nosniff");
  assert.equal(home.headers.get("x-frame-options"), "DENY");
  assert.equal(home.headers.get("referrer-policy"), "strict-origin-when-cross-origin");

  const selectedContact = await fetch(`${origin}/contact?vehicle=bajaj-pulsar-ns200&group=Engine&code=OEM-123`);
  const selectedHtml = await selectedContact.text();
  assert.match(selectedHtml, /bajaj-pulsar-ns200/);
  assert.match(selectedHtml, /OEM-123/);

  for (const [route, destination] of [["/brands", "/brand-network"], ["/credentials", "/about"]]) {
    const response = await fetch(`${origin}${route}`, { redirect: "manual" });
    assert.ok([307, 308].includes(response.status), `${route} should redirect`);
    assert.ok((response.headers.get("location") ?? "").startsWith(destination));
  }

  const invalidRfq = await fetch(`${origin}/api/rfq`, { method: "POST", body: new FormData() });
  assert.equal(invalidRfq.status, 400);
  assert.match((await invalidRfq.json()).error, /required/i);

  const robots = await fetch(`${origin}/robots.txt`);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /sitemap\.xml/i);
  const sitemap = await fetch(`${origin}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  assert.match(await sitemap.text(), /\/contact/);

  const missing = await fetch(`${origin}/definitely-not-a-route`);
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /That route has moved/i);
});
