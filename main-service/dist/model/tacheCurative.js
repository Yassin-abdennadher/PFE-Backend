import mongoose, { Schema, Document } from 'mongoose';
const TacheCurativeSchema = new Schema({
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
export const TacheCurative = mongoose.model('TacheCurative', TacheCurativeSchema);
//# sourceMappingURL=tacheCurative.js.map