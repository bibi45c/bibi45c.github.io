"use client";

import { useEffect, useState } from "react";
import { formatMessage, getMessages } from "@/lib/i18n";

// Each board is its own Pages project on this domain and publishes a snapshot.json next to its page.
// Boards are separate exports, so links are absolute; off the production host (local preview) snapshots are read cross-origin, which GitHub Pages allows.
const ORIGIN = "https://juiceless.cn";

const ANTX = {
  href: `${ORIGIN}/anthropic-ipo-monitor/antx-monitor/`,
  snapshot: "/anthropic-ipo-monitor/antx-monitor/snapshot.json",
  source: "https://github.com/bibi45c/anthropic-ipo-monitor",
  start: 1794981600, // 2026-11-18 14:00 Beijing
  end: 1795010400, // 2026-11-18 22:00 Beijing
  cap: 5e8,
};

const PPOLY = {
  href: `${ORIGIN}/ppoly-lock-monitor/lock-monitor/`,
  snapshot: "/ppoly-lock-monitor/lock-monitor/snapshot.json",
  source: "https://github.com/bibi45c/ppoly-lock-monitor",
  announce: Date.UTC(2026, 11, 24) / 1000, // buyback details announced 12/24 08:00 Beijing
};

// Papertrade runs on a Cloudflare Worker (not Pages); its JSON API allows cross-origin reads.
const PT = {
  href: "https://papertrade-monitor.papertrade-monitor.workers.dev/",
  api: "https://papertrade-monitor.papertrade-monitor.workers.dev/api",
  source: "https://github.com/bibi45c/papertrade-monitor",
};

const dash = "—";

function useSnapshot(path) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const base = location.hostname === "juiceless.cn" ? "" : ORIGIN;
    let alive = true;
    fetch(`${base}${path}?t=${Math.floor(Date.now() / 60000)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setData(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [path]);
  return data;
}

function useJson(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setData(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [url]);
  return data;
}

function useNow() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now() / 1000);
    const id = setInterval(() => setNow(Date.now() / 1000), 30000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function ago(t, seconds) {
  const s = Math.max(0, seconds);
  if (s < 60) return t.boardsAgoNow;
  if (s < 3600) return formatMessage(t.boardsAgoMin, { n: Math.floor(s / 60) });
  if (s < 86400) return formatMessage(t.boardsAgoHour, { n: Math.floor(s / 3600) });
  return formatMessage(t.boardsAgoDay, { n: Math.floor(s / 86400) });
}

function Status({ state, t }) {
  if (!state) return null;
  const live = state === "live";
  const text = { live: t.boardsLive, upcoming: t.boardsUpcoming, ended: t.boardsEnded }[state];
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-12 ${live ? "text-accent" : "text-faint"}`}>
      <span className="relative flex size-1.5" aria-hidden="true">
        {live && <span className="absolute inline-flex size-full rounded-pill bg-accent opacity-60 motion-safe:animate-ping" />}
        <span className={`relative inline-flex size-1.5 rounded-pill ${live ? "bg-accent" : "bg-tint/30"}`} />
      </span>
      {text}
    </span>
  );
}

