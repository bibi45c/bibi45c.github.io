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
        if (!response.ok) throw new Error("GoatCounter count unavailable");
        return response.json();
      })
      .then((data) => setCount(data.count))
      .catch(() => setCount(null));

    return () => controller.abort();
  }, [path]);

  if (!code || count === null) return null;

  return <span>{prefix}{label}: {count}</span>;
}
