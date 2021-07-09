<template>
  <section id="PasswordReset" class="background">
    <section class="content-container">
      <!-- Header -->
      <header>
        <img src="@/assets/img/logo.png" alt="logo" />
      </header>

      <!-- Main -->
      <main class="reset-password_container">
        <!-- Start Sign In Form -->

        <h2>パスワードリセット</h2>
        <form class="form">
          <section class="inputBox">
            <input 
              id="userId"
              v-model="user.userId"
              placeholder="ユーザー名"
              type="text"
              class="textBox"
              maxlength="128"
            />
          </section>
          <p class="error" v-show="errorMessage.userId">
            {{ errorMessage.userId }}
          </p>
          <section class="inputBox">
            <input 
              id="mailAddress"
              v-model="user.mailAddress"
              placeholder="メールアドレス"
              type="text"
              class="textBox"
              maxlength="128"
            />
          </section>
          <p class="error" v-show="errorMessage.mailAddress">
            {{ errorMessage.mailAddress }}
          </p>
          <section class="inputBox">
            <input 
              id="birthday"
              v-model="user.birthday"
              placeholder="生年月日"
              type="text"
              class="textBox"
              maxlength="8"
            />
          </section>
          <p class="exampleText">入力例)19800101</p>
          <p class="error" v-show="errorMessage.birthday">
            {{ errorMessage.birthday }}
          </p>

          <button type="button" @click="sendForm()">
            パスワードリセット
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

  const ERROR = {
    WRONG_USERID_TEXT_LENGTH: "EC0002: ユーザー名は6~8桁で入力してください。", 
    WRONG_USERID_TYPE: "EC0001: ユーザー名は半角英数字で入力してください。", 
    WRONG_MAILADDRESS: "EC0006: 有効なメールアドレスを入力してください。", 
    WRONG_BIRTHDAY_TYPE: "EC0005: 生年月日は数字で入力してください。", 
    WRONG_BIRTHDAY_LENGTH: "EC0002: 生年月日は8桁で入力してください。", 
    WRONG_BIRTHDAY_EXIST: "EC0007: 生年月日は正しい日付を入力してください。", 
  };

  export default {
    data() {
      return {
        // add submitting, error, success
        submitting: false,
        error: false,
        success: false,
        user: {
          userId: '',
          mailAddress: '',
          birthday: '',
        },
        errorMessage: {
          userId: "",
          mailAddress: "",
          birthday: "",
        }
      }
    },
    methods: {

      checkUserIdIsErrorExist() {
        let isUserIdErrorExist = false;
        const userIdTextRegExp = /^[a-zA-Z0-9]+$/;
        const errors = this.errorMessage;
        // Const
        const TEXT_MAX_LENGTH = 8; // 最大入力文字数
        const TEXT_MIN_LENGTH = 6; // 最小入力文字数
        // TODO：ユーザ名をチェック
        if ( this.user.userId.length < TEXT_MIN_LENGTH ||
             this.user.userId.length > TEXT_MAX_LENGTH ) {
          // ユーザ名桁数をチェック
          errors.userId = ERROR.WRONG_USERID_TEXT_LENGTH;
          isUserIdErrorExist = true;
        }else if(!userIdTextRegExp.test(this.user.userId)) {
          // ユーザ名タイプをチェック
          errors.userId = ERROR.WRONG_USERID_TYPE;
          isUserIdErrorExist = true;
        }

        if(!isUserIdErrorExist){
          errors.userId = "";
        }
        return isUserIdErrorExist;
      },
      checkMailAddressIsErrorExist() {
        let isMailAddressErrorExist = false;
        const mailAddressTextRegExp = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
        const errors = this.errorMessage;
       
        // TODO：メールアドレスをチェック
        if (!mailAddressTextRegExp.test(this.user.mailAddress)) {
          // メールアドレス形式をチェック
          errors.mailAddress = ERROR.WRONG_MAILADDRESS;
          isMailAddressErrorExist = true;
        }

        if(!isMailAddressErrorExist){
          errors.mailAddress = "";
        }
        return isMailAddressErrorExist;
      },
      checkBirthdayIsErrorExist() {
        let isBirthdayErrorExist = false;
        const birthdayTextRegExp = /^[0-9]{8}$/;
        const errors = this.errorMessage;
       
        // TODO：生年月日をチェック
        // 生年月日桁数をチェック
        if ( this.user.birthday.length !== 8 ) {
          errors.birthday = ERROR.WRONG_BIRTHDAY_LENGTH;
          isBirthdayErrorExist = true;
        }else if(!birthdayTextRegExp.test(this.user.birthday)) {
          // 生年月日形式をチェック
          errors.birthday = ERROR.WRONG_BIRTHDAY_TYPE;
          isBirthdayErrorExist = true;
        }else if(!this.isExistDate(this.user.birthday)){
          // 生年月日存在チェック
          errors.birthday = ERROR.WRONG_BIRTHDAY_EXIST;
          isBirthdayErrorExist = true;
        }

        if(!isBirthdayErrorExist){
          errors.birthday = "";
        }
        return isBirthdayErrorExist;
      },
      isExistDate(yyyymmdd){
        //年,月,日を取得する
        let y = parseInt(yyyymmdd.substr(0,4));
        let m = parseInt(yyyymmdd.substr(4,2)) -1;  //月は0～11で指定するため-1しています。
        let d = parseInt(yyyymmdd.substr(6,2));
        let dt = new Date(y, m, d);
        //判定する
        return (y == dt.getFullYear() && m == dt.getMonth() && d == dt.getDate());
      },
      getFinalData() {
        const data = this.$data;
        const newData = {};

        newData.userId = data.user.userId;
        newData.birthday = data.user.birthday;
        newData.mailAddress = data.user.mailAddress;

        // 前後の空白を削除
        Object.keys(newData).forEach(key => {
          newData[key] = newData[key].trim();
        });

        return newData;
      },
      sendForm() {
        // エラーメッセージをリセット
        const errors = this.errorMessage;
        Object.keys(errors).forEach(key => (errors[key] = ""));
        this.checkUserIdIsErrorExist();
        this.checkMailAddressIsErrorExist();
        this.checkBirthdayIsErrorExist();
        // エラーチェック

        if (errors.userId !== "" || errors.mailAddress !== "" || errors.birthday !== "") {
          console.log("error");
        } else {
          const dataForSend = this.getFinalData();

          // TODO: API に dataForSend を送る。
          console.log(dataForSend);
        }
      }
    },
  }
</script>


<style lang="stylus">
@import "~@/assets/stylus/index"

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

    .reset-password_container {
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
        use-flex(column, center, center);
        // flex-wrap: wrap;
        margin-top: 25px;
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

        .note {
          text-style(#fff, 12px);
          margin: 40px auto 0 auto;
          text-align: center;
          width: 260px;

          a {
            color: #fff;
          }
        }
        .exampleText {
          text-style(#fff, 12px);
          margin: 5px auto 0 auto;
          text-align: center;
          width: 260px;
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
