"use client";
import { Breadcrumb, PageHero } from "@/components/inner-page";
import { PartFinder, RfqBanner, SectionHeading } from "@/components/site";
import { productGroups, vehicles } from "@/data/catalog";
export default function Products(){
 return <><PageHero eyebrow="Products / Parts Finder" title="Search by vehicle. Build by application." copy="A simple entry point into a structured product intelligence system for two- and three-wheeler components."/><Breadcrumb current="Products / Parts Finder"/>
 <section className="section finder-page"><div className="container"><PartFinder/></div></section>
 <section className="section section-light"><div className="container"><SectionHeading eyebrow="Product coverage" title="Ten connected vehicle systems." copy="Coverage varies by vehicle, reference and supplier. Share your application list for a confirmed offer."/><div className="product-grid">{productGroups.map((g,i)=><div className="product-tile" key={g}><span>{String(i+1).padStart(2,"0")}</span><h3>{g}</h3><i>↗</i></div>)}</div></div></section>
 <section className="section soft-section"><div className="container"><SectionHeading eyebrow="Vehicle families" title="Structured mock application coverage." copy="The first release includes representative high-relevance platforms. The architecture is ready for deeper variants, assemblies, OEM references and supplier part numbers."/><div className="vehicle-table">{vehicles.map(v=><div key={v.id}><span>{v.type}</span><b>{v.brand}</b><strong>{v.model}</strong><small>{v.variants.join(" · ")}</small></div>)}</div></div></section>
 <section className="section data-model"><div className="container"><p className="eyebrow"><span/>Ready to scale</p><h2>Vehicle → Model → Variant → Group → Assembly → Component → OEM Reference → Supplier Brand → Part Number → RFQ</h2><p>The catalog repository is separated from the interface, allowing a future Supabase connection without rebuilding the finder experience.</p></div></section><RfqBanner/></>
}
