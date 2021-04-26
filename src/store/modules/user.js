import { login, logout, getInfo } from '../../api/user'
import { localToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
	return {
		token: localToken(),
		name: '未登录',
		cname: 'anyone',
		user_sn: '0000',
		gender: '',
		avatar_url: '',
		avatar_id: '',
		role: {}
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_SN: (state, user_sn) => {
		state.user_sn = user_sn
	},
	SET_GENDER: (state, gender) => {
		state.gender = gender
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR_ID: (state, avatar_id) => {
		state.avatar_id = avatar_id
	},
	SET_CNAME: (state, cname) => {
		state.cname = cname
	},
	SET_AVATAR_URL: (state, avatar_url) => {
		state.avatar_url = avatar_url
	},
	SET_ROLE: (state, role) => {
		state.role = role
	}
}

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { username, password } = userInfo
		return new Promise((resolve, reject) => {
			login({ username: username.trim(), password: password }).then(response => {
				const data = response
				commit('SET_TOKEN', data.token)
				setToken(data.token)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// get user info
	getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token).then(response => {
				const { code, data, msg } = response

				if (code !== 0) {
					reject(msg)
				} else if (!data) {
					reject('Verification failed, please Login again.')
				}

				const { role, username, cname, user_sn, gender, avatar_url, avatar } = data
				console.log(JSON.stringify(data))
				// role must be a non-empty array
				if (!role || role === undefined || role === null || role === '') {
					reject('getInfo: role must be a json data!')
				}
				commit('SET_ROLE', role)
				commit('SET_NAME', username)
				commit('SET_CNAME', cname)
				commit('SET_SN', user_sn)
				commit('SET_GENDER', gender)
				commit('SET_AVATAR_URL', avatar_url)
				commit('SET_AVATAR_ID', avatar)
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},

	// user logout
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout(state.token).then(() => {
				removeToken() // must remove  token  first
				// resetRouter()
				commit('RESET_STATE')
				resolve()
			}).catch(error => {
				// resetRouter()
				// this.$router.push({path: '/login'})
				reject(error)
			})
		})
	},

	// remove token
	resetToken({ commit }) {
		return new Promise(resolve => {
			removeToken() // must remove  token  first
			commit('RESET_STATE')
			resolve()
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
