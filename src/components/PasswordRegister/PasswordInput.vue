<template>
  <section id="PasswordInput">
    <section class="container">
      <section class="input_container">
        <input
          class="input_content"
          :type="type"
          :value="value"
          :placeholder="placeholder"
          maxlength="128"
          autocomplete="off"
          @input="$emit('input', $event.target.value)"
          @focus="setIconBackgroundColor('#fff')"
          @blur="handleInputBoxOnBlur()"
        />
      </section>

      <section
        class="eye_container"
        :style="{ backgroundColor: iconBackgroundColor }"
        @click="setIsShowPassword()"
      >
        <span><img :src="iconEye"/></span>
      </section>
    </section>
  </section>
</template>

<script>
// Icon
import openedEye from "@/assets/icon/eye_open.png";
import closedEye from "@/assets/icon/eye_close.png";

// Const
const ICON_DEFAULT_BACKGROUND_COLOR = "rgba(255, 255, 255, 0.2)";
const INPUT_TYPE = {
  TEXT: "text", // input タグの type 属性を text に
  PASSWORD: "password" // input タグの type 属性を password に
};

export default {
  props: ["value", "placeholder", "checkIsErrorExist"],
  data() {
    return {
      iconBackgroundColor: ICON_DEFAULT_BACKGROUND_COLOR,
      isShowPassword: false
    };
  },
  computed: {
    iconEye() {
      return this.isShowPassword ? openedEye : closedEye;
    },
    type() {
      return this.isShowPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD;
    }
  },
  methods: {
    setIconBackgroundColor(color) {
      this.iconBackgroundColor = color;
    },
    setIsShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    handleInputBoxOnBlur() {
      this.setIconBackgroundColor(ICON_DEFAULT_BACKGROUND_COLOR);

      // イベントをカスタマイズする。最初の引数はカスタマイズできるイベント名。
      this.$emit("blur");
    }
  }
};
</script>

<style lang="stylus" scoped>
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

/** Style */
input::-webkit-input-placeholder {
  text-style(rgba(255, 255, 255, 0.7), , 300)
}

input::-moz-placeholder {
  text-style(rgba(255, 255, 255, 0.7), , 300)
  opacity: 1;
}

.container {
  use-flex(, , center);
  height: 50px;
  margin: 20px auto 0 auto;
  width: 260px;

  .input_container {
    use-flex(, , center);
    flex: .85;
    height: 100%;

    .input_content {
      use-flex();
      text-style(#fff, 12px, 260);
      background-color: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-right: 0;
      border-radius: 5px 0 0 5px;
      flex: 1
      height: 100%;
      outline: 0;
      padding: 0 0 0 15px;
      text-align: left;
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
      }
    }
  }

  .eye_container {
    use-flex(, center, center);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-left : 0
    border-radius: 0 5px 5px 0;
    flex: .15
    height: 100%;
    outline: 0;
    padding: 0 15px 0 0;
    -webkit-transition-duration: 0.25s;
            transition-duration: 0.25s;
  }
}
</style>
