import { MotionPlugin } from '@vueuse/motion';
import { createPinia } from 'pinia';
import App from './App.vue';
import './index.css';
import router from './router';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(MotionPlugin);
app.mount('#app');
