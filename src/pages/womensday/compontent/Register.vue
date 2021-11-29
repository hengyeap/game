<template>
	<div id="container">
		<img class="icon" :src="imgBaseUrl + 'tst_icon.png'" />
		<van-form>
			<van-field v-model="tel" name="手机" label="+86" placeholder="请输入手机号" />
			<van-field name="验证码" v-model="validateCode" center clearable placeholder="请输入验证码">
				<template #button>
					<van-button size="small" type="primary" @click="getValidateCode">发送验证码</van-button>
				</template>
			</van-field>
			<div></div>
			<van-field v-model="password" type="password" name="密码" placeholder="请输入密码" />
			<p class="pwd_notice">密码由6-20位英文字母、数字或符号组成</p>
			<p class="notice">未注册手机验证后完成注册</p>
			<div style="margin: 16px;"><van-button round block type="info" native-type="submit" @click="onSubmit">提交</van-button></div>
		</van-form>
		<van-overlay :show="inBroswer">
			<div class="wrapper" @click.stop><img :src="imgBaseUrl + 'inBrowser.png'" alt="" /></div>
		</van-overlay>
	</div>
</template>

<script>
import { Form, Field, Button, Toast, Overlay } from 'vant';
import qs from 'qs';
import hybird from 'hybridify-js';
export default {
	name: 'register',
	components: {
		[Form.name]: Form,
		[Field.name]: Field,
		[Button.name]: Button,
		[Overlay.name]: Overlay
	},
	data() {
		return {
			uid: '',
			olduser: true,
			tel: '',
			validateCode: '',
			password: '',
			imgBaseUrl: 'https://resource.yuedaoec.com/promotions/womensday/',
			parentCode: '',
			inBroswer: false
		};
	},
	created() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/QQ/i) == 'qq' || ua.match(/WeiBo/i) == 'weibo') {
			this.inBroswer = true;
		}
		this.uid = this.getUrlParam('uid'); //发起者uid
		this.getCodeByUid();
	},
	mounted() {},
	updated() {},
	methods: {
		getCodeByUid() {
			let self = this;
			let params = {};
			params.url = process.env.VUE_APP_REQUEST_PRODUCT_URL + 'user/getCodeByUid.user';
			params.type = 'get';
			params.data = {
				uid: self.uid
			};
			self.createAjax(params, function(json) {
				if (json.code === '10000') {
					self.parentCode = json.res.code;
				} else {
					Toast(json.msg);
				}
			});
		},
		getValidateCode() {
			let self = this;
			let params = {};
			params.url = process.env.VUE_APP_REQUEST_PRODUCT_URL + 'sendSeemsPhoneCode.shop';
			params.type = 'post';
			params.headers = { 'content-type': 'application/x-www-form-urlencoded' };
			params.data = qs.stringify({
				phoneNumber: this.tel,
				phoneRegion: 86,
				type: 4
			});
			self.createAjax(params, function(json) {
				console.log(json);
				if (json.code === '10000') {
					Toast('验证码发送成功');
				} else {
					Toast(json.msg);
				}
			});
		},
		onSubmit() {
			let self = this;
			let params = {};
			params.url = process.env.VUE_APP_REQUEST_PRODUCT_URL + 'openOrLogin.shop';
			params.type = 'post';
			params.data = {
				parentCode: this.parentCode,
				password: this.password,
				phoneNumber: this.tel,
				phoneRegion: 86,
				protocolVersion: '1.0',
				validateCode: this.validateCode
			};
			self.createAjax(params, function(json) {
				console.log(json);
				if (json.code === '10000') {
					console.log(json.res.uid, json.res.exist);
					if (json.res.exist === true) {
						self.olduser = true;
						Toast('已注册');
					} else {
						self.olduser = false;
						self.$router.push({
							path: '/toTmm'
						});
					}
				} else {
					Toast(json.msg);
				}
			});
		}
	}
};
</script>

<style scoped="scoped">
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
	font-size: 14px;
}

#container {
	padding: 100px 25px 0;
	box-sizing: border-box;
}

.icon {
	width: 80px;
	height: 80px;
	margin: 0 auto 20px;
}

/deep/.van-cell::after {
	display: none;
}

/deep/.van-cell {
	line-height: 50px;
	border-bottom: 1px solid #ececec;
}

/deep/.van-button--primary {
	background-color: transparent;
	border: none;
	color: #fe5472;
	font-size: 14px;
	border-left: 1px solid #dddddd;
}

/deep/.van-button--info {
	background: linear-gradient(126deg, #ff6d20 0%, #fe5472 100%);
	border: none;
}

/deep/.van-field__label {
	width: 40px;
}

/deep/.van-button--primary {
	padding-left: 10px;
}

/* /deep/.van-button__content {
	width: 100px;
}

/deep/.van-button .van-button__content {
	width: 100%;
} */

.pwd_notice {
	font-size: 12px;
	color: #bdbdbd;
	padding-top: 10px;
}

.notice {
	text-align: center;
	color: #fe5472;
	margin-top: 30px;
}
.wrapper img {
	width: 156px;
	position: fixed;
	top: 20px;
	right: 20px;
}
</style>
