import Vue from 'vue'
import VueRouter from 'vue-router'
import WordIndex from '../views/word/index'
import Login from '../views/user/Login'
import Mine from '../views/user/Mine'
import WordList from '../views/word/List'
import WordSearch from '../views/word/search'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'Main', component: WordIndex },
	{ path: '/login', name: 'Login', component: Login, meta: {login: true} },
	{ path: '/word/list', name: 'WordList', component: WordList },
	{ path: '/word/search', name: 'WordSearch', component: WordSearch },
	{ path: '/my', name: 'Mine', component: Mine, meta: {auth: true} }
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => { //全局钩子函数
	to.matched.some((route) => {
		// to.matched.forEach((route) => {
		// console.log('auth:', route.meta.auth, 'route:', route)
		// auth 代表需要登录检查，login代表登录后该页面需要调整到首页，不需要再访问
		if (route.meta.auth) { //通过此操作可以判断哪些页面需要登录
			try {
				store.dispatch('user/getInfo')
				next()
			} catch (error) {
				console.log('error:', error)
				next({ name: 'login', params: { redirect: router.fullPath } })
			}
		} else {
			next();
		}
	});

})

export default router

