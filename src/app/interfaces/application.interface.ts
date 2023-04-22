export interface Application {
    _id?: string
    idSender: string;
    idReceiver: string;
    typeApplication: string; 
    idActivity: string;
    descriptionApplication?: string;
    createdAt: string;
    updatedAt: string;
}