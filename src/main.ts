import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://api.exchangeratesapi.io";

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
