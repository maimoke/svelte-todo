import { query } from '$app/server';
import {db} from '$lib/server/db';
import { taskTable } from '$lib/server/schema';

export const getTasks = query(async () => {
	const tasks = await db.select().from(taskTable);

	return {tasks} ;
});