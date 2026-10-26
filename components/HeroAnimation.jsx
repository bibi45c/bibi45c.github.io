"use client";

import { useEffect, useState } from "react";

const texts = ["<DataEngineering/>", "<AISystems/>"];

// Typewriter: 80ms per character typed, 40ms deleted, 2.4s hold. Static text when reduced motion is requested.
export default function HeroAnimation() {
  const [text, setText] = useState(texts[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    let length = texts[0].length;
    let mode = "deleting";
    let timer;

    function type() {
      const current = texts[index];
      if (mode === "typing" && length < current.length) {
        length++;
        setText(current.slice(0, length));
        timer = setTimeout(type, 80);
      } else if (mode === "deleting" && length > 0) {
        length--;
        setText(current.slice(0, length));
        timer = setTimeout(type, 40);
      } else if (mode === "typing") {
        mode = "deleting";
        timer = setTimeout(type, 2400);
      } else {
        index = (index + 1) % texts.length;
        mode = "typing";
        timer = setTimeout(type, 400);
      }
    }

    timer = setTimeout(type, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="mt-3.5 min-h-[1.4em] font-mono text-18 text-muted-foreground sm:text-24">
      <span className="sr-only">{texts.join(" ")}</span>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  );
}
