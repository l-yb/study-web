import request from '@/utils/request'

export function login(data) {
	return request({
		url: '/base/user/login',
		method: 'post',
		data
	})
}

export function getInfo() {
	return request({
		url: '/base/user/checklogin',
		method: 'get'
		// params: { token }
	})
}

export function logout() {
	return request({
		url: '/base/user/logout',
		method: 'post'
	})
}
