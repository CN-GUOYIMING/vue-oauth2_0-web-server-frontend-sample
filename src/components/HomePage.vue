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

    // async / await でコールバック地獄を消滅
    async sendGetTokenRequest(parameters) {
      // axios.post(url, data, config)
      const response = await this.$axios.post(
        `${this.authorizeServerDomain}/oauth/token`,
        parameters,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            // btoa(): Base64 にエンコード、デコードは atob()
            Authorization: `Basic ${btoa(
              `${this.clientId}:${this.clientSecret}`
            )}`
          }
        }
      );

      return [response.data.access_token, response.data.refresh_token];
    },

    async getToken() {
      try {
        /**
         * リクエストのパラメーターを作成。
         * "Content-Type": "application/x-www-form-urlencoded" は
         * "key1=value1&key2=value2" の形のデータが必要。
         */
        const parameters = new URLSearchParams();
        parameters.append("grant_type", "authorization_code");
        parameters.append("code", this.getUrlParameter("code"));
        parameters.append("redirect_uri", this.webServerDomain);
        parameters.append("client_id", this.clientId);

        // 認証サーバーにトークンを請求する。
        const [accessToken, refreshToken] = await this.sendGetTokenRequest(
          parameters
        );

        // トークンを local storage に保存する。
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        // アドレス欄をパラメーター無しの状態に戻す（遷移が発生する）。
        window.location = this.webServerDomain;
      } catch (error) {
        console.log(error);
      }
    },

    async sendRefreshTokenRequest() {
      try {
        // アクセストークンの更新トークンを取得。
        const refreshToken = localStorage.getItem("refresh_token");

        // 更新トークンが存在する場合、アクセストークンを更新する；存在しない場合は更新タイマーを停止する。
        if (refreshToken) {
          /**
           * リクエストのパラメーターを作成。
           * "Content-Type": "application/x-www-form-urlencoded" は
           * "key1=value1&key2=value2" の形のデータが必要。
           */
          const parameters = new URLSearchParams();
          parameters.append("grant_type", "refresh_token");
          parameters.append("refresh_token", refreshToken);
          parameters.append("client_id", this.clientId);
          parameters.append("client_secret", this.clientSecret);

          // 認証サーバーにトークンを請求する。
          const [accessToken] = await this.sendGetTokenRequest(parameters);

          // 更新されたトークンを local storage に保存する。
          localStorage.setItem("access_token", accessToken);
          console.log("アクセストークンを更新した。");
        } else {
          clearInterval(this.refreshTokenTimer);
          console.log("トークンが無効になりました。");
        }
      } catch (error) {
        console.log(error);
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
      this.getToken();
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
