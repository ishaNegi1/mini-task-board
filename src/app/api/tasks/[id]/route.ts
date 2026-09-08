import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { Task, UpdateTask, RouteContext } from "@/types/task";

const statuses = ["todo", "in-progress", "done"];

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const taskId = Number(id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
      return NextResponse.json(
        { error: "Invalid task ID" },
        { status: 400 }
      );
    }

    const body: UpdateTask = await request.json();
    const status = body.status;

    if (!statuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid task status" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      "UPDATE tasks SET status = ? WHERE id = ?",
      [status, taskId]
    );

    const updateResult = result as { affectedRows: number };

    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    const [tasks] = await db.execute(
      "SELECT * FROM tasks WHERE id = ?",
      [taskId]
    );

    const task = (tasks as Task[])[0];

    return NextResponse.json(task);
  } catch (error) {
    console.log("Error updating task:", error);

    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const taskId = Number(id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
      return NextResponse.json(
        { error: "Invalid task ID" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      "DELETE FROM tasks WHERE id = ?",
      [taskId]
    );

    const deleteResult = result as { affectedRows: number };

    if (deleteResult.affectedRows === 0) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting task:", error);

    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}