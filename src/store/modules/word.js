import { ListWordSpeech, ListWordClassify } from '../../api/word'


const getDefaultState = () => {
	return {
		word_speech: {},
		word_classify: []
	}
}


const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_WORD_SPEECH: (state, word_speech) => {
		state.word_speech = word_speech
	},
	SET_WORD_CLASSIFY: (state, word_classify) => {
		state.word_classify = word_classify
	}
}


const actions = {
	getWordSpeech({ commit }) {
		return new Promise((resolve, reject) => {
			ListWordSpeech({type: 'dict'}).then(response => {
				const data = response.data
				commit('SET_WORD_SPEECH', data)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	getWordClassify({ commit }) {
		return new Promise((resolve, reject) => {
			ListWordClassify().then(response => {
				const data = response.data
				commit('SET_WORD_CLASSIFY', data)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
