const API_BASE = "http://localhost:4000";

export async function fetchTasks({ status = "all", search = "", page = 1, limit = 5 }) {
  const params = new URLSearchParams();

  if (status !== "all") params.set("status", status);
  if (search) params.set("search", search);
  params.set("page", String(page));
  params.set("limit", String(limit));

  const response = await fetch(`${API_BASE}/tasks?${params.toString()}`);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || "Failed to load tasks");
  }

  return response.json();
}

export async function fetchStats() {
  const response = await fetch(`${API_BASE}/tasks/stats/summary`);

  if (!response.ok) {
    throw new Error("Failed to load stats");
  }

  return response.json();
}

export async function updateTaskStatus(id, status) {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || "Failed to update task");
  }

  return response.json();
}
