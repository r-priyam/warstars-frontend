import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import { store } from '~/store/index';
import './index.css';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
