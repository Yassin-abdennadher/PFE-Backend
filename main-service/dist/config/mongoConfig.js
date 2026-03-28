import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI)
            throw new Error('URI de mongo introuvable');
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connecté avec succès');
    }
    catch (error) {
        console.error('❌ Erreur de connexion MongoDB:', error);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=mongoConfig.js.map