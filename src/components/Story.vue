<template>
  <section id="Story">
    <!-- 文章１ -->
    <article class="article">
      <header :style="{ alignSelf: 'center' }">
        <span>icon</span>
        <h3 :style="{ margin: '0 0 0 1rem' }">本日の講義</h3>
      </header>

      <section class="content-container">
        <section
          v-for="(item, index) in plan"
          :key="item.id.toString()"
          :style="{ flexDirection: 'column' }"
        >
          <hr v-if="index !== 0" width="100%" :style="{ marginTop: '1rem' }" />
          <PlanItem :item="item" />
        </section>
      </section>

      <span class="button"><b>演習テスト</b></span>
    </article>

    <!-- 文章２ -->
    <article class="article" :style="{ marginTop: '2rem' }">
      <header :style="{ alignSelf: 'center' }">
        <span>icon</span>
        <h3 :style="{ margin: '0 0 0 1rem' }">次回までの宿題</h3>
      </header>

      <section
        :style="{
          alignItems: 'baseline',
          alignSelf: 'center',
          marginTop: '2rem'
        }"
      >
        <h5 :style="{ color: 'silver', margin: 0 }">
          12/26提出
        </h5>

        <h3 :style="{ margin: '0 0 0 2rem' }">3</h3>

        <h5 :style="{ color: 'silver', margin: 0 }">{{ "/ 4" }}</h5>
      </section>

      <section class="content-container">
        <TableLine
          v-for="item in homework"
          :key="item.id.toString()"
          :item="item"
        />
      </section>
    </article>
  </section>
</template>

<script>
// Components
import PlanItem from "@/components/PlanItem.vue";
import TableLine from "@/components/TableLine.vue";

export default {
  components: { PlanItem, TableLine },
  data() {
    return {
      plan: [
        {
          id: 1,
          title: "プレテスト",
          beginTime: "09:30",
          elapsedTime: "15",
          overview: "講義概要これはダミーテキストですこれはダミーテキストです",
          body:
            "使用教材説明これはダミーテキストですダミーテキストですダミーテキストです",
          icon: "icon"
        },
        {
          id: 2,
          title: "プレテスト",
          beginTime: "09:30",
          elapsedTime: "15",
          overview: "講義概要これはダミーテキストですこれはダミーテキストです",
          body:
            "使用教材説明これはダミーテキストですダミーテキストですダミーテキストです",
          icon: "icon"
        },
        {
          id: 3,
          title: "プレテスト",
          beginTime: "09:30",
          elapsedTime: "15",
          overview: "講義概要これはダミーテキストですこれはダミーテキストです",
          body:
            "使用教材説明これはダミーテキストですダミーテキストですダミーテキストです",
          icon: ""
        },
        {
          id: 4,
          title: "プレテスト",
          beginTime: "09:30",
          elapsedTime: "15",
          overview: "講義概要これはダミーテキストですこれはダミーテキストです",
          body:
            "使用教材説明これはダミーテキストですダミーテキストですダミーテキストです",
          icon: ""
        }
      ],

      homework: [
        {
          id: 1,
          lesson: "講義名",
          content: "宿題内容これはダミーテキストです、これはダミーテキストです"
        },
        {
          id: 2,
          lesson: "講義名",
          content: "宿題内容これはダミーテキストです、これはダミーテキストです"
        },
        {
          id: 3,
          lesson: "講義名",
          content: "宿題内容これはダミーテキストです、これはダミーテキストです"
        },
        {
          id: 4,
          lesson: "講義名",
          content: "宿題内容これはダミーテキストです、これはダミーテキストです"
        }
      ]
    };
  }
};
</script>

<style scoped>
* {
  display: flex;
}
#Story {
  align-items: center;
  background-color: gainsboro;
  flex: 1;
  flex-direction: column;
  padding: 4rem 3rem 6rem 3rem;
}
.article {
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px silver;
  flex-direction: column;
  padding: 2rem;
  width: 45rem;
}
header {
  align-items: flex-end;
}
.content-container {
  flex: 1;
  flex-direction: column;
  margin-top: 3rem;
}
.button {
  align-items: center;
  align-self: center;
  background-color: #1ca1fd;
  border-radius: 0.5rem;
  color: #fff;
  height: 3rem;
  justify-content: center;
  margin-top: 3rem;
  width: 20rem;
}
</style>
