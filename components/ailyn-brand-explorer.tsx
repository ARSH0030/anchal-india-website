"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HarkesBrandExplorer } from "@/components/harkes-brand-explorer";

type Phase = "closed" | "opening" | "open" | "lift" | "reveal" | "hero";
type PlayerKey = "a" | "b";
type Product = {
  id: string;
  number: number;
  name: string;
  family: string;
  description: string;
  x: number;
  y: number;
  lift: string;
  reveal: string;
  hero: string;
  detailPosition: "left" | "right" | "lower-left" | "lower-right";
};

const root = "/videos/ailyn/";
const master = {
  closed: `${root}AILYN BOX BASE.mp4`,
  opening: `${root}AILYN BOX OPEN.mp4`,
  open: `${root}AILYN BOX LOOP.mp4`,
};

const products: Product[] = [
  { id:"spark-plug",number:1,name:"Spark Plug",family:"Ignition",description:"Consistent ignition and dependable starts for everyday motorcycle applications.",x:31,y:38,lift:`${root}SPARK PLUG BOX LIFT.mp4`,reveal:`${root}SPARKPLUG REVEAL.mp4`,hero:`${root}SPARKPLUG HERO.jpeg`,detailPosition:"lower-right" },
  { id:"brake-shoe",number:2,name:"Brake Shoe",family:"Braking",description:"Confident braking response with dependable friction performance and accurate fit.",x:49,y:36,lift:`${root}BRAKE SHOE BOX LIFT.mp4`,reveal:`${root}BRAKESHOE REVEAL.mp4`,hero:`${root}BRAKESHOE HERO.jpeg`,detailPosition:"lower-left" },
  { id:"connecting-rod",number:3,name:"Connecting Rod",family:"Engine",description:"Precision engine linkage designed for strength, alignment and dependable operation.",x:68,y:39,lift:`${root}CONNECTING ROD BOX LIFT.mp4`,reveal:`${root}CONNECTING ROD REVEAL.mp4`,hero:`${root}CONNECTING ROD HERO.jpeg`,detailPosition:"right" },
  { id:"blinker",number:4,name:"Blinker",family:"Lighting",description:"Clear signalling visibility in a durable, application-matched lighting assembly.",x:32,y:61,lift:`${root}BLINKER BOX LIFT.mp4`,reveal:`${root}BLINKER REVEAL.mp4`,hero:`${root}BLINKER HERO.jpeg`,detailPosition:"left" },
  { id:"tyre",number:5,name:"Tyre",family:"Road Contact",description:"Application-matched tyre solutions supporting grip, stability and everyday durability.",x:50,y:64,lift:`${root}TYRE BOX LIFT.mp4`,reveal:`${root}TYRE REVEAL.mp4`,hero:`${root}TYRE HERO.jpeg`,detailPosition:"right" },
  { id:"filter",number:6,name:"Filter",family:"Filtration",description:"Dependable filtration supporting cleaner circulation and longer component service life.",x:68,y:59,lift:`${root}FILTER BOX LIFT.mp4`,reveal:`${root}FILTERS REVEAL.mp4`,hero:`${root}FILTER HERO.jpeg`,detailPosition:"lower-left" },
];

function warm(src: string) {
  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.src = src;
}

