import Vue from 'vue'
import {
	Button, NavBar, Toast, Badge, Panel, Tabbar, TabbarItem, Col, Row, Picker, Popup, Form, Field, Icon, Image, Dialog
} from 'vant'


Vue.use(Button).use(NavBar).use(Tabbar).use(TabbarItem).use(Col).use(Row).use(Picker).use(Popup).use(Form).use(
	Field).use(Icon).use(Image).use(Dialog).use(Panel).use(Badge)
Vue.prototype.$toast = Toast
