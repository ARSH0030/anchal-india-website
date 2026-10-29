"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "closed" | "opening" | "open" | "lift" | "reveal" | "hero";
type PlayerKey = "a" | "b";

export type HarkesProduct = {
  id: string;
  number: number;
  name: string;
  family: string;
  description: string;
  lift: string;
  reveal: string;
  hero: string;
};

export type HarkesBrandExplorerProps = {
  className?: string;
  compact?: boolean;
  brandHref?: string;
  productHref?: (product: HarkesProduct) => string;
  onPhaseChange?: (phase: Phase, product: HarkesProduct | null) => void;
};

const root = "/videos/harkes/";

export const harkesMasterAssets = {
  closed: `${root}HARKES BOX BASE.mp4`,
  opening: `${root}HARKES BOX OPENING.mp4`,
  open: `${root}HARKES BOX LOOP.mp4`,
} as const;

export const harkesProducts: HarkesProduct[] = [
  { id: "chain-sprocket-kit", number: 1, name: "Chain Sprocket Kit", family: "Transmission", description: "Matched chain and sprocket sets developed for dependable power transfer and durable everyday performance.", lift: `${root}CHIAN SPROCKET LIFT.mp4`, reveal: `${root}CHAIN SPROCKET KIT REVEAL.mp4`, hero: `${root}CHAIN SPROCKET KIT HERO.mp4` },
  { id: "carburetor", number: 2, name: "Carburetor", family: "Fuel System", description: "Application-matched fuel delivery components engineered for reliable response and consistent engine operation.", lift: `${root}CARBURETOR BOX LIFT.mp4`, reveal: `${root}CARBURETOR REVEAL.mp4`, hero: `${root}CARBURETOR HERO.mp4` },
  { id: "shock-absorber", number: 3, name: "Shock Absorber", family: "Suspension", description: "Robust suspension components designed to support controlled handling, comfort and dependable service life.", lift: `${root}SHOCK ABSORBER LIFT.mp4`, reveal: `${root}SHOCKER ABSORBER REVEAL.mp4`, hero: `${root}SHOCK ABSORBER  HERO.mp4` },
  { id: "headlight", number: 4, name: "Headlight", family: "Lighting", description: "Distinctive lighting assemblies selected for clear visibility, accurate fitment and durable performance.", lift: `${root}HEADLIGHT BOX LIFT.mp4`, reveal: `${root}HEADLIGHT REVEAL.mp4`, hero: `${root}HEADLIGHT HERO.mp4` },
  { id: "battery", number: 5, name: "Battery", family: "Electrical", description: "Reliable starting power and stable electrical performance for demanding motorcycle applications.", lift: `${root}BATTERY BOX LIFT.mp4`, reveal: `${root}BATTERY REVEAL.mp4`, hero: `${root}BATTERY HERO.mp4` },
  { id: "cylinder-block-kit", number: 6, name: "Cylinder Block Kit", family: "Engine", description: "Precision-matched cylinder components designed for dependable compression, fit and engine rebuilding.", lift: `${root}CYLINDER BLOCK KIT LIFT.mp4`, reveal: `${root}CYLINDER BLOCK KIT REVEAL.mp4`, hero: `${root}CYLINDER BLOCK KIT HERO.mp4` },
];

function warmVideo(src: string) {
  const video = document.createElement("video");
  video.preload = "metadata";
  video.muted = true;
  video.src = src;
}

