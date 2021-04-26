<template>
  <div>
      <van-row>
        <van-col span="16">
          <h2 style="margin-top: -4px">{{ word.word }}</h2>
        </van-col>
        <van-col style="margin-top: 2px" offset="4" span="2">
          <van-icon size="20" :name="word.collect === true ? 'star' : 'star-o'" @click="handleWordCollect(word)"
                    :color="word.collect === true ? 'rgb(255, 210, 30)' : ''"/>
        </van-col>
      </van-row>
      <van-row>
        <van-col>
          <span>{{ word.phonetic_us }}</span>
        </van-col>
        <van-col offset="1" style="margin-top: 2px">
          <van-icon size="15" color="blue" @click="getWordVoice(word.word)" name="volume-o">
          </van-icon>
        </van-col>
      </van-row>
      <div style="padding-top: 15px"> </div>
      <span v-for="mean in word.means" :key="mean.id" class="word-meaning">
        {{ word_speech[mean.type][0] }} {{ mean.detail.replace(';','').replace('；','') }}；&nbsp;
      </span>
    
    <van-divider/>
  
    <div>
      <strong>单词列句</strong>
    </div>
      <div v-for="(mean, idx) in word.means"
           :key="idx" class="word-meaning" style="padding-top: 5px">
      <div v-if="mean.example !== ''">
        <div>
          <span>{{ mean.example }}</span>
          <van-icon style="margin-left: 10px; top: 2px" @click="getWordVoice(mean.example)" size="15" color="blue" name="volume-o" />
        </div>
        <div style="padding-top: 3px"><span>{{ mean.translation }}</span></div>
      </div>
      </div>
    
    <van-divider/>
    <div>
      <strong>联想拆解</strong>
    </div>
    <div style="padding-top: 5px">
      <span v-for="(item, key) in word.associations" :key="key">
        <span v-if="key != 0">+</span>
        <strong :style="'color:' + typeColor[item.type]">{{ item.code }}</strong>
        {{ item.content }}({{item.type_value}})
      </span>
    </div>
    <div style="padding-top: 3px">
      {{ word.associations[0].detail }}
    </div>
  </div>
</template>

<script>
  import { SetWordCollect, DelWordCollect } from '../../api/word'
	export default {
		name: "WordInfo",
		props: {
			value: {
				type: Object
			}
    },
		data() {
			return {
				word_voice_dict: {},
				typeColor: ['#369cad', '#409eff', '#3a0de8', '#9a25bf', '#32800c', '#f56c6c', '#e05714', '#e6a23c', '#86622d'],
				//             暗蓝      蓝色          深蓝      紫色       绿色        红色        酱红       黄色       深棕色
			}
		},
		computed: {
			word: {
				get() {
					return this.value
				}
			},
			word_speech: {
				get() {
					return this.$store.getters.word_speech
				}
			}
		},
    methods: {
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
      handleWordCollect(word) {
        if (word.collect === true) {
          DelWordCollect(word.id).then((response) => {
            this.$toast({'message': response.msg, 'position': 'top'})
            this.word.collect = false
          })
        } else {
          SetWordCollect(word.id).then((response) => {
            this.$toast({'message': response.msg, 'position': 'top'})
            this.word.collect = true
          })
        }
      },
    }
	}
</script>

<style scoped>

</style>
