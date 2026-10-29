"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { globalMarkets, indiaHub, type GlobalMarket } from "@/data/global-markets";

function routePath(market: GlobalMarket) {
  const middleX = (indiaHub.x + market.x) / 2;
  const distance = Math.abs(indiaHub.x - market.x);
  const middleY = Math.min(indiaHub.y, market.y) - Math.min(82, distance * 0.19);
  return `M ${indiaHub.x} ${indiaHub.y} Q ${middleX} ${middleY} ${market.x} ${market.y}`;
}

export function InteractiveGlobalMap({ compact = false }: { compact?: boolean }) {
  type RegionId = "latin-america" | "west-asia" | "philippines";
  const [stage, setStage] = useState<"rest" | "journey" | "destination">("rest");
  const [region, setRegion] = useState<RegionId>("latin-america");
  const [hovered, setHovered] = useState(false);
  const compactCanvas = useRef<HTMLDivElement>(null);

  function moveCompactMap(event: MouseEvent<HTMLDivElement>) {
    const canvas = compactCanvas.current;
    if (!canvas) return;
    const bounds = canvas.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    canvas.style.setProperty("--map-rotate-x", `${(-y * 7).toFixed(2)}deg`);
    canvas.style.setProperty("--map-rotate-y", `${(x * 9).toFixed(2)}deg`);
    canvas.style.setProperty("--map-shift-x", `${(x * 10).toFixed(2)}px`);
    canvas.style.setProperty("--map-shift-y", `${(y * 7).toFixed(2)}px`);
  }

  function resetCompactMap() {
    const canvas = compactCanvas.current;
    if (!canvas) return;
    canvas.style.setProperty("--map-rotate-x", "0deg");
    canvas.style.setProperty("--map-rotate-y", "0deg");
    canvas.style.setProperty("--map-shift-x", "0px");
    canvas.style.setProperty("--map-shift-y", "0px");
  }

  useEffect(() => {
    if (stage !== "journey" || region === "latin-america") return;
    const timer = window.setTimeout(() => setStage("destination"), 3100);
    return () => window.clearTimeout(timer);
  }, [stage, region]);

  if (compact) return <Link className="global-map-experience global-map-home-link" href="/global-presence" aria-label="Explore Anchal India’s global presence">
    <div ref={compactCanvas} className="global-map-canvas global-map-compact" onMouseMove={moveCompactMap} onMouseLeave={resetCompactMap}>
      <div className="global-map-depth-scene">
      <img className="global-map-land global-map-land-shadow" src="/world-map-dark-orange.svg?v=1" alt="" aria-hidden="true" />
      <img className="global-map-land" src="/world-map-dark-orange.svg?v=1" alt="World map showing Anchal India’s international network" />
      <svg className="global-map-routes" viewBox="0 0 900 500" aria-hidden="true">
        {globalMarkets.map((market) => <path key={market.id} d={routePath(market)} className={market.type === "supply-node" ? "is-supply" : "is-export"}/>) }
      </svg>
      <span className="global-home-hub" style={{ left: `${indiaHub.x / 9}%`, top: `${indiaHub.y / 5}%` }} aria-hidden="true"><i/></span>
      {globalMarkets.map((market) => <span key={market.id} className={`global-home-market ${market.type === "supply-node" ? "is-supply" : "is-export"} ${market.id === "china" ? "is-china" : ""}`} style={{ left: `${market.x / 9}%`, top: `${market.y / 5}%` }}><i/></span>)}
      </div>
      <span className="global-map-home-cta">Explore global presence <i>↗</i></span>
    </div>
  </Link>;

  const regions = {
    "latin-america": {
      tab: "Latin America & Caribbean",
      scope: "Established markets · Latin America & Caribbean",
      still: "/media/global-presence/globe-latin-america-active.png",
      idle: "/media/global-presence/globe-latin-america-idle.mp4",
      journey: "/media/global-presence/latin-america-caribbean-journey.mp4",
      labels: [
        ["Mexico", 23, 25], ["Guatemala", 29, 32], ["Honduras", 34, 34],
        ["Nicaragua", 36, 38], ["Dominican Republic", 43, 27], ["Haiti", 40, 31],
        ["Colombia", 45, 45], ["Ecuador", 41, 51], ["Peru", 44, 57],
        ["Bolivia", 52, 61], ["Chile", 47, 75], ["Argentina", 56, 77], ["Uruguay", 62, 73],
      ] as readonly (readonly [string, number, number])[],
    },
    "west-asia": {
      tab: "Turkey, Egypt & UAE",
      scope: "Selected markets · Turkey, Egypt & UAE",
      still: "/media/global-presence/globe-west-asia-active.png",
      idle: "/media/global-presence/globe-west-asia-idle.mp4",
      labels: [["Turkey", 45, 27], ["Egypt", 35, 58], ["UAE", 69, 58]] as readonly (readonly [string, number, number])[],
    },
    philippines: {
      tab: "Philippines",
      scope: "Focused market · Philippines",
      still: "/media/global-presence/globe-philippines-active.png",
      idle: "/media/global-presence/globe-philippines-idle.mp4",
      labels: [["Philippines", 55, 50]] as readonly (readonly [string, number, number])[],
    },
  } as const;
  const selected = regions[region];
  const isMoving = stage === "journey";
  const stillSource = stage === "destination"
    ? selected.still
    : hovered
      ? "/media/global-presence/globe-india-active.png"
      : "/media/global-presence/globe-india-resting.png";

  function beginJourney() {
    if (isMoving) return;
    setStage("journey");
  }

  function chooseRegion(id: RegionId) {
    setRegion(id);
    setHovered(false);
    setStage("destination");
  }

  return <div className="global-region-explorer"><section
    className={`global-cinematic-experience is-${stage}`}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    aria-label={`Shipment journey selector from India to ${selected.tab}`}
  >
    {stage !== "journey" && stage === "destination" ? <video
      key={`${region}-idle`}
      className="global-cinematic-media"
      src={selected.idle}
      poster={selected.still}
      autoPlay muted loop playsInline
    /> : !isMoving && <img className="global-cinematic-media" src={stillSource} alt="Premium globe highlighting Anchal India’s international reach" />}
    {stage === "journey" && region === "latin-america" && <video
      key={`${region}-journey`}
      className="global-cinematic-media"
      src="/media/global-presence/latin-america-caribbean-journey.mp4"
      autoPlay muted playsInline
      onEnded={() => setStage("destination")}
    />}
    {stage === "journey" && region !== "latin-america" && <div className={`global-coded-journey is-${region}`} aria-hidden="true">
      <img className="global-cinematic-media" src="/media/global-presence/globe-india-active.png" alt="" />
      <svg viewBox="0 0 1000 562" preserveAspectRatio="none"><path d={region === "west-asia" ? "M 585 245 Q 470 205 345 250" : "M 585 245 Q 735 205 850 285"}/></svg>
      <span className="global-coded-vessel">▰</span>
    </div>}
    <div className="global-cinematic-shade" aria-hidden="true" />
    {stage === "destination" && <div className="global-cinematic-markets" aria-label="Established markets across Latin America and the Caribbean">
      {selected.labels.map(([name, x, y], index) => <span
        key={name}
        className="global-cinematic-market"
        style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${160 + index * 70}ms` }}
      ><i />{name}</span>)}
    </div>}
    {stage !== "destination" && <div className="global-cinematic-copy" aria-live="polite">
      <small>{isMoving ? "SHIPMENT IN TRANSIT" : "ORIGIN · INDIA"}</small>
      <strong>{isMoving ? "Capability in motion" : "Begin the journey"}</strong>
    </div>}
    {stage === "destination" && <span className="global-cinematic-scope">{selected.scope}</span>}
    <button className="global-cinematic-action" type="button" onClick={beginJourney} disabled={isMoving}>
      <span>{isMoving ? "Journey in progress" : stage === "rest" ? "Play Latin America journey" : `Play ${selected.tab} journey`}</span>
      <i>{isMoving ? "···" : "↗"}</i>
    </button>
    <img className="global-cinematic-preload" src="/media/global-presence/globe-india-active.png" alt="" aria-hidden="true" />
    <img className="global-cinematic-preload" src="/media/global-presence/globe-latin-america-active.png" alt="" aria-hidden="true" />
    <img className="global-cinematic-preload" src="/media/global-presence/globe-west-asia-active.png" alt="" aria-hidden="true" />
    <img className="global-cinematic-preload" src="/media/global-presence/globe-philippines-active.png" alt="" aria-hidden="true" />
  </section>
  <nav className="global-destination-chooser" aria-label="Choose a destination region">
    <p><small>Choose a market</small><strong>Explore another destination</strong></p>
    <div>
      {(Object.keys(regions) as RegionId[]).map((id, index) => <button
        key={id}
        type="button"
        className={region === id ? "is-active" : ""}
        aria-pressed={region === id}
        onClick={() => chooseRegion(id)}
      ><small>0{index + 1}</small><span>{regions[id].tab}</span><i>↗</i></button>)}
    </div>
  </nav>
  </div>;
}
