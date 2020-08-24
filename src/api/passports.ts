import { PassportResponse } from './models/response/passport-response.model';
import { environment } from './environments/environment';
import axios, { AxiosResponse } from 'axios';

const PassportsAPI = {

    getPassports: (pageSize: number, pageNumber: number):Promise<AxiosResponse<PassportResponse[]>> => {
        return axios.post(`${environment.apiEndPoint}/AdminPassport/GetPassports`, {
            pageSize: pageSize,
            pageNumber: pageNumber
        }, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            }
        });
    },

    verifyClient: (passportId:number, verify:boolean):Promise<AxiosResponse<boolean>> => {
        return axios.get(`${environment.apiEndPoint}/AdminPassport/VerifyClient`, {
            params: {
                passportId: passportId,
                verify: verify
            },
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        })
    }

}

export default PassportsAPI;