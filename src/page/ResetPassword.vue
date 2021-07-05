<template>
  <section id="ResetPassword" class="background">
    <section class="content-container">
      <!-- Header -->
      <header>
        <img src="@/assets/img/logo.png" alt="logo" />
      </header>

      <!-- Main -->
      <main class="reset-password_container">
        <!-- Start Sign In Form -->

        <h2>パスワードを再設定</h2>
        <form class="form">
          <input
            class="textBox"
            type="text"
            :value="userName"
            disabled
            :style="{ marginTop: '0' }"
          />

          <input
            class="textBox"
            type="password"
            v-model="password"
            placeholder="現在のパスワード"
          />

          <p class="error" v-show="errorMessage.password">
            {{ errorMessage.password }}
          </p>

          <input
            class="textBox"
            :type="newPasswordShowType"
            v-model="newPassword"
            placeholder="新パスワード"
          />

          <label class="chekbox-container">
            <input type="checkbox" v-model="isShowNewPassword" />
            新パスワードを表示する
          </label>

          <p class="error" v-show="errorMessage.newPassword">
            {{ errorMessage.newPassword }}
          </p>

          <input
            class="textBox"
            :type="newPasswordConfirmShowType"
            v-model="newPasswordConfirm"
            placeholder="新パスワード（確認用）"
          />

          <label class="chekbox-container">
            <input type="checkbox" v-model="isShowNewPasswordConfirm" />
            新パスワード（確認用）を表示する
          </label>

          <p class="error" v-show="errorMessage.newPasswordConfirm">
            {{ errorMessage.newPasswordConfirm }}
          </p>

          <p class="note">
            <a href="" alt="#">利用規約</a>
            ・
            <a href="" alt="#">プライバシポリシー</a>
          </p>

          <p class="error_whole" v-show="errorMessage.whole">
            {{ errorMessage.whole }}
          </p>

          <button type="button" @click="sendForm()">
            上記に同意してパスワードを再設定
          </button>
        </form>

        <!-- END Sign In Form -->
      </main>
    </section>

    <footer>
      <section class="footer_logo">
        <img src="~@/assets/img/logo.svg" alt="logo" />
      </section>

      <section class="copyright">©︎2021 SOGO SHIKAKU CO.,LTD</section>
    </footer>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userName: "user", // ユーザーに確認用、前のページから受け取る
      password: "",
      newPassword: "",
      isShowNewPassword: false,
      newPasswordConfirm: "",
      isShowNewPasswordConfirm: false,
      errorMessage: {
        password: "",
        newPassword: "",
        newPasswordConfirm: "",
        whole: ""
      }
    };
  },

  computed: {
    newPasswordShowType() {
      return this.isShowNewPassword ? "text" : "password";
    },

    newPasswordConfirmShowType() {
      return this.isShowNewPasswordConfirm ? "text" : "password";
    }
  },

  methods: {
    sendForm() {
      console.log("TODO: Send form to API");
    }
  }
};
</script>

<style lang="stylus">
@import "~@/assets/stylus/index"

/** Mixins */
useFlex($direction = row, $mainAxis = null, $subAxis = null) {
  align-items: $subAxis;
  display: flex;
  flex-direction: $direction;
  justify-content: $mainAxis;
}

text-style($color = #000, $size = null, $weight = normal) {
  color: $color;
  font-size: $size;
  font-weight: $weight;
}

error($size = 12px, $marginTop = null) {
  text-style(red, $size, bold)
  margin-top: $marginTop;
  text-align: center;
}

/** Style */
input::-webkit-input-placeholder {
  text-style(rgba(255, 255, 255, 0.7), , 300)
}

input::-moz-placeholder {
  text-style(rgba(255, 255, 255, 0.7), , 300)
  opacity: 1;
}

.background {
  useFlex(column, space-between, center);
  background-image: url("~@/assets/img/login_bg.png");
  background-position : center;
  background-size: cover;
  height: 100vh;
  width: 100%;

  .content-container {
    useFlex(column, , center);
    max-width: 600px;
    margin: 0 auto;
    padding: 80px 0px 0px;

    .reset-password_container {
      useFlex(column);
      flex: 1;
      margin-top: 35px
      width: 100%;

      h2 {
        text-style(#fff, 13px, bold);
        text-align: left;
        width: 260px;
      }

      form {
        useFlex(column);
        margin-top: 25px;
        z-index: 2;

        .textBox {
          text-style(#fff, 12px, 260);
          background-color: rgba(255, 255, 255, 0.2);
          outline: 0;
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 5px;
          height: 50px;
          text-align: left;
          padding: 0px 15px;
          margin: 20px auto 0 auto;
          display: block;
          width: 260px;
          -webkit-appearance: none;
             -moz-appearance: none;
                  appearance: none;
          -webkit-transition-duration: 0.25s;
                  transition-duration: 0.25s;

          &:hover {
            background-color: fade(#fff, 40%);
          }

          &:focus {
            background-color: #fff;
            color: #333;
            font-size: 16px;
            width: 260px;
          }
        }

        .chekbox-container {
          text-style(, 14px)
          margin-top: 10px
        }

        .error {
          error(12px, 10px);
        }

        .note {
          text-style(#fff, 12px);
          margin: 40px auto 0 auto;
          text-align: center;
          width: 260px;

          a {
            color: #fff;
          }
        }

        .error_whole {
          error(16px, 25px);
        }

        button {
          text-style(#fff, 14px, bold);
          outline: 0;
          appearance: none;
          background-color: #1ca1fd;
          border: 0;
          border-radius: 5px;
          cursor: pointer;
          height: 50px;
          margin: 25px auto 0 auto;
          padding: 10px 15px;
          transition-duration: 0.25s;
          vertical-align: middle;
          width: 260px;
          -moz-appearance: none;
          -webkit-transition-duration: 0.25s;
          -webkit-appearance: none;

          &:active {
            background-color: #0d3f67;
          }
        }
      }
    }
  }

  footer {
    useFlex(column, , center)
    background-color: #0d3f67;
    height: 100vh;
    margin-top: 75px;
    padding: 35px 0;
    width: 100%;

    .footer_logo {
      margin: 0px auto 30px;
      width: 138px;

      img {
        width: 100%
      }
    }

    .copyright {
      text-style(rgba(255, 255, 255, 0.6), 10px)
      letter-spacing: 3px;
      padding-bottom: 40px;
      transform: scale(0.8);
      text-align: center;
      -webkit-transform: scale(0.8);
    }
  }
}
</style>
