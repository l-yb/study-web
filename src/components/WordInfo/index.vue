<template>
  <div>
    <van-row>
      <van-col>
        <h1></h1>
      </van-col>
    </van-row>
  </div>
</template>

<script>
	export default {
		name: "index",
		props: {
			value: Number,
		},
		data() {
			return {
				show_init_field: false, // 重置按钮展示的变量
				show_all_status: true, // 全选按钮样式
				show_all_check: false // 全选按钮状态
			}
		},
		created() {
			this.setInitField(true)
		},
	}
</script>

<style scoped>

</style>
