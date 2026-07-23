"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { productGroups, vehicles, type VehicleType } from "@/data/catalog";

export function SectionHeading({eyebrow,title,copy,dark=false}:{eyebrow:string;title:string;copy?:string;dark?:boolean}) {
  return <div className={`section-heading ${dark?"dark":""}`}><p className="eyebrow"><span />{eyebrow}</p><h2>{title}</h2>{copy&&<p className="section-copy">{copy}</p>}</div>
}

export function CredibilityStrip() {
  return <div className="credibility"><div className="container credibility-inner"><div><strong>Since 2006</strong><span>Established automotive experience</span></div><i/><div><strong>2W + 3W</strong><span>Complete vehicle coverage</span></div><i/><div><strong>India → LATAM</strong><span>Focused export capability</span></div></div></div>
}

export function BrandRail({brands}:{brands:string[]}) {
  return <div className="brand-rail">{brands.map(b=><span key={b}>{b}</span>)}</div>
}

export function PartFinder() {
  const [type,setType]=useState<VehicleType>("Motorcycle");
  const brands=useMemo(()=>Array.from(new Set(vehicles.filter(v=>v.type===type).map(v=>v.brand))),[type]);
  const [brand,setBrand]=useState("");
  const [model,setModel]=useState("");
  const [group,setGroup]=useState("");
  const models=vehicles.filter(v=>v.type===type&&(!brand||v.brand===brand));
  function changeType(v:VehicleType){setType(v);setBrand("");setModel("");setGroup("")}
  return <div className="finder">
    <div className="type-toggle"><button className={type==="Motorcycle"?"active":""} onClick={()=>changeType("Motorcycle")}>Motorcycle</button><button className={type==="3-Wheeler"?"active":""} onClick={()=>changeType("3-Wheeler")}>3-Wheeler</button></div>
    <div className="finder-fields">
      <label><span>01 / Brand</span><select value={brand} onChange={e=>{setBrand(e.target.value);setModel("")}}><option value="">Select brand</option>{brands.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span>02 / Model</span><select value={model} onChange={e=>setModel(e.target.value)} disabled={!brand}><option value="">Select model</option>{models.map(x=><option key={x.id} value={x.id}>{x.model}</option>)}</select></label>
      <label><span>03 / Product group</span><select value={group} onChange={e=>setGroup(e.target.value)} disabled={!model}><option value="">Select group</option>{productGroups.map(x=><option key={x}>{x}</option>)}</select></label>
      <Link className={`button button-primary finder-button ${!group?"disabled":""}`} href={group?`/contact?vehicle=${model}&group=${encodeURIComponent(group)}`:"#"}>Find parts <span>→</span></Link>
    </div>
    <p className="finder-foot">Can’t find your vehicle? <Link href="/contact">Send us your application list</Link></p>
  </div>
}

export function RfqBanner(){
  return <section className="rfq-banner"><div className="container"><p>Ready to simplify your sourcing?</p><h2>Build your next product program<br/>with Anchal India.</h2><div><Link className="button button-light" href="/contact">Send an RFQ <span>→</span></Link><a className="button button-whatsapp" href="https://wa.me/919999029920" target="_blank" rel="noreferrer">WhatsApp us</a></div></div></section>
}

export function ContactForm({compact=false}:{compact?:boolean}) {
  const [sent,setSent]=useState(false);
  function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setSent(true)}
  if(sent)return <div className="form-success"><b>Thank you.</b><p>Your enquiry is ready for our export team. For immediate assistance, please WhatsApp +91 99990 29920.</p></div>;
  return <form className={`contact-form ${compact?"compact":""}`} onSubmit={submit}>
    <div className="form-grid"><label>Name *<input required name="name"/></label><label>Company *<input required name="company"/></label><label>Email *<input required type="email" name="email"/></label><label>Country *<input required name="country"/></label><label>Phone / WhatsApp<input name="phone"/></label><label>Requirement type<select name="type"><option>General enquiry</option><option>Request for quotation</option><option>Product application support</option><option>Brand enquiry</option></select></label></div>
    <label>Products, vehicles or part numbers<textarea required name="message" rows={compact?4:6} placeholder="Tell us the vehicle models, product groups, quantities or references you need…" /></label>
    <button className="button button-primary" type="submit">Submit enquiry <span>→</span></button>
    <small>By submitting, you agree that Anchal India may contact you regarding this enquiry.</small>
  </form>
}
