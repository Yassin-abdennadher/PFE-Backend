import { Notification } from "../model/notifications.js";
import { io } from '../index.js';
export const createNotification = async (notif) => {
    try {
        if (!notif)
            throw new Error('Aucune notification donnée');
        const notifToAdd = {
            userId: notif.userId,
            type: notif.type || 'info',
            title: notif.title,
            message: notif.message,
            read: false,
            data: notif.data || null
        };
        const notification = await Notification.create(notifToAdd);
        // Envoi temps réel via socket
        io.to(`user-${notif.userId}`).emit('new-notification', notification);
        return notification;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
export const getUserNotifications = async (userId) => {
    try {
        return await Notification.find({ userId }).sort({ createdAt: -1 });
    }
    catch (err) {
        return [];
    }
};
export const getUnreadCount = async (userId) => {
    try {
        return await Notification.countDocuments({ userId, read: false });
    }
    catch (err) {
        return 0;
    }
};
export const markAsRead = async (id) => {
    try {
        return await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    }
    catch (err) {
        throw new Error(err.message);
    }
};
export const markAllAsRead = async (userId) => {
    try {
        return await Notification.updateMany({ userId, read: false }, { read: true });
    }
    catch (err) {
        throw new Error(err.message);
    }
};
export const deleteNotification = async (id) => {
    try {
        return await Notification.findByIdAndDelete(id);
    }
    catch (err) {
        throw new Error(err.message);
    }
};
//# sourceMappingURL=notificationsService.js.map