import { TaskResponse } from './models/response/task-response.model';
import { environment } from './environments/environment';
import axios, { AxiosResponse } from 'axios';

const TasksAPI = {

    getTasks: (servantId:number, pageSize: number, pageNumber: number):Promise<AxiosResponse<TaskResponse[]>> => {
        return axios.post(`${environment.apiEndPoint}/Task/GetTasksByServantId`, {
            pageSize: pageSize,
            pageNumber: pageNumber
        }, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            params: { servantId: servantId, search: '' } 
        });
    },

    deleteTask: (taskId:number):Promise<AxiosResponse<TaskResponse[]>> => {
        return axios.get(`${environment.apiEndPoint}/AdminTask/DeleteTask`, {
            params: {taskId: taskId},
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        })
    }

}

export default TasksAPI;