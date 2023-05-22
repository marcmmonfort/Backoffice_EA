export interface Publication {
    uuid?: string,
    idUser: string,
    likesPublication?: string[],
    textPublication?: string,
    photoPublication: string[], // Aquí van las fotos de las publicaciones.
    commentsPublication?: string[]
    createdAt: string;
    updatedAt: string;
}