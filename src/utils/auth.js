import Cookies from 'js-cookie'

const TokenKey = 'user_token'

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token) {
	localStorage.setItem(TokenKey, token)
	return Cookies.set(TokenKey, token)
}

export function removeToken() {
	localStorage.removeItem(TokenKey)
	return Cookies.remove(TokenKey)
}

export function localToken() {
	const cookieToken = getToken()
	if (cookieToken) {
		return cookieToken
	}
	const myToken = localStorage.getItem(TokenKey)
	if (myToken) {
		setToken(myToken)
	}
	return myToken
}
/*
import { setCookie, getCookie, delCookie } from '@/utils/cookie'

const TokenKey = 'devops_token'

export function getToken() {
	return getCookie(TokenKey)
}

export function setToken(token) {
	return setCookie(TokenKey, token, 2)
}

export function removeToken() {
	return delCookie(TokenKey)
}
*/
