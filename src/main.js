import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './routes'

import './index.css'

const pinia = createPinia()
pinia.use(piniaPersistedstate) 

const app = createApp(App)
app.use(router)
app.use(createPinia())

app.mount('#app')
