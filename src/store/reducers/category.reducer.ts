import { setCategoryAction } from '../models/categories-action.model';
import actionsConstants from "../models/actions-constants";

export const CategoryReducer = (
        state:setCategoryAction={
            id: 1,
            name: "",
            imageUrl: ""
        },
        action:any
    ) => {
        switch (action.type) {
            case actionsConstants.CREATE_CATEGORY:
                return({
                    ...state,
                    ...action
                })
            case actionsConstants.CHANGE_CATEGORY:
                return state.id === action.id ? ({
                    ...state,
                    name: action.name,
                    imageUrl: action.imageUrl
                }) : state
            default:
                break;
        }
}