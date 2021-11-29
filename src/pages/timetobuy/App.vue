<template>
	<div id="container">
		<div class="topBar">
			<img class="back" @click="back" :src="backIcon" alt="" />
			<img class="share" @click="shareShow = true" :src="shareIcon" alt="" />
		</div>
		<img :src="banner" alt="" />
		<div class="main">
			<van-tabs v-model="active" @click="onClick">
				<van-tab v-for="(item, index) in dateList" :key="index">
					<template #title>
						<b>{{ item }}</b>
						<em>{{ getStatus(index) }}</em>
					</template>
					<div class="content">
						<div class="allList" v-for="(item, index) in allList">
							<p class="timeInterval">{{ item.skus[0].startDate.slice(11) }} - {{ item.skus[0].endDate.slice(11) }}</p>
							<ul v-for="(subItem, subIndex) in item.skus" :key="subIndex">
								<li @click="toDetail(subItem.product.productId)">
									<img :src="'https://resource.yuedaoec.com/' + subItem.product.bannerImg" alt="" />
									<div>
										<p class="name">{{ subItem.product.name }}</p>
										<p class="price">{{ getCurrency(subItem.product.referCurrency) }}{{ subItem.product.marketHighPrice }}</p>
										<p class="btn">
											<span>秒杀价 {{ getCurrency(subItem.product.referCurrency) }}{{ subItem.product.saleLowPrice }}</span>
											<b :class="subItem.status === 1 ? 'toBuy' : ''">{{ getBtnTxt(subItem.status) }}</b>
										</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</van-tab>
			</van-tabs>
		</div>
		<div id="cover" v-show="shareShow" @click="cancelShare()">
			<div id="shareContent" class="slideUp" @click="stopP($event)">
				<p>分享到</p>
				<div class="shareBtn">
					<div @click="share('wechat')">
						<img src="https://resource.yuedaoec.com/icon/wxcircle_icon.png" alt="微信" />
						<span>微信</span>
					</div>
					<div @click="share('circle')">
						<img src="https://resource.yuedaoec.com/icon/wx_icon.png" alt="朋友圈" />
						<span>朋友圈</span>
					</div>
				</div>
				<div @click="cancelShare()" class="cancel">取消</div>
			</div>
		</div>
	</div>
</template>

