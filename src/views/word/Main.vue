<template>
  <div id="word-main">
    <van-nav-bar
      title="每日背单词"
      :right-text="range"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="card" v-text="word.word">
    </div>
    <div class="card-info">
      <p v-text="wordPromptShow"></p>
      <p v-text="wordTranslationShow"></p>
    </div>
    
    <div class="buttons">
      <van-button type="warning" style="width: 88px" @click="showWordTranslation">翻译</van-button>
      <van-button type="info" style="width: 88px" @click="showWordPrompt">提示</van-button>
      <van-button type="primary" style="width: 88px" @click="getOneWord">认识</van-button>
    </div>
    <custom-tab-bar/>
    <van-popup v-model="popShow" round position="bottom" :style="{ height: '50%' }">
      <van-picker
        title="单词范围"
        show-toolbar
        :columns="columns"
        @confirm="onPopConfirm"
        @cancel="onPopCancel"
        @change="onPopChange"
      />
    </van-popup>
  
  </div>
</template>

<script>
	import CustomTabBar from "@/components/Tabbar/index";
	export default {
		components: {CustomTabBar},
		data() {
			return {
				range: 'ALL',
				columns: ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
					'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
				tabbar_active: 'home',
				popShow: false, // 弹出框
				word: {
					wordId: '',
					word: '',
					wordPrompt: '',
					wordTranslation: ''
				},
				wordPromptShow: '',
				wordTranslationShow: ''
			}
		},
		methods: {
			getOneWord() {
				this.$http.get(`/word/getOne/${this.range}`).then(res => {
					this.wordPromptShow = ''
					this.wordTranslationShow = ''
					if (res.data.code === -1) {
						this.$toast("该范围单词集合为空")
						return false
					}
					this.word = res.data.word
				}).catch(err => {
					console.log(err)
				})
			},
			showWordPrompt() {
				this.wordPromptShow = this.word.wordPrompt
			},
			showWordTranslation() {
				this.wordTranslationShow = this.word.wordTranslation
			},
			onClickLeft () {
				this.$toast('暂未开放')
			},
			/** 切换单词范围 */
			onClickRight () {
				this.popShow = !this.popShow
			},
			onTabBarChange (index) {
				if (index !== 1) {
					this.$toast('暂未开放')
					this.tabbar_active = 'home'
				}
			},
			onPopConfirm(value) {
				this.range = value
				this.popShow = false
				this.getOneWord()
			},
			onPopChange() {
			},
			onPopCancel() {
				this.popShow = false
			}
		},
		mounted() {
			this.getOneWord()
		}
	}
</script>

<style scoped>
  #word-main {
    height: 100%;
    background-color: #f7f8fa;
  }
  .card {
    margin: 90px 15px 24px 15px;
    padding: 24px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 12px #ebedf0;
    text-align: center;
    font-size: larger;
  }
  .card-info {
    margin: 40px 15px 40px 15px;
    height: 220px;
    padding-top: 10px;
    padding-left: 24px;
    padding-right: 24px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 12px #ebedf0;
    text-align: center;
    white-space: pre-line;
  }
  .buttons {
    
    display: flex;
    justify-content: space-between;
    margin-left: 15px;
    margin-right: 15px;
    
  }
</style>
