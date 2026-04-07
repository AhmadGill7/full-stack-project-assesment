import express from "express";
import { tasks } from "../data/tasks.js";

const router = express.Router();
const allowedStatuses = ["todo", "in_progress", "done"];

router.get("/", (req, res) => {
  let { status = "all", search = "", page = "1", limit = "5" } = req.query;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  let result = [...tasks];

  if (status !== "all") {
    result = result.filter((task) => task.status === status);
  }

  // TODO:
  // make search trimmed + case-insensitive and consistent with frontend expectations
  if (search) {
    result = result.filter((task) => task.title.includes(search));
  }

  const total = result.length;

  const start = (parsedPage - 1) * parsedLimit;
  const paginated = result.slice(start, start + parsedLimit);

  // BUG:
  // totalPages should be based on total / parsedLimit, not paginated.length / parsedLimit
  const totalPages = Math.ceil(paginated.length / parsedLimit);

  res.json({
    items: paginated,
    meta: {
      total,
      page: parsedPage,
      limit: parsedLimit,
      totalPages
    }
  });
});

router.patch("/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const { status } = req.body;

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  // TODO:
  // validate against allowedStatuses and keep error shape consistent
  task.status = status;

  res.json({
    item: task
  });
});

router.get("/stats/summary", (_req, res) => {
  const summary = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    inProgress: tasks.filter((task) => task.status === "in_progress").length,
    done: tasks.filter((task) => task.status === "todo").length
  };

  res.json(summary);
});

export default router;
