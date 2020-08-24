import { TaskResponse } from './../../api/models/response/task-response.model';

export interface setTasksAction extends TaskResponse {}

export interface deleteTaskAction {
    taskId: number;
}