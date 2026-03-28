import axios from 'axios';
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }
        const response = await axios.post(`${AUTH_SERVICE_URL}/verify`, {}, {
            headers: {
                'Authorization': token
            }
        });
        const data = response.data;
        if (!data.valid) {
            return res.status(401).json({ message: 'Non authentifié' });
        }
        req.user = data.user;
        next();
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('❌ Erreur auth-service:', error.message);
            if (error.response?.status === 401) {
                return res.status(401).json({ message: 'Token invalide' });
            }
            return res.status(503).json({
                message: 'Service d\'authentification indisponible'
            });
        }
        console.error('❌ Erreur inattendue:', error);
        res.status(500).json({ message: 'Erreur interne' });
    }
};
//# sourceMappingURL=authMiddleware.js.map