import mongoose, { Document } from 'mongoose';
export interface IPiece extends Document {
    reference: string;
    nom: string;
    description?: string;
    prixUnitaire: number;
    quantiteStock: number;
    seuilAlerte: number;
    fournisseur: string;
    emplacement?: string;
}
export declare const Piece: mongoose.Model<IPiece, {}, {}, {}, mongoose.Document<unknown, {}, IPiece, {}, mongoose.DefaultSchemaOptions> & IPiece & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IPiece>;
//# sourceMappingURL=piece.d.ts.map