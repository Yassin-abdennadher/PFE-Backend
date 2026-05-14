import mongoose, { Schema, Document } from 'mongoose';

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

const DemandeSchema = new Schema<IDemande>({
    userId: { type: String, required: true },
    titre: { type: String, required: true },
    description: { type: String, required: true },
    machineId: { type: String, required: true },
    urgence: { type: String, enum: ['basse', 'moyenne', 'haute', 'critique'], default: 'moyenne' },
    statut: { type: String, enum: ['en_attente', 'validee', 'refusee', 'transformee'], default: 'en_attente' },
    dateSouhaitee: { type: Date },
    interventionId: { type: String },
    motifRefus: { type: String }
}, { timestamps: true });

export const Demande = mongoose.model<IDemande>('Demande', DemandeSchema);