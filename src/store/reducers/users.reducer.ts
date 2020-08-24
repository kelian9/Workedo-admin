import actionsConstants from '../models/actions-constants';
import { SetUsersAction } from '../models/users-action.model';

export const UsersReducer = (
        state:SetUsersAction[]=[],
        action:any
    ) => {
        switch (action.type) {
            case actionsConstants.SET_USERS:
                console.log(action.data, 'state')
                return [...action.data] // don't copy previous state into array
            case actionsConstants.DELETE_USER:
                return state.filter(item => item.id != action.userId)
            default:
                return state;
        }
}