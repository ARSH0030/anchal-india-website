"use client";
import { usePathname } from "next/navigation";
export function PageTransition({children}:{children:React.ReactNode}){
 const path=usePathname();
 return <div key={path} className="route-shell"><div className="route-curtain" aria-hidden="true"><span className="tuktuk">🛺</span><i/></div><div className="page-transition">{children}</div></div>;
}
