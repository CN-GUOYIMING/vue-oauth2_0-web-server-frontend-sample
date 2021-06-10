// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

/**
 * url に # が付けられた理由：
 * ソース内に xxx のディレクトリが存在しないので、
 * index.html#/xxx でブラウザを欺く。
 */
/**
 * Vue インスタンス：
 * - const vm = new Vue({option});
 * - vm: viewModal
 * - リアクティブ式：option内の data に定義されてあった値が変化すると画面が再描画される。
 * - マウントする html ファイルは /config/index.js>build>index でカスタム可能。
 */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
