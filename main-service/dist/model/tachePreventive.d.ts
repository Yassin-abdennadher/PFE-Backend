import mongoose, { Document } from 'mongoose';
export interface ITachePreventive extends Document {
    titre: string;
    description: string;
    machineId: string;
    technicienId: string;
    type: 'preventive';
    frequence: 'hebdomadaire' | 'mensuel' | 'trimestriel' | 'annuel';
    compteurRequis?: number;
    dateProchaine: Date;
    dateDerniere?: Date;
    statut: 'planifiee' | 'en_cours' | 'terminee';
}
export declare const TachePreventive: mongoose.Model<ITachePreventive, {}, {}, {}, mongoose.Document<unknown, {}, ITachePreventive, {}, mongoose.DefaultSchemaOptions> & ITachePreventive & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITachePreventive>;
//# sourceMappingURL=tachePreventive.d.ts.map