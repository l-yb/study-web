<template>
  <div>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item to="/"  icon="idcard">单词</van-tabbar-item>
      <van-tabbar-item to="/search" icon="records">训练</van-tabbar-item>
      <van-tabbar-item to="/login" icon="eye-o">发现</van-tabbar-item>
      <van-tabbar-item to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
	export default {
		name: "CustomTabBar"
	}
</script>

<style scoped>

</style>
