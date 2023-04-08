export class Location {
    idLocation?: string;
    nameLocation: string;
    latLocation: string;
    lonLocation: string; 
    descriptionLocation: string;


    constructor(idLocation: string, nameLocation: string, latLocation: string, lonLocation: string, descriptionLocation: string) {
        this.idLocation = idLocation;
        this.nameLocation = nameLocation;
        this.latLocation = latLocation;
        this.lonLocation = lonLocation; 
        this.descriptionLocation = descriptionLocation;
    }
}