import { query } from '$app/server';
import {db} from '../../adapter/db/db';
import { taskTable } from '../../core/task/schema';

export const getTasks = query(async () => {
	const tasks = await db.select().from(taskTable);

	return {tasks} ;
});