// Line chart; x and y are scaled into a fixed viewBox that stretches to the card width.
// Cumulative series start from zero; `fitY` scales between the series' own min and max instead.
function Spark({ points, xMax, label, fitY = false }) {
  const W = 300;
  const H = 56;
  if (!points || points.length < 2) return <div className="h-14" aria-hidden="true" />;
  const x0 = points[0][0];
  const span = Math.max(1, (xMax ?? points[points.length - 1][0]) - x0);
  const ys = points.map((p) => p[1]);
  const yMin = fitY ? Math.min(...ys) : 0;
  const yMax = Math.max(...ys);
  const ySpan = yMax - yMin || 1;
  const xy = points.map(([x, y]) => [((x - x0) / span) * W, H - 3 - ((y - yMin) / ySpan) * (H - 8)]);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");
  const last = xy[xy.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-14 w-full overflow-visible" role="img" aria-label={label}>
      <path d={`${line}L${last[0].toFixed(1)},${H}L0,${H}Z`} fill="hsl(var(--accent) / 0.1)" />
      <path d={line} fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <line x1="0" x2={W} y1={H - 0.5} y2={H - 0.5} stroke="var(--line)" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Board({ t, href, source, kind, title, summary, state, metrics, spark, generatedAt, now }) {
  return (
    <article className="glass group relative flex flex-col rounded-card p-5 transition-shadow duration-slow hover:glass-lift sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="label">{kind}</span>
        <Status state={state} t={t} />
      </div>
      <h2 className="mt-3 text-20 font-semibold text-strong">
        <a href={href} className="outline-none after:absolute after:inset-0 after:rounded-card focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[hsl(var(--accent))]">
          {title}
        </a>
      </h2>
      <p className="mt-2 text-14 leading-[1.6] text-muted-foreground [&:lang(zh)]:leading-[1.75]">{summary}</p>
      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
        {metrics.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="truncate text-12 text-muted-foreground">{label}</dt>
            <dd className="mt-1 truncate font-mono text-17 tabular-nums text-strong">
              {value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-4">{spark}</div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 whitespace-nowrap font-mono text-12 text-muted-foreground">
        <span className="text-faint">{generatedAt && now ? formatMessage(t.boardsSnapshot, { ago: ago(t, now - generatedAt) }) : t.boardsLoading}</span>
        <span className="flex items-center gap-4">
          <a href={source} target="_blank" rel="noreferrer" className="relative z-[1] transition-colors hover:text-strong">
            {t.boardsSource}
          </a>
          <span className="text-foreground transition-colors group-hover:text-strong">
            {t.boardsOpen} <span aria-hidden="true">→</span>
          </span>
        </span>
      </div>
    </article>
  );
}

function money(locale, v) {
  return locale === "zh" ? `${(v / 1e8).toFixed(2)} 亿` : `${(v / 1e6).toFixed(1)}M`;
}

function usd(locale, v) {
  if (locale === "zh") return v >= 1e8 ? `$${(v / 1e8).toFixed(2)} 亿` : `$${Math.round(v / 1e4).toLocaleString("zh-CN")} 万`;
  return `$${(v / 1e6).toFixed(1)}M`;
}

export default function LiveBoards({ locale = "en" }) {
  const t = getMessages(locale);
  const now = useNow();
  const antx = useSnapshot(ANTX.snapshot);
  const ppoly = useSnapshot(PPOLY.snapshot);
  const num = (v, d = 0) => v.toLocaleString(locale === "zh" ? "zh-CN" : "en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  const antxState = now == null ? null : now < ANTX.start ? "upcoming" : now < ANTX.end ? "live" : "ended";
  let antxCurve = null;
  if (antx?.min?.length) {
    let sum = 0;
    antxCurve = [[0, 0], ...[...antx.min].sort((a, b) => a[0] - b[0]).map(([m, v]) => [m + 1, (sum += v)])];
    // The data is current up to the snapshot time, so the curve runs flat to it (capped at the window close).
    const upTo = (Math.min(antx.generatedAt ?? 0, ANTX.end) - ANTX.start) / 60;
    if (upTo > antxCurve[antxCurve.length - 1][0]) antxCurve.push([upTo, sum]);
  }

  const locks = ppoly?.locks ?? [];
  let ppolyCurve = null;
  if (locks.length) {
    let sum = 0;
    const sorted = [...locks].sort((a, b) => a[5] - b[5]);
    ppolyCurve = [[sorted[0][5], 0], ...sorted.map((l) => [l[5], (sum += Number(l[3]))])];
    if (now) ppolyCurve.push([now, sum]);
  }
  const days = now == null ? null : Math.max(0, Math.ceil((PPOLY.announce - now) / 86400));

  const pt = useJson(`${PT.api}/latest`)?.snapshot ?? null;
  const ptHistory = useJson(`${PT.api}/history?hours=24`);
  const ptAt = pt?.collectedAt ? pt.collectedAt / 1000 : null;
  // Live only while the minute collector is fresh; unknown values stay as dashes, never zero.
  const ptState = now == null || ptAt == null ? null : now - ptAt < 600 ? "live" : null;
  const ptCurve = (ptHistory?.rows ?? [])
    .filter((r) => r.reward_accumulator != null)
    .map((r) => [r.collected_at / 1000, Number(BigInt(r.reward_accumulator)) / 1e27]);
  const ptStaked = pt?.paper?.supply > 0 && pt.paper.staked != null ? (pt.paper.staked / pt.paper.supply) * 100 : null;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Board
        t={t}
        href={ANTX.href}
        source={ANTX.source}
        kind={t.antxKind}
        title={t.antxTitle}
        summary={t.antxSummary}
        state={antxState}
        now={now}
        generatedAt={antx?.generatedAt}
        metrics={[
          [t.antxRaised, antx ? money(locale, antx.total) : dash],
          [t.antxCap, antx ? `${((antx.total / ANTX.cap) * 100).toFixed(1)}%` : dash],
          [t.antxOrders, antx ? num(antx.orders) : dash],
        ]}
        spark={<Spark points={antxCurve} label={`${t.antxTitle} · ${t.boardsCurve}`} />}
      />
      <Board
        t={t}
        href={PPOLY.href}
        source={PPOLY.source}
        kind={t.ppolyKind}
        title={t.ppolyTitle}
        summary={t.ppolySummary}
        state={now == null ? null : "live"}
        now={now}
        generatedAt={ppoly?.generatedAt}
        metrics={[
          [t.ppolyLocked, ppoly ? num(Number(ppoly.totalLocked ?? 0), 2) : dash],
          [t.ppolyWallets, ppoly ? num(locks.length) : dash],
          [t.ppolyAnnounce, days == null ? dash : formatMessage(t.boardsDays, { n: days })],
        ]}
        spark={<Spark points={ppolyCurve} label={`${t.ppolyTitle} · ${t.boardsCurve}`} />}
      />
      <Board
        t={t}
        href={PT.href}
        source={PT.source}
        kind={t.ptKind}
        title={t.ptTitle}
        summary={t.ptSummary}
        state={ptState}
        now={now}
        generatedAt={ptAt}
        metrics={[
          [t.ptTvl, pt?.balances?.tvl != null ? usd(locale, pt.balances.tvl) : dash],
          [t.ptStaked, ptStaked != null ? `${ptStaked.toFixed(1)}%` : dash],
          [t.ptLp, pt?.balances?.lp != null ? usd(locale, pt.balances.lp) : dash],
        ]}
        spark={<Spark points={ptCurve} fitY label={t.ptCurve} />}
      />
    </div>
  );
}
