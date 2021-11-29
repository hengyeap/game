<template>
    <div id="container">
        <van-nav-bar :title="title" left-text="" right-text="" left-arrow @click-left="onClickLeft" />
        <div class="content">
            <div class="bargainPro">
                <div class="countDown">
                    <MyCountDown @bargainFinished="bargainFinished" v-if="!product.success" :time="new Date(product.endTime).getTime() - new Date(product.nowDate).getTime()"></MyCountDown>
                    <span v-else>{{successTxt}}</span>
                </div>
                <div class="bargain_det">
                    <div class="product">
                        <div class="product_img">
                            <img :src="bannerImgBase + product.img" alt="">
                            <span>价值<b>¥{{product.giftPackageAmount}}</b></span>
                        </div>
                        <div class="product_txt">
                            <p class="product_name">{{product.skuName}}</p>
                            <p class="successNum">已送出<b>{{product.bargainComplete}}件</b></p>
                        </div>
                    </div>
                    <div class="progress_text">
                        <p v-if="!product.success">
                            已砍<span>{{product.poorBargainAmount}}</span>元，离免费拿仅差<b>{{product.haveBargainAmount}}元</b>
                        </p>
                        <p v-else class="progress_success">
                            已成功砍至<b>0元</b>礼包已发放至【我的】-【礼包】<span><br>(礼包随次单发，礼包有效期：自发放日起60天)</span>
                        </p>
                    </div>
                    <p v-if="!product.success" class="progress">
                        <span class="progress_wrap">
                           <i v-if="percent * 100 >= 99.8">即将砍成</i>
                           <i v-else>已砍{{Math.floor(percent*100)}}%</i>
                        </span>
                    </p>
                    <p v-if="!product.success" class="share" @click="share">{{shareTxt}}</p>
                    <p v-else class="btn_toPackage" style="margin-top: 10px" @click="toPackage">{{toPackageTxt}}</p>
                </div>
            </div>
            <div class="bargainRecords">
                <van-tabs v-model="active" @disabled="rulesShow = true">
                    <van-tab :title="recordTxt">
                        <ul v-if="bargainUserLogs && bargainUserLogs.length > 0">
                            <li v-for="(item, index) in bargainUserLogs" :key="index">
                                <img :src="item.avatar" />
                                <span class="nickname">{{item.nickName}}</span>
                                <span class="amount">砍掉{{item.bargainAmount}}元</span>
                            </li>
                        </ul>
                        <p v-else style="text-align:center;padding-top:30px;color:#666666">{{noBargain}}</p>
                    </van-tab>
                    <van-tab :title="ruleTxt" disabled></van-tab>
                </van-tabs>
            </div>
            <ListAll :uid="uid"></ListAll>
        </div>
        <RulesDialog :rulesShow="rulesShow" @closeRules="closeRules"></RulesDialog>
        <van-overlay :show="shareShow" @click="shareShow = false">
            <div class="share_wrapper" @click.stop>
                <div class="contxt">
                    <b>{{copyTxt}}</b>
                    <p>去微信粘贴给好友，<br/>好友可以帮你<span>砍大金额</span></p>
                </div>
                <div class="btn_wrap">
                    <p class="btn_share" @click="toWx(),shareShow = false">去微信粘贴</p>
                </div>
                <span class="close" @click="shareShow = false"></span>
            </div>
        </van-overlay>
        <van-overlay :show="congratulationsShow" @click="congratulationsShow = false">
            <div class="congratulations_wrapper" @click.stop>
                <div class="bargain_progress">
                    <div v-if="!product.success">
                        <p class="text1" v-if="first">已砍<span>{{product.poorBargainAmount}}</span> 元！离免费拿仅差<b>{{product.haveBargainAmount}}元</b></p>
                        <p class="text2" v-else>
                            <span v-for="(item, index) in bargainUserLogs" v-if="index < 3">{{item.nickName}}{{index < (bargainUserLogs.length >=3 ? 2 : bargainUserLogs.length - 1) ? '、' : ''}}</span> 等{{bargainUserLogs.length}}人已成功帮砍!
                            <i>离免费拿仅差</i><b>{{product.haveBargainAmount}}元</b></p>
                        <p v-if="!product.success" class="progress">
                            <span class="progress_wrap"><i>已砍{{Math.floor(percent*100)}}%</i></span>
                        </p>
                    </div>
                    <div v-else>
                        <p class="text3">
                            已成功砍至<b>0元</b>礼包已发放至【我的】-【礼包】<span>（礼包随次单发，礼包有效期：自发放日起60天）</span>
                        </p>
                    </div>
                </div>
                <div class="btn_wrap">
                    <p v-if="!product.success" class="btn_share btn_share2" @click="share();congratulationsShow = false">{{shareTxt}}</p>
                    <p v-else class="btn_toPackage" @click="toPackage(),congratulationsShow = false">{{toPackageTxt}}</p>
                </div>
                <span class="close" @click="congratulationsShow = false"></span>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import { NavBar, Toast, Dialog, CountDown, Tab, Tabs, Overlay } from 'vant';
