"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const aboutLinks=[["/about","Our Story"],["/global-presence","Global Presence"],["/brand-network","Brands & Network"],["/beyond-automotive","Beyond Automotive"]];
const productLinks=[["/products","Parts Finder"],["/products#systems","Vehicle Systems"],["/brand-network","Brands & Network"]];

export function Navigation(){
 const [open,setOpen]=useState(false); const path=usePathname();
 return <header className="nav"><div className="container nav-inner">
  <Link href="/" className="official-logo" aria-label="Anchal India home"><span className="logo-mark">A</span><span><b>ANCHAL</b><small>INDIA</small></span></Link>
  <nav className={open?"nav-links open":"nav-links"} aria-label="Main navigation">
   <Link className={path==="/"?"active":""} onClick={()=>setOpen(false)} href="/">Home</Link>
   <div className="nav-group"><Link className={aboutLinks.some(([h])=>h===path)?"active":""} href="/about">About Us <i>⌄</i></Link><div className="mega-menu">{aboutLinks.map(([h,l])=><Link onClick={()=>setOpen(false)} href={h} key={h}>{l}<span>→</span></Link>)}</div></div>
   <div className="nav-group"><Link className={productLinks.some(([h])=>h===path)?"active":""} href="/products">Products <i>⌄</i></Link><div className="mega-menu">{productLinks.map(([h,l])=><Link onClick={()=>setOpen(false)} href={h} key={h}>{l}<span>→</span></Link>)}</div></div>
   <Link className={path==="/contact"?"active":""} onClick={()=>setOpen(false)} href="/contact">Contact</Link>
  </nav>
  <button className="menu-button" aria-expanded={open} aria-label="Toggle menu" onClick={()=>setOpen(!open)}><span/><span/></button>
 </div></header>
}

export function CommunicationDock(){
 const [open,setOpen]=useState(false);
 return <div className={`communication-dock ${open?"open":""}`}>
  <div className="dock-panel liquid-glass">
   <b>Start a conversation</b>
   <a href="https://wa.me/919999029920" target="_blank" rel="noreferrer">🇮🇳 India WhatsApp</a>
   <a href="https://wa.me/573245683477" target="_blank" rel="noreferrer">🇨🇴 Latin America</a>
   <span title="Coming soon">◎ Instagram <small>Coming soon</small></span>
   <span title="Coming soon">f Facebook <small>Coming soon</small></span>
  </div>
  <button onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Open contact options">{open?"×":"✦"}</button>
 </div>
}

export function Footer(){
 return <footer><div className="container footer-top">
  <div><Link href="/" className="official-logo logo-footer"><span className="logo-mark">A</span><span><b>ANCHAL</b><small>INDIA</small></span></Link><p>Your one trusted partner for complete automotive solutions.</p></div>
  <div><h4>Explore</h4><Link href="/about">About Us</Link><Link href="/products">Products</Link><Link href="/brand-network">Brands & Network</Link></div>
  <div><h4>Capabilities</h4><Link href="/global-presence">Global Presence</Link><Link href="/products">Parts Finder</Link><Link href="/beyond-automotive">Beyond Automotive</Link></div>
  <div><h4>Contact</h4><a href="mailto:info@anchalpiston.com">info@anchalpiston.com</a><a href="tel:+919999029920">India · +91 99990 29920</a><a href="https://wa.me/573245683477">LATAM · +57 324 5683477</a></div>
 </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Anchal India.</span><span>From India. Built for the world.</span></div></footer>
}
