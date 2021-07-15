<template>
  <section id="PasswordRegister" class="background">
    <section class="content-container">
      <!-- Header -->
      <header>
        <img src="@/assets/img/logo.png" alt="logo" />
      </header>

      <!-- Main -->
      <main class="password-register_container">
        <!-- Start Sign In Form -->

        <h2>パスワード登録</h2>

        <form class="form">
          <section class="inputBox">
            <input
              class="textBox"
              type="password"
              v-model="password"
              placeholder="現在のパスワード"
              maxlength="128"
              autocomplete="off"
            />
          </section>

          <p class="error" v-show="errorMessage.password">
            {{ errorMessage.password }}
          </p>

          <PasswordInput v-model="newPassword" :placeholder="'新パスワード'" />

          <p class="error" v-show="errorMessage.newPassword">
            {{ errorMessage.newPassword }}
          </p>

          <PasswordInput
            v-model="newPasswordConfirm"
            :placeholder="'新パスワード（確認用）'"
          />

          <p class="error" v-show="errorMessage.newPasswordConfirm">
            {{ errorMessage.newPasswordConfirm }}
          </p>

          <!-- NOTE:定義書に存在しない入力共通エラーを表示 -->
          <!-- <p class="error_whole" v-show="errorMessage.whole">
            {{ errorMessage.whole }}
          </p> -->

          <button id="register" type="button" @click="sendForm()">
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
// Components
import PasswordInput from "@/components/PasswordRegister/PasswordInput";
// エラー定義書
import errorsJSON from "@/assets/errors";

// Const
const TEXT_MAX_LENGTH = 16; // 最大入力文字数
const TEXT_MIN_LENGTH = 6; // 最小入力文字数
const KEYWORD_FOR_FILTER_VALIDATION_DATA = "password"; // 確認用のデータをフィルターする為のキーワード

const INPUT_TYPE = {
  TEXT: "text", // input タグの type 属性を text に
  PASSWORD: "password" // input タグの type 属性を password に
};

const ERROR = {
  PASSWORD_NOT_MATCH: "新パスワードの内容と一致することを確認してください。", // 新パスワードが一致しない
  EMPTY_EXIST: "この項目は入力必須です。", // 未入力項目が存在する
  DEFAULT: "エラーが存在します。" // エラーの存在を提示
};

const errorsList = {
  wronTextLength: errorsJSON.EC0002,
  wronText: errorsJSON.EC0003,
  passwordNotMatch: errorsJSON.EC0004
};

export default {
  components: { PasswordInput },
  data() {
    return {
      // TODO: ユーザーを特定するユーザーネームを受け取る。
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
      return this.isShowNewPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD;
    },

    newPasswordConfirmShowType() {
      return this.isShowNewPasswordConfirm
        ? INPUT_TYPE.TEXT
        : INPUT_TYPE.PASSWORD;
    }
  },

  methods: {
    sendForm() {
      // エラーメッセージをリセット
      const errors = this.errorMessage;
      Object.keys(errors).forEach(key => (errors[key] = ""));

      // エラーチェック
      if (this.checkIsErrorExist()) {
        console.log(ERROR.DEFAULT);
      } else {
        const dataForSend = this.getFinalData();

        // TODO: API に dataForSend を送る。
        console.log(dataForSend);
      }
    },

    checkIsErrorExist() {
      let isErrorExist = false;
      const passwordTextRegExp = /^[a-zA-Z0-9]+$/;
      const errors = this.errorMessage;

      // 空白が存在するかをチェック
      this.checkEmpty(this.$data);

      // TODO：現在のパスワードに間違いが無いかをチェック

      // 新パスワードの字数をチェック
      this.checkPasswordLength(this.newPassword);
      // if (
      //   this.newPassword.length < TEXT_MIN_LENGTH ||
      //   this.newPassword.length > TEXT_MAX_LENGTH
      // ) {
      //   errors.newPassword = errorsList.wronTextLength;
      // }

      // 新パスワードの記号をチェック
      if (!passwordTextRegExp.test(this.newPassword)) {
        errors.newPassword = errorsList.wronText;
      }

      // 新パスワードと新パスワード（確認用）が一致するかをチェック
      if (this.newPassword !== this.newPasswordConfirm) {
        errors.newPasswordConfirm = ERROR.PASSWORD_NOT_MATCH;
      }

      // エラーが存在すると戻す値を真に変更
      Object.keys(errors).forEach(key => {
        if (errors[key] !== "") {
          isErrorExist = true;
        }
      });

      return isErrorExist;
    },

    checkEmpty(input) {
      Object.keys(input).forEach(key => {
        if (key.toLowerCase().includes(KEYWORD_FOR_FILTER_VALIDATION_DATA)) {
          if (input[key] === "") {
            return (this.errorMessage[key] = ERROR.EMPTY_EXIST);
          }
        }
      });
    },

    checkPasswordLength(password) {
      if (
        password.length < TEXT_MIN_LENGTH ||
        password.length > TEXT_MAX_LENGTH
      ) {
        const data = this.$data;

        Object.keys(data).forEach(key => {
          if (data[key] === password) {
            return (this.errorMessage[key] = errorsList.wronTextLength);
          }
        });
      }
    },

    getFinalData() {
      const data = this.$data;
      const newData = {};

      newData.userName = data.userName;
      newData.password = data.password;
      newData.newPassword = data.newPassword;

      // 前後の空白を削除
      Object.keys(newData).forEach(key => {
        newData[key] = newData[key].trim();
      });

      return newData;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/index";

/** Mixins */
use-flex($direction = row, $mainAxis = null, $subAxis = null) {
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
  text-style(#f76cad, $size, bold)
  margin-top: $marginTop;
  text-align: left;
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
  use-flex(column, space-between, center);
  background-image: url("~@/assets/img/login_bg.png");
  background-position: center;
  background-size: cover;
  flex: 1;
  width: 100%;

  .content-container {
    use-flex(column, center, center);
    flex: .8;
    max-width: 600px;
    margin: 0 auto;
    padding: 80px 0 0;

    .password-register_container {
      use-flex(column, center, center);
      flex: 1;
      margin-top: 35px;
      width: 100%;

      h2 {
        text-style(#fff, 13px, bold);
        text-align: left;
        width: 260px;
      }

      form {
        use-flex(column, center, flex-start);
        flex-wrap: wrap;
        margin-top: 25px;
        width: 260px;
        z-index: 2;

        .inputBox {
          use-flex();
          flex: 1;
          height: 50px;
          width: 260px;

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
            width: 100%;
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
        }

        .chekbox-container {
          text-style(, 14px)
          margin-top: 10px
        }

        .error {
          error(12px, 10px);
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
    use-flex(column, , center)
    background-color: #0d3f67;
    flex: .2;
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
