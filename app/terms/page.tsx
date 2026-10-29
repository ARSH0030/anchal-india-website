import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the Anchal India website.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return <section className="legal-page"><div className="shell legal-shell"><p className="legal-kicker">LEGAL</p><h1>Terms of Use</h1><p className="legal-updated">Last updated: 29 October 2026</p>
    <h2>Website information</h2><p>This website provides general information about Anchal India, its capabilities, product categories, brands and markets. Product availability, specifications, certifications, territory rights, pricing and delivery terms are confirmed only in the relevant commercial offer.</p>
    <h2>Enquiries and quotations</h2><p>Sending an enquiry does not create a contract or guarantee availability. Any quotation, purchase order acceptance or signed agreement will contain the binding commercial terms and will take priority over general website content.</p>
    <h2>Intellectual property</h2><p>Anchal India content, presentation and owned brand material may not be reproduced for commercial use without permission. Third-party names and marks remain the property of their respective owners and are used to identify products or commercial context.</p>
    <h2>Responsible use</h2><p>Do not misuse the website, attempt unauthorised access, upload malicious files or submit unlawful, misleading or infringing content.</p>
    <h2>Liability</h2><p>We work to keep this website accurate and available, but it may occasionally contain errors or be interrupted. To the extent permitted by law, Anchal India is not liable for indirect loss arising solely from reliance on general website information.</p>
    <h2>Governing law</h2><p>These terms are governed by the laws of India. Any dispute relating only to website use is subject to the jurisdiction of the courts serving Ghaziabad, Uttar Pradesh.</p>
    <h2>Contact</h2><p>Questions may be sent to <a href="mailto:info@anchalpiston.com">info@anchalpiston.com</a>.</p>
  </div></section>;
}
