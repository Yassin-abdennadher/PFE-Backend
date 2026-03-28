import { Machine } from "../model/machine.js";


export const createMachine = async (data: any) => {
    try {
        if (!data) throw new Error("Aucune Machine a Ajouter");
        const machineToAdd = {
            nom: data.nom,
            type: data.type,
            marque: data.marque,
            modele: data.modele,
            numeroSerie: data.numeroSerie,
            localisation: data.localisation,
            dateAchat: data.dateAchat,
            statut: data.statut || 'actif',
            fournisseur: data.fournisseur,
            contactFournisseur: data.contactFournisseur
        };
        return await Machine.create(machineToAdd);
    } catch (err: any) {
        return err.message;
    }
}

export const getAllMachine = async () => {
    try {
        const machine = await Machine.find();
        console.log(machine)
        if (!machine || machine.length === 0) throw new Error("Aucune Machine Trouvé");
        return machine;
    } catch (err: any) {
        return err.message;
    }
};

export const getMachineById = async (id: string) => {
    try {
        const machine = await Machine.findById(id);
        if (!machine) throw new Error('Machine Non Trouvé');
        return machine;
    } catch (err: any) {
        return err.message;
    }
};

export const updateMachine = async (id: string, updateData: any) => {
  try {
    const machine = await Machine.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!machine) {
      throw new Error("Machine non trouvée");
    }

    return machine;
  } catch (error) {
    throw error;
  }
};


export const deleteMachine = async (id: string) => {
    try {
        const machine = await Machine.findByIdAndDelete(id);
        
        if (!machine) {
            throw new Error('Machine Non Trouvée');
        }
        
        return { message: 'Machine supprimée avec succès' };
    } catch (err: any) {
        throw new Error(err.message);
    }
};
