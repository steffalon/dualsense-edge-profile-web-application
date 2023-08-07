import { createApp } from "vue";
import App from "./App.vue";
import Unsupported from "./Unsupported.vue";

if (navigator.hid) {
    createApp(App).mount("#app");
} else {
    createApp(Unsupported).mount("#app");
}