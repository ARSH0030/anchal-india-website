import type { Metadata } from "next";
import { CommunicationDock, Footer, Navigation } from "@/components/navigation";
import { PageTransition } from "@/components/page-transition";
import "./globals.css";

export const metadata:Metadata={
 metadataBase:new URL("https://anchalindia.com"),
 title:{default:"Anchal India | Complete Automotive Solutions",template:"%s | Anchal India"},
 description:"A global automotive solutions company combining own brands, trusted relationships, application expertise and international supply capability.",
 keywords:["automotive components exporter India","motorcycle spare parts","two wheeler parts","three wheeler parts","Anchal India","Ailyn","Harkes"],
 openGraph:{title:"Anchal India",description:"Your One Trusted Partner for Complete Automotive Solutions.",type:"website",locale:"en_IN"},
 robots:{index:true,follow:true},icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body><Navigation/><main><PageTransition>{children}</PageTransition></main><Footer/><CommunicationDock/></body></html>
}
