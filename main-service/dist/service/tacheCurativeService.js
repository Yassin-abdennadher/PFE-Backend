import { TacheCurative } from "../model/tacheCurative.js";
export const createTacheCur = async (data) => {
    try {
        if (!data)
            throw new Error(' aucune donnée trouvé ');
        return await TacheCurative.create(data);
    }
    catch (err) {
        return err.message;
    }
};
export const getAllTacheCur = async () => {
    try {
        const tachesCur = await TacheCurative.find();
        if (!tachesCur)
            throw new Error('Aucune Tache Trouvé');
        return tachesCur;
    }
    catch (err) {
        return err.message;
    }
};
export const getTacheById = async (id) => {
    try {
        if (!id)
            throw new Error('aucun id donnée');
        const TacheCur = await TacheCurative.findById(id);
        if (!TacheCur)
            throw new Error('Tache non Trouvé');
        return TacheCur;
    }
    catch (err) {
        return err.message;
    }
};
import axios from 'axios';
export const getTacheWithTechnicien = async (id) => {
    try {
        const tache = await TacheCurative.findById(id);
        if (!tache)
            throw new Error('Tâche non trouvée');
        const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/users/${tache.technicienId}`);
        return {
            ...tache.toObject(),
            technicien: response.data
        };
    }
    catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
};
export const updateTacheCur = async (id, updateData) => {
    try {
        if (!id)
            throw new Error('aucun id donnée');
        const TacheCur = await TacheCurative.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
        if (!TacheCur)
            throw new Error(' Aucune Tache Trouvé ');
        return TacheCur;
    }
    catch (err) {
        return err.message;
    }
};
export const deleteTacheCur = async (id) => {
    try {
        if (!id)
            throw new Error('aucun id donnée');
        const TacheCur = await TacheCurative.findByIdAndDelete(id);
        if (!TacheCur)
            throw new Error('Tache non Trouvé');
        return { message: 'Tache supprimée avec succès' };
    }
    catch (err) {
        return err.message;
    }
};
//# sourceMappingURL=tacheCurativeService.js.map