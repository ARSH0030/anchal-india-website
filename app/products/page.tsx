"use client";
import { Breadcrumb, PageHero } from "@/components/inner-page";
import { PartFinder, ProductCoverage, RfqBanner, SectionHeading, SupplyFlow } from "@/components/site";
export default function Products(){return <><PageHero eyebrow="Products / Parts Finder" title="Search by vehicle. Explore by system." copy="A buyer-friendly route into a structured two- and three-wheeler product ecosystem."/><Breadcrumb current="Products"/>
<section className="section finder-page"><div className="container"><PartFinder/></div></section>
<section className="section section-light"><div className="container"><SectionHeading eyebrow="Product coverage" title="The complete machine, system by system." copy="Every category has its own technical context. Select a system to see typical component families and why they matter."/><ProductCoverage/></div></section>
<section className="section scale-story"><div className="container"><SectionHeading dark eyebrow="Ready to scale" title="One requirement. A connected path to delivery."/><SupplyFlow/><p>Exact availability, fitment, brand and catalog status are confirmed against each commercial requirement.</p></div></section><RfqBanner/></>}
