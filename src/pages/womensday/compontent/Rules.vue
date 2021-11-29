<template>
	<div id="container">
		<van-icon @click="$router.go(-1);" name="arrow-left" />
		<img class="shareBg" :src="imgBase + 'rules.jpg'" alt="" />
	</div>
</template>

<script>
import hybrid from 'hybridify-js';
import { Icon } from 'vant';
export default {
	name: 'rules',
	components: {
		[Icon.name]: Icon
	},
	props: [],
	data() {
		return {
			imgBase: 'https://resource.yuedaoec.com/promotions/womensday/',
			shareImgBase: 'https://resource.yuedaoec.com/'
		};
	},
	created() {},
	mounted() {},
	updated() {},
	methods: {}
};
</script>

<style scoped="scoped">
#container {
	position: relative;
}
.van-icon {
	position: absolute;
}
.van-icon-arrow-left:before {
	position: absolute;
	top: 10px;
	left: 10px;
	color: #ffffff;
	font-size: 28px;
	font-size: 24px;
}
</style>