import ListAll from './../components/ListAll.vue';
import MyCountDown from './../components/CountDown.vue';
import RulesDialog from './../components/RulesDialog.vue';
import hybrid from 'hybridify-js';
import axios from 'axios';
export default ({
    name: 'bargainDet',
    components: {
        [NavBar.name]: NavBar,
        [Dialog.name]: Dialog,
        [CountDown.name]: CountDown,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Overlay.name]: Overlay,
        ListAll,
        MyCountDown,
        RulesDialog
    },
    data() {
        return {
            uid: "",
            bargainId: "",
            first: false,
            platform: "tingmimi",
            title: "砍价免费拿",
            shareTxt: "分享给好友帮我砍",
            toPackageTxt: "查看礼包",
            shareTxtDisabled: "砍价结束",
            recordTxt: "砍价记录",
            ruleTxt: "砍价规则",
            copyTxt: "口令已复制",
            successTxt: "砍价成功",
            noBargain: "暂无砍价记录，赶快分享给朋友~",
            bannerImgBase: "https://resource.yuedaoec.com/",
            imgBaseUrl: "https://resource.yuedaoec.com/promotions/bargain/",
            bargainRuleTit: "砍价规则",
            bargainRuleContxt: "一、参与对象：所有code用户都可发起砍价，新老用户都可参与砍价： <br/>1. 红卡用户发起砍价，可绑定上下级关系：新注册用户参与砍价后，则自动成为红卡用户的下级；若为非新注册用户，但此用户并无上级绑定关系，参与砍价后也可自动成为其下级 <br/>2. 蓝卡、临时卡用户发起砍价，不可绑定上下级关系；若蓝卡、临时卡用户在发起砍价前升级为红卡用户，则参与砍价的新用户可自动成为下级 <br><br>二、活动规则： <br/>1. 在活动期间，用户进入庭秘密APP，点击弹窗/轮播，可进入砍价活动详情页 <br>2. 选择心仪礼包，点击【我要免费拿】发起砍价，同时分享给好友帮忙砍，在24小时内砍到0元则砍价成功，否则视为砍价失败 ",
            loading: false,
            finished: true,
            rulesShow: false,
            shareShow: false,
            congratulationsShow: true,
            active: 0,
            percent: 0,
            product: {},
            bargainUserLogs: [],
            shareCode: ""
        };
    },
    created() {
      this.uid = this.getUrlParam("uid");
      this.bargainId = this.getUrlParam("bargainId");
      if(this.getUrlParam("platform")) {
        this.platform = this.getUrlParam("platform");
      }
      if(this.getUrlParam("first")) {
        this.first = this.getUrlParam("first");
      }
      this.getBargainSkuDetail();
    },
    mounted() {},
    updated() {},
    methods: {
        progressInit() {
            const head = document.getElementsByTagName('head')[0];
            var style = document.createElement("style");
            style.type = "text/css";
            head.appendChild(style);
            const myStyle = document.getElementsByTagName('style')[document.getElementsByTagName('style').length - 1];
            const precent = Math.floor((this.product.poorBargainAmount / this.product.giftPackageAmount * 100)) + '%';
            myStyle.appendChild(document.createTextNode(".progress_wrap{animation: progressing .8s forwards} @keyframes progressing{from {width: 0;}to {width: " + precent + ";}}"));
        },
        getBargainSkuDetail(uid, id) {
            this.reqwest({
                type: "get",
                url: "bargain/app/getBargainSkuDetail",
                userToken: true,
                query: {
                    userId: this.uid,
                    id: this.bargainId
                }
            }).then(res => {
                if (res.success) {
                    this.product = res.result.res;
                    this.percent = this.product.poorBargainAmount / this.product.giftPackageAmount;
                    this.progressInit();
                    if (this.product.skuId) {
                        this.reqwest({
                            type: "get",
                            url: "bargain/app/getCompletNumBySkuId",
                            userToken: false,
                            query: {
                                skuId: this.product.skuId
                            }
                        }).then(res => {
                            if (res.success) {
                                this.product.bargainComplete = res.result.res.bargainComplete;
                                console.log("product:" + this.product);
                                this.$forceUpdate();
                            } else {
                                Toast(res.result.msg);
                            }
                        }).catch(err => {
                            cosole.log(err);
                        })
                    }
                    this.bargainUserLogs = this.product.bargainUserLogs;
                    for (let i = 0; i < this.bargainUserLogs.length; i++) {
                        axios.get('https://store.yuedaoec.com/user/getUserNickAvatarCode.user?id=' + this.bargainUserLogs[i].userId).then(res => {
                            if (res.data.code == "10000") {
                                this.bargainUserLogs[i].nickName = res.data.res.nickName ? res.data.res.nickName : "***";
                                this.bargainUserLogs[i].avatar = res.data.res.avatar ? this.bannerImgBase + res.data.res.avatar : this.imgBaseUrl + 'defalutAvatar.png';
                                this.$forceUpdate();
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                } else {
                    Toast(res.result.msg);
                }
            }).catch(err => {
                console.log(err);
            })
        },
        closeRules() {
            this.rulesShow = false;
        },
        onClickLeft() {
            hybrid.nav.back();
        },
        bargainFinished() {
            Toast("砍价失败");
        },
        share() {
            const self = this;
            let params = {}
            params.url = "https://store.yuedaoec.com/generageToken.shop"
            params.type = 'post'
            params.data = {
                img: this.bannerImgBase + this.product.img,
                platform: this.platform,
                skuId: this.product.skuId,
                title: this.product.skuName,
                uid: this.uid,
                url: "https://appstore.yuedaoec.com/h5/activities/bargain/bargain-login.html?bargainUserId=" + this.uid + "&skuId=" + this.product.skuId
            }
            console.log(params.data);
            self.createAjax(params, function(json) {
                if (json.code === '10000') {
                    var res = json.res;
                    self.shareCode = res;
                    console.log(res);
                    self.shareShow = true;
                } else {
                    Toast(json.msg)
                }
            })
        },
        toWx() {
            const obj = {
                type: "wechat",
                text: this.shareCode
            }
            console.log(obj);
            hybrid.app.shareText(obj);
        },
        toPackage() {
            hybrid.nav.push("https://appdist.yuedaoec.com/h5/bagQualifications.html");
        }
    }
});
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

.van-nav-bar {
    background-color: #FF2349;
}

.van-nav-bar__title {
    color: #ffffff;
    font-weight: normal;
    font-size: 16px;
}

.van-icon-arrow-left:before {
    color: #ffffff;
}

.van-icon-arrow-left:before {
    font-size: 20px;
}

.van-hairline--bottom::after {
    border-bottom-width: 0;
}

.content {
    min-height: 700px;
    background: url("https://resource.yuedaoec.com/promotions/bargain/bargain_det_bg.png") no-repeat center top, linear-gradient(180deg, #FF6A71 0%, #FFE9ED 100%);
    background-size: 100%;
    padding: 28px 12px 14px;
}

.bargainPro {
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 12px;
    position: relative;
    padding: 54px 12px 26px;
}

.product {
    background-color: #FFF4F6;
    height: 116px;
}

.product_img {
    width: 116px;
    height: 116px;
    margin-right: 12px;
    position: relative;
    float: left;
}

.product_img span {
    display: block;
    height: 22px;
    width: 92px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("https://resource.yuedaoec.com/promotions/bargain/price_bg.png") no-repeat center;
    background-size: cover;
    color: #ffffff;
    font-size: 10px;
    text-indent: 3px;
    line-height: 22px;
}

.product_img span b {
    font-size: 13px;
    font-weight: normal;
    position: relative;
    top: 1px;
}

.product_txt {
    margin-left: 128px;
    padding: 10px 8px 10px 0;
    font-size: 15px;
}

.product_name {
    height: 66px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-bottom: 6px;
}

.successNum b {
    font-size: 16px;
    color: #FF1E49;
}

.countDown {
    position: absolute;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    top: -3px;
    width: 293px;
    height: 45px;
    background: url("https://resource.yuedaoec.com/promotions/bargain/title_bg.png") no-repeat center;
    background-size: cover;
    line-height: 40px;
    left: 50%;
    margin-left: -146px;
}

.van-count-down {
    position: relative;
    top: 12px;
    color: #ffffff
}

.van-count-down .block {
    background-color: #DE002C;
    display: inline-block;
    width: 22px;
    text-align: center;
    border-radius: 4px;
    margin: 0 3px;
}

.progress_text {
    text-align: center;
    margin: 18px 0 0;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 36px;
}

.progress_success {
    line-height: 24px;
    font-size: 16px;
}

.progress_text span {
    color: #FF1E49;
    font-size: 20px;
}

.progress_success span {
    font-size: 12px;
    color: #666666;
}

.progress_text b,
.progress_success b {
    color: #FF1E49;
    font-size: 30px;
    display: block;
}

.progress_success b {
    margin: 10px 0;
}

.progress {
    background-color: #FFD4D7;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    margin: 30px 0 22px;
}

.progress_wrap {
    background: linear-gradient(90deg, #FF6893 0%, #FF2853 100%);
    border-radius: 5px;
    display: block;
    height: 10px;
    width: 40%;
    position: relative;
}

.progress_wrap i {
    display: block;
    font-size: 10px;
    font-style: normal;
    color: #ffffff;
    width: 50px;
    height: 18px;
    line-height: 18px;
    background-color: #FF1E49;
    border-radius: 10px;
    position: absolute;
    top: -30px;
    right: 0;
    text-align: center;
}

.progress_wrap i::before {
    position: absolute;
    content: "";
    border: 6px solid transparent;
    border-top-color: #FF1E49;
    bottom: -12px;
    left: 50%;
    margin-left: -6px;
}

.bargainRecords {
    padding: 0 12px 12px;
    background-color: #ffffff;
    border-radius: 5px;
    margin: 12px 0;
}

.congratulations_wrapper::before {
    content: "";
    position: absolute;
    width: 254px;
    height: 158px;
    top: -30px;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}

.van-tabs__line {
    background-color: #FF1E49;
    height: 3px;
    border-radius: 3px;
}

.van-tab {
    font-size: 15px;
}

.van-tab--active {
    font-weight: normal;
    color: #FF1E49;
}

.van-tab--disabled {
    color: #333333;
}

.bargainRecords ul {
    padding-top: 10px;
}

.bargainRecords li {
    display: flex;
    padding: 6px 0;
}

.bargainRecords img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
}

.bargainRecords span {
    line-height: 45px;
    display: block;
    margin-left: 10px;
}

.van-tabs__content {
    max-height: 300px;
    overflow-y: auto;
}

.nickname {
    width: 180px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.amount {
    color: #FF1E49;
    justify-self: end;
    width: 100px;
    text-align: right;
    padding-right: 10px;
}

.btn_share {
    display: block;
    background: linear-gradient(90deg, #FF6893 0%, #FF1343 100%);
    height: 46px;
    box-shadow: 0px 2px 6px 1px rgba(255, 47, 90, 0.26);
    border-radius: 23px;
    font-size: 18px;
    color: #ffffff;
    line-height: 46px;
    text-align: center;
}

.share,
.btn_share2,
.btn_toPackage {
    display: block;
    background: linear-gradient(90deg, #FF6893 0%, #FF1343 100%);
    height: 46px;
    box-shadow: 0px 2px 6px 1px rgba(255, 47, 90, 0.26);
    border-radius: 23px;
    font-size: 18px;
    color: #ffffff;
    line-height: 46px;
    text-align: center;
}

.share,
.btn_share2 {
  animation: zoomInOut ease .7s infinite;
}

.share_wrapper {
    width: 290px;
    height: 262px;
    background: linear-gradient(180deg, #FFFAFA 0%, #FFE8EC 100%);
    border-radius: 5px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-sizing: border-box;
    padding-top: 50px;
    text-align: center;
}

.share_wrapper::before {
    content: "";
    position: absolute;
    width: 75px;
    height: 76px;
    background: url("https://resource.yuedaoec.com/promotions/bargain/glodCoin.png") no-repeat center;
    background-size: cover;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}

.share_wrapper b {
    font-size: 26px;
    color: #FF1E49;
}

.share_wrapper .contxt p {
    font-size: 16px;
    margin: 13px 0 21px;
    line-height: 28px;
}

.contxt p span {
    color: #FF1E49;
}

.share_wrapper .contxt {
    height: auto;
}

.btn_wrap {
    padding: 20px 30px;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.contxt {
    overflow-y: auto;
    padding: 0 18px;
}

.congratulations_wrapper {
    width: 336px;
    background: linear-gradient(180deg, #FFFAFA 0%, #FFE8EC 100%);
    border-radius: 5px;
    position: fixed;
    box-sizing: border-box;
    padding-top: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.congratulations_wrapper::before {
    background: url("https://resource.yuedaoec.com/promotions/bargain/Congratulations.png") no-repeat center;
    background-size: cover;
}

.close {
    position: absolute;
    display: block;
    width: 28px;
    height: 28px;
    background: url("https://resource.yuedaoec.com/promotions/bargain/close.png") no-repeat center;
    background-size: cover;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
}

.bargain_progress {
    text-align: center;
    font-size: 16px;
    padding: 0 18px;
}

.bargain_progress span {
    color: #FF1E49;
}

.bargain_progress b {
    font-size: 30px;
    color: #FF1E49;
    display: block;
    margin-top: 5px;
}

.bargain_progress .progress {
    margin-top: 35px;
}

.text2 {
    font-size: 14px;
    padding: 5px 10px 0;
    line-height: 24px;
}

.text2 i {
    display: block;
    font-style: normal;
    font-size: 16px;
    margin: 5px 0;
}

.text2 b {
    line-height: 34px;
}

.text3 {
    padding-bottom: 20px;
}

.text3 b {
    display: block;
    margin-bottom: 5px;
}

.text3 span {
    display: block;
    font-size: 12px;
    margin-top: 5px;
    color: #666666;
}

@keyframes zoomInOut{
    from {
        transform: scale(1);
    }
    to{
        transform: scale(.95);
    }
}
</style>