<template>
  <div>
    <!-- 单词列表导航栏 -->
    <van-nav-bar title="单词列表" fixed>
      <template #left>
        <van-icon name="calendar-o" size="20"/>
      </template>
      <template #title>
        <van-button round block size="small" icon="search" style="width: 200px" type="default" to="/word/search">查词</van-button>
      </template>
      <template #right>
        <van-icon name="chat-o" size="20"/>
      </template>
    </van-nav-bar>
    
    <custom-tab-bar/>
  </div>

</template>

<script>
	import CustomTabBar from "@/components/Tabbar/index";
	export default {
		name: "WordIndex",
		components: {CustomTabBar}
	}
</script>

<style scoped>

</style>
