"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const aboutLinks=[["/about","Company & Story"],["/global-presence","Global Presence"],["/credentials","Credentials"],["/beyond-automotive","Beyond Automotive"]];
const productLinks=[["/products","Parts Finder"],["/brands","Our Brands"],["/brand-network","Brand Network"]];

export function Navigation(){
 const [open,setOpen]=useState(false); const path=usePathname();
 return <header className="nav"><div className="container nav-inner">
  <Link href="/" className="logo" aria-label="Anchal India home"><span className="logo-symbol">A</span><span>ANCHAL<small>INDIA</small></span></Link>
  <nav className={open?"nav-links open":"nav-links"} aria-label="Main navigation">
   <Link className={path==="/"?"active":""} onClick={()=>setOpen(false)} href="/">Home</Link>
   <div className="nav-group"><Link className={aboutLinks.some(([h])=>h===path)?"active":""} href="/about">About Us</Link><div className="mega-menu">{aboutLinks.map(([h,l])=><Link onClick={()=>setOpen(false)} href={h} key={h}>{l}<span>→</span></Link>)}</div></div>
   <div className="nav-group"><Link className={productLinks.some(([h])=>h===path)?"active":""} href="/products">Products</Link><div className="mega-menu">{productLinks.map(([h,l])=><Link onClick={()=>setOpen(false)} href={h} key={h}>{l}<span>→</span></Link>)}</div></div>
   <Link className={path==="/contact"?"active":""} onClick={()=>setOpen(false)} href="/contact">Contact</Link>
   <Link className="nav-rfq" onClick={()=>setOpen(false)} href="/contact">RFQ <span>↗</span></Link>
  </nav>
  <button className="menu-button" aria-expanded={open} aria-label="Toggle menu" onClick={()=>setOpen(!open)}><span/><span/></button>
 </div></header>
}

export function Footer(){
 return <footer><div className="container footer-top">
  <div><Link href="/" className="logo logo-footer"><span className="logo-symbol">A</span><span>ANCHAL<small>INDIA</small></span></Link><p>One Partner. Multiple Trusted Brands.<br/>Complete Automotive Solutions.</p></div>
  <div><h4>Explore</h4><Link href="/about">About Us</Link><Link href="/products">Products</Link><Link href="/brands">Our Brands</Link><Link href="/brand-network">Brand Network</Link></div>
  <div><h4>Capabilities</h4><Link href="/global-presence">Global Presence</Link><Link href="/products">Parts Finder</Link><Link href="/beyond-automotive">Beyond Automotive</Link></div>
  <div><h4>Contact</h4><a href="tel:+919999029920">+91 99990 29920</a><a href="mailto:info@anchalpiston.com">info@anchalpiston.com</a><p>Ghaziabad, India</p></div>
 </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Anchal India. All rights reserved.</span><span>English <i>·</i> Español (coming soon)</span></div></footer>
}
