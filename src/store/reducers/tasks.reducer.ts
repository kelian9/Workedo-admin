import { setTasksAction } from '../models/tasks-action.model';
import actionsConstants from '../models/actions-constants';

export const TasksReducer = (
        state:setTasksAction[]=[],
        action:any
    ) => {
        switch (action.type) {
            case actionsConstants.SET_TASKS:
                console.log(action.data, 'state')
                return [...action.data] // don't copy previous state into array
            case actionsConstants.DELETE_TASK:
                return state.filter(item => item.id != action.taskId)
            default:
                return state;
        }
}