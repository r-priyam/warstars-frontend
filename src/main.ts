import { store } from '~/store/index';
import App from './App.vue';
import './index.css';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
