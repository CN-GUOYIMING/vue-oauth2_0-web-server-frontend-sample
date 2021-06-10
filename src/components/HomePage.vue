<template>
  <div id="HomePage">
    <!-- 
      - テンプレート構文：<tag>{{ 変数 / script 式 }}</tag> 
      - "{{}}": Mustache 文法 
      - HTML の属性に vue の接頭辞（指令）：
        - 無い場合：引用符内の値は文字列として解析。
        - 在る場合：引用符内の値は Mustache 文法として解析。 
      -->
    <!-- 
      v-if vs v-show:
      - v-if は切り替え中に dom を破棄と再生成をする。
      - v-show は dom の css（display） を変更するだけ。

      v-for: 
      - <tag v-for="item in items" :key="item" />
      - <tag v-for="(item, index) in items" :key="item" />
      - <tag v-for="item of items" :key="item" />
      - <tag v-for="(value, key, index) in object" :key="item" />

      v-if と v-for の同時使用：
      - v-for の優先順位が高い。
      -->
    <h1 v-if="!loginMessage">未アクセスです。</h1>
    <h1 v-else>アクセスに{{ loginMessage }}しました。</h1>

    <div class="button-group">
      <!-- NOTE: 実際の業務では認証を行うタイミングはボタンを押すときではなく、入る時点である。 -->
      <button class="button-common" @click="doAuthorize()">
        認証サーバーで認証
      </button>

      <!-- ":": v-bind:; "@": v-on:; -->
      <!--
        V-on:
        - $event で原始 DOM イベントをアクセスすることが出来る。  
          - <tag @click="myFunction($event)" />
        - イベント修飾子：
          - DOM イベントに対する処理、event.stopPropagation() の機能と類似
          - <tag @submit.prevent="submit" /> // イベント実行後の画面のリロードを停止
          - 繋げて使用可：@click.stop.prevent="submit"
          - 値を指定せずに利用可：@submit.prevent
        - HTML でイベントを監視するメリット：scrpit 文と DOM とのカップリングを解除できる。

       -->
      <button
        class="button-common"
        @click="callAPI()"
        :style="{ marginLeft: '1rem' }"
      >
        アクセス（トークンでデータを請求）
      </button>
    </div>

    <button class="clear-button" @click="resetPage()">
      画面をリセット（開発用）
    </button>

    <!-- 
      v-model: 双方向データバインド 
      - フォーム要素への監視、ユーザーの入力を Vue インスタンスの状態に自動保存
      - 以下の両者は同じ：
        - <input v-model="name" >
        - <input :value="name" @input="name = $event.target.value">
      - チェックボックス、ラジオボタン：:checked, @change
      - セレクトボックス：:value, @change
      - カスタムコンポーネント：model: { prop, event } でカスタム可能
      - 修飾子が存在する。
      -->
  </div>
</template>

<script>
// Dependencies
import axios from "axios";

// 定数
const CLIENT_ID = "my-client-1"; // web サーバーの ID
const CLIENT_SECRET = "12345678"; // web サーバーの パス

const CHARSET = {
  CONTENT_TYPE: "utf-8" // 請求で送るデータのコーディング方式
};

const DOMAINS = {
  AUTHORIZE_SERVER: "http://localhost:8090", // 認証サーバーのドメイン
  WEB_SERVER: "http://localhost:8081" // web サーバーのドメイン
};

const GRANT_TYPES = {
  GET_TOKEN_FIRST_TIME: "authorization_code", // 認証コードでデータを請求
  REFRESH_TOKEN: "refresh_token" // 更新トークンでデータを請求
};

