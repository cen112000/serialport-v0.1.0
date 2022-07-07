import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//animate动画库
import "animate.css/animate.min.css";
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

// import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
// VXETable.use(VXETablePluginExportXLSX)

createApp(App).use(store).use(router).use(VXETable).mount("#app");
