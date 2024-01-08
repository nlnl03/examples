import { createApp } from 'vue'
 import App from './App.vue'; // Update with your main App component path
// import router from './router'; 

import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import VueKonva from 'vue-konva';

createApp(App).use(Quasar, quasarUserOptions).use(VueKonva).mount('#app')
