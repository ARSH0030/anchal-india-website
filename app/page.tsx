import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { HomeAutomotiveSolutions } from "@/components/automotive-solutions";
import { HomeOwnedBrands } from "@/components/home-owned-brands";
import { WhoWeAreFilm } from "@/components/who-we-are-film";
import { BeyondGrid, BrandMarquee, PageCta, SectionTitle, WorldMap } from "@/components/site";

export default function Home() {
  return <>
    <HomeHero/>

    <section className="section story-intro">
      <div className="shell two-col">
        <WhoWeAreFilm />
        <div><SectionTitle kicker="WHO WE ARE" title="More than parts. Complete automotive solutions." copy="Since 2006, Anchal India has built an automotive ecosystem combining our own brands, application expertise, trusted industry relationships and global supply capabilities."/>
          <div className="chapter-links"><Link href="/about#journey">Our Journey <span>↗</span></Link><Link href="/about#process">Our Capability <span>↗</span></Link><Link href="/global-presence">Our Reach <span>↗</span></Link></div>
        </div>
      </div>
    </section>

    <HomeAutomotiveSolutions />
    <HomeOwnedBrands />

    <section className="network-strip"><div className="shell"><p>SELECTED NAMES WITHIN OUR AUTOMOTIVE NETWORK</p></div><BrandMarquee/><Link href="/brand-network">Explore Brands & Network →</Link></section>

    <section className="section global-home"><div className="shell global-layout"><div><SectionTitle kicker="GLOBAL PRESENCE" title="From India. Connected to every market we serve." copy="We coordinate application-led sourcing, multi-brand consolidation and export delivery from India—supporting automotive buyers across Latin America and selected international markets."/><Link className="text-action blue" href="/global-presence">Explore our global presence ↗</Link></div><WorldMap compact/></div></section>

    <section className="section beyond-home"><div className="shell"><SectionTitle kicker="BEYOND AUTOMOTIVE" title="Broader capabilities. The same commitment." copy="Our international network also supports selected opportunities beyond mobility—built around clear specifications, responsible coordination and dependable execution."/><BeyondGrid referenceImages/></div></section>
    <PageCta title="Tell us what your market needs." copy="Start with a vehicle, code, product image, catalogue or complete requirement list."/>
  </>;
}
