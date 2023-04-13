export interface User {
    idUserComment: string
    idPublicationComment: string
    textComment: string
    dateComment: Date
    likesComment?: User[]
    responseComment?: Comment[]
    _id: string;

}
      