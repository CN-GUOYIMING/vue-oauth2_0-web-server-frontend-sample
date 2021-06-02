<template>
  <div id="HomePage">
    <h1>My token is：{{ token }}</h1>

    <iframe v-show="isOpenLogin" src="http://localhost:8080/" ref="iframe" />

    <div class="button-group">
      <button class="button-common" @click="moveToLogin()">認証</button>

      <button class="button-common call-button" @click="callAPI()">
        APIコール
      </button>
    </div>

    <button class="clear-button" @click="clearToken()">Clear Token</button>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      token: "",
      isOpenLogin: false
    };
  },
  methods: {
    moveToLogin() {
      if (!this.token) this.isOpenLogin = true;
    },

    clearToken() {
      this.token = "";
      location.reload();
    },

    callAPI() {
      this.$axios({
        method: "get",
        url: "/static/api/api.json",
        headers: { Authorization: `Token ${this.token}` }
      })
        .then(response => console.log("response", response))
        .catch(error => console.log("error", error));
    }
  },
  created() {
    const domains = [
      "http://localhost:8080/" // ログイン画面を持つサーバー
    ];

    /**
     * 子画面で
     * window.parent.postMessage(data, "伝送先のドメインアドレス");
     * でデータを発信すると受信できる。
     */
    window.addEventListener("message", event => {
      // セキュリティ対策
      if (!domains.includes(event.origin)) return;

      this.token = event.data.token;
      this.isOpenLogin = false;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-common {
  height: 1.5rem;
  width: 5rem;
}
.button-group {
  margin-top: 1rem;
}
.call-button {
  margin-left: 1rem;
}
.clear-button {
  margin-top: 1rem;
}
</style>
