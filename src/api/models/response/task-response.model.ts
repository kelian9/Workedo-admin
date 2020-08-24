import { UserModel } from './../user.model';
import { ServantsResponse } from './servants-response.model';

export interface TaskResponse {
    id: number;
    name: string;
    description: string;
    owner: UserModel;
    city: City;
    servant: ServantsResponse;
    lat: number;
    lon: number;
    timeStart: Date;
    timeEnd: Date;
    price: number;
    isCard: boolean;
    isDistanceWork: boolean;
    isOffer: boolean;
    isOver: boolean;
}

export interface City {
    id: number;
    name: string;
}