<template>
  <div id="user-login" :style="conTop">
    <!-- 登录页顶部导航栏 -->
    <van-nav-bar
      title="欢迎登录词汇程序" left-text="主页" right-text="搜词" left-arrow>
      <template #right>
        <van-icon name="search" size="17" />
       <span style="margin-left: 2px" class="van-nav-bar__text">搜词</span>
      </template>
    </van-nav-bar>
  
    <van-row style="margin-top: 45%;">
      <van-col offset="2" span="20">
        <van-form @submit="handleLogin">
          <van-field ref="username" v-model="loginForm.username" name="用户名" label="用户名" placeholder="用户名" :rules="loginRules.username"/>
          <van-field ref="password" :key="passwordType" v-model="loginForm.password" :type="passwordType"
                     :rules="loginRules.password" name="密码" label="密码" placeholder="密码">
            
            <span class="show-pwd" @click="showPwd">
              <svg-icon  />
            </span>
            <template #icon>
              <van-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'"/>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">登录</van-button>
          </div>
        </van-form>
      </van-col>
    </van-row>
  </div>
</template>

<script>
	export default {
		name: "Login",
		data() {
			const validateUsername = (rule, value, callback, a) => {
				if (value.length === 0) {
					return a(new Error('请输入登录用户名, 示例用户: jack/rose .'))
					// return b(new Error('请输入登录用户名, 示例用户: jack/rose .'))
					// return c(new Error('请输入登录用户名, 示例用户: jack/rose .'))
					// return callback(new Error('请输入登录用户名, 示例用户: jack/rose .'))
				} else {
					return true
				}
			}
			const validatePassword = (rule, value, callback) => {
				console.log(rule, value, callback)
				if (value.length < 6) {
					return callback(new Error('密码长度不能小于6'))
				} else {
					return true
				}
			}
			return {
				loginForm: {
					username: '',
					password: ''
				},
				loading: false,
				passwordType: 'password',
				redirect: undefined,
				loginRules: {
					username: [{ required: true, trigger: 'blur', validator: validateUsername }],
					password: [{ required: true, trigger: 'blur', validator: validatePassword }]
				},
        back_image_list: ['advent', 'append', 'awkward', 'courtyard', 'craftsmanship', 'envy', 'faith', 'ignore',
          'partake', 'remedy', 'render', 'roll', 'safeguard', 'sturdy', 'trespasser', 'vacancy', 'venturesome',
          'volume', 'waist']
			};
		},
		computed: {
			conTop() {
				return {
					backgroundImage: 'url(' + require('../../pic/' + this.setBackGroundImage() + '.jpeg') + ')',
					backgroundRepeat:'no-repeat',
					backgroundSize: 'cover',
					height: '100%'
        }
			}
    },
		methods: {
			showPwd() {
				if (this.passwordType === 'password') {
					this.passwordType = ''
				} else {
					this.passwordType = 'password'
				}
				this.$nextTick(() => {
					this.$refs.password.focus()
				})
			},
			handleLogin() {
        this.loading = true
        this.$store.dispatch('user/login', this.loginForm).then(() => {
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
			},
      setBackGroundImage() {
				return this.back_image_list[Math.floor(Math.random() * this.back_image_list.length + 1)-1]
      }
		},
    create() {
      this.setBackGroundImage()
    }
	}
</script>

<style scoped>
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    /*color: $dark_gray;*/
    cursor: pointer;
    user-select: none;
  }
</style>
