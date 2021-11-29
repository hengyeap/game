<template>
	<div id="container">
		<van-nav-bar :title="title" left-text="" right-text="分享" left-arrow @click-left="onClickLeft" @click-right="shareShow = true" />
		<img :src="topBanner" alt="" srcset="" />
		<div class="part part1">
			<img :src="title1" alt="" srcset="" />
			<img @click="toDetail(item)" v-for="(item, index) in topPros" :key="index" :src="'https://resource.yuedaoec.com/promotions/healthZone2/' + item + '.jpg'" alt="" />
		</div>
		<div class="listAll">
			<div v-for="(item, index) in allProducts" :key="index">
				<img :src="'https://resource.yuedaoec.com/promotions/healthZone2/title' + (index + 2) + '.jpg'" alt="" srcset="" />
				<div class="list">
					<ul>
						<li v-for="(subItem, subIndex) in item" :key="subIndex" @click="toDetail(subItem.productId)">
							<img v-if="subItem.bannerImg" :src="'https://resource.yuedaoec.com/' + subItem.bannerImg + '?x-oss-process=image/resize,w_200'" alt="" srcset="" />
							<p>{{ subItem.name }}</p>
							<span>¥{{ subItem.saleHighPrice }}</span>
							<b>立即购买</b>
						</li>
					</ul>
				</div>
			</div>
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
	</div>
</template>

<script>
import hybrid from 'hybridify-js';
import { NavBar } from 'vant';
import axios from 'axios';
export default {
	name: 'healthZone',
	components: {
		[NavBar.name]: NavBar
	},
	data() {
		return {
			show: false,
			title: '',
			url: '',
			shareShow: false,
			topBanner: 'https://resource.yuedaoec.com/promotions/healthZone2/topBanner.jpg',
			title1: 'https://resource.yuedaoec.com/promotions/healthZone2/title1.jpg',
			title2: 'https://resource.yuedaoec.com/promotions/healthZone2/title2.jpg',
			title3: 'https://resource.yuedaoec.com/promotions/healthZone2/title3.jpg',
			title4: 'https://resource.yuedaoec.com/promotions/healthZone2/title4.jpg',
			title5: 'https://resource.yuedaoec.com/promotions/healthZone2/title5.jpg',
			topPros: [41304, 41484, 42548, 42549, 42559],
			productIds: [
				[41491, 29077, 28589],
				[42441, 42442, 41592, 41593, 41482, 41488, 41560, 41610, 41611, 42551],
				[41608, 41609, 41612, 41598, 41594],
				[42216, 42212, 42214, 42213]
			],
			allProducts: []
		};
	},
	created() {
		this.url = window.location.href;
		this.getAll();
	},
	mounted() {
	},
	updated() {},
	methods: {
		getAll() {
			for (let i = 0; i < this.productIds.length; i++) {
				this.allProducts[i] = [];
				for (let j = 0; j < this.productIds[i].length; j++) {
					axios
						.get(process.env.VUE_APP_REQUEST_PRODUCT_URL + 'product/getProductById.shop?id=' + this.productIds[i][j])
						.then(res => {
							if ((res.data.code = '10000')) {
								this.allProducts[i][j] = res.data.res.product;
								this.$forceUpdate();
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
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
				title: '精选好礼，送礼佳选！',
				description: '精选健康好礼，送家人送朋友送自己，速戳抢购→',
				image: 'https://resource.yuedaoec.com/promotions/healthZone2/shareImg.jpg'
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

#container {
	width: 100%;
	max-width: 375px;
	font-size: 14px;
	color: #333333;
	position: relative;
	margin: 0 auto;
	background-color: #d3ede9;
	padding-bottom: 30px;
}

.van-nav-bar {
	height: 46px;
	line-height: 46px;
}

.van-icon-arrow-left:before {
	color: #333333;
	font-size: 24px;
}

.van-nav-bar__title {
	font-weight: normal;
	font-size: 16px;
}

.van-nav-bar__text {
	color: #333333;
	font-size: 14px;
}

.van-hairline--bottom::after {
	border-bottom-width: 0;
}

.list {
	overflow-y: hidden;
	overflow-x: auto;
	white-space: nowrap;
	scrollbar-width: none;
	-ms-overflow-style: none;
	min-width: 100%;
	padding: 15px 14px;
	box-sizing: border-box;
}

.list li {
	width: 130px;
	display: inline-block;
	background-color: #ffffff;
	border-radius: 4px;
	margin-right: 10px;
	padding: 10px 10px 20px;
	position: relative;
}

.list li:last-of-type {
	margin-right: 14px;
}

.list img {
	width: 100px;
	height: 100px;
	margin: 0 auto;
}

.list p {
	font-size: 13px;
	margin-top: 10px;
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	white-space: break-spaces;
	margin-bottom: 6px;
}

.list span {
	font-size: 13px;
}

.list b {
	position: absolute;
	bottom: 15px;
	font-size: 12px;
	font-weight: normal;
	background-color: #62b9b4;
	display: block;
	right: 10px;
	color: #ffff;
	padding: 2px 5px;
	border-radius: 4px;
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

.van-overlay img {
	width: 80%;
    position: fixed;
    top: 0;
    left: 0;
    margin: auto;
    bottom: 0;
    right: 0;
}

.download {
	width: 20px;
	height: 20px;
	background: url("https://resource.yuedaoec.com/promotions/healthZone2/download.png") no-repeat center;
	background-size: cover;
	position: fixed;
	left: 50%;
	top: 50%;
	margin-top: 200px;
	transform: translateX(-50%);
}

</style>
