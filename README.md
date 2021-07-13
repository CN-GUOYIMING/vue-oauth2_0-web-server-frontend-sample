# Home Page (Web Server FrontEnd)

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

---

## 入口

- `/src/main.js`

## ドメイン

- 認証サーバー（バックエンドのコード）を「<http://localhost:8090>」に変更する必要がある。
- フロントエンドで認証サーバーのドメイン変更したい場合は`HomePage.vue`の 29 行目を参照してください。

## URI

- ./router/index.js を参照してください。
- `http://localhost:8081/`: HomePage.vue
- `http://localhost:8081/passwordregister`: PasswordRegister.vue
