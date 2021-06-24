<template>
  <section id="Topic" class="background">
    <section class="container">
      <section class="left-container">
        <img
          src="https://thumb.ac-illust.com/ab/ab5f9a71435719d69c05f71bf024aac2_w.jpeg"
          height="200rem"
          width="350rem"
          :style="{ borderRadius: '.5rem', objectFit: 'cover' }"
          alt="グラフ"
        />

        <section class="notice-box">
          <header
            :style="{ alignItems: 'flex-end', justifyContent: 'space-between' }"
          >
            <h3 :style="{ margin: 0 }">お知らせ</h3>

            <span :style="{ color: '#1ca1fd' }">
              一覧 <b :style="{ marginLeft: '1rem' }">＞</b>
            </span>
          </header>

          <hr width="100%" :style="{ marginTop: '1rem' }" />

          <article :style="{ alignItems: 'center', marginTop: '.5rem' }">
            <section :style="{ flexDirection: 'column', fontSize: '12px' }">
              <span class="highlight">試験情報 </span>
              <span :style="{ marginTop: '.3rem' }">2021.05.05</span>
            </section>

            <div
              :style="{
                fontSize: '14px',
                marginLeft: '1rem',
                textDecoration: 'underline'
              }"
            >
              これはダミーのテキストですこれはダミーのテキストですこれはダミーの。
            </div>
          </article>
        </section>
      </section>

      <section class="right-container">
        <header :style="{ alignItems: 'flex-end', padding: '1rem' }">
          <span>icon</span>
          <h3 :style="{ margin: '0 0 0 1rem' }">最近見た講義</h3>
          <h3 :style="{ color: 'silver', margin: 0 }">（人気の講義など）</h3>
        </header>

        <section
          :style="{ width: '36rem', overflow: 'scroll', padding: '0 1rem' }"
        >
          <Thesis />
          <Thesis class="thesis" />
          <Thesis class="thesis" />
        </section>
      </section>
    </section>
  </section>
</template>

<script>
// Components
import Thesis from "@/components/Thesis.vue";

export default {
  components: { Thesis }
};
</script>

<style scoped>
* {
  display: flex;
}
#Topic {
  background: url("https://thumb.photo-ac.com/ce/cebb17c6e56406f2a8b79571d72c3638_w.jpeg")
    no-repeat;
  background-size: cover;
  height: 30rem;
}
.container {
  background-color: #1ca1fd80;
  flex: 1;
  justify-content: center;
  padding: 3rem;
}
.left-container {
  flex-direction: column;
  justify-content: space-between;
  flex: 0.25;
}
.notice-box {
  background-color: #fff;
  border-radius: 0.5rem;
  flex-direction: column;
  height: 8rem;
  justify-content: center;
  margin-top: 1rem;
  padding: 1rem;
}
.highlight {
  align-items: center;
  background-color: #1ca1fd;
  border-radius: 0.8rem;
  color: #fff;
  justify-content: center;
  padding: ".3rem .3rem";
}
.right-container {
  background-color: #fff;
  border-radius: 0.5rem;
  flex: 0.5;
  flex-direction: column;
  margin-left: 3rem;
}
.thesis {
  margin-left: 1rem;
}
</style>
