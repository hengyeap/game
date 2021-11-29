<template>
    <div id="container">
        <van-nav-bar :title="title" left-text="" left-arrow @click-left="onClickLeft" />
        <div class="content">
            <div class="bargainPro" @click="toDet(product.id)">
                <div class="bargain_det">
                    <div class="product">
                        <div class="product_img">
                            <img :src="bannerImgBase + product.img" alt="">
                            <span>价值<b>¥{{product.bargainAmount}}</b></span>
                        </div>
                        <div class="product_txt">
                            <p class="product_name">{{product.skuName}}</p>
                            <p class="successNum">已送出<b>{{product.bargainComplete}}件</b></p>
                        </div>
                    </div>
                </div>
                <p class="toBargain">{{toBargainTxt}}</p>
            </div>
            <ListAll :uid="uid"></ListAll>
        </div>
        <van-overlay :show="bargainSuccess" @click="bargainSuccess = false">
            <div class="thanks_wrapper" @click.stop>
                <p>已成功砍价<br>{{bargainAmount}}元</p>
                <span class="close" @click="bargainSuccess = false"></span>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import { Toast, NavBar, Overlay } from 'vant';
import hybrid from 'hybridify-js';
import ListAll from './../components/ListAll.vue';
export default ({
    name: 'records',
    components: {
        [NavBar.name]: NavBar,
        [Overlay.name]: Overlay,
        ListAll
    },
    data() {
        return {
            uid: "",
            bargainId: "",
            bargainUserId: "",
            skuId: "",
            olduser: true,
            title: "砍价免费拿",
            bannerImgBase: "https://resource.yuedaoec.com/",
            toBargainTxt: "我也要免费拿",
            bargainSuccess: false,
            loading: false,
            finished: true,
            product: {},
            bargainAmount: null
        };
    },
    created() {
        this.uid = this.getUrlParam("uid"); //砍价者uid
        this.skuId = this.getUrlParam("skuId");
        this.bargainId = this.getUrlParam("bargainId"); 
        this.bargainUserId = this.getUrlParam("bargainUserId"); //发起者uid
        if(this.getUrlParam("olduser") === "false") {
            this.olduser = false;
        }
        this.getBargainSkuDetail();
    },
    mounted() {
        this.init();
    },
    updated() {},
    methods: {
        getBargainSkuDetail() {
            this.reqwest({
                type: "get",
                url: "bargain/app/getCompletNumBySkuId",
                userToken: false,
                query: {
                    skuId: this.skuId
                }
            }).then(res => {
                if (res.success) {
                    this.product = res.result.res;
                } else {
                    Toast(res.result.msg);
                }
            }).catch(err => {
                console.log(err);
            })
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        init() {
            let self = this
            let params = {}
            params.url = process.env.VUE_APP_REQUEST_PRODUCT_URL + 'bargain/app/shareBargain'
            params.type = 'post'
            params.data = {
                bargainUserId: this.bargainUserId,
                olduser: this.olduser,
                shareUserId: this.uid,
                skuId: parseInt(this.skuId),
            }
            self.createAjax(params, function(json) {
                if (json.code === '10000') {
                    self.bargainAmount = json.res.bargainAmount;
                    self.bargainSuccess = true;
                    console.log(self.bargainSuccess);
                } else {
                    Toast(json.msg)
                }
            })
        },
        toDet(id) {
            hybrid.nav.push("https://appstore.yuedaoec.com/h5/activities/bargain/bargain-product-detail.html?id=" + id);
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

.toBargain {
    margin-top: 20px;
}

.thanks_wrapper {
    height: 128px;
    padding-top: 38px;
}

.thanks_wrapper::before {
    background: url("https://resource.yuedaoec.com/promotions/bargain/Thanks.png") no-repeat center;
    background-size: cover;
}

.thanks_wrapper p {
    color: #FF1E49;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
}

.bargainPro {
    background-color: #ffffff;
    padding: 20px 12px;
    border-radius: 5px;
    margin-bottom: 12px;
    position: relative;
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

.toBargain,
.share,
.btn_share,
.btn_toPackage,
.todet,
.continue {
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

.thanks_wrapper {
    width: 336px;
    background: linear-gradient(180deg, #FFFAFA 0%, #FFE8EC 100%);
    border-radius: 5px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-sizing: border-box;
    padding-top: 35px;
}

.thanks_wrapper::before {
    content: "";
    position: absolute;
    width: 254px;
    height: 158px;
    top: -30px;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
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
</style>