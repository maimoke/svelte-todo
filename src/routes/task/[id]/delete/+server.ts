import { db } from '../../../../adapter/db/db';
import { taskTable } from '../../../../core/task/schema';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export async function DELETE({ params }) {
  await db.delete(taskTable).where(eq(taskTable.id, params.id));
  return json({ success: true });
}