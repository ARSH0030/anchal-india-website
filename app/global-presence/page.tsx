import type { Metadata } from "next";
import { PageCta, SectionTitle, WorldMap } from "@/components/site";

export const metadata:Metadata={title:"Global Presence",description:"Explore Anchal India’s international automotive supply network and export markets.",alternates:{canonical:"/global-presence"}};

export default function GlobalPresence() {
  return <>
    <section className="about-hero">
      <div className="about-film" />
      <div className="shell">
        <p>GLOBAL PRESENCE</p>
        <h1>Rooted in India.<br /><em>Connected across the world.</em></h1>
        <span>Application understanding, coordinated supply, documentation and international delivery—built around the realities of each market.</span>
      </div>
    </section>
    <section className="section about-global">
      <div className="shell">
        <SectionTitle
          kicker="ONE SUPPLY NETWORK. MULTIPLE MARKETS."
          title="Capability that travels."
          copy="India is our origin. Latin America is our deepest established international region. Our network also reaches Turkey, the Middle East, Egypt and the Philippines, with a sourcing contact in China."
        />
        <WorldMap />
      </div>
    </section>
    <PageCta title="Your market. Our coordinated route." copy="Tell us the destination and requirement. We will map the right path forward." />
  </>;
}
