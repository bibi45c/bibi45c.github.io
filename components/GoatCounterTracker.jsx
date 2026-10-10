"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const code = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;

export default function GoatCounterTracker() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const lastPath = useRef(null);

  useEffect(() => {
    if (!ready || !pathname || !window.goatcounter?.count) return;

    const path = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
    if (lastPath.current === path) return;

    window.goatcounter.count({ path, no_session: true });
    lastPath.current = path;
  }, [pathname, ready]);

  if (!code) return null;

  return (
    <Script
      src="https://gc.zgo.at/count.js"
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      data-goatcounter-settings='{"no_onload":true}'
      strategy="afterInteractive"
      onLoad={() => setReady(true)}
    />
  );
}
