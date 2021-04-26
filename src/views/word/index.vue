<template>
  <div>
    <!-- 单词列表导航栏 -->
    <van-nav-bar fixed>
      <template #left>
        <div style="font-size: 20px;">
          <svg-icon icon-class="calendar"/>
        </div>
      </template>
      <template #title>
        <van-button round block size="small" icon="search" style="width: 200px" type="default" to="/word/search">查词</van-button>
      </template>
      <template #right>
        <div style="font-size: 23px" @click="goWordList()">
          <svg-icon icon-class="vocabulary"/>
        </div>
      </template>
    </van-nav-bar>
    
    <custom-tab-bar/>
  </div>

</template>

<script>
	import CustomTabBar from "@/components/Tabbar/index";
	export default {
		name: "WordIndex",
		components: {CustomTabBar},
    methods: {
      goWordList() {
        this.$router.push({path: '/word/list'})
      }
    }
	}
</script>

<style scoped>

</style>
