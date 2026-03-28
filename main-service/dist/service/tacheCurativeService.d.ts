export declare const createTacheCur: (data: any) => Promise<any>;
export declare const getAllTacheCur: () => Promise<any>;
export declare const getTacheById: (id: string) => Promise<any>;
export declare const getTacheWithTechnicien: (id: string) => Promise<{
    technicien: any;
    titre: string;
    description: string;
    machineId: string;
    technicienId: string;
    type: "curative";
    urgence: "basse" | "moyenne" | "haute" | "critique";
    piecesUtilisees: {
        pieceId: string;
        quantite: number;
    }[];
    tempsPasse: number;
    rapport: string;
    panne: string;
    statut: "ouverte" | "en_cours" | "terminee";
    _id: import("mongoose").Types.ObjectId;
    $locals: Record<string, unknown>;
    $op: "save" | "validate" | "remove" | null;
    $where: Record<string, unknown>;
    baseModelName?: string;
    collection: import("mongoose").Collection;
    db: import("mongoose").Connection;
    errors?: import("mongoose").Error.ValidationError;
    isNew: boolean;
    schema: import("mongoose").Schema;
    __v: number;
}>;
export declare const updateTacheCur: (id: string, updateData: any) => Promise<any>;
export declare const deleteTacheCur: (id: string) => Promise<any>;
//# sourceMappingURL=tacheCurativeService.d.ts.map