const KEYS = {
  LAST_ACTIVE_TIME: "last_active_time", // ユーザーの最後に活動した時間
  CLIENT_ID: "client_id", // web サーバー ID のキー名
  CLIENT_SECRET: "client_secret", // web サーバーパスのキー名
  REDIRECT_URI: "redirect_uri", // リダイレクト URI のキー名
  RESPONSE_TYPE: "response_type", // OAUTH2.0 の応答のタイプのキー名
  GRANT_TYPE: "grant_type", // 認証方法のキー名
  CODE: "code", // 一次認証で取得したコードのキー名
  ACCESS_TOKEN: "access_token", // アクセストークンのキー名
  REFRESH_TOKEN: "refresh_token" // 更新トークンのキー名
};

const MARKS = {
  PARAMETER_SPLITER: "&", // URI のパラメーターの分割符号
  KEY_VALUE_SPLITER: "=" // URI のパラメーターのキーと値の分割符号
};

const RESPONSE_TYPE = "code"; // 認証コードモード
const SEND_DATA_FORMAT = "x-www-form-urlencoded"; // key=value&...のフォーマット

const REFRESH_INTERVAL = 4000; // アクセストークンの自動更新間隔
const TIMEOUT_TIME = 5000; // トークンのタイムアウト時間

const URIS = {
  AUTHORIZE: `${DOMAINS.AUTHORIZE_SERVER}/oauth/authorize?${KEYS.RESPONSE_TYPE}=${RESPONSE_TYPE}&${KEYS.CLIENT_ID}=${CLIENT_ID}&${KEYS.REDIRECT_URI}=${DOMAINS.WEB_SERVER}&scope=all`, // 認証ページ
  GET_TOKEN: `${DOMAINS.AUTHORIZE_SERVER}/oauth/token` // トークン取得用の API
};

