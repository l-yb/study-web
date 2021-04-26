<template>
  <div>
    <!-- 单词列表导航栏 -->
    <van-nav-bar title="单词列表" fixed left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="17"/>
      </template>
    </van-nav-bar>
      <!-- 单词列表界面 -->
      <van-tabs v-model="active" sticky offset-top="46">
      <van-tab title="已学单词" name="learned">
        <div ref="learned_container" style="padding-top: 46px">
          <van-sticky :container="learned_container" :offset-top="90">
            <div class="index-anchor">
              <van-row>
                <van-col span="8">
                  <span>单词数: </span>
                </van-col>
                <van-col offset="10" span="6">
                  <span>释义: </span>
                </van-col>
              </van-row>
            </div>
          </van-sticky>
        </div>
        <div ref="tab_container">
          <van-sticky :container="tab_container" :offset-top="121">
            <div class="index-anchor">自定义分类1</div>
          </van-sticky>
          <div>
          <van-cell title="文本1" />
          <van-cell title="文本2" />
          <van-cell title="文本3" />
          <van-cell title="文本4" />
          <van-cell title="文本5" />
          <van-cell title="文本6" />
          </div>
        </div>
  
        <div ref="tab_container">
          <van-sticky :container="tab_container" :offset-top="121">
            <div class="index-anchor">自定义分类2</div>
          </van-sticky>
          <van-cell title="文本1" />
          <van-cell title="文本2" />
          <van-cell title="文本3" />
          <van-cell title="文本4" />
          <van-cell title="文本5" />
          <van-cell title="文本6" />
        </div>
        <div ref="tab_container">
          <van-sticky :container="tab_container" :offset-top="121">
            <div class="index-anchor">自定义分类2</div>
          </van-sticky>
          <van-cell title="文本1" />
          <van-cell title="文本2" />
          <van-cell title="文本3" />
          <van-cell title="文本4" />
          <van-cell title="文本5" />
          <van-cell title="文本6" />
        </div>
        <div ref="tab_container">
          <van-sticky :container="tab_container" :offset-top="121">
            <div class="index-anchor">自定义分类2</div>
          </van-sticky>
          <van-cell title="文本1" />
          <van-cell title="文本2" />
          <van-cell title="文本3" />
          <van-cell title="文本4" />
          <van-cell title="文本5" />
          <van-cell title="文本6" />
        </div>
        <div ref="tab_container">
          <van-sticky :container="tab_container" :offset-top="121">
            <div class="index-anchor">自定义分类2</div>
          </van-sticky>
          <van-cell title="文本1" />
          <van-cell title="文本2" />
          <van-cell title="文本3" />
          <van-cell title="文本4" />
          <van-cell title="文本5" />
          <van-cell title="文本6" />
        </div>
        <div ref="tab_container">
          <van-sticky :container="tab_container" :offset-top="121">
            <div class="index-anchor">自定义分类2</div>
          </van-sticky>
          <van-cell title="文本1" />
          <van-cell title="文本2" />
          <van-cell title="文本3" />
          <van-cell title="文本4" />
          <van-cell title="文本5" />
          <van-cell title="文本6" />
        </div>
        <div ref="tab_container">
          <van-sticky :container="tab_container" :offset-top="121">
            <div class="index-anchor">自定义分类2</div>
          </van-sticky>
          <van-cell title="文本1" />
          <van-cell title="文本2" />
          <van-cell title="文本3" />
          <van-cell title="文本4" />
          <van-cell title="文本5" />
          <van-cell title="文本6" />
        </div>
      </van-tab>
      <van-tab title="未学单词" name="learning">
        <div ref="learning_container" style="padding-top: 46px">
          <van-sticky :container="learning_container" :offset-top="90">
            <div class="index-anchor">
              <van-row>
                <van-col span="8">
                  <span>单词数: </span>
                </van-col>
                <van-col offset="10" span="6">
                  <span>释义: </span>
                </van-col>
              </van-row>
            </div>
          </van-sticky>
        </div>
      </van-tab>
      
      <van-tab title="收藏单词" name="collect">
        <div ref="collect_container" style="padding-top: 46px">
          <van-sticky :container="collect_container" :offset-top="90">
            <div class="index-anchor" style="background-color: #f5f3f7">
              <van-row>
                <van-col span="6">
                  <span>单词数: {{ collect_id_list.length }}</span>
                </van-col>
                <van-col offset="6" span="12">
                  <div style="float: right">
                    <van-tag plain size="mini" @click="switchWordDetail()">释义</van-tag>&nbsp;&nbsp;
                    <van-tag plain size="mini" @click="collect_edit = !collect_edit">收藏</van-tag>
                  </div>
                </van-col>
              </van-row>
            </div>
          </van-sticky>
        </div>
        
        <div v-for="(c_date, idx) in collect_date" :key="c_date" :ref="collect_date[idx]">
          <van-sticky :container="collect_date[idx]" :offset-top="121">
            <div class="index-anchor">{{ c_date }}</div>
          </van-sticky>
          <div>
            <van-cell v-for="word in collect_list[c_date]" :key="word.id">
              <van-row type="flex">
                <van-col :span="collect_edit ? '21' : '22'">
                  <div>
                    <span style="font-size: 14px" @click="getWordVoice(word.word)">{{ word.word }}</span>
                    <div @click="showWordDetail(word.id)" style="font-size: 13px;float:right; max-width: 80%">
                      <span :style="word_detail_list.includes(word.id) ? '' : 'background-color:#b6b6bd;color:#b6b6bd;'"
                            v-for="mean in word.means" :key="mean.id">
                      {{ word_speech[mean.type][0] }} {{ mean.detail.replace(';','').replace('；','') }}
                      </span>
                    </div>
                  </div>
                </van-col>
                <van-col :span="collect_edit ? '3' : '2'" style="font-size: 15px;">
                  <div style="float: right">
                    <svg-icon icon-class="search" />
                    <span v-show="collect_edit">&nbsp;
                      <van-icon :name="word.collect === true ? 'star' : 'star-o'" @click="handleWordCollect(word)"
                    :color="word.collect === true ? '#646566' : ''"/>
                    </span>
                  </div>
                </van-col>
              </van-row>
            </van-cell>
          </div>
        </div>
        <div v-show="collect_empty" style="text-align: center; width: 100%; padding-top: 20px">
          <span>{{ collect_empty_content }}</span>
          &nbsp;
          <svg-icon v-show="collect_empty_content === '请登录后查看收藏单词'"
                    color="blue" icon-class="login" @click="jumpLogin()"/>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { ListWordCollect, DelWordCollect, SetWordCollect } from "@/api/word"
  import store from '@/store'
  import '../../api/user'
	export default {
		name: "WordList",
    data () {
			return {
				active: '',
				loading: false,
				finished: false,
				learned_list: [1, 2, 3, 4, 5, 6],
        learning_list: [],
				collect_list: {},
        collect_id_list: [],
        collect_date: [], // 收藏日期
        word_detail_list: [], // 展示详情列表
				collect_empty_content: '',
				word_voice_dict: {},
        collect_edit: false,
				collect_empty: false,
				nav_container: null,
				tab_container: null,
				learned_container: null,
				learning_container: null,
				collect_container: null
      }
    },
    computed: {
      word_speech: {
        get() {
          return this.$store.getters.word_speech
        }
      }
    },
		watch: {
			$route: {
				handler: function(route) {
					this.active = route.query && route.query.type
					if (this.active === 'collect') {
						this.fetchWordCollect()
					}
				},
				immediate: true
			},
      'active': function () {
        if (this.active === 'collect') {
          this.fetchWordCollect()
        }
      }
		},
    created() {
      if (Object.keys(store.getters.word_speech).length === 0){
        store.dispatch('word/getWordSpeech')
      }
    },
    methods: {
      onClickLeft () {
        this.$router.go(-1)
      },
      onClickRight() {
        this.$router.push({ path: '/word/search'})
      },
      fetchWordCollect() {
        this.collect_empty = false
        ListWordCollect().then((response) => {
          this.collect_id_list = response.word_id_list || []
          this.collect_list = response.word_list || {}
          this.collect_date = response.date_list || []
          if (this.collect_id_list.length === 0 && this.collect_id_list) {
            this.collect_empty_content = response.msg || ''
            this.collect_empty = true
          }
        })
      },
      getWordVoice(word) {
        if (Object.prototype.hasOwnProperty.call(this.word_voice_dict, word)) {
          let audio = this.word_voice_dict[word]
          audio.play()
        } else {
          let audio = new Audio()
          audio.src = '/api/v1/dictvoice?audio=' + word
          this.word_voice_dict[word] = audio
          audio.play()
        }
      },
      showWordDetail(wordId) {
        if (this.word_detail_list.includes(wordId)) {
          this.word_detail_list.splice(this.word_detail_list.findIndex(item => item === wordId), 1)
        } else {
          this.word_detail_list.push(wordId)
        }
      },
      jumpLogin() {
        this.$router.push({path: '/login', query: {redirect: this.$router.currentRoute.fullPath}})
      },
      switchWordDetail() {
        if (this.active === 'collect') {
          if (this.word_detail_list.length !== 0) {
            this.word_detail_list = []
          } else {
            this.word_detail_list = this.collect_id_list
          }
        }
      },
      handleWordCollect(word) {
        if (word.collect === true) {
          DelWordCollect(word.id).then((response) => {
            this.$toast({'message': response.msg, 'position': 'top'})
            word.collect = false
          })
        } else {
          SetWordCollect(word.id).then((response) => {
            this.$toast({'message': response.msg, 'position': 'top'})
            word.collect = true
          })
        }
      },
    }
	}
</script>

<style scoped>
.index-anchor {
  background-color: #edeff3;
  margin: 0;
  color: rgba(69, 90, 100, 0.6);
  font-weight: 300;
  font-size: 13px;
  line-height: 32px;
  z-index: 0;
  box-sizing: border-box;
  padding: 0 16px;
  color: #323233;
}

</style>
