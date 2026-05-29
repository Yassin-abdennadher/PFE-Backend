import { Notification } from "../model/notifications.js";
import { io } from '../index.js';
import { sendEmail } from "./emailNotifService.js";

export const createNotification = async (notif: any) => {
    try {
        if (!notif) throw new Error('Aucune notification donnée');
        
        const notifToAdd = {
            userId: notif.userId,
            email : notif.email , 
            type: notif.type || 'info',
            title: notif.title,
            message: notif.message,
            read: false,
            data: notif.data || null
        };
        
        const notification = await Notification.create(notifToAdd);
        console.log('✅ Notification stockée en base');
        if(notifToAdd.type === 'warning' || notifToAdd.type === 'error'){
            console.log('📧 Tentative envoi email à:', notifToAdd.email);
            try{
            await sendEmail(notifToAdd.email, notifToAdd.title, notifToAdd.message);
            console.log('✅ Email envoyé avec succès');
        }catch(emailError){
            console.error('❌ Erreur envoi email:', emailError);
        }}
        
        // Envoi temps réel via socket
        io.to(`user-${notif.userId}`).emit('new-notification', notification);
        
        return notification;
        
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const getUserNotifications = async (userId: string) => {
    try {
        return await Notification.find({ userId }).sort({ createdAt: -1 });
    } catch (err: any) {
        return [];
    }
};

export const getUnreadCount = async (userId: string) => {
    try {
        return await Notification.countDocuments({ userId, read: false });
    } catch (err: any) {
        return 0;
    }
};

export const markAsRead = async (id: string) => {
    try {
        return await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const markAllAsRead = async (userId: string) => {
    try {
        return await Notification.updateMany({ userId, read: false }, { read: true });
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const deleteNotification = async (id: string) => {
    try {
        return await Notification.findByIdAndDelete(id);
    } catch (err: any) {
        throw new Error(err.message);
    }
};