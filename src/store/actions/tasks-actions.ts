import { TaskResponse } from './../../api/models/response/task-response.model';
import actionsConstants from "../models/actions-constants";
import { deleteTaskAction } from '../models/tasks-action.model';

export const setTasks = (action:TaskResponse[]) => {
    return ({
        type: actionsConstants.SET_SUBCATEGORIES,
        data: action
    })
}

export const deleteTask = (action:deleteTaskAction) =>({
    type: actionsConstants.DELETE_SUBCATEGORY,
    ...action
})