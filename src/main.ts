import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app: any = createApp(App);
app
  .use(store)
  .use(router)
  .mount('#app')
