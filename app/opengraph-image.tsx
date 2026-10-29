import { ImageResponse } from "next/og";

export const alt = "Anchal India — Complete Automotive Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"72px 80px",background:"linear-gradient(125deg,#04152d,#0757c9)",color:"white",fontFamily:"Arial, sans-serif"}}><div style={{display:"flex",alignItems:"center",gap:20}}><div style={{width:68,height:68,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"20px 8px 20px 8px",background:"white",color:"#0757c9",fontSize:38,fontWeight:900}}>A</div><div style={{display:"flex",flexDirection:"column"}}><span style={{fontSize:30,fontWeight:800,letterSpacing:6}}>ANCHAL</span><span style={{fontSize:16,letterSpacing:12,color:"#aed4ff"}}>INDIA</span></div></div><div style={{display:"flex",flexDirection:"column",maxWidth:980}}><span style={{fontSize:74,lineHeight:1.02,fontWeight:800,letterSpacing:-3}}>Complete automotive solutions.</span><span style={{fontSize:30,marginTop:24,color:"#b9d9ff"}}>From India. Built for the world.</span></div></div>, size);
}
