import { PageCta, PartFinder, SectionTitle, VehicleExplorer } from "@/components/site";
export const metadata={title:"Products & Parts Finder | Anchal India"};
export default function Products(){
 return <>
  <section className="products-hero"><div className="product-orbit"/><div className="shell"><p>PRODUCTS + APPLICATION INTELLIGENCE</p><h1>Know the vehicle.<br/>Know the code.<br/><em>Find the solution.</em></h1><span>A premium gateway into Anchal India’s two- and three-wheeler product ecosystem.</span></div></section>
  <section className="section finder-section" id="finder"><div className="shell"><PartFinder expanded/></div></section>
  <section className="section systems-explorer" id="systems"><div className="shell"><SectionTitle center kicker="EXPLORE THE COMPLETE VEHICLE" title="Every system. One connected view." copy="Select a vehicle and discover representative product families through interactive hotspots."/><VehicleExplorer/></div></section>
  <section className="section fulfilment"><div className="shell"><SectionTitle kicker="FROM REQUIREMENT TO DELIVERY" title="One coordinated path."/><div className="fulfilment-track">{["RFQ arrives","Application mapped","Solution matched","Checked & consolidated","Documents prepared","Shipment moves","Destination reached"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></div></section>
  <PageCta title="Know the vehicle, code—or just the requirement?" copy="Send us any starting point. Our team will help map the application and build the right solution."/>
 </>;
}
