import mongoose, { Schema, Document } from 'mongoose';
const MachineSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'Le nom est requis'],
        trim: true,
        maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
    },
    type: {
        type: String,
        required: [true, 'Le type est requis'],
        trim: true
    },
    marque: {
        type: String,
        required: [true, 'La marque est requise'],
        trim: true
    },
    modele: {
        type: String,
        required: [true, 'Le modèle est requis'],
        trim: true
    },
    numeroSerie: {
        type: String,
        required: [true, 'Le numéro de série est requis'],
        unique: true,
        trim: true,
        uppercase: true
    },
    localisation: {
        type: String,
        required: [true, 'La localisation est requise'],
        trim: true
    },
    dateAchat: {
        type: Date,
        required: [true, "La date d'achat est requise"]
    },
    statut: {
        type: String,
        enum: ['actif', 'en_panne', 'en_maintenance', 'hors_service'],
        default: 'actif',
        required: true
    },
    fournisseur: {
        type: String,
        required: [true, 'Le fournisseur est requis'],
        trim: true
    },
    contactFournisseur: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});
export const Machine = mongoose.model('Machine', MachineSchema);
//# sourceMappingURL=machine.js.map