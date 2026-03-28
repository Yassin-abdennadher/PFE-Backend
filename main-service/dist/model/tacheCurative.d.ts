import mongoose, { Document } from 'mongoose';
export interface ITacheCurative extends Document {
    titre: string;
    description: string;
    machineId: string;
    technicienId: string;
    type: 'curative';
    urgence: 'basse' | 'moyenne' | 'haute' | 'critique';
    piecesUtilisees: {
        pieceId: string;
        quantite: number;
    }[];
    tempsPasse: number;
    rapport: string;
    panne: string;
    statut: 'ouverte' | 'en_cours' | 'terminee';
}
export declare const TacheCurative: mongoose.Model<ITacheCurative, {}, {}, {}, mongoose.Document<unknown, {}, ITacheCurative, {}, mongoose.DefaultSchemaOptions> & ITacheCurative & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITacheCurative>;
//# sourceMappingURL=tacheCurative.d.ts.map