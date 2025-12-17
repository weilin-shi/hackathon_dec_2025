"use client";

import temuReport from "../temu_report.json";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";

const top10DecliningRtbAccounts =
  temuReport.top_10_declining_rtb_accounts_by_absolute_spend;

export default function AccountsPage() {
  return (
    <main className="layout">
      <section className="content">
        <header className="hero">
          <div>
            <p className="eyebrow">Account Details</p>
            <h2>Temu</h2>
            <p className="muted">Top 10 Declining RTB Accounts</p>
          </div>
          <div className="hero-actions">
            <Link className="ghost" href="/">
              Back to dashboard
            </Link>
          </div>
        </header>

        <div className="panel">
          <BarChart width={1560} height={400} data={top10DecliningRtbAccounts}>
            <XAxis dataKey="rtb_account_name" tick={{ fill: "white" }} />

            <YAxis domain={["auto", "auto"]} />

            <Tooltip
              formatter={(value: number | undefined) => [
                `change percent: ${value ?? 0}%`,
                "",
              ]}
            />

            <ReferenceLine y={0} stroke="#333" strokeWidth={2} />

            <Bar dataKey="percent_decline">
              {top10DecliningRtbAccounts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.percent_decline < 0 ? "#ff4d4d" : "#4caf50"}
                />
              ))}
            </Bar>
          </BarChart>
          <div>
            <div>
              <h3>Key Insights Summary</h3>
            </div>
          </div>
          <details className="summary-list" open>
            <summary>Growing Trends</summary>
            <ul>
              {temuReport.key_insights.potential_causes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        </div>
      </section>
    </main>
  );
}
