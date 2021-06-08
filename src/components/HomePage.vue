<template>
  <div id="HomePage">
    <h1 v-if="!loginMessage">未アクセスです。</h1>
    <h1 v-else>アクセスに{{ loginMessage }}しました。</h1>

    <div class="button-group">
      <!-- NOTE: 実際の業務では認証を行うタイミングはボタンを押すときではなく、入る時点である。 -->
      <button class="button-common" @click="doAuthorize()">
        認証サーバーで認証
      </button>

      <button
        class="button-common"
        @click="callAPI()"
        :style="{ marginLeft: '1rem' }"
      >
        アクセス（APIコール）
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
      loginMessage: "",
      clientId: "my-client-1",
      clientSecret: "12345678",
      webServerDomain: "http://localhost:8081",
      authorizeServerDomain: "http://localhost:8090",
      timeoutTimer: null,
      refreshTokenTimer: null
    };
  },

  methods: {
    doAuthorize() {
      window.location = `${this.authorizeServerDomain}/oauth/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.webServerDomain}&scope=all`;
    },

    callAPI() {
      this.resetTokenTimeoutTimer();

      const accessToken = localStorage.getItem("access_token");

      // NOTE: ダミーの請求コード
      accessToken
        ? this.$axios({
            method: "get",
            url: "/static/api/api.json",
            headers: {
              Authorization: `Token ${accessToken}`
            }
          })
            .then(response => (this.loginMessage = "成功"))
            .catch(error => console.log("error", error))
        : (this.loginMessage = "失敗");
    },

    clearToken() {
      localStorage.clear();
      window.location = this.webServerDomain;
    },

    getUrlParameter(parameterName) {
      /**
       * location.search: "?xxx"の部分を戻す。
       * substring(1): "?"を無視した部分を戻す。
       */
      const parameters = window.location.search.substring(1);
      const parametersArray = parameters.split("&");

      const target = parametersArray.find(parameter => {
        return parameter.split("=")[0] === parameterName;
      });

      return target.split("=")[1];
    },

    sendGetTokenRequest() {
      /**
       * "Content-Type": "application/x-www-form-urlencoded" は
       * "key1=value1&key2=value2" の形のデータが必要。
       */
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", this.getUrlParameter("code"));
      params.append("redirect_uri", this.webServerDomain);
      params.append("client_id", this.clientId);

      // axios.post(url, data, config)
      this.$axios
        .post(`${this.authorizeServerDomain}/oauth/token`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // btoa(): Base64 にエンコード、デコードは atob()
            Authorization: `Basic ${btoa(
              `${this.clientId}:${this.clientSecret}`
            )}`
          }
        })
        .then(response => {
          const data = response.data;
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          window.location = this.webServerDomain;
        })
        .catch(error => console.log(error));
    },

    sendRefreshTokenRequest() {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        /**
         * "Content-Type": "application/x-www-form-urlencoded" は
         * "key1=value1&key2=value2" の形のデータが必要。
         */
        const params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", refreshToken);
        params.append("client_id", this.clientId);
        params.append("client_secret", this.clientSecret);

        // axios.post(url, data, config)
        this.$axios
          .post(`${this.authorizeServerDomain}/oauth/token`, params, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // btoa(): Base64 にエンコード、デコードは atob()
              Authorization: `Basic ${btoa(
                `${this.clientId}:${this.clientSecret}`
              )}`
            }
          })
          .then(response => {
            console.log("アクセストークンを更新する。");
            localStorage.setItem("access_token", response.data.access_token);
          })
          .catch(error => console.log(error));
      } else {
        clearInterval(this.refreshTokenTimer);
        console.log("トークンが無効になりました。");
      }
    },

    resetTokenTimeoutTimer() {
      clearTimeout(this.timeoutTimer);

      this.timeoutTimer = setTimeout(() => {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
      }, 5000);
    }
  },

  // html の描画完了後に実行される。
  mounted() {
    if (window.location.search.includes("code")) {
      this.sendGetTokenRequest();
    }

    if (localStorage.getItem("access_token")) {
      // 一定時間毎に refresh_token で access_token を更新
      this.refreshTokenTimer = setInterval(() => {
        this.sendRefreshTokenRequest();
      }, 4000);

      this.resetTokenTimeoutTimer();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-common {
  height: 2rem;
}
.button-group {
  margin-top: 1rem;
}
.clear-button {
  margin-top: 1rem;
}
</style>
