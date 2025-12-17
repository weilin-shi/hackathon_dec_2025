"use client";

import { Suspense, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import Loading from "../loading";

function DetailsContent() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [isDelayActive, setIsDelayActive] = useState(false);
  const showLoading = isPending || isDelayActive;
  const [input, setInput] = useState("");
  const bin = searchParams.get("bin");
  const decliningAdomain = report.top_3_declining_adomains.find(
    (item) => item.adomain === bin
  );
  const top3Countries = decliningAdomain?.top_3_declining_countries || [];
  const handleClick = () => {
    setIsDelayActive(true);

    setTimeout(() => {
      startTransition(() => {
        router.push("/accounts");
      });
    }, 2000);
  };

  return (
    <main className="layout">
      <section className="content">
        {showLoading && <Loading />}
        <header className="hero">
          <div>
            <p className="eyebrow">Domain Details</p>
            <h2>{bin}</h2>
            <p className="muted">Top 5 Declining Countries</p>
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

      <aside className="sidebar">
        <div className="brand">
          <p>Chat</p>
        </div>

        <div className="chat-input-container">
          <textarea
            className="chat-input"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <button
            className={input.length === 0 ? "ghost" : "primary"}
            onClick={handleClick}
            disabled={input.length === 0}
          >
            Send
          </button>
        </div>
      </aside>
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
