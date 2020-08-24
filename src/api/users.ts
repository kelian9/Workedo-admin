import { UserModel } from './models/user.model';
import { environment } from './environments/environment';
import axios, { AxiosResponse } from 'axios';

const UsersAPI = {

    getUsers: (pageSize: number, pageNumber: number):Promise<AxiosResponse<UserModel[]>> => {
        return axios.post(`${environment.apiEndPoint}/AdminProfile/GetUsersMostBuying`, {
            pageSize: pageSize,
            pageNumber: pageNumber
        }, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            }
        });
    },

    deleteUser: (userId: number):Promise<AxiosResponse<UserModel[]>> => {
        return axios.post(`${environment.apiEndPoint}/AdminProfile/DeletedUser`, {
            userId: userId
        }, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            }
        });
    },

}

export default UsersAPI;