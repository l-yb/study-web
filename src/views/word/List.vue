<template>
  <div>
    <!-- 单词列表导航栏 -->
    <van-nav-bar title="单词列表" fixed left-arrow @click-left="onClickLeft">
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
      
      <van-tab title="收藏单词" name="favorite">
        <div ref="favorite_container" style="padding-top: 46px">
          <van-sticky :container="favorite_container" :offset-top="90">
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
    </van-tabs>
  </div>
</template>

<script>
	export default {
		name: "WordList",
    data () {
			return {
				active: 'favorite',
				loading: false,
				finished: false,
				learned_list: [1, 2, 3, 4, 5, 6],
        learning_list: [],
				favorite_list: [],
				nav_container: null,
				tab_container: null,
				learned_container: null,
				learning_container: null,
				favorite_container: null
      }
    },
    methods: {
      onClickLeft () {
        this.$router.go(-1)
      }
    }
	}
</script>

<style scoped>
.index-anchor {
  background-color: #fafafa;
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
