import { PassportResponse } from './models/response/passport-response.model';
import { environment } from './environments/environment';
import axios, { AxiosResponse } from 'axios';

const PassportsAPI = {

    getPassports: (pageSize: number, pageNumber: number):Promise<AxiosResponse<PassportResponse[]>> => {
        return axios.get(`${environment.apiEndPoint}/AdminPassport/list`, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            params: {
                PageSize: pageSize,
                PageNumber: pageNumber
            }
        });
    },

    verifyClient: (passportId:number, verify:boolean):Promise<AxiosResponse<boolean>> => {
        return axios.get(`${environment.apiEndPoint}/AdminPassport/verify/${passportId}`, {
            params: {
                // id: passportId,
                verify: verify
            },
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        })
    }

}

export default PassportsAPI;