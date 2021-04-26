import request from '@/utils/request'


export function SearchWord(query) {
	return request({
		url: '/word/vocabulary/list',
		method: 'get',
		params: query
	})
}


export function ListWordSpeech(query) {
	return request({
		url: '/word/vocabulary/speech',
		params: query,
		method: 'get'
	})
}

export function ListWordClassify() {
	return request({
		url: '/word/vocabulary/classify',
		method: 'get'
	})
}

export function ListAssociationType() {
	return request({
		url: '/word/vocabulary/association',
		method: 'get'
	})
}

export function ListWordElement() {
	return request({
		url: '/word/vocabulary/element',
		method: 'get'
	})
}
export function ListSearchHistory() {
	return request({
		url: '/word/vocabulary/history/list',
		method: 'get'
	})
}

export function SetSearchHistory(wordId) {
	return request({
		url: '/word/vocabulary/history/' + wordId,
		method: 'post'
	})
}
export function DelSearchHistory() {
	return request({
		url: '/word/vocabulary/history/delete',
		method: 'post'
	})
}

export function SetWordCollect(wordId) {
	return request({
		url: '/word/vocabulary/collect/' + wordId,
		method: 'post'
	})
}

export function ListWordCollect() {
	return request({
		url: '/word/vocabulary/collect/list',
		method: 'get'
	})
}

export function DelWordCollect(wordId) {
	return request({
		url: '/word/vocabulary/collect/' + wordId,
		method: 'delete'
	})
}
