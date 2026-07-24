import type { Metadata } from "next";
import { Breadcrumb, PageHero } from "@/components/inner-page";
import { RfqBanner, SectionHeading } from "@/components/site";
import { markets } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Global Presence",
  description: "Anchal India's global automotive outlook and established market strength across Latin America.",
};

export default function Presence() {
  return <><PageHero eyebrow="Global presence" title="Worldwide ambition. Proven regional strength." copy="Our capabilities are global, while nearly two decades of market experience have made Latin America our strongest established international region."/><Breadcrumb current="Global Presence"/>
    <section className="section presence-hero"><div className="container presence-layout"><div className="map-visual"><div className="india-pin">INDIA</div><div className="latam-shape">LATIN<br/>AMERICA</div></div><div><SectionHeading eyebrow="Strongest established market" title="Deep Latin American familiarity."/><p>We pursue opportunities worldwide and bring particular depth to Latin America. Vehicle populations, model names and commercial expectations differ across borders; our approach responds to those differences.</p></div></div></section>
    <section className="section section-light"><div className="container"><SectionHeading eyebrow="Established market knowledge" title="Relationships across Latin America."/><div className="country-grid">{markets.map((market,index)=><div key={market}><span>{String(index+1).padStart(2,"0")}</span><b>{market}</b></div>)}</div></div></section>
    <section className="section soft-section"><div className="container"><div className="three-grid">{[["Global outlook","International opportunities supported from India through a flexible, relationship-led approach."],["Responsive communication","English-led export support with a Spanish-ready digital architecture."],["Shipment coordination","Commercial documentation and consolidation planning for worldwide movement."]].map(([title,copy])=><article className="info-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <RfqBanner/>
  </>;
}
