import { Location } from "./location.interface";
import { User } from "./user.interface";

export class Activity {
    idActivity?: string;
    nameActivity: string;
    creatorActivity: User;
    participantsActivity?: [User];
    photoActivity?: [ImageBitmap]; //Vector con todas las fotos que los usuarios hayan hecho en esa actividad.
    dateActivity: Date;
    hoursActivity: [string]; //Hora de inicio y hora de final. ***Intentar poner que tenga longitud 2***
    idLocation?: Location; //Localización opcional para quien quiera ponerla 
    descriptionActivity: string;
    privacyActivity: boolean; //Si queremos que nuestros seguidores puedan ver toda la info de esta actividad.
    roleActivity: "verificado" | "common" | "empresa" ;  // Verificado --> Hacer eventos publicos que aparezcan en el mapa. // Common --> Hacer eventos a los que tus seguidores pueden apuntarse, pensado para usuario normales.
    
    constructor(idActivity: string, nameActivity: string, creatorActivity: User, participantsActivity: [User], photoActivity: [ImageBitmap], dateActivity: Date, 
        hoursActivity: [string], idLocation: Location, descriptionActivity: string, privacyActivity: boolean, roleActivity: "verificado" | "common" | "empresa") {
        this.idActivity = idActivity;
        this.nameActivity = nameActivity;
        this.creatorActivity = creatorActivity;
        this.participantsActivity = participantsActivity;
        this.photoActivity = photoActivity;
        this.dateActivity = dateActivity;
        this.hoursActivity = hoursActivity;
        this.idLocation = idLocation;
        this.descriptionActivity = descriptionActivity;
        this.privacyActivity = privacyActivity;
        this.roleActivity = roleActivity;
    }

}