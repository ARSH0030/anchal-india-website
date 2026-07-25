import type { Metadata } from "next";
import { CommunicationDock, Footer, Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata:Metadata={
 metadataBase:new URL("https://anchalindia.com"),
 title:{default:"Anchal India | Complete Automotive Solutions",template:"%s | Anchal India"},
 description:"A global automotive solutions company combining own brands, trusted partner brands, application expertise and international supply capability.",
 keywords:["automotive components exporter India","motorcycle spare parts Latin America","two wheeler parts","three wheeler parts","Anchal India","Ailyn","Harkes"],
 openGraph:{title:"Anchal India",description:"Your One Trusted Partner for Complete Automotive Solutions.",type:"website",locale:"en_IN"},
 robots:{index:true,follow:true},
 icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body><Navigation/><main>{children}</main><Footer/><CommunicationDock/></body></html>
}
