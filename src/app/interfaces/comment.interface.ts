import { User } from "./user.interface";

export interface Comment {
    _id?: string
    idUserComment: string
    idPublicationComment: string
    textComment: string
    likesComment?: string[]
    responseComment?: string[]
    createdAt: string;
    updatedAt: string;
}