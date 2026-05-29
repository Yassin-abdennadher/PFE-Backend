export declare const createDemande: (data: any) => Promise<any>;
export declare const getAllDemande: () => Promise<any>;
export declare const getDemandeById: (id: string) => Promise<any>;
export declare const updateDemande: (id: string, updateData: any) => Promise<import("mongoose").Document<unknown, {}, import("../model/demandes.js").IDemande, {}, import("mongoose").DefaultSchemaOptions> & import("../model/demandes.js").IDemande & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteDemande: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=demandeService.d.ts.map