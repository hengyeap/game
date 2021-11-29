<template>
	<div id="container">
		<van-icon name="arrow-left" @click="back" />
		<img :src="topBanner" alt="" srcset="" />
		<img class="icon rulesIcon" :src="rulesIcon" @click="rulesShow = true" alt="" srcset="" />
		<img class="icon shareIcon" :src="shareIcon" @click="shareShow = true" alt="" srcset="" />
		<div class="list">
			<ul>
				<li v-for="(item, index) in allProducts" :key="index" @click="toDetail(item.productId)">
					<img v-if="item.bannerImg" :src="'https://resource.yuedaoec.com/' + item.bannerImg" alt="" srcset="" />
					<div>
						<p>{{ item.name }}</p>
						<span>¥ <em>{{ item.saleHighPrice }}</em></span>
						<b>立即购买</b>
					</div>
				</li>
			</ul>
		</div>
		<div id="cover" v-show="shareShow" @click="cancelShare()">
			<div id="shareContent" class="slideUp">
				<p>分享到</p>
				<div class="shareBtn">
					<div @click.stop="share('wechat')">
						<img src="https://resource.yuedaoec.com/icon/wxcircle_icon.png" alt="微信" />
						<span>微信</span>
					</div>
					<div @click.stop="share('circle')">
						<img src="https://resource.yuedaoec.com/icon/wx_icon.png" alt="朋友圈" />
						<span>朋友圈</span>
					</div>
				</div>
				<div @click.stop="cancelShare()" class="cancel">取消</div>
			</div>
		</div>
		<van-overlay :show="rulesShow" @click="rulesShow = false">
			<div class="rule_wrapper" @click.stop>
				<img :src="rules" alt="规则" />
				<span class="close" @click="rulesShow = false"></span>
			</div>
		</van-overlay>
	</div>
</template>

<script>
import hybrid from 'hybridify-js';
import axios from 'axios';
import { Overlay, NavBar, Icon } from 'vant';
export default {
	name: 'healthZone',
	components: {
		[Overlay.name]: Overlay,
		[NavBar.name]: NavBar,
		[Icon.name]: Icon
	},
	data() {
		return {
			rulesShow: false,
			url: '',
			shareShow: false,
			topBanner: 'https://resource.yuedaoec.com/promotions/healthPresent/banner.jpg',
			rules: 'https://resource.yuedaoec.com/promotions/healthPresent/rules.png',
			rulesIcon: 'https://resource.yuedaoec.com/promotions/healthPresent/rulesIcon.png',
			shareIcon: 'https://resource.yuedaoec.com/promotions/healthPresent/shareIcon.png',
			productIds: [43266, 43267, 43268, 43277, 43278, 43279, 43280, 43234, 43235, 43365, 43367, 43368, 43369, 43403, 43405, 43415, 43417, 43418, 43419, 43420, 43421],
			allProducts: []
		};
	},
	created() {
		this.url = window.location.href;
		this.getAll();
	},
	mounted() {},
	updated() {},
	methods: {
		back(){
			hybrid.nav.back();
		},
		getAll() {
			for (let i = 0; i < this.productIds.length; i++) {
				axios.get(process.env.VUE_APP_REQUEST_PRODUCT_URL + 'product/getProductById.shop?id=' + this.productIds[i])
					.then(res => {
						if ((res.data.code = '10000')) {
							this.allProducts[i] = res.data.res.product;
							this.$forceUpdate();
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		toDetail(productId) {
			hybrid.nav.push(process.env.VUE_APP_REDIRECT_PRODUCT_URL.replace('{productId}', productId));
		},
		cancelShare() {
			this.shareShow = false;
			this.slideUp = false;
		},
		share(type) {
			const obj = {
				url: this.url,
				type: type,
				title: '健康礼0元享',
				description: '关爱女神 满600元加赠1份健康礼，速戳查看→',
				image: 'https://resource.yuedaoec.com/promotions/healthPresent/shareImg.jpg'
			};
			console.log(obj);
			hybrid.app.toShare(obj);
			this.shareShow = false;
		},
		onClickLeft() {
			hybrid.nav.back();
		}
	}
};
</script>

<style>
* {
	padding: 0;
	margin: 0;
}

img {
	display: block;
	max-width: 100%;
}

.van-icon {
	position: absolute;
    color: #ffffff;
    font-size: 23px;
    left: 20px;
    top: 40px;
}

#container {
	width: 100%;
	max-width: 375px;
	font-size: 14px;
	color: #333333;
	position: relative;
	margin: 0 auto;
	background-color: #f8e6eb;
	padding-bottom: 30px;
}

.icon {
	position: absolute;
	right: 0;
	width: 40px;
	height: 26px;
	top: 30px;
}

.shareIcon {
	top: 70px;
}

.list {
	padding: 15px 14px;
}

.list li {
	background-color: #ffffff;
	border-radius: 4px;
	margin-bottom: 15px;
	padding: 12px;
	position: relative;
	overflow: hidden;
}

.list div {
	margin-left: 115px;
}

.list img {
	width: 100px;
	height: 100px;
	float: left;
	/* margin: 0 auto; */
}

.list p {
	font-size: 14px;
	margin: 10px auto 15px;
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	white-space: break-spaces;
	height: 36px;
}

.list span {
	font-size: 13px;
	display: block;
	color: #ec6477;
}

.list em {
	font-style: normal;
	font-size: 18px;
}

.list b {
	font-size: 14px;
	background-color: #ec6477;
	border-radius: 4px;
	color: #ffffff;
	font-weight: normal;
	padding: 2px 5px;
	position: absolute;
	right: 12px;
	bottom: 20px;
}

/* share */

#cover {
	height: 100%;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 999;
}

#shareContent {
	width: 100%;
	background-color: #e3e3e3;
	position: absolute;
	left: 0;
	font-size: 16px;
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
}

#shareContent p {
	text-align: center;
	line-height: 50px;
	border-bottom: 1px solid #d8d8d8;
}

.shareBtn {
	display: flex;
	justify-content: center;
	padding: 20px 0;
	font-size: 14px;
	text-align: center;
}

.shareBtn img {
	margin: 0 30px 5px;
	height: 60px;
	width: 60px;
}

.cancel {
	border-top: 1px solid #d8d8d8;
	text-align: center;
	line-height: 50px;
}

.slideUp {
	bottom: -220px;
	animation-name: slideUp;
	animation-duration: 0.35s;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
	animation-direction: normal;
	animation-timing-function: ease-out;
}

@keyframes slideUp {
	from {
		bottom: -220px;
	}
	to {
		bottom: 0;
	}
}

@-webkit-keyframes slideUp {
	from {
		bottom: -220px;
	}
	to {
		bottom: 0;
	}
}

/* share */

.rule_wrapper {
	width: 336px;
	height: 440px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}

.close {
	position: absolute;
	display: block;
	width: 28px;
	height: 28px;
	background: url("https://resource.yuedaoec.com/promotions/bargain/close.png") no-repeat center;
	background-size: cover;
	bottom: 0px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
