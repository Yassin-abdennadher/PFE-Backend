import mongoose, { Document } from 'mongoose';
export interface IMachine extends Document {
    nom: string;
    type: string;
    marque: string;
    modele: string;
    numeroSerie: string;
    localisation: string;
    statut: 'actif' | 'en_panne' | 'en_maintenance' | 'hors_service';
    dateAchat: Date;
    fournisseur: string;
    contactFournisseur?: string;
}
export declare const Machine: mongoose.Model<IMachine, {}, {}, {}, mongoose.Document<unknown, {}, IMachine, {}, mongoose.DefaultSchemaOptions> & IMachine & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMachine>;
//# sourceMappingURL=machine.d.ts.map