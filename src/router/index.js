import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/page/HomePage";
import PasswordReset from "@/page/PasswordReset";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage
    },
    {
      path: "/PasswordReset",
      name: "PasswordReset",
      component: PasswordReset
    },

  ]
});
