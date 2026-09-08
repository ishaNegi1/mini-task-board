"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faPlus,
faRotate,
faTrash,
faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { CreateTask, Task } from "@/types/task";

const statuses = ["todo", "in-progress", "done"];

export default function Home() {
const [tasks, setTasks] = useState<Task[]>([]);
const [title, setTitle] = useState("");
const [status, setStatus] = useState<Task["status"]>("todo");

const [loading, setLoading] = useState(true);
const [submitting, setSubmitting] = useState(false);
const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null);
const [error, setError] = useState("");

useEffect(() => {
fetchTasks();
}, []);

async function fetchTasks() {
try {
setLoading(true);
setError("");

  const response = await fetch("/api/tasks");
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  setTasks(data);
} catch (error) {
  console.log(error);
  setError("Failed to load tasks. Please try again.");
} finally {
  setLoading(false);
}

}

async function handleSubmit(
event: React.SubmitEvent<HTMLFormElement>
) {
event.preventDefault();

const taskTitle = title.trim();

if (!taskTitle) {
  setError("Task title is required.");
  return;
}

try {
  setSubmitting(true);
  setError("");

  const task: CreateTask = {
    title: taskTitle,
    status: status,
  };

  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create task");
  }

  setTasks([data, ...tasks]);
  setTitle("");
  setStatus("todo");
} catch (error) {
  console.log(error);

  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError("Failed to create task.");
  }
} finally {
  setSubmitting(false);
}

}

async function handleStatusChange(
taskId: number,
newStatus: Task["status"]
) {
try {
setUpdatingTaskId(taskId);
setError("");

  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: newStatus,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update task");
  }

  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return data;
    }

    return task;
  });

  setTasks(updatedTasks);
} catch (error) {
  console.log(error);

  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError("Failed to update task.");
  }
} finally {
  setUpdatingTaskId(null);
}


}

async function handleDelete(taskId: number) {
const confirmDelete = window.confirm(
"Are you sure you want to delete this task?"
);


if (!confirmDelete) {
  return;
}

try {
  setDeletingTaskId(taskId);
  setError("");

  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to delete task");
  }

  const remainingTasks = tasks.filter(
    (task) => task.id !== taskId
  );

  setTasks(remainingTasks);
} catch (error) {
  console.log(error);

  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError("Failed to delete task.");
  }
} finally {
  setDeletingTaskId(null);
}


}

function formatStatus(status: string) {
if (status === "in-progress") {
return "In Progress";
}

return status.charAt(0).toUpperCase() + status.slice(1);


}

return ( <main className="min-h-screen bg-gray-100 px-4 py-10"> <div className="mx-auto max-w-4xl">

    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Mini Task Board
      </h1>

      <p className="mt-2 text-gray-600">
        Create, manage and track your tasks.
      </p>
    </div>

    <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Add New Task
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-[1fr_180px_auto]"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Task Title
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as Task["status"]
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {formatStatus(item)}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="self-end rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="mr-2"
          />

          {submitting ? "Adding..." : "Add Task"}
        </button>
      </form>
    </section>

    {error && (
      <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        <span>{error}</span>

        <button
          type="button"
          onClick={() => setError("")}
          className="ml-4"
          aria-label="Close error"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    )}

    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Tasks
        </h2>

        <button
          type="button"
          onClick={fetchTasks}
          disabled={loading}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FontAwesomeIcon
            icon={faRotate}
            className="mr-2"
          />

          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 shadow-sm">
          Loading tasks...
        </div>
      )}

      {!loading && tasks.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 shadow-sm">
          No tasks found. Add your first task above.
        </div>
      )}

      {!loading && tasks.length > 0 && (
        <div className="space-y-4">
          {tasks.map((task) => (
            <article
              key={task.id}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <h3 className="wrap-break-word text-lg font-semibold text-gray-900">
                  {task.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Created:{" "}
                  {new Date(
                    task.created_at
                  ).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div>
                  <label
                    htmlFor={`task-status-${task.id}`}
                    className="mb-1 block text-xs font-medium text-gray-600"
                  >
                    Status
                  </label>

                  <select
                    id={`task-status-${task.id}`}
                    value={task.status}
                    disabled={
                      updatingTaskId === task.id
                    }
                    onChange={(event) =>
                      handleStatusChange(
                        task.id,
                        event.target.value as Task["status"]
                      )
                    }
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {statuses.map((item) => (
                      <option key={item} value={item}>
                        {formatStatus(item)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(task.id)}
                  disabled={
                    deletingTaskId === task.id
                  }
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="mr-2"
                  />

                  {deletingTaskId === task.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  </div>
</main>

);
}

