import mongoose, { Schema, Document } from 'mongoose';

export interface ITacheCurative extends Document {
    titre: string;
    description: string;
    machineId: string;
    technicienId: string;
    type: 'curative';
    urgence: 'basse' | 'moyenne' | 'haute' | 'critique';
    piecesUtilisees: { pieceId: string; quantite: number }[];
    tempsPasse: number;
    rapport: string;
    panne: string;
    statut: 'ouverte' | 'en_cours' | 'terminee';
}

const TacheCurativeSchema = new Schema<ITacheCurative>({
    titre: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    machineId: {
        type: String,
        required: true,
        ref: 'Machine'
    },
    technicienId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'curative',
        enum: ['curative']
    },
    urgence: {
        type: String,
        required: true,
        enum: ['basse', 'moyenne', 'haute', 'critique']
    },
    piecesUtilisees: [{
        pieceId: { type: String, required: true, ref: 'Piece' },
        quantite: { type: Number, required: true, min: 1 }
    }],
    tempsPasse: {
        type: Number,
        default: 0,
        min: 0
    },
    rapport: {
        type: String
    },
    panne: {
        type: String,
        required: true
    },
    statut: {
        type: String,
        default: 'ouverte',
        enum: ['ouverte', 'en_cours', 'terminee']
    }
}, { timestamps: true });

export const TacheCurative = mongoose.model<ITacheCurative>('TacheCurative', TacheCurativeSchema);