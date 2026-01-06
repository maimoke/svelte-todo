import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { taskTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export async function GET({ params }) {
  const [task] = await db
    .select()
    .from(taskTable)
    .where(eq(taskTable.id, params.id));

  if (!task) {
    throw error(404, 'Task not found');
  }

  return json(task);
}

export async function PUT({ request, params, locals }) {
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