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
        />
      </form>
    </van-sticky>
  
    <van-list>
      <van-cell v-for="item in search_list" :key="item.id">
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
          <span v-for="mean in item.means" :key="mean.id" class="word-meaning">
            {{ word_speech[mean.type][0] }} {{ mean.detail.replace(';','').replace('；','') }}；&nbsp;
          </span>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  import { SearchWord } from '../../api/word'
	import store from '@/store'
	export default {
		name: "WordSearch",
		data() {
			return {
				keyword: '',
				await_start: 1, // 等待的次数
				await_step: 300, // 等待毫秒
				search_list: [],
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
			onSearch() {
				if (this.keyword !== '' && this.keyword !== null && this.keyword.length !== 0) {
					this.watchGetWord()
				} else {
					this.search_list = []
				}
			},
			onCancel() {
				this.$router.go(-1)
			},
      async watchGetWord (sleepTime = this.await_step) {
        let currentStart = this.await_start + 1
        this.await_start = currentStart
        await sleep(sleepTime)
        // 再次获取异步请求的确认值，如果没有变化说明此次变更是最新（直接请求），如果变化则已过期（不请求）
        if (currentStart === this.await_start) {
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
