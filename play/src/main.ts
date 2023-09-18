

import { createApp } from "vue";
import App from "./app.vue";
import { SIcon } from "@smart-design/components/icon";
import '@smart-design/theme-chalk/src/index.scss'
const app = createApp(App);
app.use(SIcon);
app.mount("#app");
