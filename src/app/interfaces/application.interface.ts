export interface Application {
    uuid?:string;
    idSender: string;
    idReceiver: string;
    typeApplication: string; 
    idActivity: string;
    descriptionApplication?: string;
    createdAt: string;
    updatedAt: string;
}