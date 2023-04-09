import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTippy from 'vue-tippy'

import './assets/main.css'
import 'tippy.js/dist/tippy.css'

const app = createApp(App)

app
    .use(store)
    .use(router)
    .use(VueTippy, {
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
        newestOnTop: true,
    });

app.mount('#app')
