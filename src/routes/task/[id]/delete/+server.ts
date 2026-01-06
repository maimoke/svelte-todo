import { db } from '$lib/server/db';
import { taskTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export async function DELETE({ params }) {
  await db.delete(taskTable).where(eq(taskTable.id, params.id));
  return json({ success: true });
}