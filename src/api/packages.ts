import { PackageResponse } from './models/response/package-response.model';
import { environment } from './environments/environment';
import axios, { AxiosResponse } from 'axios';

const PackagesAPI = {

    getPackages: ():Promise<AxiosResponse<PackageResponse[]>> => {
        return axios.get(`${environment.apiEndPoint}/AdminPackage/GetAllPackageProduct`, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            }
        });
    },

    createPackage: (packageData: PackageResponse):Promise<AxiosResponse> => {
        return axios.post(`${environment.apiEndPoint}/AdminPackage/AddPackage`, {
            name: packageData.name,
            price: packageData.price,
            countСalls: packageData.countСalls,
            packageType: packageData.packageType
        }, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            }
        });
    },
    
    changePackage: (packageId:number, packageData:{
        name: string,
        price: number,
        countСalls: number,
        packageType: number
      }):Promise<AxiosResponse<PackageResponse>> => {
        return axios.post(`${environment.apiEndPoint}/AdminPackage/ChangePackage`, {
            name: packageData.name,
            price: packageData.price,
            countСalls: packageData.countСalls,
            packageType: packageData.packageType
        }, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            params: { packageId: packageId } 
        });
    },
    
    deletePackage: (packageId:number):Promise<AxiosResponse> => {
        return axios.get(`${environment.apiEndPoint}/AdminPackage/DeletePackage`, {
            headers: {
                'Authorization' : localStorage.getItem('token'),
            },
            params: { packageId: packageId } 
        });
    }
}

export default PackagesAPI;