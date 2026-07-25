import Link from "next/link";
import { BeyondGrid, BrandMarquee, PageCta, SectionTitle, VehicleExplorer, WorldMap } from "@/components/site";

export default function Home() {
  return <>
    <section className="home-hero">
      <div className="hero-motion"><span className="hero-wheel w-one"/><span className="hero-wheel w-two"/><span className="hero-machine"/><span className="hero-parts p1"/><span className="hero-parts p2"/><span className="hero-parts p3"/></div>
      <div className="hero-shade"/><div className="shell hero-content">
        <p className="hero-kicker">GLOBAL AUTOMOTIVE SOLUTIONS · SINCE 2006</p>
        <h1>Your one trusted partner <em>for complete automotive solutions.</em></h1>
        <p>Our own brands, application expertise and a trusted automotive network—delivering complete solutions from India to businesses worldwide.</p>
        <div className="hero-actions"><Link href="/products" className="action-button">Explore solutions →</Link><Link href="/contact" className="text-action">Talk to our team ↗</Link></div>
        <strong className="hero-world">FROM INDIA.<br/>BUILT FOR THE WORLD.</strong>
      </div>
    </section>

    <section className="section story-intro">
      <div className="shell two-col">
        <div className="exploded-visual"><div className="machine-core"/>{["ENGINE","ELECTRICAL","BRAKING","SUSPENSION"].map((x,i)=><span key={x} className={`part-label pl${i+1}`}>{x}</span>)}</div>
        <div><SectionTitle kicker="WHO WE ARE" title="More than parts. Complete automotive solutions." copy="Since 2006, Anchal India has built an automotive ecosystem combining our own brands, application expertise, trusted industry relationships and global supply capabilities."/>
          <div className="chapter-links"><Link href="/about#journey">Our Journey <span>↗</span></Link><Link href="/about#process">Our Capability <span>↗</span></Link><Link href="/global-presence">Our Reach <span>↗</span></Link></div>
        </div>
      </div>
    </section>

    <section className="section systems-section"><div className="shell"><SectionTitle center kicker="COMPLETE VEHICLE COVERAGE" title="Understand the machine. Discover the solution." copy="Explore the systems we support across motorcycles and three-wheelers."/><VehicleExplorer/></div></section>

    <section className="section own-brands"><div className="shell"><SectionTitle kicker="OUR BRANDS" title="Built around real aftermarket demand." copy="AILYN and HARKES are owned by Anchal India and developed with equal commitment to application coverage, dependable quality and long-term customer confidence."/>
      <div className="brand-panels">
        <Link href="/brand-network#own-brands" className="brand-panel ailyn-panel"><span>OWNED BY ANCHAL INDIA</span><b>AILYN</b><small>Think Quality. Think Ailyn.</small><i>Discover the brand →</i></Link>
        <Link href="/brand-network#own-brands" className="brand-panel harkes-panel"><span>OWNED BY ANCHAL INDIA</span><b>HARKES</b><small>Built for dependable mobility.</small><i>Discover the brand →</i></Link>
      </div>
    </div></section>

    <section className="network-strip"><div className="shell"><p>SELECTED NAMES WITHIN OUR AUTOMOTIVE NETWORK</p></div><BrandMarquee/><Link href="/brand-network">Explore Brands & Network →</Link></section>

    <section className="section global-home"><div className="shell global-layout"><div><SectionTitle kicker="GLOBAL REACH" title="From India. Built for the world." copy="From one point of coordination in India, we connect automotive requirements with application knowledge, multi-brand supply, consolidation and international delivery for diverse markets worldwide."/><Link className="text-action blue" href="/global-presence">Explore our global network ↗</Link></div><WorldMap/></div></section>

    <section className="section beyond-home"><div className="shell"><SectionTitle kicker="BEYOND AUTOMOTIVE" title="Broader capabilities. The same commitment." copy="Our international network also supports selected opportunities beyond mobility—built around clear specifications, responsible coordination and dependable execution."/><BeyondGrid/></div></section>
    <PageCta title="Tell us what your market needs." copy="Start with a vehicle, code, product image, catalogue or complete requirement list."/>
  </>;
}
