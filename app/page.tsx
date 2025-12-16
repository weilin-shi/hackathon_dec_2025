"use client";

import report from "./report.json";
import { useState } from "react";

const navItems = [
  ...report.top_3_growing_rtb_accounts.map((item) => ({
    label: item.winner_rtb_account_name,
  })),
  ...report.top_3_declining_rtb_accounts.map((item) => ({
    label: item.winner_rtb_account_name,
  })),
];

export default function Page() {
  const [activeNavItem, setActiveNavItem] = useState(navItems[0].label);

  return (
    <main className="layout">
      <aside className="sidebar">
        <div className="brand">
          <h1>{report.report_metadata.generated_at}</h1>
          <p>Detected Anomalies ({navItems.length})</p>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`nav-item ${
                activeNavItem === item.label ? "active" : ""
              }`}
              onClick={() => setActiveNavItem(item.label)}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">Hint</p>
          <p>Click on the RTB account name for AI analysis.</p>
        </div>
      </aside>

      <section className="content">
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
            <p className="eyebrow">MRR</p>
            <h3>$218k</h3>
            <p className="delta positive">+12.4% vs last month</p>
          </div>
          <div className="stat-card">
            <p className="eyebrow">Active users</p>
            <h3>42,810</h3>
            <p className="delta positive">+4.1% WoW</p>
          </div>
          <div className="stat-card">
            <p className="eyebrow">Retention</p>
            <h3>93.2%</h3>
            <p className="delta muted">Flat week over week</p>
          </div>
          <div className="stat-card">
            <p className="eyebrow">Support load</p>
            <h3>236</h3>
            <p className="delta negative">-8.3% resolution time</p>
          </div>
        </div>

        <div className="chart-grid">
          <div className="panel chart-card">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Revenue</p>
                <h3>Key Insights Summary</h3>
              </div>
              <button className="ghost small">Export</button>
            </div>
            <div
              className="summary-list"
            >
              {report.key_insights_summary.map((item) => (
                <div key={item}>- {item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
