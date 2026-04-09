'use client';

export default function Toolbar({
  search,
  status,
  onSearchChange,
  onStatusChange
}) {
  return (
    <div className="toolbar">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks by title..."
      />

      <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="all">All statuses</option>
        <option value="todo">todo</option>
        <option value="in_progress">in_progress</option>
        <option value="done">done</option>
      </select>
    </div>
  );
}
