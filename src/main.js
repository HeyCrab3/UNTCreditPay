import { createApp } from "vue";
import App from "./App.vue";
import router from "./components/router";
// import "~/styles/element/index.scss";
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "./styles/index.scss";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount("#app");