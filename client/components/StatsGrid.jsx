'use client';

function StatCard({ label, value }) {
  return (
    <div className="card">
      <div className="cardLabel">{label}</div>
      <div className="cardValue">{value}</div>
    </div>
  );
}

export default function StatsGrid({ stats }) {
  return (
    <div className="statsGrid">
      <StatCard label="Total" value={stats?.totals?.total ?? "-"} />
      <StatCard label="Todo" value={stats?.totals?.todo ?? "-"} />
      <StatCard label="In Progress" value={stats?.totals?.inProgress ?? "-"} />
      <StatCard label="Done" value={stats?.totals?.done ?? "-"} />
    </div>
  );
}
