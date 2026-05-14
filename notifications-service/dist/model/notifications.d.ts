import mongoose, { Document } from 'mongoose';
export interface INotification extends Document {
    userId: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message: string;
    read: boolean;
    data?: any;
    createdAt: Date;
}
export declare const Notification: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification, {}, mongoose.DefaultSchemaOptions> & INotification & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, INotification>;
//# sourceMappingURL=notifications.d.ts.map