import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Anchal India handles website enquiries and personal information.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return <section className="legal-page"><div className="shell legal-shell"><p className="legal-kicker">LEGAL</p><h1>Privacy Policy</h1><p className="legal-updated">Last updated: 29 October 2026</p>
    <h2>Information we collect</h2><p>When you send an enquiry, we collect the details you provide, including your name, company, email address, country, phone number, requirement details and any files you choose to attach. Our hosting provider may also process standard technical logs needed to operate and secure the website.</p>
    <h2>How we use it</h2><p>We use this information to review your requirement, respond to you, prepare commercial or technical follow-up, prevent misuse and maintain appropriate business records. We do not sell personal information.</p>
    <h2>Who receives it</h2><p>Enquiries may be handled by Anchal India team members and service providers that support website hosting and email delivery. We share only what is needed to provide those services or comply with legal obligations.</p>
    <h2>Retention and security</h2><p>We retain enquiry information only for as long as needed to handle the business relationship and meet applicable recordkeeping obligations. We use reasonable organisational and technical measures to protect the information, but no internet transmission is completely risk-free.</p>
    <h2>Your choices</h2><p>You may ask us to access, correct or delete personal information associated with an enquiry, subject to applicable legal and recordkeeping requirements.</p>
    <h2>Contact</h2><p>For privacy questions, email <a href="mailto:info@anchalpiston.com">info@anchalpiston.com</a> or write to Anchal India, 189 Phase-1, Radhey Shyam Vihar, Muradnagar, Ghaziabad, U.P. 201206, India.</p>
  </div></section>;
}
