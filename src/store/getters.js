const getters = {
	token: state => state.user.token,
	avatar_url: state => state.user.avatar_url,
	name: state => state.user.name,
	cname: state => state.user.cname,
	role: state => state.user.role,
	user_sn: state => state.user.user_sn,
	avatar_id: state => state.user.avatar_id,
	gender: state => state.user.gender,
	word_speech: state => state.word.word_speech,
	word_classify: state => state.word.word_classify
}
export default getters
