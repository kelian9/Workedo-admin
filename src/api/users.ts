import { UserModel } from './models/user.model';
import { environment } from './environments/environment';
import axios, { AxiosResponse } from 'axios';

const UsersAPI = {

    getUsers: (pageSize: number, pageNumber: number):Promise<AxiosResponse<UserModel[]>> => {
        return axios.get(`${environment.apiEndPoint}/AdminProfile/list`, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            params: {
                PageSize: pageSize,
                PageNumber: pageNumber,
                search: ''
            }
        });
    },

    deleteUser: (userId: number):Promise<AxiosResponse<UserModel[]>> => {
        return axios.delete(`${environment.apiEndPoint}/AdminProfile/delete/${userId}`, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            // params: { id: userId }
        });
    },

}

export default UsersAPI;