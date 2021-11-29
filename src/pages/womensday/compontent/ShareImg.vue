<template>
	<div id="container">
		<van-icon @click="$router.go(-1)" name="arrow-left" />
		<img class="shareBg" :src="imgBase + 'shareBg.jpg'" alt="" />
		<div id="qrCode" ref="qrCodeDiv"></div>
		<div class="shareBtns">
			<i @click="saveImg()"><img :src="imgBase + 'saveImgBtn.png'" alt="" /></i>
			<i @click="shareImg()"><img :src="imgBase + 'shareImgBtn.png'" alt="" /></i>
		</div>
	</div>
</template>

<script>
import hybrid from 'hybridify-js';
import axios from 'axios';
import QRCode from 'qrcodejs2';
import html2canvas from 'html2canvas';
import { Icon } from 'vant';
export default {
	name: 'shareImg',
	components: {
		[Icon.name]: Icon
	},
	props: [],
	data() {
		return {
			imgBase: 'https://resource.yuedaoec.com/promotions/womensday/',
			shareImgBase: 'https://resource.yuedaoec.com/',
			uid: ''
		};
	},
	created() {
		this.uid = this.getUrlParam('uid');
		// console.log('https://appstore.yuedaoec.com/h5/activities/womensday.html?uid=' + this.uid + '#/register');
		this.$nextTick(function() {
			// bindQRCode
			new QRCode(this.$refs.qrCodeDiv, {
				text: 'https://appstore.yuedaoec.com/h5/activities/womensday.html?uid=' + this.uid + '#/register',
				width: 100,
				height: 100,
				colorDark: '#333333', //二维码颜色
				colorLight: '#ffffff', //二维码背景色
				correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
			});
		});
	},
	mounted() {},
	updated() {},
	methods: {
		getImgUrl(type) {
			const self = this;
			document.getElementsByClassName('van-icon-arrow-left')[0].style.opacity = '0';
			document.querySelector('.shareBtns').style.opacity = '0';
			html2canvas(document.body, {
				backgroundColor: null,
				useCORS: true
			}).then(function(canvas) {
				const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
				let formData = new FormData();
				formData.append('data', dataUrl);
				let xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 200) {
						const res = JSON.parse(xhr.responseText);
						const imgUrl = self.shareImgBase + JSON.parse(res.text).res;
						console.log(imgUrl);
						if (type === 'save') {
							hybrid.app.download(imgUrl);
						} else if (type === 'share') {
							const obj = {
								url: imgUrl,
								type: 'wechat'
							};
							hybrid.app.share(obj);
						}
						document.getElementsByClassName('van-icon-arrow-left')[0].style.opacity = '1';
						document.querySelector('.shareBtns').style.opacity = '1';
					}
				};
				xhr.open('POST', 'https://store.yuedaoec.com/uploadImg.shop');
				xhr.send(formData);
			});
		},
		saveImg() {
			this.getImgUrl('save');
		},
		shareImg() {
			this.getImgUrl('share');
		}
	}
};
</script>

<style scoped="scoped">
#container {
	position: relative;
}
#qrCode {
	width: 100px;
	height: 100px;
	position: absolute;
	bottom: 174px;
	right: 60px;
}
#qrCode img {
	display: block;
	width: 100% !important;
	height: 100% !important;
}
.shareBtns {
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
}
.shareBtns i {
	width: 147px;
	height: 42px;
	margin: 0 10px;
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
