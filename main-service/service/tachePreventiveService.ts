import { TachePreventive } from "../model/tachePreventive.js";
import axios from 'axios';

const calculerNouvelleDate = (date: Date, frequence: string): Date => {
  const nouvelleDate = new Date(date);
  switch (frequence) {
    case 'hebdomadaire':
      nouvelleDate.setDate(nouvelleDate.getDate() + 7);
      break;
    case 'mensuel':
      nouvelleDate.setMonth(nouvelleDate.getMonth() + 1);
      break;
    case 'trimestriel':
      nouvelleDate.setMonth(nouvelleDate.getMonth() + 3);
      break;
    case 'annuel':
      nouvelleDate.setFullYear(nouvelleDate.getFullYear() + 1);
      break;
  }
  return nouvelleDate;
};

export const regenererTachesPreventives = async () => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // ✅ Récupérer les tâches dont la date est dépassée
    const taches = await TachePreventive.find({
      dateProchaine: { $lte: today }
    });

    let count = 0;
    for (const tache of taches) {
      // ✅ Calculer la date limite en fonction de la fréquence
      let dateLimite = new Date(tache.createdAt);
      
      switch (tache.frequence) {
        case 'hebdomadaire':
          dateLimite.setDate(dateLimite.getDate() + 7);
          break;
        case 'mensuel':
          dateLimite.setMonth(dateLimite.getMonth() + 1);
          break;
        case 'trimestriel':
          dateLimite.setMonth(dateLimite.getMonth() + 3);
          break;
        case 'annuel':
          dateLimite.setFullYear(dateLimite.getFullYear() + 1);
          break;
      }
      
      // ✅ Vérifier si la tâche est dans la période de régénération
      if (dateLimite < today) {
        console.log(`⏭️ Tâche trop ancienne (créée le ${tache.createdAt}), ignorée`);
        continue;  // ← PAS DE RÉGÉNÉRATION
      }
      
      // ✅ Vérifier si une tâche existe déjà pour éviter les doublons
      const nouvelleDate = calculerNouvelleDate(tache.dateProchaine, tache.frequence);
      
      const existante = await TachePreventive.findOne({
        titre: tache.titre,
        machineId: tache.machineId,
        dateProchaine: nouvelleDate
      });
      
      if (existante) {
        console.log(`⏭️ Tâche déjà régénérée pour ${nouvelleDate}`);
        continue;
      }
      
      // ✅ Créer la nouvelle tâche
      const nouvelleTache = new TachePreventive({
        titre: tache.titre,
        description: tache.description,
        machineId: tache.machineId,
        technicienId: tache.technicienId,
        frequence: tache.frequence,
        compteurRequis: tache.compteurRequis,
        dateProchaine: nouvelleDate,
        dateDerniere: tache.dateProchaine,
        statut: 'planifiee'
      });
      
      await nouvelleTache.save();
      count++;
    }
    
    console.log(`✅ ${count} tâches préventives régénérées`);
    return count;
  } catch (error) {
    console.error('❌ Erreur régénération:', error);
    throw error;
  }
};

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