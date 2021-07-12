<!-- 遷移元画面から下記のように：  -->
<!-- <router-link :to="{ name: 'QrAttendCert', params: { qrcode: 'helloworld' }}">QrcodeGenerator</router-link>  -->
<template>
  <section id="QrAttendCert">
    <div class="container">
      <!-- Header -->
      <header  class="header">
        <div>
          <div>
            <router-link to="./"><img src="~@/assets/img/pageBack.svg" alt="pageBack"/></router-link>
          </div>
          <h1  class="h1" alt="受講証">受講証</h1>
        </div>
      </header>
      <main>
        <p id="qrCodeGuide">読み取り端末にQRコードをかざしてください</p>

        <div>
          <vue-qrcode id="qrCode" v-if="targetText" :value="targetText" :options="option" tag="img"></vue-qrcode>
        </div>
      </main>
    </div>
  </section>
</template>

<script>
import VueQrcode  from "@chenfengyuan/vue-qrcode";


export default {
  components: {
    VueQrcode
  },
  data: function() {
    return {
      targetText: this.$route.params.qrcode,
      option: {
        errorCorrectionLevel: "H",
        maskPattern: 0,
        margin: 4,
        scale: 2,
        width: 176,
        color: {
          dark: "#000000FF",
          light: "#FFFFFFFF"
        }
      }
    };
  }
}
</script>


<style lang="stylus">
h1 {
  font-size: 32px;
}

</style>
