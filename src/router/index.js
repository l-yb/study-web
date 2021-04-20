import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/word/Main'
import Login from '../views/user/Login'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Main',
		component: Main
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	}
]

const router = new VueRouter({
	routes
})

export default router
