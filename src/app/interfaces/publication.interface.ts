export interface Publication {
    _id?: string,
    idUserPublication: string,
    likesPublication?: string[],
    textPublication?: string,
    photoPublication: string[], // Aquí van las fotos de las publicaciones.
    commentsPublication?: string[]
    createdAt: string;
    updatedAt: string;
}