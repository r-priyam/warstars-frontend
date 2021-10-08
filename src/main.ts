import { MotionPlugin } from '@vueuse/motion';
import { store } from '~/store/index';
import App from './App.vue';
import './index.css';
import router from './router';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(MotionPlugin);
app.mount('#app');
