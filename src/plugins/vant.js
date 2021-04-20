import Vue from 'vue'
import {
	Button, NavBar, Toast, Tabbar, TabbarItem, Col, Row, Picker, Popup
} from 'vant'


Vue.use(Button)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(Picker)
Vue.use(Popup)
Vue.prototype.$toast = Toast
