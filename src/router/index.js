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
	{ path: '/login', name: 'Login', component: Login },
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
		if (route.meta.auth) { //通过此操作可以判断哪些页面需要登录
			try {
				const { data } = store.dispatch('user/getInfo')
				console.log('role:', data, 'user:', store.user)
				next()
			} catch (error) {
				next({ name: 'login', params: { path: route.path } })
			}
		} else {
			next();
		}
	});

})

export default router
