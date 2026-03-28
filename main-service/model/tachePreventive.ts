import mongoose, { Schema, Document } from 'mongoose';

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

const TachePreventiveSchema = new Schema<ITachePreventive>({
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
        default: 'preventive',
        enum: ['preventive']
    },
    frequence: {
        type: String,
        required: true,
        enum: ['hebdomadaire', 'mensuel', 'trimestriel', 'annuel']
    },
    compteurRequis: {
        type: Number
    },
    dateProchaine: {
        type: Date,
        required: true
    },
    dateDerniere: {
        type: Date
    },
    statut: {
        type: String,
        default: 'planifiee',
        enum: ['planifiee', 'en_cours', 'terminee']
    }
}, { timestamps: true });

export const TachePreventive = mongoose.model<ITachePreventive>('TachePreventive', TachePreventiveSchema);