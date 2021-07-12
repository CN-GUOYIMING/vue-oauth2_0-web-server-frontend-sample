import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/page/HomePage";
import PasswordReset from "@/page/PasswordReset";
import QrAttendCert from "@/page/QrAttendCert";

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
    {
      path: "/QrAttendCert/:qrcode",
      name: "QrAttendCert",
      component: QrAttendCert
    },
  ]
});