// Vue オブジェクト
export default {
  name: "HomePage",

  /**
   * vm.$data でアクセス可能。
   * vm.x は vm.$data.x と同じ。
   */
  data() {
    return {
      loginMessage: "",
      timeoutTimer: null,
      refreshTokenTimer: null
    };
  },

  methods: {
    refreshActiveTime() {
      localStorage.setItem(KEYS.LAST_ACTIVE_TIME, new Date().getTime());
    },

    doAuthorize() {
      window.location = URIS.AUTHORIZE;
    },

    callAPI() {
      this.refreshActiveTime();

      // NOTE: トークンによる請求を模擬
      this.loginMessage = localStorage.getItem(KEYS.ACCESS_TOKEN)
        ? "成功"
        : "失敗";
    },

    resetPage() {
      localStorage.clear();
      window.location = this.webServerDomain;
    },

    getUrlParameter(parameterName) {
      /**
       * location.search: "?xxx"の部分を戻す。
       * substring(1): "?"を無視した部分を戻す。
       */
      const parameters = window.location.search.substring(1);
      const parametersArray = parameters.split(MARKS.PARAMETER_SPLITER);

      const target = parametersArray.find(parameter => {
        return parameter.split(MARKS.KEY_VALUE_SPLITER)[0] === parameterName;
      });

      return target.split(MARKS.KEY_VALUE_SPLITER)[1];
    },

    // async / await でコールバック地獄を回避
    async sendGetTokenRequest(parameters) {
      // axios.post(url, data, config)
      const response = await axios.post(URIS.GET_TOKEN, parameters, {
        headers: {
          "Content-Type": `application/${SEND_DATA_FORMAT};charset=${CHARSET.CONTENT_TYPE}`,
          // btoa(): Base64 にエンコード、デコードは atob()
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
        }
      });

      return [response.data.access_token, response.data.refresh_token];
    },

    async getToken() {
      try {
        /**
         * リクエストのパラメーターを作成。
         * "Content-Type": "application/x-www-form-urlencoded" は
         * "key1=value1&key2=value2" の形のデータが必要。
         */
        const parameters = new URLSearchParams();
        parameters.append(KEYS.GRANT_TYPE, GRANT_TYPES.GET_TOKEN_FIRST_TIME);
        parameters.append(KEYS.CODE, this.getUrlParameter(KEYS.CODE));
        parameters.append(KEYS.REDIRECT_URI, DOMAINS.WEB_SERVER);
        parameters.append(KEYS.CLIENT_ID, CLIENT_ID);

        // 認証サーバーにトークンを請求する。
        const [accessToken, refreshToken] = await this.sendGetTokenRequest(
          parameters
        );

        // トークンを local storage に保存する。
        localStorage.setItem(KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);

        // トークンを session storage に保存する。
        // sessionStorage.setItem(KEYS.ACCESS_TOKEN, accessToken);
        // sessionStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);

        // アドレス欄をパラメーター無しの状態に戻す（遷移が発生する）。
        window.location = DOMAINS.WEB_SERVER;
      } catch (error) {
        console.log(error);
      }
    },

    async refreshToken() {
      try {
        /**
         * リクエストのパラメーターを作成。
         * "Content-Type": "application/x-www-form-urlencoded" は
         * "key1=value1&key2=value2" の形のデータが必要。
         */
        const parameters = new URLSearchParams();
        parameters.append(KEYS.GRANT_TYPE, GRANT_TYPES.REFRESH_TOKEN);
        parameters.append(
          KEYS.REFRESH_TOKEN,
          localStorage.getItem(KEYS.REFRESH_TOKEN)
        );
        parameters.append(KEYS.CLIENT_ID, CLIENT_ID);
        parameters.append(KEYS.CLIENT_SECRET, CLIENT_SECRET);

        // 認証サーバーにトークンを請求する。
        const [accessToken] = await this.sendGetTokenRequest(parameters);

        // 更新されたトークンを local storage に保存する。
        localStorage.setItem(KEYS.ACCESS_TOKEN, accessToken);
      } catch (error) {
        console.log(error);
      }
    },

    clearToken() {
      localStorage.removeItem(KEYS.REFRESH_TOKEN);
      localStorage.removeItem(KEYS.ACCESS_TOKEN);
    }
  },

  /**
   * ライフサイクル：
   * - beforeCreate: インスタンスは生成されたがデータが初期化される前
   * - created: インスタンスが生成され､且つデータが初期化された後
   * - beforeMount: インスタンスが DOM 要素（ルートディレクトリ下の index.html ）にマウントされる前
   * - mounted: インスタンスが DOM 要素にマウントされた後
   * - beforeUpdate: データは更新されたが DOM に適用される前
   * - updated: データが更新され､且つ DOM に適用された後
   * - beforeDestroy: Vue インスタンスが破壊される前
   * - destroyed: Vue インスタンスが破壊された後
   */
  mounted() {
    console.log(this.__proto__);
    this.refreshActiveTime();

    if (window.location.search.includes(KEYS.CODE)) {
      this.getToken();
    }

    /**
     * NOTE:
     * トークンを取得したと検出すると、
     * 一定時間毎に refresh_token で access_token を更新するタイマーを起動。
     *
     * タイムアウトの場合、トークンをクリアする。
     */
    if (localStorage.getItem(KEYS.ACCESS_TOKEN)) {
      const refreshTokenTimer = setInterval(() => {
        const thisActiveTime = new Date().getTime();
        const lastActiveTime = localStorage.getItem(KEYS.LAST_ACTIVE_TIME);
        const isTimeout = thisActiveTime - lastActiveTime > TIMEOUT_TIME;

        if (isTimeout) {
          this.clearToken();
          clearInterval(refreshTokenTimer);
        } else {
          this.refreshToken();
        }
      }, REFRESH_INTERVAL);
    }
  }

  /**
   * 算出属性：
   * - computed: {}
   * - Mustache 文法内で仕様される複雑ロジックのカプセル化用。
   * - リアクティブ式依存なので、依存が変化しない限り再計算されない。
   * - 手動で setter を定義することで算出属性に値を与えることが出来る。
   */

  /**
   * ウォッチャ：
   * - データの変化に反応する。
   * - 主にデータ変更時の非同期処理で使用する。
   *
   */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-common {
  height: 2rem;
}
.button-group {
  margin-top: 1rem;
}
.clear-button {
  margin-top: 1rem;
}
</style>
