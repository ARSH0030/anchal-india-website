import type { Metadata } from "next";
import { Breadcrumb, PageHero } from "@/components/inner-page";
import { RfqBanner, SectionHeading } from "@/components/site";

export const metadata: Metadata = {
  title: "Beyond Automotive",
  description: "Explore Anchal India's selected capabilities beyond automotive.",
};

const sectors = [
  ["Textiles", "Fabrics, garments and home-textile opportunities supported by established industry relationships."],
  ["Home Appliances", "Selected consumer and household appliance programs for international business requirements."],
  ["Building Materials", "Tiles, granite and marble solutions for distributors and project-led requirements."],
  ["Medicare & Healthcare", "Selected medical and healthcare products developed through qualified business networks."],
];

export default function BeyondAutomotive() {
  return <><PageHero eyebrow="Beyond Automotive" title="Focused expertise. Broader possibilities." copy="Automotive remains our flagship business. Our international relationships and commercial experience also enable selected opportunities across complementary industries."/><Breadcrumb current="Beyond Automotive"/>
    <section className="section section-light"><div className="container"><SectionHeading eyebrow="Selected industries" title="Built carefully, one relationship at a time." copy="These capabilities are a focused extension of Anchal India—not a replacement for the automotive expertise at the heart of our company."/><div className="value-grid">{sectors.map(([title,copy],index)=><article className="value-card" key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <section className="section soft-section"><div className="container editorial-grid"><div><SectionHeading eyebrow="Our approach" title="Opportunity backed by accountability."/><p className="large-copy">We bring the same relationship-led mindset, commercial discipline and international coordination that define our automotive business.</p><p>Every opportunity is evaluated on its own merits, with clear scope, dependable communication and long-term value at the centre.</p></div><aside className="founder-card"><p>Flagship business</p><h3>Automotive Solutions</h3><hr/><p>Extended capabilities</p><h3>Four selected sectors</h3></aside></div></section>
    <RfqBanner/>
  </>;
}
