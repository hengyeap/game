<template>
	<div id="container">
		<van-icon @click="$router.go(-1)" name="arrow-left" />
		<img class="shareBg" :src="imgBase + 'new_bg.png'" alt="" />
		<div class="shareBtns">
			<i @click="openLink()"><img :src="imgBase + 'recive_btn.png'" alt="" /></i>
			<i @click="downLoadApp()"><img :src="imgBase + 'download_btn.png'" alt="" /></i>
		</div>
	</div>
</template>

<script>
import hybrid from 'hybridify-js';
import { Icon } from 'vant';
export default {
	name: 'toTmm',
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
	methods: {
		openLink() {
			const url = 'https://appstore.yuedaoec.com/h5/activities/womensday.html?isNew=true';
			location.href = `tinsecretapp://?url=${url}`;
		},
		downLoadApp() {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
			if (isAndroid) {
				if (u.indexOf('HUAWEI') != -1) {
					// 说明是华为手机
					window.location.href = 'https://appgallery.cloud.huawei.com/uowap/index.html#/detailApp/C100723693';
				} else {
					window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tst.tinsecret&fromcase=40003';
				}
			}
			var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if (isIOS) {
				location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.tst.tinsecret&from=singlemessage&isappinstalled=0';
			}
		}
	}
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
.shareBtns {
	position: absolute;
	top: 180px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
}
.shareBtns i {
	width: 147px;
	height: 42px;
	margin: 0 10px;
}
</style>
