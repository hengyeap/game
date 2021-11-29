<template>
	<div id="container">
		<van-nav-bar :title="title" left-text="" right-text="分享" left-arrow @click-left="onClickLeft" @click-right="shareShow = true" />
		<img :src="topBanner" alt="" srcset="" />
		<div class="live">
			<img :src="banner1" alt="" srcset="" />
			<span @click="show = true"></span>
		</div>
		<img class="videoTit" :src="videoTitle" alt="" srcset="" />
		<ul class="videolist">
			<li v-for="(item, index) in swiperLists" :key="index">
				<div @click="playVedio(index)">
					<img :src="item.img" alt />
					<p>{{ item.name }}</p>
					<span></span>
				</div>
			</li>
		</ul>
		<ul>
			<li v-for="(item, index) in swiperLists">
				<TVedio :poster="item.img + '?x-oss-process=image/resize,w_750'" :src="item.src" :play="item.play" @stopVedio="stopVedio" />
			</li>
		</ul>
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
		<van-overlay :show="show" @click="show = false">
			<div class="wrapper" @click.stop>
				<img :src="miniImg" />
				<span @click="download" class="download"></span>
			</div>
		</van-overlay>
	</div>
</template>

<script>
import hybrid from 'hybridify-js';
import { NavBar, Overlay } from 'vant';
import axios from 'axios';
import TVedio from './assets/TVedio.vue';
export default {
	name: 'healthZone',
	components: {
		[NavBar.name]: NavBar,
		[Overlay.name]: Overlay,
		TVedio
	},
	data() {
		return {
			show: false,
			title: '健康直播专区',
			url: '',
			shareShow: false,
			topBanner: 'https://resource.yuedaoec.com/promotions/healthZone2/videoBanner.png',
			banner1: 'https://resource.yuedaoec.com/promotions/healthZone2/live_img.png',
			videoTitle: 'https://resource.yuedaoec.com/promotions/healthZone2/tst_video_title.png',
			miniImg: 'https://resource.yuedaoec.com/promotions/healthZone2/miniCode.jpg',
			swiperLists: [
				{
					img: 'https://resource.yuedaoec.com/promotions/healthZone2/video1.jpg',
					play: false,
					src: 'https://resource.yuedaoec.com/promotions/healthZone2/video1.mp4',
					name: '酵母钙肽饮'
				},
				{
					img: 'https://resource.yuedaoec.com/promotions/healthZone2/video2.jpg',
					play: false,
					src: 'https://resource.yuedaoec.com/promotions/healthZone2/video2.mp4',
					name: '接骨木莓果味饮料'
				},
				{
					img: 'https://resource.yuedaoec.com/promotions/healthZone2/video3.jpg',
					play: false,
					src: 'https://resource.yuedaoec.com/promotions/healthZone2/video3.mp4',
					name: '金银花针叶樱桃风味固体饮料'
				},
				{
					img: 'https://resource.yuedaoec.com/promotions/healthZone2/video4.jpg',
					play: false,
					src: 'https://resource.yuedaoec.com/promotions/healthZone2/video4.mp4',
					name: '葡萄酵母复合果蔬饮品'
				},
				{
					img: 'https://resource.yuedaoec.com/promotions/healthZone2/video5.jpg',
					play: false,
					src: 'https://resource.yuedaoec.com/promotions/healthZone2/video5.mp4',
					name: '长白山红参粉'
				}
			]
		};
	},
	created() {
		this.url = window.location.href;
	},
	mounted() {},
	updated() {},
	methods: {
		download() {
			console.log(this.miniImg);
			hybrid.app.downloadVideo(this.miniImg);
			this.show = false;
		},
		playVedio(index) {
			console.log(index);
			console.log(this.swiperLists);
			this.swiperLists[index].play = true;
		},
		stopVedio() {
			const videos = document.getElementsByTagName('video');
			for (let i = 0; i < videos.length; i++) {
				videos[i].pause();
			}
			this.swiperLists.forEach(vedioInfo => {
				vedioInfo.play = false;
			});
		},
		cancelShare() {
			this.shareShow = false;
			this.slideUp = false;
		},
		share(type) {
			const obj = {
				url: this.url,
				type: type,
				title: '健康科普，为你和家人暖心护航',
				description: '专家直播与你相约，多个精选健康科普视频在线观看→',
				image: 'https://resource.yuedaoec.com/promotions/healthZone2/shareImg2.jpg'
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

.videoTit {
	width: 262px;
	margin: 20px auto 10px;
}

.videolist {
	padding: 13px;
}

.videolist img {
	width: 100%;
	height: 195px;
}

.videolist li {
	background-color: #ffffff;
	margin-bottom: 20px;
	position: relative;
	border-radius: 5px;
	overflow: hidden;
}

.videolist p {
	padding: 8px 0;
	text-align: center;
}

.videolist li div::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 195px;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
}

.videolist span {
	display: block;
	position: absolute;
	background: url('https://resource.yuedaoec.com/promotions/healthZone2/playBtn.png') no-repeat center;
	width: 34px;
	height: 41px;
	background-size: cover;
	top: 50%;
	left: 50%;
	margin-top: -26px;
	margin-left: -20px;
	z-index: 1;
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
	background: url('https://resource.yuedaoec.com/promotions/healthZone2/download.png') no-repeat center;
	background-size: cover;
	position: fixed;
	left: 50%;
	top: 50%;
	margin-top: 200px;
	transform: translateX(-50%);
}

.live {
	position: relative;
	margin: 20px 11px 0;
}

.live span {
	position: absolute;
	width: 89px;
	height: 22px;
	display: block;
	top: 143px;
	right: 45px;
}
</style>
