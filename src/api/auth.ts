import { RegistrationRequest } from './models/request/registration-request.model';
import { AuthResponse } from './models/response/auth-response.model';
import axios, { AxiosResponse } from "axios"
import { environment } from "./environments/environment"

export const auth = (login:string, password:string):Promise<AxiosResponse<AuthResponse>> => {
    return axios.post(`${environment.apiEndPoint}/AdminAccount/AuthAdmin`, {}, {
        params: {
            login: login,
            password: password
        }
    })
}

// export const register = (person:RegistrationRequest):Promise<AxiosResponse<RegistrationResponse>> => {
//     return axios.post(`${environment.apiEndPoint}/Account/RegisterWaiter`, {
//         ...person
//     })
// }