import { createApp } from "vue";
import App from "./App.vue"; // Update with your main App component path
import router from "./router";

createApp(App).use(router).mount("#app");
