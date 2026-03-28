import { TachePreventive } from "../model/tachePreventive.js";
import axios from 'axios';

export const createTachePrev = async (data: any) => {
    try {
        if (!data) throw new Error(' aucune donnée trouvé ');
        return await TachePreventive.create(data);
    } catch (err: any) {
        return err.message;
    }
};

export const getAllTachePrev = async () => {
    try {
        const tachesPrev = await TachePreventive.find();
        if (!tachesPrev || tachesPrev.length === 0) throw new Error('Aucune Tache Trouvé');
        return tachesPrev;
    } catch (err: any) {
        return err.message;
    }
};

export const getTacheById = async (id: string) => {
    try {
        if (!id) throw new Error('aucun id donnée');
        const tachePrev = await TachePreventive.findById(id);
        if (!tachePrev) throw new Error('Tache non Trouvé');
        return tachePrev;
    } catch (err: any) {
        return err.message;
    }
};

export const getTacheWithTechnicien = async (id: string) => {
  try {
    const tache = await TachePreventive.findById(id);
    if (!tache) throw new Error('Tâche non trouvée');
    
    const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/users/${tache.technicienId}`);
    
    return {
      ...tache.toObject(),
      technicien: response.data
    };
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

export const updateTachePrev = async (id: string, updateData: any) => {
    try {
        if (!id) throw new Error('aucun id donnée');
        const tachePrev = await TachePreventive.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        if (!tachePrev) throw new Error(' Aucune Tache Trouvé ');
        return tachePrev;
    } catch (err: any) {
        return err.message
    }
};

export const deleteTachePrev = async (id: string) => {
    try {
        if (!id) throw new Error('aucun id donnée');
        const tachePrev = await TachePreventive.findByIdAndDelete(id);
        if (!tachePrev) throw new Error('Tache non Trouvé');
        return { message: 'Tache supprimée avec succès' };
    } catch (err: any) {
        return err.message;
    }
};