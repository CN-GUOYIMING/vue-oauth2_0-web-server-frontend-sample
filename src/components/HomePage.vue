<template>
  <div id="HomePage">
    <h1 v-if="loginMessage === ''">未アクセスです。</h1>
    <h1 v-else>アクセスに{{ loginMessage }}しました。</h1>

    <div class="button-group">
      <button class="button-common" @click="goToAuthorize()">
        認証サーバーで認証
      </button>

      <button class="button-common call-button" @click="callAPI()">
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
      clientPassword: "12345678",
      myDomain: "http://localhost:8081",
      targetDomain: "http://localhost:8090"
    };
  },

  methods: {
    goToAuthorize() {
      window.location = `${this.targetDomain}/oauth/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.myDomain}&scope=all`;
    },

    clearToken() {
      localStorage.clear();
      window.location = this.myDomain;
    },

    callAPI() {
      const token = localStorage.getItem("token");

      token
        ? this.$axios({
            method: "get",
            url: "/static/api/api.json",
            headers: { Authorization: `Token ${token}` }
          })
            .then(response => (this.loginMessage = "成功"))
            .catch(error => console.log("error", error))
        : (this.loginMessage = "失敗");
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
    }
  },

  created() {
    if (window.location.search.includes("code")) {
      this.$axios
        .post(`${this.targetDomain}/oauth/token`, {
          data: {
            grant_type: "authorization_code",
            code: this.getUrlParameter("code"),
            redirect_uri: this.myDomain,
            client_id: "my-client-1"
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: java.util.Base64.getEncoder().encodeToString(
              `${this.clientId}:${this.clientPassword}`.getBytes()
            )
          }
        })
        .then(response => {
          data = response.data;
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
        })
        .catch(error => console.log(error));
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
.call-button {
  margin-left: 1rem;
}
.clear-button {
  margin-top: 1rem;
}
</style>
