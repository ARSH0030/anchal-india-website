"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

type MenuItem={label:string;href:string;children?:readonly (readonly [string,string])[]};
const menus:readonly MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about", children: [
    ["Our Story", "/about#story"], ["Journey", "/about#journey"],
    ["Leadership", "/about#leadership"], ["Global Presence", "/global-presence"],
    ["Brands & Network", "/brand-network"], ["Beyond Automotive", "/beyond-automotive"],
  ]},
  { label: "Products", href: "/products", children: [
    ["Parts Finder", "/products#finder"], ["Find by Code", "/products#code"],
    ["Vehicle Systems", "/products#systems"], ["Brands & Network", "/brand-network"],
  ]},
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const path = usePathname();
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const [transition, setTransition] = useState(false);

  function navigate(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("/") || href.includes("#") || href === path) return;
    e.preventDefault();
    setMobile(false);
    setTransition(true);
    window.setTimeout(() => router.push(href), 620);
    window.setTimeout(() => setTransition(false), 1300);
  }

  return <>
    <header className="nav">
      <div className="shell nav-inner">
        <Link href="/" className="wordmark" onClick={(e) => navigate(e, "/")} aria-label="Anchal India home">
          <span className="wordmark-icon">A</span>
          <span><b>ANCHAL</b><small>INDIA</small></span>
        </Link>
        <nav className={mobile ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
          {menus.map((item) => <div className="nav-item" key={item.href}>
            <Link className={path === item.href ? "active" : ""} href={item.href} onClick={(e) => navigate(e, item.href)}>
              {item.label}{item.children && <span className="chevron">⌄</span>}
            </Link>
            {item.children && <div className="dropdown">
              <div className="dropdown-intro"><small>Explore</small><strong>{item.label}</strong></div>
              <div>{item.children.map(([label, href]) => <Link href={href} key={href} onClick={() => setMobile(false)}>{label}<span>↗</span></Link>)}</div>
            </div>}
          </div>)}
        </nav>
        <button className="menu-toggle" onClick={() => setMobile(!mobile)} aria-expanded={mobile} aria-label="Open navigation"><span/><span/></button>
      </div>
    </header>
    <div className={transition ? "route-transition active" : "route-transition"} aria-hidden="true">
      <div className="transition-road"/>
      <div className="tuktuk"><span className="cab"/><span className="wheel w1"/><span className="wheel w2"/></div>
      <p>FROM INDIA · BUILT FOR THE WORLD</p>
    </div>
  </>;
}

export function CommunicationDock() {
  const [open, setOpen] = useState(false);
  return <div className={open ? "comm-dock open" : "comm-dock"}>
    <div className="comm-options">
      <a href="https://wa.me/919999029920" target="_blank" rel="noreferrer"><b>IN</b><span>India WhatsApp</span></a>
      <a href="https://wa.me/573245683477" target="_blank" rel="noreferrer"><b>CO</b><span>Latin America</span></a>
      <button disabled title="Coming soon"><b>◎</b><span>Instagram · Soon</span></button>
      <button disabled title="Coming soon"><b>f</b><span>Facebook · Soon</span></button>
    </div>
    <button className="comm-trigger" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "×" : "＋"}<span>Connect</span></button>
  </div>;
}

export function Footer() {
  return <footer>
    <div className="shell footer-main">
      <div><Link href="/" className="wordmark footer-mark"><span className="wordmark-icon">A</span><span><b>ANCHAL</b><small>INDIA</small></span></Link>
        <p>Your one trusted partner for complete automotive solutions.</p></div>
      <div><small>EXPLORE</small><Link href="/about">About Us</Link><Link href="/products">Products</Link><Link href="/brand-network">Brands & Network</Link></div>
      <div><small>CONTACT</small><a href="tel:+919999029920">India · +91 99990 29920</a><a href="https://wa.me/573245683477">LATAM · +57 324 5683477</a><a href="mailto:info@anchalpiston.com">info@anchalpiston.com</a></div>
    </div>
    <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Anchal India</span><span>India · Latin America · Worldwide</span></div>
  </footer>;
}
