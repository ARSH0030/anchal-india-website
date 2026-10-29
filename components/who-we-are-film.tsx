"use client";

import { useEffect, useRef, useState } from "react";

export function WhoWeAreFilm() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = player.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const start = () => {
      setReady(true);
      void video.play().catch(() => undefined);
    };
    if (video.readyState >= 2) start();
    video.addEventListener("loadeddata", start);
    video.addEventListener("canplay", start);
    return () => {
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("canplay", start);
    };
  }, []);

  return (
    <figure className={`who-film ${ready ? "is-ready" : ""} ${failed ? "has-failed" : ""}`}>
      <div className="who-film-placeholder" aria-hidden="true">
        <span />
        <b>{failed ? "Behind every shipment is a team." : "Preparing our story"}</b>
      </div>
      {!failed && (
        <video
          ref={player}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Anchal India team coordinating automotive export operations"
          onLoadedData={() => setReady(true)}
          onCanPlay={(event) => {
            setReady(true);
            void event.currentTarget.play().catch(() => undefined);
          }}
          onError={() => setFailed(true)}
        >
          <source src="/who-we-are-video.mp4" type="video/mp4" />
        </video>
      )}
      <figcaption>
        <span>Built from component knowledge</span>
        <strong>Growing with every market we serve.</strong>
      </figcaption>
    </figure>
  );
}
