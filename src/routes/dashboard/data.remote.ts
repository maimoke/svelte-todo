import { query } from '$app/server';
import { getTasksService } from '../../core/task/service';

export const getTasks = query(async () => {
	const tasks = await getTasksService();
	return tasks ;
});