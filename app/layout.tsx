import type { Metadata } from "next";
import { CommunicationDock, Footer, Navigation } from "@/components/navigation";
import "./globals.css";
import "./atlas.css";

export const metadata:Metadata={
 metadataBase:new URL("https://www.anchalpiston.com"),
 applicationName:"Anchal India",
 title:{default:"Anchal India | Complete Automotive Solutions",template:"%s | Anchal India"},
 description:"A global automotive solutions company combining own brands, trusted partner brands, application expertise and international supply capability.",
 keywords:["automotive components exporter India","motorcycle spare parts Latin America","two wheeler parts","three wheeler parts","Anchal India","Ailyn","Harkes"],
 alternates:{canonical:"/"},
 openGraph:{title:"Anchal India",description:"Your One Trusted Partner for Complete Automotive Solutions.",type:"website",locale:"en_IN",url:"/",siteName:"Anchal India"},
 twitter:{card:"summary_large_image",title:"Anchal India",description:"Your One Trusted Partner for Complete Automotive Solutions."},
 robots:{index:true,follow:true},
 icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}
};

const organizationJsonLd={
 "@context":"https://schema.org",
 "@type":"Organization",
 name:"Anchal India",
 url:"https://www.anchalpiston.com",
 email:"info@anchalpiston.com",
 telephone:"+91 99990 29920",
 foundingDate:"2006",
 address:{"@type":"PostalAddress",streetAddress:"189 Phase-1, Radhey Shyam Vihar",addressLocality:"Muradnagar",addressRegion:"Uttar Pradesh",postalCode:"201206",addressCountry:"IN"}
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationJsonLd).replaceAll("<","\\u003c")}}/><Navigation/><main>{children}</main><Footer/><CommunicationDock/></body></html>
}
