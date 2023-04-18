export interface Comment {
    _id: string;
    idUserComment: string
    idPublicationComment: string
    textComment: string
    dateComment: string
    likesComment?: string[]
    responseComment?: string[]
    createdAt: string;
    updatedAt: string;

}
      