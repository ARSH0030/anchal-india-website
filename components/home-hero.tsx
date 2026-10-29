"use client";

import Link from "next/link";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

const REVEAL_AT_SECONDS = 1;

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLeftHero = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        hasLeftHero.current = true;
        return;
      }
      if (hasLeftHero.current) {
        hasLeftHero.current = false;
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      }
    }, { threshold: 0.35 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  function reveal() {
    if (revealed) return;
    setRevealed(true);
    window.dispatchEvent(new Event("home-hero-reveal"));
  }

  function handleTimeUpdate(event: SyntheticEvent<HTMLVideoElement>) {
    const video = event.currentTarget;
    if (video.currentTime >= REVEAL_AT_SECONDS) reveal();
  }

  function holdFinalFrame() {
    const video = videoRef.current;
    reveal();
    if (!video || !Number.isFinite(video.duration)) return;
    setResetting(true);
    window.setTimeout(() => {
      video.currentTime = 0;
      video.pause();
      window.setTimeout(() => setResetting(false), 90);
    }, 650);
  }

  return (
    <section ref={heroRef} className={revealed ? "home-hero is-revealed" : "home-hero"}>
      <video
        ref={videoRef}
        className={resetting ? "hero-video is-resetting" : "hero-video"}
        src="/hero-home-page.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={holdFinalFrame}
        aria-hidden="true"
      />
      <div className="hero-shade"/>
      <div className="shell hero-content">
        <p className="hero-kicker">GLOBAL AUTOMOTIVE SOLUTIONS · SINCE 2006</p>
        <h1>Your one trusted partner <em>for complete automotive solutions.</em></h1>
        <p>Application expertise and a trusted automotive network—delivering complete solutions from India to businesses worldwide.</p>
        <div className="hero-actions"><Link href="/products" className="action-button">Explore products <span>→</span></Link><Link href="/contact" className="text-action">Talk to our team <span>→</span></Link></div>
        <div className="hero-stats" aria-label="Anchal India at a glance">
          <div><i aria-hidden="true">◎</i><b>30+</b><span>Countries<br/>Worldwide</span></div>
          <div><i aria-hidden="true">◇</i><b>Extensive range</b><span>Solutions for<br/>Every Part</span></div>
          <div><i aria-hidden="true">♢</i><b>30+</b><span>Years of<br/>Experience</span></div>
        </div>
      </div>
    </section>
  );
}
