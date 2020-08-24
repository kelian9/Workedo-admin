export interface UserModel {
    id: number,
    person: PersonModel,
    avatar: string,
    averageClientRating: number,
    averageJobRating: number
}

export interface PersonModel {
    name: string,
    city: {
        id: number,
        name: string
    }
}