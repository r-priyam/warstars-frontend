import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SignIn from '~/components/logIn.vue';
import Register from '~/components/signUp.vue';
import Home from '~/pages/HomePage.vue';
import NProgress from 'nprogress';
import NotFound from '~/pages/NotFound.vue';

const routes: RouteRecordRaw[] = [
	{ path: '/', component: Home },
	{ path: '/sign-in', component: SignIn, meta: { requiresAuth: true } },
	{ path: '/register', component: Register },
	{ path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(() => {
	NProgress.start();
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
