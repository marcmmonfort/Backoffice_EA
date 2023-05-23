export interface User{
    uuid?:string;
    appUser: string;
    nameUser: string;
    surnameUser: string;
    mailUser:string;
    photoUser: string;
    birthdateUser: Date;
    genderUser: string;
    ocupationUser?: string;
    descriptionUser: string;
    roleUser: string;
    privacyUser: boolean;
    deletedUser: boolean;
    followersUser?: [string];
    followedUser?: [string];
    createdAt: string;
    updatedAt: string;
}

    

