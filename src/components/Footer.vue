<template>
  <section id="Footer">
    <section class="introduction">
      <span>よくある質問</span>
      <span :style="{ marginLeft: '2rem' }">お問い合わせ</span>
      <span :style="{ marginLeft: '2rem' }">個人情報保護方針</span>
    </section>

    <section :style="{ alignItems: 'flex-end', marginTop: '3rem' }">
      <span>icon</span>
      <span :style="{ fontSize: '22px', marginLeft: '1rem' }">
        総合資格学院
      </span>
    </section>

    <span :style="{ fontSize: '12px', marginTop: '2rem' }">
      ©2021 SOGO SHIKAKU CO.,LTD
    </span>
  </section>
</template>

<style scoped>
* {
  display: flex;
}
#Footer {
  align-items: center;
  background-color: #0d3f67;
  color: #fff;
  flex-direction: column;
  height: 14rem;
  justify-content: center;
}
.introduction {
  font-size: 14px;
}
</style>
