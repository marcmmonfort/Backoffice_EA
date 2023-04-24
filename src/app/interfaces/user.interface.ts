export interface User{
    _id?: string
    appUser?: string;
    nameUser: string;
    surnameUser: string;
    passwordUser: string;
    mailUser: string;
    photoUser: ImageBitmap;
    birthdateUser: Date;
    genderUser: "masculino" | "femenino";
    ocupationUser?: string;
    descriptionUser: string;
    roleUser: "admin" | "common" | "verificado" | "empresa";
    privacyUser: boolean;
    followersUser?: User[];
    followedUser?: User[];
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    
}

    

