import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
    userId: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message: string;
    read: boolean;
    data?: any;
    createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
    userId: {
        type: String,
        required: [true, 'UserId est requis'],
        index: true
    },
    type: {
        type: String,
        enum: ['info', 'warning', 'success', 'error'],
        default: 'info'
    },
    title: {
        type: String,
        required: [true, 'Le titre est requis'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Le message est requis'],
        trim: true
    },
    read: {
        type: Boolean,
        default: false
    },
    data: {
        type: Schema.Types.Mixed
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});


export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);