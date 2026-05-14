import express from 'express';
const router = express.Router();
import * as notificationsService from '../service/notificationsService.js'

router.post('/', async (req, res) => {
    const notification = await notificationsService.createNotification(req.body);
    if (!notification) return res.status(400).json({ message: "Erreur Creation notification" });
    return res.status(201).json({ message: "notification crée avec succes", notification });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || id === '') return res.status(400).json({ message: 'ID manquant' });
    const notifications = await notificationsService.getUserNotifications(id);
    if (!notifications) return res.status(404).json({ message: "aucune notifications trouvée" });
    return res.status(200).json(notifications);
});

router.patch('/:id/read', async (req, res) => {
    const { id } = req.params;
    const notification = await notificationsService.markAsRead(id);
    res.json(notification);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await notificationsService.deleteNotification(id);
    res.json({ message: 'Notification supprimée' });
});

export default router; 