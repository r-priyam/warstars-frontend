import { acceptHMRUpdate, defineStore } from 'pinia';

interface TNotification {
	id?: number;
	title: string;
	text?: string;
}

interface TNotifications {
	notificationId: number;
	notifications: TNotification[];
}

export const notifications = defineStore({
	id: 'notifications',
	state: (): TNotifications => ({ notificationId: 0, notifications: [] }),
	actions: {
		notify(notification: TNotification, timeout?: number) {
			this.notificationId++;
			notification.id = notification.id ?? this.notificationId;
			notification.text = notification.text ?? 'Something went wrong! Please try again.';
			this.notifications.push(notification);
			setTimeout(() => this.removeNotification(notification.id!), timeout ?? 4000);
		},

		removeNotification(id: number) {
			this.notifications.splice(
				this.notifications.findIndex((noti: TNotification) => noti.id === id),
				1,
			);
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(notifications, import.meta.hot));
}
