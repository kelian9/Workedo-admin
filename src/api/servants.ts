import { ServantsResponse } from './models/response/servants-response.model';
import { environment } from './environments/environment';
import axios, { AxiosResponse } from 'axios';

const ServantsAPI = {

    getServants: (subCategoryId:number, pageSize: number, pageNumber: number):Promise<AxiosResponse<ServantsResponse[]>> => {
        return axios.post(`${environment.apiEndPoint}/Category/GetListServant`, {
            pageSize: pageSize,
            pageNumber: pageNumber
        }, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            params: { subCategory: subCategoryId } 
        });
    },

    createServant: (form: FormData):Promise<AxiosResponse> => {
        return axios.post(`${environment.apiEndPoint}/AdminCategories/AddServant`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : localStorage.getItem('token'),
            }
        });
    },
    
    changeServant: (servantId:number, form: FormData):Promise<AxiosResponse> => {
        return axios.post(`${environment.apiEndPoint}/AdminCategories/ChangeServant`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : localStorage.getItem('token'),
            },
            params: { servantId: servantId } 
        });
    },
    
    deleteServant: (servantId:number):Promise<AxiosResponse> => {
        return axios.get(`${environment.apiEndPoint}/AdminCategories/DeleteServant`, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            params: { servantId: servantId } 
        });
    }
}

export default ServantsAPI;