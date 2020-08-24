import { UserModel } from './../../api/models/user.model';
export interface SetUsersAction extends UserModel {}

export interface DeleteUserAction {
    userId: number;
}