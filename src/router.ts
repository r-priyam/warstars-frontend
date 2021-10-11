import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '~/components/logIn.vue';
import Register from '~/components/signUp.vue';
import Home from '~/pages/Index.vue';

const routes = [
	{ path: '/', component: Home },
	{ path: '/sign-in', component: SignIn, meta: { requiresAuth: true } },
	{ path: '/register', component: Register },
	{ path: '/:pathMatch(.*)*', component: Home },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
