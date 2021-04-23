<template>
  <div>
    <!-- 个人页顶部导航栏 -->
    <div class="user-background">
      <van-icon name="setting-o" size="20" style="float:right"/>
      <p/>
      <van-row>
        <van-col span="8">
          <div>
            <h1>{{ user.cname }}</h1>
            <van-col span="8" style="margin-top: -20px;">
              <span>{{ user.username }}</span>/<span>{{ user.user_sn }}</span>
            </van-col>
          </div>
        </van-col>
        <van-col offset="7" style="float:right">
          <van-image round width="6rem" height="6rem" :src="user.avatar_url" @click.native="set_avatar = true"/>
        </van-col>
      </van-row>
      <van-row style="padding-top: 20px;">
        <van-col span="8">
          <strong style="font-style:italic;">99999</strong><br/>
          <span style="font-size: 10px">已学单词</span>
        </van-col>
        <van-col span="8">
          <strong style="font-style:italic;">1300</strong><br/>
          <span style="font-size: 10px">坚持天数</span>
        </van-col>
        <van-col offset="3">
          <strong style="font-style:italic;">{{ user.role.name }}</strong><br/>
          <span style="font-size: 10px">词汇等级</span>
        </van-col>
      </van-row>
    </div>
    <div style="padding-top: 10px">
      <van-cell title="我的收藏" icon="idcard" title-class="title-class" is-link to="/word/list" size="large">
      </van-cell>
      <van-cell title="好友排名" icon="friends-o" title-class="title-class" size="large">
      </van-cell>
      <van-cell title="学习设置" icon="bookmark-o" title-class="title-class" size="large">
      </van-cell>
    </div>
    <custom-tab-bar/>
    <!-- 设置用户头像弹出框 -->
    <van-dialog v-model="set_avatar" title="设置头像" theme="round" confirmButtonText="修改" confirmButtonColor="blue"
                :closeOnClickOverlay="true" show-cancel-button :beforeClose="beforeAvatarClose">
      <div style="height:300px; overflow-y:auto; padding-top:15px; padding-left: 10px">
        <van-row>
          <van-col v-for="img in avatar_list" :key="img.id" span="6">
            <van-badge color="#1989fa">
              <van-image radius="5"
                          width="3.5rem" height="3.5rem" @click.native="user_avatar = img.id"
                         :src="avatar_server + '/' + img.name"/>
              <template #content>
                <van-icon name="success" v-show="user_avatar === img.id" class="badge-icon" />
              </template>
            </van-badge>
          </van-col>
        </van-row>
      </div>
    </van-dialog>
  </div>
</template>

<script>
	import { ListAvatars, ListRoles, updateAvatar, userDetail } from '../../api/user'
	import CustomTabBar from '@/components/Tabbar'
	export default {
		components: { CustomTabBar },
		name: "Mine",
		data() {
			return {
				set_avatar: false,
				avatar_list: [],
        role_list: [],
        user_avatar: null,
				avatar_server: '/user/avatar',
        user: {
          username: 'name',
          role: {'name': '学友'},
          cname: 'Hello',
          gender: 'F',
          user_sn: 10000,
          avatar_id: 1,
          avatar_url: ''
        }
			}
		},
    watch: {
			'set_avatar': function () {
				if (this.user_avatar !== this.user.avatar_id) {
					this.user_avatar = this.user.avatar_id
        }
			}
    },
		methods: {
			getRoles() {
				ListRoles({ simple: 1 }).then(response => {
					// console.log('data: ', JSON.stringify(response.data))
					this.role_list = response.data
				})
			},
      getAvatars() {
				ListAvatars({ size: 1000 }).then(response => {
					// console.log('data: ', JSON.stringify(response))
					this.avatar_list = response.data
					this.avatar_server = response.server
				})
			},
      getUserInfo () {
				userDetail().then(response => {
					this.user = Object.assign({}, response.data) // copy obj
					this.user_avatar = response.data.avatar_id
					// console.log('data: ', JSON.stringify(this.temp))
				})
			},
			beforeAvatarClose(action, done) {
				if (action === 'confirm') {
					this.updateUserAvatar()
				}
				done();
			},
			updateUserAvatar() {
				if (this.user_avatar !== this.user.avatar_id) {
					updateAvatar({avatar: this.user_avatar}).then(response => {
						this.$toast({
							message: response.msg || '更新用户信息成功',
							duration: 1500
						})
						this.getUserInfo()
					})
				} else {
					this.user_avatar = null
          this.set_avatar = false
					this.$toast('未作修改')
				}
			}
    },
		created() {
			this.getRoles()
			this.getAvatars()
			this.getUserInfo()
		}
	}
</script>

<style scoped>
.user-background {
  background: linear-gradient(45deg,rgb(154 17 224 / 40%),rgb(49 38 214 / 63%),rgba(75,192,200,0.5));
  padding: 18px;
  color: white;
}
  .title-class {
    padding-left: 20px;
  }
</style>
