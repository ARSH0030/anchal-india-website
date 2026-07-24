import Image from "next/image";
import Link from "next/link";
import { BrandRail, PartFinder, RfqBanner, SectionHeading } from "@/components/site";
import { markets, partnerBrands, productGroups } from "@/data/catalog";

const categoryCopy = ["Precision engine families","Clutch, drive and control","Ignition, lighting and instruments","Ride control and steering","Friction and control parts","Fuel delivery and air","Cables, switches and levers","Rims, bearings and hubs","Structural and service parts","Filtration and maintenance"];

export default function Home() {
  return <>
    <div className="site-loader" aria-hidden="true"><div className="loader-mark">A</div><span>ANCHAL INDIA</span><i /></div>
    <section className="hero hero-visual">
      <Image className="hero-image" src="/anchal-automotive-hero.png" alt="" fill priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Global automotive solutions · Since 2006</p>
          <h1>Your one trusted partner <em>for complete automotive solutions.</em></h1>
          <p className="hero-lead">Our own brands, a trusted automotive network and application-led supply capability—built in India for businesses across the world.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/products">Explore solutions <span>→</span></Link><Link className="button button-ghost" href="/contact">Start an RFQ</Link></div>
        </div>
      </div>
      <div className="hero-caption"><b>FROM INDIA.</b><span>BUILT FOR THE WORLD.</span></div>
    </section>

    <section className="brand-ticker" aria-label="Automotive brand network"><div className="ticker-track">{[...partnerBrands,...partnerBrands].map((b,i)=><span key={`${b}-${i}`}>{b}</span>)}</div></section>

    <section className="section product-universe">
      <div className="container split-intro"><SectionHeading eyebrow="Complete automotive solutions" title="One vehicle. Every critical system." copy="Explore a connected product universe for two- and three-wheelers—structured by the way buyers actually search."/><Link className="text-link" href="/products">View all products →</Link></div>
      <div className="container visual-product-grid">
        {productGroups.slice(0,8).map((group,i)=><Link href="/products" className={`visual-product-card card-${i+1}`} key={group}>
          <Image src="/automotive-product-universe.png" alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
          <div className="product-card-shade" /><span>0{i+1}</span><div><h3>{group}</h3><p>{categoryCopy[i]}</p></div><b>↗</b>
        </Link>)}
      </div>
    </section>

    <section className="section story-section"><div className="container story-layout">
      <div className="story-image"><Image src="/automotive-product-universe.png" alt="A broad selection of automotive component families" fill sizes="50vw"/></div>
      <div><p className="eyebrow"><span /> Who we are</p><h2>More than supply.<br/>A solution built around your market.</h2><p>Anchal India is a global automotive solutions company built on industry knowledge, trusted relationships and dependable international execution. We bring our own brands and an established component network together under one accountable partner.</p>
      <div className="story-points"><div><b>01</b><span>Application knowledge</span></div><div><b>02</b><span>Multi-brand coordination</span></div><div><b>03</b><span>Export execution</span></div></div><Link className="text-link" href="/about">Discover Anchal India →</Link></div>
    </div></section>

    <section className="section own-brands-section"><div className="container">
      <SectionHeading dark eyebrow="Our own brands" title="Our name stands behind the solution." copy="AILYN and HARKES are distinctly ours—developed around real aftermarket requirements, application coverage and long-term customer confidence."/>
      <div className="own-brand-stage"><Link href="/brands" className="own-brand-panel ailyn-panel"><small>ENGINE · TRANSMISSION · SERVICE</small><strong>AILYN</strong><p>Precision-minded automotive component programs.</p><span>Discover the brand →</span></Link><Link href="/brands" className="own-brand-panel harkes-panel"><small>ELECTRICAL · CONTROLS · CHASSIS</small><strong>HARKES</strong><p>Dependable mobility solutions for evolving markets.</p><span>Discover the brand →</span></Link></div>
    </div></section>

    <section className="section network-section"><div className="container"><SectionHeading dark eyebrow="Automotive ecosystem" title="Trusted names. One coordinated network." copy="Our network broadens the solutions we can build across vehicle systems. Brand availability and commercial status vary by market and product line."/><BrandRail brands={partnerBrands}/></div></section>

    <section className="section finder-section"><div className="container"><SectionHeading dark eyebrow="Application intelligence" title="Start with the vehicle. Find the system." copy="A simple three-step route from vehicle brand to model to product group—ready to scale with verified application data."/><PartFinder/></div></section>

    <section className="section global-story"><div className="container">
      <div className="global-copy"><p className="eyebrow"><span/> Global reach</p><h2>From India.<br/>Built for the world.</h2><p>Anchal India is a global automotive solutions company. Our strongest established international experience is in Latin America, while our outlook, capabilities and ambition reach markets worldwide.</p><Link className="button button-light" href="/global-presence">Explore global presence</Link></div>
      <div className="world-map" aria-label="Conceptual global reach map"><div className="world-dots"/><span className="map-origin">INDIA<i/></span><span className="region r1">LATIN AMERICA</span><span className="region r2">AFRICA</span><span className="region r3">MIDDLE EAST</span><span className="region r4">ASIA-PACIFIC</span><i className="route route-1"/><i className="route route-2"/><i className="route route-3"/></div>
    </div></section>

    <section className="section latam-story"><div className="container latam-layout"><div><p className="eyebrow"><span/> Deep-rooted market strength</p><h2>A global vision.<br/>A special understanding of Latin America.</h2></div><div><p>Years of work across Latin America have given us more than reach: they have shaped our understanding of regional vehicle populations, product requirements and distributor relationships.</p><div className="market-tags">{markets.map(m=><span key={m}>{m}</span>)}</div></div></div></section>

    <section className="section beyond-strip"><div className="container"><div className="beyond-heading"><p className="eyebrow"><span/> Beyond automotive</p><h2>Broader capabilities.<br/>Deliberately selective.</h2><Link className="text-link" href="/beyond-automotive">Explore industries →</Link></div><div className="beyond-cards">{["Textiles","Home Appliances","Tiles, Granite & Marble","Medicare & Healthcare"].map((x,i)=><Link href="/beyond-automotive" key={x}><span>0{i+1}</span><b>{x}</b></Link>)}</div></div></section>

    <section className="proof-band"><div className="container"><div><strong>2006</strong><span>Established</span></div><div><strong>2W + 3W</strong><span>Core vehicle focus</span></div><div><strong>AILYN + HARKES</strong><span>Our own brands</span></div><div><strong>GLOBAL</strong><span>Latin America is our strongest market</span></div></div></section>
    <RfqBanner/>
  </>;
}
