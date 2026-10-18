"use client";

import { useState } from "react";

function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function MoviePoster({
  src,
  alt,
  trailerYoutubeId,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  trailerYoutubeId?: string;
  className?: string;
  priority?: boolean;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center bg-border/40 p-4 text-center text-sm text-muted ${className}`}
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (trailerYoutubeId && currentSrc !== youtubeThumb(trailerYoutubeId)) {
          setCurrentSrc(youtubeThumb(trailerYoutubeId));
        } else {
          setFailed(true);
        }
      }}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
