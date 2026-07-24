"use client";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { productGroups, vehicles, type VehicleType } from "@/data/catalog";

export function SectionHeading({eyebrow,title,copy,dark=false}:{eyebrow:string;title:string;copy?:string;dark?:boolean}) {
 return <div className={`section-heading ${dark?"dark":""}`}><p className="eyebrow"><span/>{eyebrow}</p><h2>{title}</h2>{copy&&<p className="section-copy">{copy}</p>}</div>
}
export function BrandRail({brands}:{brands:string[]}) {
 return <div className="brand-marquee"><div>{[...brands,...brands].map((b,i)=><span key={`${b}-${i}`}>{b}</span>)}</div></div>
}
const details:Record<string,{parts:string;why:string}>={
 Engine:{parts:"Pistons, rings, cylinders, valves, gaskets, bearings and lubrication components.",why:"Converts combustion into dependable motion and demands precise application matching."},
 Transmission:{parts:"Clutch plates, hubs, gears, chains, sprockets and shifting components.",why:"Transfers engine power smoothly through the driveline."},
 "Electrical & Electronics":{parts:"Ignition, CDI/ECU, coils, regulators, sensors, switches, lighting and instrumentation.",why:"Controls starting, charging, safety, information and everyday reliability."},
 "Suspension & Steering":{parts:"Shock absorbers, fork parts, bushes, cone sets and steering components.",why:"Keeps the vehicle stable, controllable and comfortable."},
 Braking:{parts:"Brake shoes, pads, discs, drums, cables and control components.",why:"A safety-critical system where fitment and consistency matter."},
 "Fuel & Intake":{parts:"Carburetion, pumps, throttle bodies, valves, filters and intake components.",why:"Meters clean fuel and air for efficient performance."},
 "Controls & Cables":{parts:"Control cables, levers, throttles, switches and related hardware.",why:"Turns rider input into accurate mechanical and electrical action."},
 Wheels:{parts:"Rims, hubs, bearings and wheel-related service components.",why:"Carries load while supporting safe, efficient movement."},
 "Body & Frame":{parts:"Panels, rubber parts, mirrors, locks, stands and structural service parts.",why:"Protects the vehicle and supports function, fit and finish."},
 "Filters & Consumables":{parts:"Oil, air and fuel filters plus everyday service and maintenance items.",why:"Protects critical systems and supports longer service life."}
};
export function ProductCoverage(){
 const [active,setActive]=useState<string|null>(null);
 useEffect(()=>{const close=(e:KeyboardEvent)=>e.key==="Escape"&&setActive(null);addEventListener("keydown",close);return()=>removeEventListener("keydown",close)},[]);
 return <><div className="coverage-grid">{productGroups.map((g,i)=><button className={`coverage-card coverage-${i+1}`} onClick={()=>setActive(g)} key={g}><span>{String(i+1).padStart(2,"0")}</span><h3>{g}</h3><p>{details[g].parts}</p><b>Explore system ↗</b></button>)}</div>{active&&<div className="modal-backdrop" onMouseDown={()=>setActive(null)}><section className="detail-modal" role="dialog" aria-modal="true" aria-label={active} onMouseDown={e=>e.stopPropagation()}><button onClick={()=>setActive(null)} aria-label="Close">×</button><small>Vehicle system</small><h2>{active}</h2><p className="modal-lead">{details[active].parts}</p><div><b>Why it matters</b><p>{details[active].why}</p></div><Link href={`/contact?group=${encodeURIComponent(active)}`} className="button button-primary">Request this range →</Link></section></div>}</>
}
export function SupplyFlow(){
 return <div className="supply-flow">{["Requirement","Application mapping","Own + network brands","Quality & consolidation","Documentation","Global delivery"].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><b>{x}</b><i/></div>)}</div>
}
export function WorldReach(){
 return <div className="world-reach" aria-label="Conceptual map showing Anchal India connecting India to world regions"><div className="map-grid"/><div className="world-silhouette">◜ ◝ ◟ ◞</div><span className="india-node">INDIA<i/></span>{["Latin America","Africa","Middle East","Asia-Pacific","Europe"].map((x,i)=><span className={`reach-label reach-${i+1}`} key={x}>{x}</span>)}{[1,2,3,4,5].map(i=><i className={`reach-route reach-route-${i}`} key={i}/>)}</div>
}
export function PartFinder() {
 const [type,setType]=useState<VehicleType>("Motorcycle"),[brand,setBrand]=useState(""),[model,setModel]=useState(""),[group,setGroup]=useState("");
 const brands=useMemo(()=>Array.from(new Set(vehicles.filter(v=>v.type===type).map(v=>v.brand))),[type]);
 const models=vehicles.filter(v=>v.type===type&&(!brand||v.brand===brand)); const selected=vehicles.find(v=>v.id===model);
 function changeType(v:VehicleType){setType(v);setBrand("");setModel("");setGroup("")}
 return <div className="finder"><div className="type-toggle"><button className={type==="Motorcycle"?"active":""} onClick={()=>changeType("Motorcycle")}>Motorcycle</button><button className={type==="3-Wheeler"?"active":""} onClick={()=>changeType("3-Wheeler")}>3-Wheeler</button></div><div className="finder-fields">
 <label><span>01 / Brand</span><select value={brand} onChange={e=>{setBrand(e.target.value);setModel("")}}><option value="">Select brand</option>{brands.map(x=><option key={x}>{x}</option>)}</select></label>
 <label><span>02 / Model</span><select value={model} onChange={e=>setModel(e.target.value)} disabled={!brand}><option value="">Select model</option>{models.map(x=><option key={x.id} value={x.id}>{x.model}</option>)}</select></label>
 <label><span>03 / Product group</span><select value={group} onChange={e=>setGroup(e.target.value)} disabled={!model}><option value="">Select group</option>{productGroups.map(x=><option key={x}>{x}</option>)}</select></label>
 <Link className={`button button-primary finder-button ${!group?"disabled":""}`} href={group?`/contact?vehicle=${model}&group=${encodeURIComponent(group)}`:"#"}>Find parts →</Link></div>
 {selected&&<div className="catalog-action"><div><b>{selected.brand} {selected.model}</b><span>Model-specific catalog support</span></div><Link href={`/contact?vehicle=${model}&request=catalog`}>Request catalog ↓</Link></div>}<p className="finder-foot">Can’t find your vehicle? <Link href="/contact">Send us your application list</Link></p></div>
}
export function RfqBanner(){return <section className="rfq-banner"><div className="container"><p>Ready to build the right solution?</p><h2>Bring us the vehicle, the reference<br/>or the complete requirement.</h2><div><Link className="button button-light" href="/contact">Send an RFQ →</Link><a className="button button-whatsapp" href="https://wa.me/919999029920" target="_blank" rel="noreferrer">WhatsApp us</a></div></div></section>}
export function ContactForm() {
 const [sent,setSent]=useState(false); function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setSent(true)}
 if(sent)return <div className="form-success"><b>Thank you.</b><p>Your enquiry has been captured. For immediate assistance, please WhatsApp +91 99990 29920.</p></div>;
 return <form className="contact-form" onSubmit={submit}><div className="form-grid"><label>Name *<input required/></label><label>Company *<input required/></label><label>Email *<input required type="email"/></label><label>Country *<input required/></label><label>Phone / WhatsApp<input/></label><label>Requirement type<select><option>General enquiry</option><option>Request for quotation</option><option>Product application support</option><option>Catalog request</option></select></label></div><label>Products, vehicles or part numbers<textarea required rows={6} placeholder="Tell us the model, product group, quantity or reference…"/></label><button className="button button-primary">Submit enquiry →</button></form>
}
