<template>
  <header id="Header">
    <section class="left-side-items-container">
      <section class="caution">
        試験まで
        <h2 :style="{ color: '#8dc4ef', margin: 0 }">{{ examLeftDate }}</h2>
        日
      </section>

      <section class="score">
        <section :style="{ alignItems: 'baseline' }">
          平均得点
          <h2 :style="{ color: '#fff', margin: '0 0 0 1rem' }">{{ score }}</h2>
          点
        </section>

        <section class="achievement-degree">
          達成度

          <div class="achievement-degree-line">
            <div
              :style="{
                backgroundColor: 'yellow',
                borderRadius: '1rem',
                flex: 0.6
              }"
            />
          </div>
        </section>
      </section>
    </section>

    <section class="navigation-buttons-container">
      <NavigationButton
        v-for="icon in icons"
        :key="icon.path"
        :icon="icon"
        :style="{ marginLeft: '1rem' }"
      />
    </section>
  </header>
</template>

<script>
// Components
import NavigationButton from "@/components/NavigationButton";

// Icons
import home from "@/assets/icon/home.png";
import diary from "@/assets/icon/diary.png";
import library from "@/assets/icon/library.png";
import live from "@/assets/icon/live.png";
import myPage from "@/assets/icon/myPage.png";

// 定数
const EXAM_LEFT_DATE = 123;
const SCORE = 62;

// Vue インスタンス
export default {
  components: { NavigationButton },

  data() {
    return {
      examLeftDate: EXAM_LEFT_DATE,
      score: SCORE,
      icons: [
        { path: home, title: "ホーム" },
        { path: library, title: "ライブラリー" },
        { path: live, title: "ライブ配信" },
        { path: diary, title: "ダイアリー" },
        { path: myPage, title: "マイページ" }
      ]
    };
  }
};
</script>

<style scoped>
* {
  display: flex;
  padding: 0;
}
#Header {
  align-items: center;
  background-color: #0d3f67;
  flex-direction: row;
  height: 7rem;
  justify-content: space-between;
  padding: 0 3rem;
}
.left-side-item {
  align-items: center;
}
.caution {
  align-items: baseline;
  background-color: #fff;
  border-radius: 0.3rem;
  height: 2rem;
  padding: 0 1rem 0.6rem 1rem;
}
.score {
  color: #fff;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-left: 3rem;
}
.achievement-degree {
  align-items: center;
  font-size: 12px;
  margin: 0;
}
.achievement-degree-line {
  border: 0.05rem solid #fff;
  border-radius: 1rem;
  flex: 1;
  height: 0.6rem;
  margin-left: 1rem;
}
.navigation-buttons-container {
  justify-content: space-around;
}
</style>
