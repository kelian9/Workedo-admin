import { TaskResponse } from './models/response/task-response.model';
import { environment } from './environments/environment';
import axios, { AxiosResponse } from 'axios';

const TasksAPI = {

    getTasks: (servantId:number, pageSize: number, pageNumber: number):Promise<AxiosResponse<TaskResponse[]>> => {
        return axios.get(`${environment.apiEndPoint}/Task/list/${servantId}`, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            params: { 
                // servantId: servantId,
                search: '',
                PageSize: pageSize,
                PageNumber: pageNumber
            } 
        });
    },

    deleteTask: (taskId:number):Promise<AxiosResponse<TaskResponse>> => {
        return axios.get(`${environment.apiEndPoint}/AdminTask/delete/${taskId}`, {
            // params: {id: taskId},
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        })
    }

}

export default TasksAPI;