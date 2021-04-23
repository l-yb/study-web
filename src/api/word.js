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
