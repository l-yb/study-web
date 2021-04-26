<template>
  <div ref="top_container">
    <van-sticky :container="top_container">
      <form action="/" style="padding: 0px 10px">
        <van-search
          v-model="keyword"
          show-action
          placeholder="请输入需要查询的中文或英文"
          @search="onSearch"
          @cancel="onCancel"
          @focus="show_type = 'search'"
        />
      </form>
    </van-sticky>
  
    <van-list v-show="show_type === 'search'">
      <van-cell v-for="item in search_list" :key="item.id" @click="showWordInfo(item)">
        <div>
          <strong>
            <span>{{item.word.slice(0,item.word.toLowerCase().indexOf(keyword.toLowerCase()))}}</span><span
            style="color:#2A70FE">{{item.word.slice(item.word.toLowerCase().indexOf(keyword.toLowerCase()),
            item.word.toLowerCase().indexOf(keyword.toLowerCase())+keyword.length)}}</span>
            <span>{{item.word.substr(item.word.toLowerCase().indexOf(keyword.toLowerCase())+keyword.length)}}</span>
          </strong>
          <span class="word-phonetic">{{ item.phonetic_us }}</span>
        </div>
        <div>
          <span v-for="(mean, idx) in item.means" :key="idx" class="word-meaning">
            {{ word_speech[mean.type][0] }} {{ mean.detail.replace(';','').replace('；','') }}；&nbsp;
          </span>
        </div>
      </van-cell>
      <div style="padding: 20px" v-show="history">
        <van-button style="border-style: none" plain type="default" block @click="onDeleteHistory">清空历史</van-button>
      </div>
    </van-list>
    <div style="padding: 10px 16px" v-show="show_type === 'detail'">
      <word-info v-model="word"/>
    </div>
    
  </div>
</template>

<script>
	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  import { SearchWord, ListSearchHistory, DelSearchHistory, SetSearchHistory} from '../../api/word'
	import store from '@/store'
  import WordInfo from '@/components/WordInfo/index'
	export default {
		name: "WordSearch",
		components: {WordInfo},
		data() {
			return {
				word: {word: '', 'phonetic_us': '', means: [], collect: false, associations: [{'describe': '', 'detail': ''}]},
				keyword: '',
				history: false,
				await_start: 1, // 等待的次数
				await_step: 300, // 等待毫秒
				search_list: [],
        show_type: 'search',
				top_container: null
        // word_speech: {}
			};
		},
    computed: {
      word_speech: {
        get() {
          return store.getters.word_speech
        }
      }
    },
		methods: {
			showWordInfo (word) {
				this.show_type = 'detail'
        this.word = word
				SetSearchHistory(word.id)
      },
			onSearch() {
				if (this.keyword !== '' && this.keyword !== null && this.keyword.length !== 0) {
					this.history = false
					this.watchGetWord()
				} else {
					console.log('触发历史搜索')
					this.search_list = []
					ListSearchHistory().then(response => {
						this.search_list = response.data
						if (this.search_list.length > 0) {
							this.history = true
						}
					})
				}
			},
      onDeleteHistory() {
        console.log('清空历史搜索')
        DelSearchHistory().then(() => {
          this.history = false
          this.search_list = []
        })
      },
			onCancel() {
				this.$router.go(-1)
			},
      async watchGetWord (sleepTime = this.await_step) {
        let currentStart = this.await_start + 1
        this.await_start += 1
        await sleep(sleepTime)
        // 再次获取异步请求的确认值，如果没有变化说明此次变更是最新（直接请求），如果变化则已过期（不请求）
        if (currentStart === this.await_start &&
        (this.keyword !== '' && this.keyword !== null && this.keyword.length !== 0)) {
          this.search_list = []
          SearchWord({ size: 20, sort: 1, search: this.keyword }).then(response => {
            this.search_list = response.data
          })
        }
      }
		},
    watch: {
			'keyword': function () {
				this.onSearch()
			}
    },
    created() {
      if (Object.keys(store.getters.word_speech).length === 0){
        store.dispatch('word/getWordSpeech')
      }
      this.onSearch()  // 初始化执行历史搜索展示
    }
	}
</script>

<style scoped>
  .word-phonetic {
    font-weight: 300;
    font-size: 12px;
    color: darkgray;
    margin-left: 20px;
  }
  .word-meaning {
    font-weight: 300;
    font-size: 13px;
  }
</style>
