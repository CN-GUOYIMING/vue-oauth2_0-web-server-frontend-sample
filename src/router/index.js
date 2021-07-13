import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/page/HomePage";
import PasswordRegister from "@/page/PasswordRegister";

Vue.use(Router);

export default new Router({
  mode: "history", // html5 history モード
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage
    },
    {
      path: "/PasswordRegister",
      name: "PasswordRegister",
      component: PasswordRegister
    }
  ]
});
