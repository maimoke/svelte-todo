import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { taskTable } from '$lib/server/schema';

export async function POST({ request }) {
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