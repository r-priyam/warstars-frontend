import { acceptHMRUpdate, defineStore } from 'pinia';

export interface TNotification {
	id: number;
	title: string;
	text: string;
}

interface TNotifications {
	notificationId: number;
	notifications: TNotification[];
}

export const notifications = defineStore({
	id: 'notifications',
	state: (): TNotifications => ({ notificationId: 0, notifications: [] }),
	actions: {
		incrementId() {
			this.notificationId++;
		},

		notify(notification: TNotification, timeout: number) {
			this.incrementId();
			this.notifications.push(notification);
			setTimeout(() => {
				this.removeNotification(notification.id);
			}, timeout || 4000);
		},

		removeNotification(id: number) {
			this.notifications.splice(
				this.notifications.findIndex((n: TNotification) => n.id === id),
				1,
			);
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(notifications, import.meta.hot));
}
