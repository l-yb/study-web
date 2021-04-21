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

export function ListAvatars(query) {
	return request({
		url: '/base/user/avatar/list',
		method: 'get',
		params: query
	})
}

export function ListRoles(query) {
	return request({
		url: '/base/role/list',
		method: 'get',
		params: query
	})
}

export function updateAvatar(data) {
	return request({
		url: '/base/user/update/avatar',
		method: 'post',
		data
	})
}

export function userDetail() {
	return request({
		url: '/base/user/detail',
		method: 'get'
	})
}
