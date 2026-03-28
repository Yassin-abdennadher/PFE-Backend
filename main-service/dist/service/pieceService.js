import { Piece } from "../model/piece.js";
export const createPiece = async (data) => {
    try {
        if (!data)
            throw new Error(' aucune donnée trouvé ');
        return await Piece.create(data);
    }
    catch (err) {
        return err.message;
    }
};
export const getAllPiece = async () => {
    try {
        const pieces = await Piece.find();
        if (!pieces || pieces.length === 0)
            throw new Error('Aucune piece Trouvé');
        return pieces;
    }
    catch (err) {
        return err.message;
    }
};
export const getPieceById = async (id) => {
    try {
        if (!id)
            throw new Error('aucun id donnée');
        const piece = await Piece.findById(id);
        if (!piece)
            throw new Error('piece non Trouvé');
        return piece;
    }
    catch (err) {
        return err.message;
    }
};
export const updatePiece = async (id, updateData) => {
    try {
        if (!id)
            throw new Error('aucun id donnée');
        const piece = await Piece.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
        if (!piece)
            throw new Error(' Aucune piece Trouvé ');
        return piece;
    }
    catch (err) {
        return err.message;
    }
};
export const deletePiece = async (id) => {
    try {
        if (!id)
            throw new Error('aucun id donnée');
        const piece = await Piece.findByIdAndDelete(id);
        if (!piece)
            throw new Error('piece non Trouvé');
        return { message: 'piece supprimée avec succès' };
    }
    catch (err) {
        return err.message;
    }
};
//# sourceMappingURL=pieceService.js.map