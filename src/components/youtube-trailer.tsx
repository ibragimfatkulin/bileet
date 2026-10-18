"use client";

import { useState } from "react";

function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

type YoutubeTrailerProps = {
  videoId: string;
  title: string;
  posterSrc?: string;
  className?: string;
  /** Сразу показать плеер (страница фильма). */
  startActive?: boolean;
  aspect?: "video" | "poster";
};

export function YoutubeTrailer({
  videoId,
  title,
  posterSrc,
  className = "",
  startActive = false,
  aspect = "video",
}: YoutubeTrailerProps) {
  const [active, setActive] = useState(startActive);
  const thumb = posterSrc ?? youtubeThumb(videoId);
  const aspectClass = aspect === "poster" ? "aspect-[2/3]" : "aspect-video";

  if (!active) {
    return (
      <button
        type="button"
        onClick={() => setActive(true)}
        className={`group relative w-full overflow-hidden bg-neutral-900 ${aspectClass} ${className}`}
        aria-label={`Смотреть трейлер: ${title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
        />
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/35 transition group-hover:bg-black/45">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-white shadow-lg">
            ▶
          </span>
          <span className="rounded bg-black/50 px-3 py-1 text-sm text-white">Трейлер на YouTube</span>
        </span>
      </button>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden bg-black ${aspectClass} ${className}`}>
      <iframe
        title={`Трейлер: ${title}`}
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white hover:bg-black"
      >
        Открыть на YouTube ↗
      </a>
    </div>
  );
}
