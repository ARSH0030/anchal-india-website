import Link from "next/link";
import { BrandRail, CredibilityStrip, PartFinder, RfqBanner, SectionHeading } from "@/components/site";
import { markets, partnerBrands, productGroups } from "@/data/catalog";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Automotive components • India to Latin America</p>
            <h1>One partner.<br /><em>Multiple trusted brands.</em><br />Complete solutions.</h1>
            <p className="hero-lead">Application-led sourcing, multi-brand consolidation and export support for two- and three-wheeler components—built on relationships since 2006.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/products">Find parts <span>→</span></Link>
              <Link className="button button-ghost" href="/contact">Start an RFQ</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-orbit">
              <span className="orbit one" />
              <span className="orbit two" />
              <div className="orbit-core">AI</div>
              <span className="orbit-label l1">Engine</span>
              <span className="orbit-label l2">Electrical</span>
              <span className="orbit-label l3">Braking</span>
              <span className="orbit-label l4">Transmission</span>
            </div>
            <div className="hero-stat"><strong>13+</strong><span>Latin American markets</span></div>
          </div>
        </div>
        <CredibilityStrip />
      </section>

      <section className="section section-light">
        <div className="container">
          <SectionHeading eyebrow="Our own brands" title="Built for the realities of the aftermarket." copy="Ailyn and Harkes bring focused product programs, clear application coverage and dependable commercial support to our international partners." />
          <div className="brand-feature-grid">
            <article className="brand-feature ailyn">
              <div className="brand-mark">A</div><div><p>Precision range</p><h3>AILYN</h3><span>Engine, transmission & service components</span></div><Link href="/brands">Explore Ailyn →</Link>
            </article>
            <article className="brand-feature harkes">
              <div className="brand-mark">H</div><div><p>Dependable mobility</p><h3>HARKES</h3><span>Electrical, controls & chassis components</span></div><Link href="/brands">Explore Harkes →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section network-section">
        <div className="container">
          <SectionHeading dark eyebrow="Brand network" title="The right brand for every requirement." copy="A carefully developed network of established component brands helps us build cohesive, market-relevant offers across major vehicle systems." />
          <BrandRail brands={partnerBrands} />
          <p className="legal-note">Brand names are shown to describe our sourcing and supply network. Availability and commercial status may vary by market and product line.</p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container split-intro">
          <SectionHeading eyebrow="Complete 2W & 3W solutions" title="From a single component to a complete market program." copy="Our application knowledge connects vehicle, system and supplier information—helping buyers reduce search time and build a commercially relevant range." />
          <div className="system-count"><strong>10</strong><span>Core product groups</span></div>
        </div>
        <div className="container product-grid">
          {productGroups.map((group, i) => <div className="product-tile" key={group}><span>{String(i + 1).padStart(2, "0")}</span><h3>{group}</h3><i>↗</i></div>)}
        </div>
      </section>

      <section className="section finder-section">
        <div className="container">
          <SectionHeading dark eyebrow="Application intelligence" title="Find the right parts. Faster." copy="Start with the vehicle you know. Our structured application system guides you from model to product group—and is ready to scale to OEM references and part numbers." />
          <PartFinder />
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <SectionHeading eyebrow="Why Anchal" title="More than sourcing. A connected supply solution." />
          <div className="value-grid">
            {[
              ["01","Application knowledge","Vehicle-first product identification across diverse two- and three-wheeler platforms."],
              ["02","Multi-brand access","One commercial relationship connecting a broad, complementary component network."],
              ["03","Export consolidation","Coordinated procurement, documentation and shipment planning across suppliers."],
              ["04","Market understanding","Deep experience with the product, packaging and commercial needs of Latin America."],
            ].map(([n,t,c]) => <article className="value-card" key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section supply-section">
        <div className="container supply-layout">
          <div><p className="eyebrow"><span /> Integrated supply</p><h2>Many requirements.<br />One coordinated shipment.</h2><p>We help buyers combine products from multiple component categories and brands into a structured supply program—reducing coordination overhead while preserving product choice.</p><Link className="text-link" href="/about">How we work →</Link></div>
          <div className="supply-flow" aria-label="Sourcing to delivery process">
            {["Application mapping","Multi-brand sourcing","Quality & document check","Export consolidation"].map((x,i)=><div key={x}><b>{i+1}</b><span>{x}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section presence-section">
        <div className="container presence-layout">
          <div className="map-visual" aria-label="Latin American market presence">
            <span className="map-line line-one" /><span className="map-line line-two" />
            <div className="india-pin">INDIA</div><div className="latam-shape">LATIN<br/>AMERICA</div>
          </div>
          <div><p className="eyebrow"><span /> Latin America</p><h2>Local market understanding.<br />International supply capability.</h2><p>Our primary focus is Latin America, where long-term buyer relationships have shaped our approach to application coverage, consolidation and responsive support.</p><div className="market-tags">{markets.map(m=><span key={m}>{m}</span>)}</div><Link className="text-link" href="/global-presence">Explore our presence →</Link></div>
        </div>
      </section>

      <section className="section credentials-preview">
        <div className="container credentials-row">
          <div><p className="eyebrow"><span /> Recognition</p><h2>Relationships built over time.</h2></div>
          <div className="credential-card"><span>2006</span><p>Established foundation</p></div>
          <div className="credential-card"><span>18+</span><p>Years of market experience</p></div>
          <Link href="/credentials">View credentials →</Link>
        </div>
      </section>
      <RfqBanner />
    </>
  );
}
