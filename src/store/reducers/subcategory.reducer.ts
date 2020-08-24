import { SetSubCategoryAction } from './../models/subcategories-action.model';
import actionsConstants from "../models/actions-constants";

export const SubCategoryReducer = (
        state:SetSubCategoryAction={
            id: 1,
            name: "",
            imageUrl: "",
            category: {
                id: 0,
                name: "",
                imageUrl: ""
            }
        },
        action:any
    ) => {
        switch (action.type) {
            case actionsConstants.CREATE_SUBCATEGORY:
                return({
                    ...state,
                    ...action
                })
            case actionsConstants.CHANGE_SUBCATEGORY:
                return state.id === action.id ? ({
                    ...state,
                    name: action.name,
                    imageUrl: action.imageUrl,
                    category: {
                        id: action.categoryId,
                        name: state.category.name,
                        imageUrl: state.category.imageUrl
                    }
                }) : state
            default:
                break;
        }
}