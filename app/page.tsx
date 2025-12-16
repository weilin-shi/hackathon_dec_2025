"use client";

import { useState, useTransition } from "react";
import report from "./report.json";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";

const data = [
  ...report.top_3_growing_adomains.map((item) => ({
    bin: item.adomain,
    count: item.spend_change_pct,
  })),
  ...report.top_3_declining_adomains.map((item) => ({
    bin: item.adomain,
    count: item.spend_change_pct,
  })),
];

const navItems = [
  ...report.top_3_declining_adomains.map((item) => ({
    label: item.adomain,
    growing: false,
  })),
];

export default function Page() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDelayActive, setIsDelayActive] = useState(false);
  const showLoading = isPending || isDelayActive;
  const handleClick = (route: string) => {
    return () => {
      setIsDelayActive(true);

      setTimeout(() => {
        startTransition(() => {
          router.push(route);
        });
      }, 2000);
    };
  };

  return (
    <main className="layout">
      <section className="content">
        {showLoading && (
          <div className="loading-bar-container">
            <div
              style={{
                height: 8,
                width: 240,
                background: "#eee",
                position: "relative",
                overflow: "hidden",
                borderRadius: 999,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "40%",
                  background: "#0070f3",
                  animation: "loading-bar 1s infinite",
                }}
              />
            </div>
          </div>
        )}
        <header className="hero">
          <div>
            <h2>VX Exchange Health Dashboard</h2>
            <p className="muted">
              Real-time anomaly detection with AI-powered insights.
            </p>
          </div>
          <div className="hero-actions">
            <button className="ghost">Share</button>
            <button className="primary">Scan Anomalies</button>
          </div>
        </header>

        <div className="stat-grid">
          <div className="stat-card">
            <p className="eyebrow">Advertiser Spend</p>
            <h3>${report.overall_summary.dec_10.total_adv_spend}</h3>
            <p className="delta negative">
              {report.overall_summary.day_over_day_change.adv_spend_change_pct}%
              vs yesterday
            </p>
          </div>
          <div className="stat-card">
            <p className="eyebrow">Clicks</p>
            <h3>{report.overall_summary.dec_10.total_clicks}</h3>
            <p className="delta negative">
              {report.overall_summary.day_over_day_change.clicks_change_pct}% vs
              yesterday
            </p>
          </div>
          <div className="stat-card">
            <p className="eyebrow">Views</p>
            <h3>{report.overall_summary.dec_10.total_views}</h3>
            <p className="delta">
              {report.overall_summary.day_over_day_change.views_change_pct}% vs
              yesterday
            </p>
          </div>
          <div className="stat-card">
            <p className="eyebrow">Average Bid Price</p>
            <h3>{report.overall_summary.dec_10.avg_winning_bid_price}</h3>
            <p className="delta negative">
              {report.overall_summary.day_over_day_change.avg_bid_change_pct}%
              vs yesterday
            </p>
          </div>
        </div>

        <div className="chart-grid">
          <div className="panel chart-card">
            <BarChart width={1000} height={400} data={data}>
              <XAxis dataKey="bin" tick={{ fill: "white" }} />

              <YAxis domain={["auto", "auto"]} />

              <Tooltip
                formatter={(value: number | undefined) => [
                  `change percent: ${value ?? 0}%`,
                  "",
                ]}
              />

              <ReferenceLine y={0} stroke="#333" strokeWidth={2} />

              <Bar dataKey="count">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.count < 0 ? "#ff4d4d" : "#4caf50"}
                    onClick={handleClick(`/details?bin=${entry.bin}`)}
                  />
                ))}
              </Bar>
            </BarChart>
            <div>
              <div>
                <h3>Key Insights Summary</h3>
              </div>
            </div>

            <div>{report.key_insights.overall_performance}</div>
            <details className="summary-list" open>
              <summary>Growing Trends</summary>
              <ul>
                {report.key_insights.growing_trends.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
            <details className="summary-list" open>
              <summary>Declining Trends</summary>
              <ul>
                {report.key_insights.declining_trends.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
            <details className="summary-list" open>
              <summary>Market Observations</summary>
              <ul>
                {report.key_insights.market_observations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </section>

      <aside className="sidebar">
        <div className="brand">
          <p>Chat</p>
        </div>

        <div className="chat-input-container">
          <textarea className="chat-input" placeholder="Ask me anything..." />
        </div>
        <div>
          <button
            className="primary"
            onClick={handleClick("/details?bin=temu.com")}
          >
            Send
          </button>
        </div>
      </aside>
    </main>
  );
}
