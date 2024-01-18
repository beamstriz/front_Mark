import { createApp } from 'vue'
import App from './App.vue'
//vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';
// import Vuetify from 'vuetify/lib';

import router from './router/router'

const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App)

app.use(vuetify);
app.use(router);

app.mount('#app');