<script>
import hybrid from 'hybridify-js';
import moment from 'moment';
import { NavBar, Icon, Tab, Tabs, Toast } from 'vant';
import axios from 'axios';
export default {
	name: 'healthZone',
	components: {
		[NavBar.name]: NavBar,
		[Icon.name]: Icon,
		[Tab.name]: Tab,
		[Tabs.name]: Tabs
	},
	data() {
		return {
			platform: '',
			url: '',
			active: 0,
			todayActive: 0,
			shareShow: false,
			dates: [],
			dateList: [],
			todayStr: '',
			banner: 'https://resource.yuedaoec.com/promotions/timetobuy/banner.jpg',
			backIcon: 'https://resource.yuedaoec.com/promotions/timetobuy/back.png',
			shareIcon: 'https://resource.yuedaoec.com/promotions/timetobuy/share.png',
			allList: []
		};
	},
	created() {
		this.url = window.location.href;
		this.platform = this.getUrlParam('platform');
		this.getTodayStrFromServer();
		this.getDate();
	},
	mounted() {},
	updated() {},
	methods: {
		unique(arr) {
			if (!Array.isArray(arr)) {
				console.log('type error!');
				return;
			}
			var array = [];
			for (var i = 0; i < arr.length; i++) {
				if (array.indexOf(arr[i]) === -1) {
					array.push(arr[i]);
				}
			}
			return array;
		},
		getBtnTxt(status) {
			if (status == 1) {
				return '去秒杀';
			} else if (status == 0) {
				return '即将开始';
			} else {
				return '已结束';
			}
		},
		getStatus(index) {
			if (index > this.todayActive) {
				return '敬请期待';
			} else if (index == this.todayActive) {
				return '秒杀中';
			} else if (index < this.todayActive) {
				return '已结束';
			}
		},
		getTodayStrFromServer() {
			axios
				.get(process.env.VUE_APP_REQUEST_URL + 'getToday.shop')
				.then(res => {
					this.todayStr = res.data.res;
				})
				.catch(err => {
					console.log(err);
				});
		},
		getDate() {
			axios({
				url: process.env.VUE_APP_REQUEST_URL + 'promotions/getPromotinDate.shop',
				method: 'get',
				params: {
					platform: this.platform,
					seckill: false,
					startDate: '2021-02-01',
					endDate: '2021-03-01'
				}
			})
				.then(res => {
					if (res.data.code === '10000') {
						const dates = this.unique(res.data.res);
						this.dates = dates;
						for (let i = 0; i < dates.length; i++) {
							this.dateList.push(dates[i].slice(5).replace('-', '月') + '日');
						}
						setTimeout(() => {
							if (this.isInArray(dates, this.todayStr)) {
								this.active = this.indexOfArr(dates, this.todayStr);
								this.todayActive = this.indexOfArr(dates, this.todayStr);
							} else {
								Toast('今日无活动');
							}
							this.getPromotionsByDate();
						}, 1000);
					} else {
						Toast(res.data.msg);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getPromotionsByDate() {
			axios({
				url: process.env.VUE_APP_REQUEST_URL + 'promotions/getPromotionByDate.shop',
				method: 'get',
				params: {
					platform: this.platform,
					mainShow: false,
					date: this.dates[this.active]
				}
			})
				.then(res => {
					if (res.data.code === '10000') {
						const data = res.data.res;
						let arr = [];
						for (let i = 0; i < data.length; i++) {
							arr.push(data[i].promotionId);
						}
						const promotionIds = this.unique(arr);
						for (let i = 0; i < promotionIds.length; i++) {
							this.allList[i] = {};
							this.allList[i].promotionId = promotionIds[i];
							this.allList[i].skus = [];
							for (let j = 0; j < data.length; j++) {
								if (promotionIds[i] === data[j].promotionId) {
									this.allList[i].skus.push(data[j]);
								}
								this.$forceUpdate();
							}
						}
					} else {
						Toast(res.data.msg);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		onClick() {
			console.log(this.active);
			this.getPromotionsByDate();
		},
		toDetail(productId) {
			hybrid.nav.push(process.env.VUE_APP_REDIRECT_PRODUCT_URL.replace('{productId}', productId));
		},
		cancelShare() {
			this.shareShow = false;
			this.slideUp = false;
		},
		stopP(eve) {
			eve.stopPropagation();
		},
		share(type) {
			const obj = {
				url: this.url,
				type: type,
				title: '',
				description: '',
				image: ''
			};
			console.log(obj);
			hybrid.app.toShare(obj);
			this.shareShow = false;
		},
		back() {
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
	/* background-color: #d3ede9; */
	/* padding-bottom: 30px; */
}

.back,
.share {
	position: absolute;
	top: 15px;
	width: 24px;
	height: 24px;
}

.back {
	left: 15px;
}

.share {
	right: 15px;
}

.van-tabs__wrap {
	height: 50px;
}

.van-tabs__wrap b {
	display: block;
	font-weight: normal;
}

.van-tabs__wrap em {
	font-size: 12px;
	font-style: normal;
}

.van-tab__text--ellipsis {
	display: block;
	text-align: center;
}

.van-tabs__nav {
	background-color: #ae0318;
}

[class*='van-hairline']::after {
	border: none;
}

.van-tabs__line {
	display: none;
}

.van-tab {
	color: #fe967c;
}

.van-tab--active {
	background-color: #eb1f1f;
	color: #fff4bf;
	border-bottom: 1px solid #fff4bf;
}

.van-tabs__content {
	height: 827px;
	background: url('https://resource.yuedaoec.com/promotions/timetobuy/bg.png') no-repeat center top;
	background-size: 100%;
	padding: 110px 20px 100px;
	box-sizing: border-box;
}

.content {
	height: 617px;
	overflow-y: auto;
}

.timeInterval {
	color: #ffffff;
	text-align: center;
	margin-bottom: 10px;
	font-weight: bold;
	font-size: 15px;
}

.allList li {
	background-color: #ffffff;
	overflow: hidden;
	border-radius: 5px;
	margin-bottom: 20px;
}

.allList li img {
	width: 105px;
	height: 105px;
	float: left;
}

.allList li div {
	margin-left: 115px;
	padding: 10px 0;
}

.name {
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	height: 40px;
}

.price {
	color: #a1a1a1;
	text-decoration: line-through;
	margin: 5px 0;
}

.btn {
	display: flex;
	justify-content: space-between;
	padding-right: 12px;
}

.btn span {
	color: #eb1f1f;
	font-weight: bold;
	font-size: 16px;
}

.btn b {
	background-color: #c9c9c9;
	border-radius: 4px;
	color: #ffffff;
	font-weight: normal;
	padding: 2px 6px;
}

.btn .toBuy {
	background-color: #c9c9c9;
	background-color: #eb1f1f;
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
</style>
