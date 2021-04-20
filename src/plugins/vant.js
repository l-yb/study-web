import Vue from 'vue'
import {
	Button, NavBar, Toast, Tabbar, TabbarItem, Col, Row, Picker, Popup, Form, Field, Icon
} from 'vant'


Vue.use(Button).use(NavBar).use(Tabbar).use(TabbarItem).use(Col).use(Row).use(Picker).use(Popup).use(Form).use(
	Field).use(Icon)
Vue.prototype.$toast = Toast
