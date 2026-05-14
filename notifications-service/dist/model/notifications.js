import mongoose, { Schema, Document } from 'mongoose';
const NotificationSchema = new Schema({
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
export const Notification = mongoose.model('Notification', NotificationSchema);
//# sourceMappingURL=notifications.js.map