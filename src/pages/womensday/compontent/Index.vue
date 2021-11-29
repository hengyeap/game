<template>
	<div id="container">
		<div class="top" :style="{ backgroundImage: randomBg, backgroundSize: backgroundSize }">
			<div class="search">
				<van-icon @click="back" name="arrow-left" />
				<van-field v-model="value" label="" left-icon="search" placeholder="" readonly="readonly" />
				<span @click="reload()">搜索</span>
			</div>
			<ul class="texts">
				<li v-for="(item, index) in text" :key="index">{{ item }}</li>
			</ul>
			<img class="slideDown" :src="imgBase + 'slideDown.png'" />
			<img v-if="showIcon" @click="showShare = true" class="shareIcon" :src="imgBase + 'shareIcon.png'" />
		</div>
		<div class="bottom">
			<img v-if="!isNew" @click="toRules" class="rulesIcon" :src="imgBase + 'rulesIcon.png'" />
			<div v-if="!isNew" class="invite">
				<img @click="upgrade" class="upgrade" :src="imgBase + 'upgrade.png'" />
				<img @click="reciviedCoupon" class="reciviedCoupon" :src="imgBase + 'coupon.gif'" />
				<ul class="inviteList">
					<li>{{ people.peopleNum }}</li>
					<li>{{ people.payPeopleNum }}</li>
					<li>{{ people.payPeopleNum }}</li>
				</ul>
			</div>
			<div v-if="!isNew" class="records">
				<ul class="recordsList">
					<li>
						<span>CODE</span>
						<span>开卡时间</span>
						<span>领取状态</span>
					</li>
					<li v-for="(item, index) in records" :key="index">
						<span>{{ item.code }}</span>
						<span>{{ item.createCardDate }}</span>
						<span v-if="item.orderStatus == 0 || item.orderStatus === null || item.orderStatus === 'null'">未领取</span>
						<span v-else style="color: #FE4469;">已领取</span>
					</li>
					<p style="text-align: center;line-height: 40px;color: #888888;" v-if="records.length == 0">暂无领取记录</p>
				</ul>
			</div>
			<p v-if="!isNew" class="notice">每天24点更新新用户领取数据</p>
			<div v-if="isNew" class="recived"><span @click="toPackge"></span></div>
		</div>
		<van-overlay :show="show1" @click="show1 = false">
			<div class="wrapper" @click.stop>
				<img :src="imgBase + 'dialog3.png'" alt="" />
				<span class="close" @click="show1 = false"></span>
				<b
					@click="
						upgrade();
						show1 = false;
					"
				></b>
			</div>
		</van-overlay>
		<van-popup v-model="showShare" round position="bottom" :style="{ height: '20%' }">
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
		</van-popup>
	</div>
</template>

