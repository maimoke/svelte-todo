import { deleteTaskService } from '../../../../core/task/service';

export async function DELETE(params) {
  const js = await deleteTaskService(params);
  return js;
}