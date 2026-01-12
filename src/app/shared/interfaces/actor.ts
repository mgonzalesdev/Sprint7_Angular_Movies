export interface ApiActor {
    adult: boolean;
    gender: number; // 1 = Femenino, 2 = Masculino, 0/3 = No especificado/otro
    id: number;
    known_for_department: string; // ej: "Acting"
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null; // La ruta del archivo de la imagen, a menudo comienza con '/'. Puede ser null.
    cast_id?: number; // Opcional, específico si es parte de una lista de reparto (cast)
    character?: string; // Opcional, el nombre del personaje si es parte de un reparto
    credit_id: string;
    order?: number;
}
export interface Actor {
    name: string,
    imgProfile: string,
    character?: string;
}
export interface CreditsResponse {
    id: number;
    cast: ApiActor[];   
}