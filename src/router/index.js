import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/page/HomePage";
import PasswordRegister from "@/page/PasswordRegister";
import PasswordReset from "@/page/PasswordReset";

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
      path: "/passwordregister",
      name: "PasswordRegister",
      component: PasswordRegister
    },
    {
      path: "/passwordreset",
      name: "PasswordReset",
      component: PasswordReset
    }
  ]
});
