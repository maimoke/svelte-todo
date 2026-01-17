import { createTaskService } from '../../../core/task/service';

export async function POST(request) {
  const js = await createTaskService(request);
  return js;
}