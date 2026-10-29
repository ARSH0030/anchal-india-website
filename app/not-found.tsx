import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><div><span>404</span><h1>That route has moved.</h1><p>Return to the Anchal India website or start a requirement with our team.</p><div><Link className="action-button" href="/">Back to home</Link><Link href="/contact">Contact us →</Link></div></div></section>;
}
