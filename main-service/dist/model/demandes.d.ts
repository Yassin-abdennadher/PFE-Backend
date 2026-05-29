import mongoose, { Document } from 'mongoose';
export interface IDemande extends Document {
    userId: string;
    titre: string;
    description: string;
    machineId: string;
    urgence: 'basse' | 'moyenne' | 'haute' | 'critique';
    statut: 'en_attente' | 'validee' | 'refusee' | 'transformee';
    dateSouhaitee?: Date;
    interventionId?: string;
    motifRefus?: string;
    createdAt: Date;
}
export declare const Demande: mongoose.Model<IDemande, {}, {}, {}, mongoose.Document<unknown, {}, IDemande, {}, mongoose.DefaultSchemaOptions> & IDemande & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IDemande>;
//# sourceMappingURL=demandes.d.ts.map