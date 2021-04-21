const getters = {
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	name: state => state.user.name,
	cname: state => state.user.cname,
	role: state => state.user.role,
	user_sn: state => state.user.user_sn,
	gender: state => state.user.gender
}
export default getters
