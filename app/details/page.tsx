"use client";

import { Suspense } from "react";
import Link from "next/link";
import report from "../report.json";
import { useSearchParams } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";

function DetailsContent() {
  const searchParams = useSearchParams();
  const bin = searchParams.get("bin");
  const decliningAdomain = report.top_3_declining_adomains.find(
    (item) => item.adomain === bin
  );
  const top3Countries = decliningAdomain?.top_3_declining_countries || [];

  return (
    <main className="layout">
      <section className="content">
        <header className="hero">
          <div>
            <p className="eyebrow">Domain Details</p>
            <h2>{bin}</h2>
            <p className="muted">Top 3 Declining Countries</p>
          </div>
          <div className="hero-actions">
            <Link className="ghost" href="/">
              Back to dashboard
            </Link>
          </div>
        </header>

        <div className="panel">
          <BarChart width={1000} height={400} data={top3Countries}>
            <XAxis dataKey="country" tick={{ fill: "white" }} />

            <YAxis domain={["auto", "auto"]} />

            <Tooltip
              formatter={(value: number | undefined) => [
                `change percent: ${value ?? 0}%`,
                "",
              ]}
            />

            <ReferenceLine y={0} stroke="#333" strokeWidth={2} />

            <Bar dataKey="spend_change_pct">
              {top3Countries.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.spend_change_pct < 0 ? "#ff4d4d" : "#4caf50"}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      </section>
    </main>
  );
}

export default function DetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="layout">
          <section className="content">
            <div className="panel">Loading details...</div>
          </section>
        </main>
      }
    >
      <DetailsContent />
    </Suspense>
  );
}
