import mongoose, { Schema, Document } from 'mongoose';
const TachePreventiveSchema = new Schema({
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
export const TachePreventive = mongoose.model('TachePreventive', TachePreventiveSchema);
//# sourceMappingURL=tachePreventive.js.map