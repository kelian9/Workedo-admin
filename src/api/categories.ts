import { SubCategoriesResponse } from './models/response/sub-categories-response.model';
import { CategoriesResponse } from './models/response/categories-response.model';
import { environment } from './environments/environment';
import axios, { AxiosResponse } from 'axios';

const CategoriesAPI = {

    getCategories: (pageSize: number, pageNumber: number):Promise<AxiosResponse<CategoriesResponse[]>> => {
        return axios.post(`${environment.apiEndPoint}/Category/GetListCategory`, {
            pageSize: pageSize,
            pageNumber: pageNumber
        }, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            }
        });
    },
    
    getSubCategories: (categoryId:number, pageSize: number, pageNumber: number):Promise<AxiosResponse<SubCategoriesResponse[]>> => {
        return axios.post(`${environment.apiEndPoint}/Category/GetListSubCategory`, {
            pageSize: pageSize,
            pageNumber: pageNumber
        }, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            params: { categoryId: categoryId } 
        });
    },
    
    createCategory: (form: FormData):Promise<AxiosResponse> => {
        return axios.post(`${environment.apiEndPoint}/AdminCategories/AddCategory`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : localStorage.getItem('token'),
            }
        });
    },
    
    changeCategory: (categoryId:number, form: FormData):Promise<AxiosResponse> => {
        return axios.post(`${environment.apiEndPoint}/AdminCategories/ChangeCategory`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : localStorage.getItem('token'),
            },
            params: { categoryId: categoryId } 
        });
    },
    
    deleteCategory: (categoryId:number):Promise<AxiosResponse> => {
        return axios.get(`${environment.apiEndPoint}/AdminCategories/DeleteCategory`, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            params: { categoryId: categoryId } 
        });
    }
}

export default CategoriesAPI;