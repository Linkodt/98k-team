<template>
	<view>
	<u-tabs :list="list" font-size="28" bar-height="3" inactive-color="#888888" bar-width="350" active-color="#eba95f" :is-scroll="false" :current="current" @change="change" ></u-tabs>
	<view class="communities" v-if="current==0" >
		社团模块
	</view>
	<view class="canteen" v-if="current==1" >
		<Canteen></Canteen>
	</view>
	</view>
</template>

<script>
	import Canteen from "./canteen/canteen.vue"
	export default {
		data() {
			return {
				list: [{
					name: '社团咨询'
				}, {
					name: '饭堂咨询'
				}],
				current: 1
			}
		},
		methods: {
			change(index) {
				this.current = index;
			}
		},
		components:{
			Canteen
		}
	}
</script>

<style>

</style>
