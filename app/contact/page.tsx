import { SectionTitle, SmartRfq } from "@/components/site";
export const metadata={title:"Contact & RFQ | Anchal India"};
const locations=[
 ["CORPORATE OFFICE","189 Phase-1, Radhey Shyam Vihar, Muradnagar, Ghaziabad, U.P. 201206, India","Ghaziabad, India"],
 ["WORKS","Kanoja House-3, Phase-1, Murad Nagar, Ghaziabad, U.P., India","Murad Nagar, India"],
 ["LATIN AMERICA OFFICE","Envigado, Medellín, Antioquia, Colombia","Envigado, Colombia"],
];
export default function Contact(){
 return <>
  <section className="contact-hero"><div className="shell"><p>LET’S TALK BUSINESS</p><h1>Tell us what you need.<br/><em>We’ll find the way forward.</em></h1><span>Vehicle application, OEM reference, product image, catalogue or complete requirement—start wherever you are.</span><div><a href="#rfq">Start a requirement ↓</a><a href="https://wa.me/919999029920">WhatsApp India ↗</a></div></div></section>
  <section className="section rfq-desk" id="rfq"><div className="shell"><SectionTitle kicker="SMART RFQ DESK" title="Start with whatever you have." copy="Choose an enquiry type and share the clearest available reference. Parts Finder selections can carry directly into this desk."/><SmartRfq/></div></section>
  <section className="section people"><div className="shell"><SectionTitle kicker="PEOPLE BEHIND THE CONVERSATION" title="Business should still feel personal."/><div className="people-grid">
   <article><div className="portrait-placeholder">PHOTO</div><div><h3>Arsh Tyagi</h3><a href="tel:+919999029920">+91 99990 29920</a><a href="mailto:arsh@anchalpiston.com">arsh@anchalpiston.com</a><a href="https://wa.me/919999029920">Start a conversation →</a></div></article>
   <article><div className="portrait-placeholder">PHOTO</div><div><h3>Anshul Tyagi</h3><a href="tel:+917500184184">+91 75001 84184</a><a href="mailto:anshul@anchalpiston.com">anshul@anchalpiston.com</a><a href="https://wa.me/917500184184">Start a conversation →</a></div></article>
  </div></div></section>
  <section className="section locations"><div className="shell"><SectionTitle kicker="WHERE TO FIND US" title="India at our core. Closer to the markets we serve."/><div className="location-grid">{locations.map(([type,address,map],i)=><article key={type}><small>{type}</small><p>{address}</p>{i===2&&<a href="https://wa.me/573245683477">WhatsApp · +57 324 5683477</a>}<a className="mini-map" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(map)}`} target="_blank" rel="noreferrer"><span>MAP PREVIEW</span><b>{map}</b><i>↗</i></a></article>)}</div></div></section>
 </>;
}
