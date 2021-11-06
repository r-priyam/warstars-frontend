import { MotionPlugin } from '@vueuse/motion';
import App from './App.vue';
import './index.css';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(MotionPlugin);
app.mount('#app');
