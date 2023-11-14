import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import uiComponents from '@/components/UI/index'
import Toast from 'vue-toastification'
import VueTheMask from 'vue-the-mask'

import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import 'vue-toastification/dist/index.css'
import './assets/main.scss'

const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable)
uiComponents.forEach((component) => {
  app.component(component.name, component)
})

app.use(store).use(router).use(VueTheMask).use(Toast, {
  position: 'bottom-center',
  timeout: 3000,
  draggable: true,
  draggablePercent: 0.7,
  pauseOnHover: true,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
  icon: true,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true
})

app.mount('#app')
