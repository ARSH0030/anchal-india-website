import Link from "next/link";
import { ReactNode } from "react";

export function PageHero({eyebrow,title,copy,children}:{eyebrow:string;title:string;copy:string;children?:ReactNode}){
 return <section className="page-hero"><div className="page-grid"/><div className="container"><p className="eyebrow"><span/>{eyebrow}</p><h1>{title}</h1><p>{copy}</p>{children}</div></section>
}
export function Breadcrumb({current}:{current:string}){return <div className="container breadcrumb"><Link href="/">Home</Link><span>/</span><b>{current}</b></div>}
