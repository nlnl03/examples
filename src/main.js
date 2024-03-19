import { createApp } from "vue";
import App from "./App.vue"; // Update with your main App component path
import router from "./router"
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
  
createApp(App).use(Quasar, quasarUserOptions).use(router).mount("#app");



