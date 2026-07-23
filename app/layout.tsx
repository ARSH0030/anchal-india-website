import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer, Navigation } from "@/components/navigation";
import "./globals.css";

const geistSans=Geist({variable:"--font-geist-sans",subsets:["latin"]});
const geistMono=Geist_Mono({variable:"--font-geist-mono",subsets:["latin"]});

export const metadata:Metadata={
 metadataBase:new URL("https://anchal-india.openai.site"),
 title:{default:"Anchal India | Complete Automotive Solutions",template:"%s | Anchal India"},
 description:"Established automotive components organization connecting trusted brands, application knowledge and export consolidation for Latin America.",
 keywords:["automotive components exporter India","motorcycle spare parts Latin America","two wheeler parts","three wheeler parts","Anchal India","Ailyn","Harkes"],
 openGraph:{title:"Anchal India",description:"One Partner. Multiple Trusted Brands. Complete Automotive Solutions.",type:"website",locale:"en_IN"},
 robots:{index:true,follow:true},
 icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"},
 other:{"codex-preview":"development"}
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}><Navigation/><main>{children}</main><Footer/><a className="floating-wa" href="https://wa.me/919999029920" target="_blank" rel="noreferrer" aria-label="Chat with Anchal India on WhatsApp">WA</a></body></html>
}
