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
              name="userId"
              v-model="user.userId"
              placeholder="ユーザー名"
              type="text"
              class="textBox"
              maxlength="128"
              v-validate="'required:ユーザー名|alpha_num:ユーザー名|lengthBetween:ユーザー名,6,8'"
            />
            
          </section>
          <p class="error" v-show="errors.has('userId')">
            {{ errors.first('userId') }}
          </p>
          <section class="inputBox">
            <input 
              id="mailAddress"
              name="mailAddress"
              v-model="user.mailAddress"
              placeholder="メールアドレス"
              type="text"
              class="textBox"
              maxlength="128"
              v-validate="'required:メールアドレス|email:メールアドレス'"
            />
          </section>
          <p class="error" v-show="errors.has('mailAddress')">
            {{ errors.first('mailAddress') }}
          </p>
          <section class="inputBox">
            <input 
              id="birthday"
              name="birthday"
              v-model="user.birthday"
              placeholder="生年月日"
              type="text"
              class="textBox"
              maxlength="8"
              v-validate="'required:生年月日|isLength:生年月日,8|date_format:yyyyMMdd,生年月日'"
            />
          </section>
          <p class="exampleText">入力例)19800101</p>
          <p class="error" v-show="errors.has('birthday')">
            {{ errors.first('birthday') }}
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
      }
    },
    methods: {
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
        this.$validator.validate().then(valid => {
          if (!valid) {
            console.log("error");
          }else{
            const dataForSend = this.getFinalData();
            // TODO: API に dataForSend を送る。
            console.log(dataForSend);
          }
        });
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