<script>
import { Toast, Icon, Field, Overlay, Dialog, Popup } from 'vant';
import hybrid from 'hybridify-js';
import axios from 'axios';
export default {
	name: 'list',
	components: {
		[Icon.name]: Icon,
		[Field.name]: Field,
		[Overlay.name]: Overlay,
		[Popup.name]: Popup
	},
	data() {
		return {
			imgBase: 'https://resource.yuedaoec.com/promotions/womensday/',
			shareImgBase: 'https://resource.yuedaoec.com/',
			value: '女神你好',
			show1: false,
			showShare: false,
			texts: [
				['女神，你好~', '成功源于 ', '你帮助了足够多的人'],
				['女神，你好~', '被爱与付出爱 ', '都是成长历程'],
				['女神，你好~', '得来不易的成功 ', '更要与人分享'],
				['女神，你好~', '迈向成功的捷径 ', '是学会复制成功'],
				['女神，你好~', '经营好自己 ', '是一生的修行'],
				['女神，你好~', '深耕当下 ', '机遇就在眼前'],
				['女神，你好~', '做精致女王 ', '自信追光'],
				['女神，你好~', '你不服输的样子 ', '真是美好'],
				['女神，你好~', '人生困境处 ', '处处有生机'],
				['女神，你好~', '你所有美好的愿望 ', '都将如期而至'],
				['女神，你好~', '你也可以 ', '做自己人生的魔术师 '],
				['女神，你好~', '翻山越岭之后 ', '风景更美'],
				['女神，你好~', '逆流而上 ', '做自己的女王'],
				['女神，你好~', '人生越独立 ', '越精彩'],
				['女神，你好~', '努力是为了 ', '让自己不可替代'],
				['女神，你好~', '有你的春天 ', '皆是欢喜'],
				['女神，你好~', '春天适合与想念的人 ', '奔赴浪漫'],
				['女神，你好~', '愿你所等待的 ', '永不缺席'],
				['女神，你好~', '你站在风景里 ', '一切刚刚好'],
				['女神，你好~', '想告诉你 ', '我一直都在'],
				['女神，你好~', '不能错过春天 ', '也不能错过你'],
				['女神，你好~', '花开在枝头 ', '而你在心头'],
				['女神，你好~', '最美的春天 ', '是遇见你的那个季节'],
				['女神，你好~', '你若在', '天天是好天气'],
				['女神，你好~', '下一个转角 ', '遇见更好的自己'],
				['女神，你好~', '想在这个春天 ', '住进你心里'],
				['女神，你好~', '愿你遇见有趣的人 ', '过有趣一生'],
				['女神，你好~', '遇见你之后 ', '都是好风景'],
				['女神，你好~', '努力是为了 ', '赚更多自由'],
				['女神，你好~', '世界很大 ', '请勇敢梦想'],
				['女神，你好~', '穿过人山人海 ', '一起去看山河大海'],
				['女神，你好~', '新一年就让过往琐碎 ', '一笔勾销吧'],
				['女神，你好~', '愿你时时刻刻 ', '都奔走在自己的热爱里'],
				['女神，你好~', '即使单枪匹马 ', '也能无所畏惧'],
				['女神，你好~', '往后余生 ', '许你岁月静好'],
				['女神，你好~', '愿你历遍山河 ', '仍觉人间值得'],
				['女神，你好~', '过去的每一分努力 ', '就是你未来的底气'],
				['女神，你好~', '每一个你 ', '都值得被认真对待'],
				['女神，你好~', '快乐的事 ', '正在排队呢'],
				['女神，你好~', '爱敷面膜的女孩 ', '运气不会太差'],
				['女神，你好~', '要永远记住 ', '变美是为了讨好自己'],
				['女神，你好~', '以最美的姿态 ', '度过最美好的年华'],
				['女神，你好~', '你眼里的四季 ', '胜过我见过的山海星河'],
				['女神，你好~', '愿爱意相伴 ', '你的每一个朝夕'],
				['女神，你好~', '别着急 ', '好的东西总会迟一点到'],
				['女神，你好~', '年龄承载的 ', '都是故事'],
				['女神，你好~', '你的幸福 ', '由自己界定'],
				['女神，你好~', '学会欣赏自己 ', '这很重要'],
				['女神，你好~', '别回头 ', '坚定往前看'],
				['女神，你好~', '做自己 ', '别随波逐流'],
				['女神，你好~', '好久不见 ', '祝你每天都好'],
				['女神，你好~', '对标签say no ', '做内核坚固的女性'],
				['女神，你好~', '你可以成为 ', '你想成为的任何样子'],
				['女神，你好~', '心怀梦想 ', '征途就是星辰大海'],
				['女神，你好~', '不管你在哪儿 ', '都有光为你照亮'],
				['女神，你好~', '愿你的可爱被发现 ', '孤独被倾听'],
				['女神，你好~', '愿你听从自己的内心 ', '生活明亮可爱'],
				['女神，你好~', '从来没有努力 ', '会白费'],
				['女神，你好~', '探寻自己的边界 ', '勇敢跨出每一步'],
				['女神，你好~', '打破陈规 ', '愿你走出自己的步调'],
				['女神，你好~', '喜欢就大声唱 ', '爱就大胆说'],
				['女神，你好~', '爱自己 ', '就是了不起'],
				['女神，你好~', '爱自己 ', '是终身浪漫的开始'],
				['女神，你好~', '春风拂面 ', '适合放飞烦恼'],
				['女神，你好~', '不焦不躁 ', '清风自会吹来'],
				['女神，你好~', '请相信 ', '你值得温柔相待'],
				['女神，你好~', '你就是你 ', '别人无法定义'],
				['女神，你好~', '余生 ', '大可自己指教'],
				['女神，你好~', '人生没有条条框框 ', '别给自己设限'],
				['女神，你好~', '我们一路奋战 ', '去过向往的生活'],
				['女神，你好~', '懂得宠爱自己的你  ', '更值得全世界的偏爱']
			],
			text: [],
			randomBg: 0,
			isNew: false,
			windowHeight: document.documentElement.clientHeight || document.body.clientHeight,
			uid: '',
			url: window.location.href,
			people: {},
			records: [],
			showIcon: false
		};
	},
	created() {
		this.uid = this.getUrlParam('uid');
		const isNew = this.getUrlParam('isNew');
		if (isNew === 'true') {
			this.value = '新晋女神你好';
			this.isNew = true;
		} else {
			if (this.uid) {
				this.getDate();
			}
		}
		const response = hybrid.app.whereamiSync();
		console.log(response);
		if (response == 'App@Android' || response == 'App@IOS') {
			this.showIcon = true;
		} else {
			this.showIcon = false;
		}
		this.random();
	},
	mounted() {
		document.getElementsByClassName('top')[0].style.height = this.windowHeight + 'px';
	},
	updated() {},
	methods: {
		getDate() {
			let self = this;
			let params = {};
			params.url = process.env.VUE_APP_REQUEST_PRODUCT_URL + 'goddess/findGoddess202103';
			params.type = 'get';
			params.data = {
				parentUid: self.uid,
				type: '202103',
				pageSize: 1000,
				currentPage: 1
			};
			let params2 = {};
			params2.url = process.env.VUE_APP_REQUEST_PRODUCT_URL + 'goddess/getGoddessge202103';
			params2.type = 'get';
			params2.data = {
				parentUid: self.uid,
				type: '202103'
			};
			self.createAjax(params, function(json) {
				if (json.code === '10000') {
					self.records = json.res.datas;
				} else {
					Toast(json.msg);
				}
			});
			self.createAjax(params2, function(json) {
				if (json.code === '10000') {
					self.people = json.res;
				} else {
					Toast(json.msg);
				}
			});
		},
		reload() {
			location.reload();
		},
		random() {
			if (this.value == '女神你好' || this.value == '新晋女神你好') {
				const randomText = Math.floor(Math.random() * 70);
				this.text = this.texts[randomText];
				const randomBg = Math.floor(Math.random() * 10 + 1);
				this.randomBg = 'url(' + this.imgBase + 'bg' + randomBg + '.jpg)';
				this.backgroundSize = '100%';
			} else {
				if (this.isNew) {
					Toast('请输入:新晋女神你好');
				} else {
					Toast('请输入:女神你好');
				}
			}
		},
		upgrade() {
			hybrid.nav.push('https://appdist.yuedaoec.com/h5/activity/upgradeCard.html');
		},
		toRules() {
			this.$router.push({
				path: '/rules'
			});
		},
		reciviedCoupon() {
			let self = this;
			if (self.uid) {
				axios
					.get(process.env.VUE_APP_REQUEST_PRODUCT_URL + 'user/getCodeByUid.user', {
						params: {
							uid: self.uid
						}
					})
					.then(function(response) {
						if (response.data.code === '10000') {
							const code = response.data.res.code;
							axios
								.get(process.env.VUE_APP_REQUEST_PRODUCT_URL + 'user/checkRed.user', {
									params: {
										code: code
									}
								})
								.then(function(response2) {
									if (response2.data.code === '10000') {
										const status = response2.data.res;
										if (status == 1) {
											self.show1 = true;
										} else if (status == 2) {
											self.$router.push({
												path: '/share'
											});
										}
									} else {
										Toast(response2.data.msg);
									}
								})
								.catch(function(error) {
									console.log(error);
								});
						} else {
							Toast(response.data.msg);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			} else {
				Dialog.alert({
					message: '登录状态已失效，请重新登录！'
				}).then(() => {
					hybrid.nav.toMe();
				});
			}
		},
		share(type) {
			const obj = {
				url: this.url,
				type: type,
				title: '搜【女神你好】 ，领当红女神礼',
				description: '在APP首页搜【女神你好】，送上最诚挚的女神节祝福~',
				image: 'https://resource.yuedaoec.com/promotions/womensday/shareImg.jpg'
			};
			console.log(obj);
			hybrid.app.toShare(obj);
			this.showShare = false;
		},
		onClickLeft() {
			hybrid.back();
		},
		toPackge() {
			hybrid.nav.push('https://appstore.yuedaoec.com/h5/skuDetail.html?productId=43687');
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

body,
html {
	background-color: #ffffff;
}

#container {
	width: 100%;
	max-width: 375px;
	font-size: 14px;
	color: #333333;
	position: relative;
	margin: 0 auto;
}

.top {
	position: relative;
}

.search {
	display: flex;
	padding: 20px 15px 0;
	background-repeat: no-repeat;
	background-position: center top;
	box-sizing: border-box;
}

.search > .van-icon {
	flex: 0.8;
}

.van-icon-arrow-left:before {
	position: relative;
	top: 8px;
	font-size: 20px;
}

.van-icon-search::before {
	font-size: 18px;
}

.search .van-cell {
	flex: 6;
	line-height: 20px;
	border-radius: 5px;
}

.search > span {
	flex: 1.2;
	display: block;
	width: 50px;
	font-weight: 500;
	text-align: center;
	line-height: 40px;
}

.texts {
	margin-top: 40px;
	position: relative;
	height: 200px;
}

.texts li {
	border-radius: 8px;
	background-color: #ffffff;
	height: 38px;
	line-height: 38px;
	padding: 0 18px;
	position: absolute;
	left: 40px;
}

.texts li:before {
	position: absolute;
	content: '';
	width: 4px;
	height: 16px;
	left: -4px;
	background: url('https://resource.yuedaoec.com/promotions/womensday/horn.png') no-repeat center;
	background-size: 4px;
	top: 30%;
}

.texts li:nth-child(1) {
	top: 20px;
	opacity: 0;
	animation-name: slideUp1, fadeIn1;
	animation-duration: 0.6s;
	animation-timing-function: ease;
	animation-delay: 0s;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
}

.texts li:nth-child(2) {
	top: 80px;
	opacity: 0;
	animation-name: slideUp2, fadeIn2;
	animation-duration: 0.6s;
	animation-timing-function: ease;
	animation-delay: 0.8s;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
}

.texts li:nth-child(3) {
	top: 140px;
	opacity: 0;
	animation-name: slideUp3, fadeIn3;
	animation-duration: 0.6s;
	animation-timing-function: ease;
	animation-delay: 1.6s;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
}

@keyframes slideUp1 {
	from {
		top: 20px;
	}
	to {
		top: 0;
	}
}

@keyframes fadeIn1 {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes slideUp2 {
	from {
		top: 80px;
	}
	to {
		top: 60px;
	}
}

@keyframes fadeIn2 {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes slideUp3 {
	from {
		top: 140px;
	}
	to {
		top: 120px;
	}
}

@keyframes fadeIn3 {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.slideDown {
	width: 220px;
	height: 56px;
	position: absolute;
	bottom: 20px;
	left: 50%;
	margin-left: -110px;
	animation: slideUpDown 0.8s ease infinite;
}

@keyframes slideUpDown {
	from {
		bottom: 20px;
	}
	to {
		bottom: 10px;
	}
}

.shareIcon {
	position: absolute;
	width: 42px;
	height: 26px;
	bottom: 50px;
	right: 0;
}

.bottom {
	/* height: 852px; */
	background: url('https://resource.yuedaoec.com/promotions/womensday/bottom_bg.png') no-repeat center top;
	background-size: 100%;
	position: relative;
}

.invite {
	height: 495px;
	background: url('https://resource.yuedaoec.com/promotions/womensday/middle_bg.png') no-repeat center top;
	background-size: 100%;
	position: relative;
}

.upgrade {
	width: 58px;
	position: absolute;
	top: 94px;
	right: 100px;
}

.reciviedCoupon {
	width: 306px;
	margin: 0 auto;
	padding-top: 130px;
}

.inviteList {
	display: flex;
	justify-content: center;
	padding-top: 154px;
}

.inviteList li {
	color: #fe4469;
	font-size: 24px;
	margin: 0 26px;
	width: 44px;
	text-align: center;
	font-weight: 500;
	line-height: 30px;
}

.records {
	height: 328px;
	background: url('https://resource.yuedaoec.com/promotions/womensday/records_bg.png') no-repeat center top;
	background-size: 336px;
	position: relative;
	top: -20px;
	padding-bottom: 20px;
}

.recived {
	height: 553px;
	background: url('https://resource.yuedaoec.com/promotions/womensday/new_recived.jpg') no-repeat center top;
	background-size: 100%;
	position: relative;
}

.recived span {
	display: block;
	width: 205px;
	height: 54px;
	position: absolute;
	right: 84px;
	bottom: 44px;
}

.recordsList {
	padding: 54px 30px 0;
	height: 250px;
	overflow-y: auto;
}

.recordsList li {
	display: flex;
	justify-content: space-between;
	line-height: 24px;
}

.recordsList li:nth-child(1) {
	margin-bottom: 5px;
}

.recordsList li span {
	flex: 1;
	text-align: center;
}

.rulesIcon {
	position: absolute;
	width: 42px;
	height: 26px;
	right: 0;
	top: 50px;
	z-index: 99;
}

.van-overlay {
	z-index: 999;
}

.wrapper {
	width: 300px;
	height: 297px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}

.wrapper b {
	display: block;
	width: 136px;
	height: 32px;
	position: absolute;
	bottom: 17px;
	left: 50%;
	transform: translateX(-50%);
}

.close {
	position: absolute;
	display: block;
	width: 28px;
	height: 28px;
	background: url('https://resource.yuedaoec.com/promotions/bargain/close.png') no-repeat center;
	background-size: cover;
	bottom: -40px;
	left: 50%;
	transform: translateX(-50%);
}

.van-popup--bottom {
	height: auto;
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

.notice {
	color: #ffffff;
	position: absolute;
	bottom: 3px;
	left: 50%;
	transform: translateX(-50%);
	font-size: 12px;
}
</style>
