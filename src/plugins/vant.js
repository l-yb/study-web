import Vue from 'vue'
import {
	Button, NavBar, Toast, Badge, Panel, Cell, Tabbar, TabbarItem, Col, Row, Picker, Popup,
	Form, Field, Icon, Image, Dialog, List, Tabs, Tab, IndexAnchor, Sticky, Search
} from 'vant'


Vue.use(Button).use(NavBar).use(Tabbar).use(TabbarItem).use(Col).use(Row).use(Picker).use(Popup).use(Form).use(
	Field).use(Icon).use(Image).use(Dialog).use(Panel).use(Badge).use(Cell).use(List).use(Tab).use(Tabs).use(
		IndexAnchor).use(Sticky).use(Search)
Vue.prototype.$toast = Toast
