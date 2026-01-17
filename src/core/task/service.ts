import { query } from "$app/server";
import { eq } from "drizzle-orm";
import { db } from "../../adapter/db/db";
import { taskTable } from "./schema";
import { error, json } from '@sveltejs/kit';



export const getTasksService = query(async () => {

    const tasks = await db.select().from(taskTable);
    return {tasks} ;
});


export async function createTaskService({ request }) {
  const body = await request.json();

  const [created] = await db
    .insert(taskTable)
    .values({
      task: body.task,
      description: body.description,
      progress: body.progress,
      createBy: body.createBy
    })
    .returning();

  return json(created);
}

export async function deleteTaskService({ params }) {
  await db.delete(taskTable).where(eq(taskTable.id, params.id));
  return json({ success: true });
}

export async function getTaskService({ params }) {
  const [task] = await db
    .select()
    .from(taskTable)
    .where(eq(taskTable.id, params.id));

  if (!task) {
    throw error(404, 'Task not found');
  }

  return json(task);
}

export async function updateTaskService({ request, params, locals }) {
  const body = await request.json();

  if (!body.task) {
    throw error(400, 'Task title is required');
  }

  const [updated] = await db
    .update(taskTable)
    .set({
      task: body.task,
      description: body.description,
      progress: body.progress
    })
    .where(eq(taskTable.id, params.id))
    .returning();

  if (!updated) {
    throw error(404, 'Task not found');
  }

  return json(updated);
}