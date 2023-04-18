export class User{
    idUser?: string;
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


    constructor(idUser: string, nameUser: string, surnameUser: string, passwordUser: string, mailUser: string, photoUser: ImageBitmap, 
        birthdateUser: Date, genderUser: "masculino" | "femenino", ocupationUser: string, descriptionUser: string, roleUser: "admin" | "common" | "verificado" | "empresa", 
        privacyUser: boolean, followersUser: [User], followedUser: [User], deleted: boolean) {
        this.idUser = idUser;
        this.nameUser = nameUser;
        this.surnameUser = surnameUser;
        this.passwordUser = passwordUser;
        this.mailUser = mailUser;
        this.photoUser = photoUser;
        this.birthdateUser = birthdateUser;
        this.genderUser = genderUser;
        this.ocupationUser = ocupationUser;
        this.descriptionUser = descriptionUser;
        this.roleUser = roleUser;
        this.privacyUser = privacyUser;
        this.followedUser = followersUser;
        this.followedUser = followedUser;
        this.deleted = deleted;
    }
}

    

