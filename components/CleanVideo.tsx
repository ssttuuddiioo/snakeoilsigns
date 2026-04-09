"use client";

import { useRef, useState } from "react";

interface CleanVideoProps {
  youtubeId: string;
}

export default function CleanVideo({ youtubeId }: CleanVideoProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  // YouTube embed with no controls, no branding, autoplay, loop, muted
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`;

  function postMessage(data: Record<string, any>) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify(data),
      "https://www.youtube-nocookie.com"
    );
  }

  function toggleMute() {
    if (muted) {
      postMessage({ event: "command", func: "unMute" });
    } else {
      postMessage({ event: "command", func: "mute" });
    }
    setMuted(!muted);
  }

  function togglePlay() {
    if (playing) {
      postMessage({ event: "command", func: "pauseVideo" });
    } else {
      postMessage({ event: "command", func: "playVideo" });
    }
    setPlaying(!playing);
  }

  return (
    <div className="relative w-full overflow-hidden bg-ink group">
      {/* 16:9 aspect ratio container */}
      <div style={{ paddingBottom: "56.25%" }} className="relative">
        <iframe
          ref={iframeRef}
          src={src}
          title="Snake Oil Signs"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ border: 0 }}
        />
      </div>

      {/* Click overlay to pause/play */}
      <button
        onClick={togglePlay}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={playing ? "Pause" : "Play"}
      />

      {/* Pause icon — shows on hover or when paused */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        {playing ? (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="white" fillOpacity={0.7}>
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="white" fillOpacity={0.7}>
            <polygon points="6,4 20,12 6,20" />
          </svg>
        )}
      </div>

      {/* Mute toggle — bottom right */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-ink/50 backdrop-blur-sm text-white/70 hover:text-white transition-colors"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </div>
  );
}
