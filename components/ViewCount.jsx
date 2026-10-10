"use client";

import { useEffect, useState } from "react";

const code = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;

export default function ViewCount({ path, label, prefix = "" }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (!code) return;

    const controller = new AbortController();
    const url = `https://${code}.goatcounter.com/counter/${encodeURIComponent(path)}.json`;

    fetch(url, { signal: controller.signal })
      .then((response) => {
        // GoatCounter returns a valid zero count with 404 for an unvisited path.
        if (!response.ok && response.status !== 404) {
          throw new Error("GoatCounter count unavailable");
        }
        return response.json();
      })
      .then((data) => {
        if (typeof data.count !== "string" && typeof data.count !== "number") {
          throw new Error("GoatCounter count unavailable");
        }
        setCount(data.count);
      })
      .catch(() => setCount(null));

    return () => controller.abort();
  }, [path]);

  if (!code || count === null) return null;

  return <span>{prefix}{label}: {count}</span>;
}
