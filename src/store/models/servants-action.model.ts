import { ServantsResponse } from './../../api/models/response/servants-response.model';

export interface setServantsAction extends ServantsResponse {}

export interface createServantAction {
    name: string;
    subCategoryId: number;
}

export interface changeServantAction {
    id: number;
    name: string;
    subCategoryId: number;
}

export interface deleteServantAction {
    id: number;
}