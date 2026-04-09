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
      <StatCard label="Total" value={stats?.total ?? "-"} />
      <StatCard label="Todo" value={stats?.todo ?? "-"} />
      <StatCard label="In Progress" value={stats?.inProgress ?? "-"} />
      <StatCard label="Done" value={stats?.done ?? "-"} />
    </div>
  );
}
