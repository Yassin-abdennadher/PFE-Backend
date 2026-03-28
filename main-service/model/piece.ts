import mongoose, { Schema, Document } from 'mongoose';

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

const PieceSchema = new Schema<IPiece>({
    reference: {
        type: String,
        required: [true, 'La référence est requise'],
        unique: true,
        uppercase: true,
        trim: true
    },
    nom: {
        type: String,
        required: [true, 'Le nom est requis'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    prixUnitaire: {
        type: Number,
        required: [true, 'Le prix est requis'],
        min: [0, 'Le prix doit être positif']
    },
    quantiteStock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'La quantité ne peut pas être négative']
    },
    seuilAlerte: {
        type: Number,
        required: true,
        default: 5,
        min: [0, 'Le seuil doit être positif']
    },
    fournisseur: {
        type: String,
        required: [true, 'Le fournisseur est requis'],
        trim: true
    },
    emplacement: {
        type: String,
        trim: true
    }
}, { timestamps: true });


export const Piece = mongoose.model<IPiece>('Piece', PieceSchema);