import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import './assets/styles/variables.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')