export function HarkesBrandExplorer({
  className = "",
  compact = false,
  brandHref = "/brand-network#own-brands",
  productHref = (product) => `/products?category=${product.id}`,
  onPhaseChange,
}: HarkesBrandExplorerProps) {
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const frontRef = useRef<PlayerKey>("a");
  const requestRef = useRef(0);
  const [front, setFront] = useState<PlayerKey>("a");
  const [phase, setPhase] = useState<Phase>("closed");
  const [active, setActive] = useState<HarkesProduct | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("Click to open");

  const player = useCallback((key: PlayerKey) => key === "a" ? videoA.current : videoB.current, []);

  useEffect(() => {
    [harkesMasterAssets.opening, harkesMasterAssets.open, ...harkesProducts.flatMap((product) => [product.lift, product.reveal, product.hero])].forEach(warmVideo);
  }, []);

  useEffect(() => {
    onPhaseChange?.(phase, active);
  }, [active, onPhaseChange, phase]);

  const transitionTo = useCallback((
    src: string,
    nextPhase: Phase,
    options: { loop?: boolean; label?: string; freezeFinal?: boolean } = {},
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
      }, 560);
    };

    if (incoming.readyState >= 3) reveal();
    else incoming.addEventListener("canplay", reveal, { once: true });
  }, [player]);

  const openPresentation = () => {
    if (phase === "closed" && !busy) {
      transitionTo(harkesMasterAssets.opening, "opening", { label: "Opening HARKES" });
    }
  };

  const selectProduct = (product: HarkesProduct) => {
    if (busy || phase === "closed" || phase === "opening") return;
    setActive(product);
    transitionTo(product.lift, "lift", { label: `${product.name} selected` });
  };

  const backToProducts = () => {
    if (busy) return;
    setActive(null);
    transitionTo(harkesMasterAssets.open, "open", { loop: true, label: "Choose a numbered product" });
  };

  const resetPresentation = () => {
    if (busy) return;
    setActive(null);
    transitionTo(harkesMasterAssets.closed, "closed", { loop: true, label: "Click to open" });
  };

  const handleEnded = (key: PlayerKey) => {
    if (key !== frontRef.current) return;
    if (phase === "opening") transitionTo(harkesMasterAssets.open, "open", { loop: true, label: "Choose a numbered product" });
    else if (phase === "lift" && active) transitionTo(active.reveal, "reveal", { label: `Revealing ${active.name}` });
    else if (phase === "reveal" && active) transitionTo(active.hero, "hero", { loop: true, label: active.name });
  };

  const controlsVisible = phase !== "closed" && phase !== "opening";

  const interaction = <div className={`harkes-stage phase-${phase} ${busy ? "is-busy" : ""}`}>
    <button type="button" className="harkes-video-button" onClick={phase === "closed" ? openPresentation : undefined} aria-label={phase === "closed" ? "Open the HARKES presentation box" : "HARKES interactive product presentation"}>
      <video ref={videoA} className={front === "a" ? "harkes-video is-front" : "harkes-video"} src={harkesMasterAssets.closed} autoPlay loop muted playsInline preload="auto" onEnded={() => handleEnded("a")}/>
      <video ref={videoB} className={front === "b" ? "harkes-video is-front" : "harkes-video"} muted playsInline preload="auto" onEnded={() => handleEnded("b")}/>
      <i className="harkes-transition-mask" aria-hidden="true"/>
      <span className="harkes-status"><i/>{status}</span>
    </button>
    {controlsVisible && <nav className="harkes-product-rail" aria-label="HARKES product families">{harkesProducts.map((product) => <button key={product.id} type="button" className={active?.id === product.id ? "is-active" : ""} onClick={() => selectProduct(product)} disabled={busy} aria-pressed={active?.id === product.id}><b>{product.number}</b><span>{product.name}</span></button>)}</nav>}
    {active && <aside className="harkes-product-detail" aria-live="polite"><button type="button" className="harkes-back" onClick={backToProducts} disabled={busy}>← All products</button><div><p>HARKES · {active.family}</p><h3>{active.name}</h3></div><span>{active.description}</span><Link href={productHref(active)}>Explore <i>↗</i></Link></aside>}
    {controlsVisible && <button type="button" className="harkes-close" onClick={resetPresentation} disabled={busy}>Close box</button>}
  </div>;

  if (compact) return <article className={`owned-brand-card owned-brand-harkes-interactive ${className}`.trim()} aria-labelledby="harkes-card-title"><div className="owned-brand-label"><span>02</span><b id="harkes-card-title">HARKES</b><small>Built for dependable mobility.</small></div>{interaction}</article>;

  return <section className={`harkes-explorer ${className}`.trim()} aria-labelledby="harkes-explorer-title">
    <div className="harkes-explorer-shell">
      <header className="harkes-explorer-heading">
        <div>
          <p>HARKES · OWNED BY ANCHAL INDIA</p>
          <h2 id="harkes-explorer-title">Engineered for<br/><em>dependable mobility.</em></h2>
        </div>
        <span>Open the presentation, then choose a numbered product family to see its HARKES reveal.</span>
      </header>

      {interaction}

      <footer className="harkes-explorer-footer">
        <span>Precision · Performance · Trust</span>
        <Link href={brandHref}>Discover HARKES <i>↗</i></Link>
      </footer>
    </div>
  </section>;
}
