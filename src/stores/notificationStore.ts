import { atom } from 'nanostores';

export type Notification = {
    message: string;
    type: 'success' | 'error' | 'info';
};

export const notificationStore = atom<Notification | null>(null);

export const showNotification = (notification: Notification) => {
    notificationStore.set(notification);
    setTimeout(() => notificationStore.set(null), 3000);
};
