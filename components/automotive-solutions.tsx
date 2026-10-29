"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const systems = [
  { id: "base", label: "Complete solutions", file: "base.mp4", copy: "One coordinated portfolio across the systems that keep motorcycles and three-wheelers moving.", parts: ["Motorcycle applications", "Three-wheeler applications", "Multi-brand supply", "Export support"], point: [50, 50] },
  { id: "engine", label: "Engine & Powertrain", file: "engine.mp4", copy: "Precision components selected around vehicle application, operating conditions and dependable performance.", parts: ["Pistons & rings", "Cylinder kits", "Connecting rods", "Crankshafts", "Valves", "Oil pumps"], point: [43, 57] },
  { id: "transmission", label: "Transmission", file: "transmission.mp4", copy: "Matched clutch, gear and final-drive components that transfer power efficiently to the road.", parts: ["Clutch plates", "Clutch assemblies", "Gear sets", "Transmission shafts", "Chains & sprockets"], point: [54, 60] },
  { id: "brakes", label: "Braking", file: "brakes.mp4", copy: "Friction and control products supporting consistent stopping performance across applications.", parts: ["Brake shoes", "Disc pads", "Brake discs", "Calipers", "Master cylinders", "Brake cables"], point: [29, 68] },
  { id: "suspension", label: "Suspension & Steering", file: "suspension.mp4", copy: "Ride-control components designed to manage road forces, stability and rider comfort.", parts: ["Front forks", "Fork seals", "Rear shocks", "Steering cone sets", "Swingarms", "Bushes"], point: [24, 42] },
  { id: "electrical", label: "Electrical & Electronics", file: "electrical.mp4", copy: "Starting, charging and control systems that keep modern vehicles reliable and responsive.", parts: ["Batteries", "Wiring harnesses", "CDI / ECU", "Ignition coils", "Regulators", "Relays & sensors"], point: [61, 35] },
  { id: "lighting", label: "Lighting", file: "lighting.mp4", copy: "Visibility and signalling solutions for safe operation in every market and condition.", parts: ["Headlamps", "Indicators", "Tail lamps", "Bulbs & LED units", "Switches", "Reflectors"], point: [72, 44] },
  { id: "filters", label: "Filters", file: "filters.mp4", copy: "Routine service products that help protect performance throughout the vehicle lifecycle.", parts: ["Air filters", "Oil filters", "Fuel filters", "Strainers", "Filter housings"], point: [67, 59] },
  { id: "cables", label: "Cables & Controls", file: "cables.mp4", copy: "Mechanical control interfaces that connect the rider to every essential vehicle function.", parts: ["Throttle cables", "Clutch cables", "Brake cables", "Speedometer cables", "Levers", "Handlebar switches"], point: [37, 38] },
] as const;

const videoRoot = "/videos/automotive-solutions/";

export function HomeAutomotiveSolutions() {
  const player = useRef<HTMLVideoElement>(null);
  const hotspots = useRef<HTMLDivElement>(null);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  useEffect(() => {
    const video = player.current;
    if (!video) return;
    video.muted = true;
    const start = () => void video.play().catch(() => undefined);
    start();
    video.addEventListener("canplay", start);
    return () => video.removeEventListener("canplay", start);
  }, []);

  useEffect(() => {
    const dismissDescription = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest(".asu-home-hotspots button")) setSelectedSystem(null);
    };

    document.addEventListener("pointerdown", dismissDescription);
    return () => document.removeEventListener("pointerdown", dismissDescription);
  }, []);

  return (
    <section className="asu-home" aria-labelledby="asu-home-title">
      <header className="asu-home-heading">
        <div>
          <p className="asu-kicker">AUTOMOTIVE SOLUTIONS</p>
          <h2 id="asu-home-title">A complete product range.<br /><em>Built around the vehicle.</em></h2>
        </div>
        <p>Explore our product lines across the essential systems of motorcycles and three-wheelers.</p>
      </header>

      <div className="asu-home-stage">
        <video ref={player} className="asu-video front" src={videoRoot + systems[0].file} autoPlay muted playsInline loop preload="auto" onCanPlay={(event) => void event.currentTarget.play().catch(() => undefined)} />
        <div className="asu-vignette" />
        <div ref={hotspots} className="asu-home-hotspots" aria-label="Explore automotive systems">
          {systems.slice(1).map((system) => (
            <button
              key={system.id}
              style={{ left: `${system.point[0]}%`, top: `${system.point[1]}%` }}
              className={[
                selectedSystem === system.id ? "selected" : "",
                system.point[0] > 58 ? "tooltip-left" : "",
              ].filter(Boolean).join(" ")}
              onPointerEnter={() => {
                if (selectedSystem !== system.id) setSelectedSystem(null);
              }}
              onClick={() => setSelectedSystem(selectedSystem === system.id ? null : system.id)}
              aria-pressed={selectedSystem === system.id}
              aria-label={`${system.label}: ${system.parts.slice(0, 3).join(", ")}`}
            >
              <i />
              <span><strong>{system.label}</strong><small>{system.parts.slice(0, 3).join(" · ")}</small></span>
            </button>
          ))}
        </div>
      </div>

      <div className="asu-home-action">
        <Link href="/products#automotive-universe">Explore all automotive solutions <span>↗</span></Link>
      </div>
    </section>
  );
}

