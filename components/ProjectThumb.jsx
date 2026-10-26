"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// The placeholder exists only after the image fails, so it can never show through a loaded (dimmed) preview.
export default function ProjectThumb({ src, alt, title, kind }) {
  const imageRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // An error that fired before hydration has no React handler to report it.
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <span className="relative block aspect-[12/5] overflow-hidden rounded-row border border-line transition-colors [background:linear-gradient(160deg,hsl(var(--tint)/0.06),transparent_70%),hsl(var(--glass-base)/0.5)] group-hover:border-tint/[0.14]">
      {failed ? (
        <span className="absolute inset-0 flex flex-col justify-end gap-0.5 px-4 py-3.5 text-15 font-semibold leading-[1.3] text-foreground" aria-hidden="true">
          {title}
          <small className="font-mono text-11 font-normal uppercase tracking-[0.08em] text-muted-foreground">{kind}</small>
        </span>
      ) : (
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={1440}
          height={900}
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover object-[50%_30%] opacity-[0.82] transition-opacity group-hover:opacity-100"
        />
      )}
    </span>
  );
}
