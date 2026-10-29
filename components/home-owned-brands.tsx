import Link from "next/link";

const brands = [
  {
    number: "01",
    name: "AILYN",
    line: "Think Quality. Think AILYN.",
    video: "/videos/ailyn/AILYN BOX BASE.mp4",
    className: "home-brand-ailyn",
  },
  {
    number: "02",
    name: "HARKES",
    line: "Performance. Precision. Trust.",
    video: "/videos/harkes/HARKES BOX BASE.mp4",
    className: "home-brand-harkes",
  },
] as const;

export function HomeOwnedBrands() {
  return <section className="home-owned-brands" aria-labelledby="home-brands-title">
    <div className="shell">
      <header className="home-brands-heading">
        <div><p>OUR OWN BRANDS</p><h2 id="home-brands-title">Built on quality.<br/><em>Trusted in motion.</em></h2></div>
        <span>Our automotive brands unite consistent quality, dependable performance and the confidence earned through long-term relationships across global markets.</span>
      </header>
      <div className="home-brand-grid">
        {brands.map((brand) => <Link className={`home-brand-hero ${brand.className}`} href="/brand-network#brand-experiences" aria-label={`Explore ${brand.name} on the Brands and Network page`} key={brand.name}>
          <video src={brand.video} autoPlay loop muted playsInline preload="metadata" aria-hidden="true"/>
          <i className="home-brand-shade" aria-hidden="true"/>
          <div className="home-brand-label"><span>{brand.number}</span><b>{brand.name}</b><small>{brand.line}</small></div>
          <span className="home-brand-cta">
            <span>Click to explore</span><i>↗</i>
          </span>
        </Link>)}
      </div>
    </div>
  </section>;
}
