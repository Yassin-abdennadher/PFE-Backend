export declare const createNotification: (notif: any) => Promise<import("mongoose").Document<unknown, {}, import("../model/notifications.js").INotification, {}, import("mongoose").DefaultSchemaOptions> & import("../model/notifications.js").INotification & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getUserNotifications: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../model/notifications.js").INotification, {}, import("mongoose").DefaultSchemaOptions> & import("../model/notifications.js").INotification & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getUnreadCount: (userId: string) => Promise<number>;
export declare const markAsRead: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../model/notifications.js").INotification, {}, import("mongoose").DefaultSchemaOptions> & import("../model/notifications.js").INotification & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const markAllAsRead: (userId: string) => Promise<import("mongoose").UpdateWriteOpResult>;
export declare const deleteNotification: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../model/notifications.js").INotification, {}, import("mongoose").DefaultSchemaOptions> & import("../model/notifications.js").INotification & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
//# sourceMappingURL=notificationsService.d.ts.map