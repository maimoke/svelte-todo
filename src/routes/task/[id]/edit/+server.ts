import { getTaskService, updateTaskService } from '../../../../core/task/service';

export async function GET(params) {
  const js = getTaskService(params);
  return js;
}

export async function PUT({request, params, locals}) {
  const js = updateTaskService({request , params , locals});
  return js
}