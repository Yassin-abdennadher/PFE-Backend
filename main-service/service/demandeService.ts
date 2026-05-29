import { Demande } from "../model/demandes.js";


export const createDemande = async (data: any) => {
    try {
        if (!data) throw new Error("Aucune Demande a Ajouter");
        const demandeToAdd = {
            userId: data.userId,
            titre: data.titre,
            description: data.description,
            machineId: data.machineId,
            urgence: data.urgence,
            statut: data.statut,
            dateSouhaitee: data.dateSouhaitee || null,
            interventionId: data.interventionId || null ,
            motifRefus: data.motifRefus || null,
        };
        return await Demande.create(demandeToAdd);
    } catch (err: any) {
        return err.message;
    }
}

export const getAllDemande = async () => {
    try {
        const demande = await Demande.find();
        console.log(demande)
        if (!demande || demande.length === 0) throw new Error("Aucune Demande Trouvé");
        return demande;
    } catch (err: any) {
        return err.message;
    }
};

export const getDemandeById = async (id: string) => {
    try {
        const demande = await Demande.findById(id);
        if (!demande) throw new Error('demande Non Trouvé');
        return demande;
    } catch (err: any) {
        return err.message;
    }
};

export const updateDemande = async (id: string, updateData: any) => {
  try {
    const demande = await Demande.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!demande) {
      throw new Error("Demande non trouvée");
    }

    return demande;
  } catch (error) {
    throw error;
  }
};


export const deleteDemande = async (id: string) => {
    try {
        const demande = await Demande.findByIdAndDelete(id);
        
        if (!demande) {
            throw new Error('Demande Non Trouvée');
        }
        
        return { message: 'Demande supprimée avec succès' };
    } catch (err: any) {
        throw new Error(err.message);
    }
};
