import { SubCategoriesResponse } from './models/response/sub-categories-response.model';
import { CategoriesResponse } from './models/response/categories-response.model';
import { environment } from './environments/environment';
import axios, { AxiosResponse } from 'axios';

const CategoriesAPI = {

    getCategories: (pageSize: number, pageNumber: number):Promise<AxiosResponse<CategoriesResponse[]>> => {
        return axios.get(`${environment.apiEndPoint}/Category/list-category`, {
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
    
    getSubCategories: (categoryId:number, pageSize: number, pageNumber: number):Promise<AxiosResponse<SubCategoriesResponse[]>> => {
        return axios.get(`${environment.apiEndPoint}/Category/list-subcategory/${categoryId}`, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            params: {
                PageSize: pageSize,
                PageNumber: pageNumber,
                categoryId: categoryId,
                search: ''
            }
        });
    },
    
    createCategory: (form: FormData):Promise<AxiosResponse> => {
        return axios.post(`${environment.apiEndPoint}/AdminCategories/create-category`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : localStorage.getItem('token'),
            }
        });
    },
    
    changeCategory: (categoryId:number, form: FormData):Promise<AxiosResponse> => {
        return axios.post(`${environment.apiEndPoint}/AdminCategories/update-category/${categoryId}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : localStorage.getItem('token'),
            },
            // params: { id: categoryId } 
        });
    },
    
    deleteCategory: (categoryId:number):Promise<AxiosResponse> => {
        return axios.delete(`${environment.apiEndPoint}/AdminCategories/delete-category${categoryId}`, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            // params: { id: categoryId } 
        });
    }
}

export default CategoriesAPI;