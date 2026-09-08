import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { CreateTask, Task } from "@/types/task";

const statuses = ["todo", "in-progress", "done"];

export async function GET() {
  try {
    const [tasks] = await db.execute(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("Error fetching tasks:", error);

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateTask = await request.json();

    const title = body.title?.trim();
    const status = body.status;

    if (!title) {
      return NextResponse.json(
        { error: "Task title is required" },
        { status: 400 }
      );
    }

    if (!statuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid task status" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      "INSERT INTO tasks (title, status) VALUES (?, ?)",
      [title, status]
    );

    const insertResult = result as { insertId: number };

    const [tasks] = await db.execute(
      "SELECT * FROM tasks WHERE id = ?",
      [insertResult.insertId]
    );

    const task = (tasks as Task[])[0];

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.log("Error creating task:", error);

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}