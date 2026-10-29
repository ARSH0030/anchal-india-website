"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useMemo, useState } from "react";
import { productGroups, vehicles, type VehicleType } from "@/data/catalog";
import { InteractiveGlobalMap } from "@/components/interactive-global-map";

export function SectionTitle({kicker, title, copy, center=false}:{kicker:string;title:string;copy?:string;center?:boolean}) {
  return <div className={`section-title ${center?"center":""}`}><p>{kicker}</p><h2>{title}</h2>{copy&&<span>{copy}</span>}</div>;
}

export function GlassModal({open,onClose,children}:{open:boolean;onClose:()=>void;children:ReactNode}) {
  if (!open) return null;
  return <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
    <section className="glass-modal" role="dialog" aria-modal="true" onMouseDown={(e)=>e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="Close">×</button>{children}
    </section>
  </div>;
}

export const systemDetails: Record<string,{parts:string[];copy:string}> = {
  "Engine": {parts:["Pistons & rings","Cylinder kits","Valves","Gaskets","Oil pumps","Timing components"],copy:"The power-generating core of the vehicle, supported through precision components selected around application and operating conditions."},
  "Transmission": {parts:["Clutch plates","Clutch assemblies","Chains & sprockets","Gears","Shift components"],copy:"Transfers engine power efficiently to the road through matched clutch, gear and final-drive components."},
  "Electrical & Electronics": {parts:["Ignition","Regulators","Magnetos","Switches","Sensors","Instrument clusters"],copy:"Starting, charging, control and information systems that keep modern two- and three-wheelers dependable."},
  "Suspension & Steering": {parts:["Shock absorbers","Front forks","Bush kits","Steering races","Cone sets"],copy:"Ride-control components engineered to manage road forces, stability and rider comfort."},
  "Braking": {parts:["Brake shoes","Disc pads","Discs","Control components","Cables"],copy:"Friction and control products that support consistent stopping performance across applications."},
  "Fuel & Intake": {parts:["Carburettors","Fuel pumps","Throttle bodies","Valves","Air-intake components"],copy:"Fuel delivery and air-management systems tuned around vehicle application and market requirements."},
  "Controls & Cables": {parts:["Control cables","Throttle controls","Levers","Switchgear","Gear shifters"],copy:"The physical and electronic control interfaces connecting the rider with the machine."},
  "Wheels": {parts:["Alloy wheels","Rims","Hubs","Bearings","Related hardware"],copy:"Rotating and load-bearing components for stable, efficient vehicle movement."},
  "Body & Frame": {parts:["Body panels","Chassis parts","Mirrors","Rubber parts","Locks"],copy:"Structural, protection and finish components that complete the vehicle."},
  "Filters & Consumables": {parts:["Air filters","Oil filters","Fuel filters","Bulbs","Service parts"],copy:"Routine service products that help preserve performance throughout the vehicle lifecycle."},
};

export function PartFinder({expanded=false}:{expanded?:boolean}) {
  const [type,setType]=useState<VehicleType>("Motorcycle");
  const brands=useMemo(()=>Array.from(new Set(vehicles.filter(v=>v.type===type).map(v=>v.brand))),[type]);
  const [brand,setBrand]=useState(""); const [model,setModel]=useState(""); const [group,setGroup]=useState("");
  const [code,setCode]=useState(""); const [modal,setModal]=useState(false);
  const models=vehicles.filter(v=>v.type===type&&v.brand===brand);
  const selected=vehicles.find(v=>v.id===model);
  const reset=(next:VehicleType)=>{setType(next);setBrand("");setModel("");setGroup("")};
  return <div className={`finder-island ${expanded?"expanded":""}`}>
    <div className="finder-head"><div><small>APPLICATION INTELLIGENCE</small><h3>Find the right part. Fast.</h3></div>
      <div className="segmented"><button className={type==="Motorcycle"?"active":""} onClick={()=>reset("Motorcycle")}>Motorcycle</button><button className={type==="3-Wheeler"?"active":""} onClick={()=>reset("3-Wheeler")}>3-Wheeler</button></div>
    </div>
    <div className="finder-grid">
      <label><span>01 · Brand</span><select value={brand} onChange={e=>{setBrand(e.target.value);setModel("");setGroup("")}}><option value="">Choose brand</option>{brands.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span>02 · Model</span><select value={model} disabled={!brand} onChange={e=>{setModel(e.target.value);setGroup("")}}><option value="">Choose model</option>{models.map(x=><option key={x.id} value={x.id}>{x.model}</option>)}</select></label>
      <label><span>03 · Product group</span><select value={group} disabled={!model} onChange={e=>setGroup(e.target.value)}><option value="">Choose system</option>{productGroups.map(x=><option key={x}>{x}</option>)}</select></label>
      <button className="action-button" disabled={!group} onClick={()=>setModal(true)}>View solutions <span>→</span></button>
    </div>
    {expanded&&<div className="code-search" id="code"><div><small>KNOW THE CODE?</small><strong>Find part by OEM / reference code</strong></div><input value={code} onChange={e=>setCode(e.target.value)} placeholder="Enter OEM, supplier or part reference"/><Link href={`/contact?code=${encodeURIComponent(code)}`} className={code?"code-action active":"code-action"}>Search / request →</Link></div>}
    <p className="finder-note">{selected ? <><b>{selected.brand} {selected.model}</b> · Model-specific catalogue support available on request.</> : <>Select a vehicle to reveal application and catalogue support.</>} <Link href={`/contact?vehicle=${model}`}>Request catalogue ↗</Link></p>
    <GlassModal open={modal} onClose={()=>setModal(false)}>
      <div className="modal-visual part-visual"><span>{group.slice(0,1)}</span></div>
      <p className="modal-kicker">{selected?.brand} · {selected?.model}</p><h2>{group}</h2><p>{systemDetails[group]?.copy}</p>
      <div className="part-list">{systemDetails[group]?.parts.map(p=><span key={p}>{p}</span>)}</div>
      <div className="modal-note"><b>OEM / reference intelligence</b><span>Exact codes are published only after verification against the source catalogue.</span></div>
      <Link className="action-button" href={`/contact?vehicle=${model}&group=${encodeURIComponent(group)}`}>Add to requirement →</Link>
    </GlassModal>
  </div>;
}

export function VehicleExplorer() {
  const [vehicle,setVehicle]=useState<"bike"|"tuktuk">("bike"); const [selected,setSelected]=useState<string|null>(null);
  const systems=["Engine","Transmission","Electrical & Electronics","Suspension & Steering","Braking","Controls & Cables"];
  return <div className="vehicle-explorer">
    <div className="vehicle-tabs"><button className={vehicle==="bike"?"active":""} onClick={()=>setVehicle("bike")}>Motorcycle</button><button className={vehicle==="tuktuk"?"active":""} onClick={()=>setVehicle("tuktuk")}>3-Wheeler</button></div>
    <div className={`vehicle-stage ${vehicle}`}>
      <div className="vehicle-silhouette" aria-hidden="true">{vehicle==="bike"?<><span className="bike-body"/><i className="tyre t1"/><i className="tyre t2"/></>:<><span className="tuk-body"/><i className="tyre t1"/><i className="tyre t2"/></>}</div>
      {systems.map((s,i)=><button key={s} className={`hotspot hot-${i+1}`} onClick={()=>setSelected(s)}><b>+</b><span>{s}</span></button>)}
    </div>
    <GlassModal open={!!selected} onClose={()=>setSelected(null)}>{selected&&<><p className="modal-kicker">VEHICLE SYSTEM</p><h2>{selected}</h2><p>{systemDetails[selected]?.copy}</p><div className="part-list">{systemDetails[selected]?.parts.map(p=><span key={p}>{p}</span>)}</div><Link className="action-button" href={`/contact?group=${encodeURIComponent(selected)}`}>Enquire about this system →</Link></>}</GlassModal>
  </div>;
}

export function BrandMarquee() {
  const brandBoxes = [
    ["Aroma", "aroma.webp"], ["Champion", "champion.webp"], ["FCC", "fcc.webp"],
    ["Flash", "flash.webp"], ["Gabriel", "gabriel.webp"], ["Goetze", "goetze.webp"],
    ["IFB", "ifb.webp"], ["INEL", "inel.webp"], ["Lumax", "lumax.webp"],
    ["Makino", "makino.webp"], ["MK", "mk.webp"], ["Pricol", "pricol.webp"],
    ["Rockman", "rockman.webp"], ["Sandhar", "sandhar.webp"], ["Spark Minda", "spark-minda.webp"],
    ["Suprajit", "suprajit.webp"], ["UCAL", "ucal.webp"], ["Uno Minda", "uno-minda.webp"],
    ["Varroc", "varroc.webp"],
  ] as const;
  const looped = [...brandBoxes, ...brandBoxes];
  return <div className="logo-marquee network-box-marquee" aria-label="Selected automotive brand network">
    <div>{looped.map(([brand,image],index)=><Link className="network-brand-box" href="/brand-network" aria-label={`Explore ${brand} on the Brands and Network page`} aria-hidden={index >= brandBoxes.length ? true : undefined} tabIndex={index >= brandBoxes.length ? -1 : undefined} key={`${brand}-${index}`}>
      <img src={`/images/brand-network/${image}`} alt={`${brand} branded automotive component box`}/>
    </Link>)}</div>
  </div>;
}

export function WorldMap({compact = false}:{compact?:boolean}) {
  return <InteractiveGlobalMap compact={compact}/>;
}

export const sectors=[
  {name:"Textiles",image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",tag:"Yarn · Fabrics · Made-ups",copy:"Selected textile opportunities spanning yarn, woven and knitted fabrics, home textiles and finished made-ups."},
  {name:"Electrical Appliances",image:"https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",tag:"Kitchen · Home · Electrical",copy:"Product-led sourcing across selected kitchen, household and electrical appliance categories."},
  {name:"Building Materials",image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",tag:"Tiles · Granite · Marble",copy:"Architectural surfaces and building materials selected around project specifications and destination-market needs."},
  {name:"Healthcare",image:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",tag:"Pharma · Consumables · Supplies",copy:"Selected healthcare and pharmaceutical requirements, always subject to product and market-specific regulatory verification."},
  {name:"Solar Kit",image:"https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",tag:"Panels · Inverters · Batteries",copy:"Solar modules, storage, inverters and balance-of-system components for defined energy requirements."},
];

const capabilityCrops = [46, 360, 672, 992, 1308];
function CapabilityImage({ index }: { index: number }) {
  return <svg className="capability-reference-image" viewBox={`${capabilityCrops[index]} 556 294 164`} preserveAspectRatio="xMinYMin slice" aria-hidden="true" focusable="false"><image href="/images/beyond-reference/capabilities.png" width="1677" height="938" /></svg>;
}

export function BeyondGrid({ referenceImages = false }: { referenceImages?: boolean }) {
  const [selected,setSelected]=useState<(typeof sectors)[number]|null>(null);
  return <><div className="sector-grid">{sectors.map((s,index)=><button key={s.name} className={referenceImages ? "sector-card sector-card-reference" : "sector-card"} onClick={()=>setSelected(s)} style={referenceImages ? undefined : {backgroundImage:`linear-gradient(180deg,transparent 25%,rgba(3,16,35,.86)),url('${s.image}')`}}>{referenceImages && <CapabilityImage index={index}/>}<small>{s.tag}</small><strong>{s.name}</strong><span>Explore ↗</span></button>)}</div>
  <GlassModal open={!!selected} onClose={()=>setSelected(null)}>{selected&&<>{referenceImages ? <div className="modal-image capability-modal-image"><CapabilityImage index={sectors.indexOf(selected)}/></div> : <div className="modal-image" style={{backgroundImage:`url('${selected.image}')`}}/>}<p className="modal-kicker">BEYOND AUTOMOTIVE</p><h2>{selected.name}</h2><p>{selected.copy}</p><div className="part-list">{selected.tag.split(" · ").map(x=><span key={x}>{x}</span>)}</div><Link href={`/contact?sector=${encodeURIComponent(selected.name)}`} className="action-button">Discuss a requirement →</Link></>}</GlassModal></>;
}

export type RfqContext={vehicle?:string;group?:string;code?:string;brand?:string;sector?:string};

function initialEnquiryType(context:RfqContext){
  if(context.code)return "OEM / Part Number";
  if(context.sector)return "Beyond Automotive";
  if(context.brand)return "Brand / Network";
  return "Vehicle / Model Parts";
}

export function SmartRfq({initialContext={}}:{initialContext?:RfqContext}) {
  const types=["Vehicle / Model Parts","OEM / Part Number","Complete Requirement List","Brand / Network","Beyond Automotive","General Enquiry"];
  const [type,setType]=useState(()=>initialEnquiryType(initialContext));
  const [status,setStatus]=useState<"idle"|"submitting"|"success"|"error">("idle");
  const [message,setMessage]=useState("");
  const [reference,setReference]=useState("");
  const contextEntries=Object.entries(initialContext).filter((entry):entry is [string,string]=>Boolean(entry[1]));

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    try{
      const response=await fetch("/api/rfq",{method:"POST",body:new FormData(event.currentTarget)});
      const result=await response.json() as {error?:string;reference?:string};
      if(!response.ok)throw new Error(result.error||"We could not send your requirement.");
      setReference(result.reference??"");
      setStatus("success");
    }catch(error){
      setMessage(error instanceof Error?error.message:"We could not send your requirement.");
      setStatus("error");
    }
  }

  if(status==="success")return <div className="rfq-success" role="status"><span>✓</span><h3>Your requirement has been sent.</h3><p>Our team will review it and reply using the contact details provided.</p>{reference&&<small>Reference: {reference}</small>}<a href="https://wa.me/919999029920">Continue on WhatsApp →</a></div>;
  return <form className="smart-rfq" onSubmit={submit} encType="multipart/form-data">
    <input type="hidden" name="enquiryType" value={type}/>
    {contextEntries.map(([key,value])=><input key={key} type="hidden" name={key} value={value}/>)}
    <label className="website-field" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <div className="rfq-types" aria-label="Enquiry type">{types.map(t=><button type="button" className={type===t?"active":""} onClick={()=>setType(t)} key={t}>{t}</button>)}</div>
    {contextEntries.length>0&&<div className="rfq-context"><b>Added from your selection</b>{contextEntries.map(([key,value])=><span key={key}><small>{key}</small>{value}</span>)}</div>}
    <div className="rfq-fields"><label>Name *<input required name="name" autoComplete="name" maxLength={100}/></label><label>Company *<input required name="company" autoComplete="organization" maxLength={120}/></label><label>Email *<input type="email" required name="email" autoComplete="email" maxLength={160}/></label><label>Country *<input required name="country" autoComplete="country-name" maxLength={100}/></label></div>
    <label className="wide">Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" maxLength={40}/></label>
    <label className="wide">Tell us what you need *<textarea required name="message" rows={4} maxLength={5000} placeholder={type==="OEM / Part Number"?"Enter OEM / reference code, vehicle and quantity":"Vehicle, model, products, quantities or destination market…"}/></label>
    <label className="upload">＋ <b>Attach requirement list or product images</b><span>XLSX · XLS · CSV · PDF · JPG · PNG · up to 3 files / 5 MB each</span><input name="attachments" type="file" multiple accept=".xlsx,.xls,.csv,.pdf,.jpg,.jpeg,.png,image/jpeg,image/png"/></label>
    <label className="consent"><input type="checkbox" name="consent" value="yes" required/><span>I agree that Anchal India may use these details to respond to my enquiry, as described in the <Link href="/privacy">Privacy Policy</Link>.</span></label>
    {status==="error"&&<p className="rfq-error" role="alert">{message} You can also email <a href="mailto:info@anchalpiston.com">info@anchalpiston.com</a> or use WhatsApp.</p>}
    <button className="action-button" disabled={status==="submitting"}>{status==="submitting"?"Sending…":"Send requirement →"}</button>
  </form>;
}

export function PageCta({title,copy}:{title:string;copy:string}) { return <section className="page-cta"><div className="shell"><p>START A CONVERSATION</p><h2>{title}</h2><span>{copy}</span><div><Link href="/contact" className="action-button light">Tell us what you need →</Link><a href="https://wa.me/919999029920">WhatsApp</a></div></div></section>; }
