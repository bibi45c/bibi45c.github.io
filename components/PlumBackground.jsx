"use client";

import { useEffect, useRef } from "react";

const R15 = Math.PI / 12;
const LENGTH = 6;
const MIN_BRANCH = 30;
const MAX_NODES = 6000;
const INTERVAL = 1000 / 40;

// Faint branches that grow in from the four edges of the viewport, then stop.
// A fixed seed draws the same shape on every load; with reduced motion the finished drawing is shown at once.
export default function PlumBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tint = getComputedStyle(document.documentElement).getPropertyValue("--tint").trim() || "185 40% 92%";
    let width = 0;
    let height = 0;
    let seed = 1;
    let steps = [];
    let nodes = 0;
    let frame = 0;
    let last = 0;

    function random() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }

    function step(x, y, angle, branch) {
      const length = random() * LENGTH;
      const nx = x + length * Math.cos(angle);
      const ny = y + length * Math.sin(angle);
      branch.count++;
      nodes++;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      if (nodes > MAX_NODES || nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100) return;
      const left = angle + random() * R15;
      const right = angle - random() * R15;
      const rate = branch.count <= MIN_BRANCH ? 0.8 : 0.5;
      if (random() < rate) steps.push(() => step(nx, ny, left, branch));
      if (random() < rate) steps.push(() => step(nx, ny, right, branch));
    }

    function tick(time) {
      frame = requestAnimationFrame(tick);
      if (time - last < INTERVAL) return;
      last = time;
      const previous = steps;
      steps = [];
      if (!previous.length) {
        cancelAnimationFrame(frame);
        return;
      }
      previous.forEach((fn) => (random() < 0.5 ? steps.push(fn) : fn()));
    }

    function start() {
      cancelAnimationFrame(frame);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `hsl(${tint} / 0.06)`;
      seed = 45;
      nodes = 0;
      const at = () => 0.15 + random() * 0.7;
      const top = at() * width;
      const bottom = at() * width;
      const left = at() * height;
      const right = at() * height;
      steps = [
        () => step(top, 0, Math.PI / 2, { count: 0 }),
        () => step(bottom, height, -Math.PI / 2, { count: 0 }),
        () => step(0, left, 0, { count: 0 }),
        () => step(width, right, Math.PI, { count: 0 }),
      ];
      if (reduceMotion) {
        while (steps.length) {
          const batch = steps;
          steps = [];
          batch.forEach((fn) => fn());
        }
      } else {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    }

    let lastWidth = 0;
    let lastHeight = 0;
    let timer = 0;
    function maybeRestart() {
      // Ignore small height changes from mobile address bars.
      if (window.innerWidth === lastWidth && Math.abs(window.innerHeight - lastHeight) < 120) return;
      lastWidth = window.innerWidth;
      lastHeight = window.innerHeight;
      start();
    }
    function onResize() {
      clearTimeout(timer);
      timer = setTimeout(maybeRestart, 200);
    }

    window.addEventListener("resize", onResize);
    maybeRestart();
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="plum" aria-hidden="true" />;
}
