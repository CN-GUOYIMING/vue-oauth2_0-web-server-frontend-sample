import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/page/HomePage";
import ResetPassword from "@/page/ResetPassword";

Vue.use(Router);

export default new Router({
  mode: "history", // html5 history モード
  routes: [
    {
      path: "/home",
      name: "HomePage",
      component: HomePage
    },
    {
      path: "/resetpassword",
      name: "ResetPassword",
      component: ResetPassword
    }
  ]
});
