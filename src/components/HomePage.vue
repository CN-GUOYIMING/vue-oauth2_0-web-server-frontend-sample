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
      clientId: "client01",
      authorizeState: "authorization01"
    };
  },

  methods: {
    goToAuthorize() {
      window.location = `http://localhost:8080/?client_id=${this.clientId}&redirect_uri=http://localhost:8081/callback&response_type=code&state=${this.authorizeState}`;
    },

    clearToken() {
      localStorage.clear();
      window.location = "http://localhost:8081";
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
    if (window.location.search.includes("token")) {
      localStorage.setItem("token", this.getUrlParameter("token"));
    } else if (window.location.search.includes("code")) {
      if (this.getUrlParameter("state") === this.authorizeState) {
        window.location = `http://localhost:8080/?code=${this.getUrlParameter(
          "code"
        )}&client_id=${
          this.clientId
        }&client_secret=password&redirect_uri=http://localhost:8081/callback`;
      }
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