export function AutomotiveSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const frontPlayer = useRef<"a" | "b">("a");
  const transitionId = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [, setHoveredIndex] = useState<number | null>(null);
  const [front, setFront] = useState<"a" | "b">("a");
  const active = systems[activeIndex];

  useEffect(() => {
    const player = videoA.current;
    if (!player) return;
    player.muted = true;
    player.loop = true;
    const start = () => void player.play().catch(() => undefined);
    start();
    player.addEventListener("canplay", start);
    return () => player.removeEventListener("canplay", start);
  }, []);

  const switchVideo = useCallback((nextIndex: number, userInitiated = false) => {
    if (nextIndex === activeIndex) {
      if (userInitiated && nextIndex !== 0) {
        const current = frontPlayer.current === "a" ? videoA.current : videoB.current;
        if (current) {
          current.loop = false;
          current.currentTime = 0;
          void current.play().catch(() => undefined);
        }
      }
      return;
    }
    const incomingKey = frontPlayer.current === "a" ? "b" : "a";
    const incoming = incomingKey === "a" ? videoA.current : videoB.current;
    const outgoing = frontPlayer.current === "a" ? videoA.current : videoB.current;
    if (!incoming || !outgoing) return;

    const request = ++transitionId.current;
    incoming.src = videoRoot + systems[nextIndex].file;
    incoming.loop = nextIndex === 0;
    incoming.currentTime = 0;
    incoming.load();

    const reveal = () => {
      if (request !== transitionId.current) return;
      void incoming.play().catch(() => undefined);
      frontPlayer.current = incomingKey;
      setFront(incomingKey);
      setActiveIndex(nextIndex);
      window.setTimeout(() => {
        if (request !== transitionId.current) return;
        outgoing.pause();
        outgoing.currentTime = 0;
      }, 520);
    };

    if (incoming.readyState >= 3) reveal();
    else incoming.addEventListener("canplay", reveal, { once: true });
  }, [activeIndex]);

  useEffect(() => {
    const next = systems[(activeIndex + 1) % systems.length];
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "video";
    preload.href = videoRoot + next.file;
    document.head.appendChild(preload);
    return () => preload.remove();
  }, [activeIndex]);

  const select = (index: number) => switchVideo(index, true);
  return (
    <section ref={sectionRef} className="asu-scroll" aria-labelledby="asu-title">
      <div className="asu-sticky">
        <header className="asu-heading">
          <div>
            <p className="asu-kicker">COMPLETE VEHICLE COVERAGE</p>
            <h2 id="asu-title">Understand the machine.<br /><em>Discover the solution.</em></h2>
          </div>
          <p>Explore the systems we support across motorcycles and three-wheelers.</p>
        </header>

        <div className="asu-grid asu-grid-simple">
          <div className="asu-stage">
            <video ref={videoA} className={front === "a" ? "asu-video front" : "asu-video"} src={videoRoot + systems[0].file} autoPlay muted playsInline preload="auto" onCanPlay={(event) => void event.currentTarget.play().catch(() => undefined)} />
            <video ref={videoB} className={front === "b" ? "asu-video front" : "asu-video"} muted playsInline preload="none" onCanPlay={(event) => void event.currentTarget.play().catch(() => undefined)} />
            <div className="asu-vignette" />
            <div className="asu-hotspots" aria-label="Interactive vehicle hotspots">
              {systems.slice(1).map((system, offset) => {
                const index = offset + 1;
                return (
                  <button
                    key={system.id}
                    style={{ left: `${system.point[0]}%`, top: `${system.point[1]}%` }}
                    className={index === activeIndex ? "active" : ""}
                    onClick={() => select(index)}
                    onPointerEnter={() => setHoveredIndex(index)}
                    onPointerLeave={() => setHoveredIndex(null)}
                    aria-label={`Explore ${system.label}`}
                  >
                    <i /><span>{system.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <aside className="asu-panel" key={active.id}>
            <p>ACTIVE SYSTEM</p>
            <h3>{active.label}</h3>
            <span>{active.copy}</span>
            <div className="asu-parts">{active.parts.map((part) => <b key={part}>{part}</b>)}</div>
            <Link href="#finder">Explore products <i>↗</i></Link>
          </aside>
        </div>

        <div className="asu-mobile-tabs" aria-label="Choose a vehicle system">
          {systems.map((system, index) => <button key={system.id} className={index === activeIndex ? "active" : ""} onClick={() => select(index)}>{system.label}</button>)}
        </div>
      </div>
    </section>
  );
}