export function AilynBrandExplorer() {
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const frontRef = useRef<PlayerKey>("a");
  const requestRef = useRef(0);
  const [front, setFront] = useState<PlayerKey>("a");
  const [phase, setPhase] = useState<Phase>("closed");
  const [active, setActive] = useState<Product | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("Click the carton to open");

  const player = useCallback((key: PlayerKey) => key === "a" ? videoA.current : videoB.current, []);

  useEffect(() => {
    [master.opening, master.open, ...products.flatMap((product) => [product.lift, product.reveal])].forEach(warm);
  }, []);

  const transitionTo = useCallback((
    src: string,
    nextPhase: Phase,
    options: { loop?: boolean; speed?: number; label?: string; freezeFinal?: boolean } = {},
  ) => {
    const incomingKey: PlayerKey = frontRef.current === "a" ? "b" : "a";
    const incoming = player(incomingKey);
    const outgoing = player(frontRef.current);
    if (!incoming || !outgoing) return;

    const request = ++requestRef.current;
    setBusy(true);
    if (options.label) setStatus(options.label);
    incoming.pause();
    incoming.src = src;
    incoming.loop = options.loop ?? false;
    incoming.playbackRate = options.speed ?? 1;
    incoming.defaultPlaybackRate = options.speed ?? 1;
    incoming.currentTime = 0;
    incoming.load();

    const reveal = () => {
      if (request !== requestRef.current) return;
      if (options.freezeFinal && Number.isFinite(incoming.duration)) {
        incoming.currentTime = Math.max(0, incoming.duration - 0.04);
        incoming.pause();
      } else {
        void incoming.play().catch(() => undefined);
      }
      frontRef.current = incomingKey;
      setFront(incomingKey);
      setPhase(nextPhase);
      window.setTimeout(() => {
        if (request !== requestRef.current) return;
        outgoing.pause();
        outgoing.removeAttribute("src");
        outgoing.load();
        setBusy(false);
      }, 720);
    };
    if (incoming.readyState >= 3) reveal();
    else incoming.addEventListener("canplay", reveal, { once: true });
  }, [player]);

  const openCarton = () => {
    if (phase === "closed" && !busy) transitionTo(master.opening, "opening", { speed: 1.3, label: "Opening AILYN" });
  };

  const selectProduct = (product: Product) => {
    if (phase === "closed" || phase === "opening") return;
    setActive(product);
    transitionTo(product.lift, "lift", { speed: 2.5, label: `${product.name} selected` });
  };

  const backToProducts = () => {
    setActive(null);
    transitionTo(master.open, "open", { loop: true, label: "Choose another product" });
  };

  const resetCarton = () => {
    setActive(null);
    transitionTo(master.closed, "closed", { loop: true, label: "Click the carton to open" });
  };

  const handleEnded = (key: PlayerKey) => {
    if (key !== frontRef.current) return;
    if (phase === "opening") transitionTo(master.open, "open", { loop: true, label: "Choose a numbered product" });
    else if (phase === "lift" && active) transitionTo(active.reveal, "reveal", { speed: 2.5, label: `Revealing ${active.name}` });
    else if (phase === "reveal" && active) {
      const current = player(frontRef.current);
      if (current && Number.isFinite(current.duration)) {
        current.currentTime = Math.max(0, current.duration - 0.04);
        current.pause();
      }
      setPhase("hero");
      setStatus(active.name);
      setBusy(false);
    }
    else if (phase === "hero") {
      const current = player(frontRef.current);
      if (current && Number.isFinite(current.duration)) {
        current.currentTime = Math.max(0, current.duration - 0.04);
        current.pause();
      }
      setBusy(false);
    }
  };

  const controlsVisible = phase !== "closed" && phase !== "opening";

  return <section className="ailyn-explorer" aria-labelledby="ailyn-title"><div className="shell">
    <header className="ailyn-heading">
      <div><p>OUR OWN BRANDS</p><h2 id="ailyn-title">Built on quality.<br/><em>Trusted in motion.</em></h2></div>
      <span>Automotive brands shaped by consistent quality, dependable performance and the trust built through long-term relationships across international markets.</span>
    </header>
    <div className="owned-brand-split">
      <article className={`owned-brand-card owned-brand-ailyn phase-${phase} ${busy ? "is-busy" : ""}`}>
        <div className="owned-brand-label"><span>01</span><b>AILYN</b><small>Think Quality. Think AILYN.</small></div>
        <div className="ailyn-stage">
          <button type="button" className="ailyn-video-button" onClick={phase === "closed" ? openCarton : undefined} aria-label={phase === "closed" ? "Open the AILYN carton" : "AILYN interactive product model"}>
            <video ref={videoA} className={front === "a" ? "ailyn-video is-front" : "ailyn-video"} src={master.closed} autoPlay loop muted playsInline preload="auto" onEnded={() => handleEnded("a")}/>
            <video ref={videoB} className={front === "b" ? "ailyn-video is-front" : "ailyn-video"} muted playsInline preload="auto" onEnded={() => handleEnded("b")}/>
            {phase === "hero" && active && <img className="ailyn-hero-image" src={active.hero} alt={`${active.name} product hero`} />}
            <i className="ailyn-transition-mask" aria-hidden="true"/>
            <span className="ailyn-status"><i/>{status}</span>
          </button>
          {controlsVisible && <div className="ailyn-product-map" aria-label="AILYN product boxes">{products.map((product) =>
            <button key={product.id} type="button" style={{left:`${product.x}%`,top:`${product.y}%`}} className={active?.id === product.id ? "is-active" : ""} onClick={() => selectProduct(product)} aria-label={`${product.number}. ${product.name}`}><b>{product.number}</b><span>{product.name}</span></button>
          )}</div>}
          {active && <aside className="ailyn-product-detail ailyn-product-strip" aria-live="polite">
            <button type="button" className="ailyn-strip-back" onClick={backToProducts}>← All products</button>
            <div><p>AILYN · {active.family}</p><h3>{active.name}</h3></div>
            <span>{active.description}</span>
            <Link href={`/products?category=${active.id}`}>Explore <i>↗</i></Link>
          </aside>}
          {controlsVisible && <button type="button" className="ailyn-close-control" onClick={resetCarton}>Close carton</button>}
        </div>
      </article>
      <HarkesBrandExplorer compact />
    </div>
  </div></section>;
}
