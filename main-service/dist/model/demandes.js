import mongoose, { Schema, Document } from 'mongoose';
const DemandeSchema = new Schema({
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
export const Demande = mongoose.model('Demande', DemandeSchema);
//# sourceMappingURL=demandes.js.map