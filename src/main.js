import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './assets/css/global.css'


Vue.config.productionTip = false
Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://49.232.140.30:8080/word'

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
