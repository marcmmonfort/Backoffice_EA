import { User } from "./user.interface";

export class Comment {
    
    idUserComment: string
    idPublicationComment: string
    textComment: string
    dateComment: Date
    likesComment?: User[]
    responseComment?: Comment[]
    


    constructor(idUserComment: string, idPublicationComment: string, textComment: string, dateComment: Date, likesComment?: User[], responseComment?: Comment[]) {
        this.idUserComment = idUserComment,
        this.idPublicationComment = idPublicationComment;
        this.textComment = textComment;
        this.likesComment = likesComment; 
        this.dateComment = dateComment; 
        this.responseComment = responseComment;
        
    }
}