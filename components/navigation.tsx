"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links=[["/about","About"],["/products","Products"],["/brands","Our Brands"],["/brand-network","Brand Network"],["/global-presence","Global Presence"],["/beyond-automotive","Beyond Automotive"],["/credentials","Credentials"]];

export function Navigation(){
 const [open,setOpen]=useState(false); const path=usePathname();
 return <header className="nav"><div className="container nav-inner">
  <Link href="/" className="logo" aria-label="Anchal India home"><span className="logo-symbol">A</span><span>ANCHAL<small>INDIA</small></span></Link>
  <nav className={open?"nav-links open":"nav-links"} aria-label="Main navigation">
   {links.map(([href,label])=><Link className={path===href?"active":""} onClick={()=>setOpen(false)} key={href} href={href}>{label}</Link>)}
   <Link className="nav-rfq" onClick={()=>setOpen(false)} href="/contact">RFQ <span>↗</span></Link>
  </nav>
  <button className="menu-button" aria-expanded={open} aria-label="Toggle menu" onClick={()=>setOpen(!open)}><span/><span/></button>
 </div></header>
}

export function Footer(){
 return <footer><div className="container footer-top">
  <div><Link href="/" className="logo logo-footer"><span className="logo-symbol">A</span><span>ANCHAL<small>INDIA</small></span></Link><p>One Partner. Multiple Trusted Brands.<br/>Complete Automotive Solutions.</p></div>
  <div><h4>Explore</h4>{links.slice(0,4).map(([h,l])=><Link href={h} key={h}>{l}</Link>)}</div>
  <div><h4>Capabilities</h4><Link href="/global-presence">Global Presence</Link><Link href="/products">Parts Finder</Link><Link href="/beyond-automotive">Beyond Automotive</Link></div>
  <div><h4>Contact</h4><a href="tel:+919999029920">+91 99990 29920</a><a href="mailto:info@anchalpiston.com">info@anchalpiston.com</a><p>Ghaziabad, India</p></div>
 </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Anchal India. All rights reserved.</span><span>English <i>·</i> Español (coming soon)</span></div></footer>
}
