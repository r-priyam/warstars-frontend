import { defineStore } from 'pinia';

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
		removeNotification(id: number) {
			this.notifications.splice(
				this.notifications.findIndex((notification: TNotification) => notification.id === id),
				1,
			);
		},

		notify(title: string, text: string, timeout: number) {
			this.notificationId++;
			const notificationPayload = { id: this.notificationId, title: title, text: text };
			this.notifications.push(notificationPayload);
			setTimeout(() => this.removeNotification(this.notificationId), timeout);
		},

		info(text: string, timeout = 4000) {
			this.notify('Info', text, timeout);
		},

		success(text: string, timeout = 4000) {
			this.notify('Success', text, timeout);
		},

		warning(text: string, timeout = 4000) {
			this.notify('Warning', text, timeout);
		},

		error(text = 'Something went wrong!', timeout = 4000) {
			this.notify('Error', text, timeout);
		},
	},
});
