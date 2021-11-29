<template>
    <div id="container">
        <van-nav-bar :title="title" left-text="" left-arrow @click-left="onClickLeft" />
        <img class="bannerImg" :src="bannerImgBase + product.img" alt="">
        <div class="product_det_txt">
            <p>已送出<b>{{product.bargainComplete}}件</b><span>价格:¥{{product.bargainAmount}}</span></p>
            <p>{{product.skuName}}</p>
        </div>
        <img class="bannerImg" :src="imgBaseUrl + 'step.png'" alt="">
        <ul class="detailImgs">
            <li v-for="(item, index) in product.descriptionImgs" :key="index">
                <img :src="bannerImgBase + item" alt="">
            </li>
        </ul>
        <div class="footer" @click="toBargain(product.skuId,product.id, product.onShelf, product.bargainInventory)">{{toFreeTxt}}</div>
    </div>
</template>

<script>
import { NavBar, Toast, Dialog } from 'vant';
import hybrid from 'hybridify-js';
import axios from 'axios';
export default ({
    name: 'proDet',
    components: {
        [NavBar.name]: NavBar,
        [Dialog.name]: Dialog
    },
    data() {
        return {
            uid: "",
            id: "",
            title: "砍价免费拿",
            toFreeTxt: "我要免费拿",
            imgBaseUrl: "https://resource.yuedaoec.com/promotions/bargain/",
            bannerImgBase: "https://resource.yuedaoec.com/",
            product: {},
            userKey: ""
        };
    },
    created() {
        this.uid = this.getUrlParam("uid");
        this.id = this.getUrlParam("id");
        this.getUserKey();
        this.getProductDetail();
    },
    mounted() {},
    updated() {},
    methods: {
        getUserKey() {
            this.reqwest({
                type: 'get',
                url: 'v1/user/getUserKeyByUid.user',
                userToken: true,
                query: {
                    uid: this.uid
                }
            }).then(res => {
                if (res.result.code == "10000") {
                    this.userKey = res.result.res.userKey;
                }
            }).catch(err => {
                console.log(err);
            })
        },
        getDescriptionImgs(productId) {
            axios.get(process.env.VUE_APP_REQUEST_PRODUCT_URL +'product/getProductById.shop?id=' + this.product.productId).then(res => {
                if (res.data.code = "10000") {
                    this.product.descriptionImgs = res.data.res.product.descriptionImgs;
                    this.product.onShelf = res.data.res.product.onShelf;
                    this.$forceUpdate();
                }
            }).catch(err => {
                console.log(err);
            })
        },
        getProductDetail() {
            this.reqwest({
                type: 'get',
                url: 'bargain/app/getBargainDetailById',
                userToken: false,
                query: {
                    id: this.id
                },
            }).then(res => {
                if (res.success && res.result.res) {
                    this.product = res.result.res;
                    this.getDescriptionImgs(this.product.productId);
                } else {
                    Toast(res.result.msg);
                }
            }).catch(err => {
                console.log(err);
            })
        },
        initBargain(id, skuId) {
            let self = this
            let params = {}
            params.url = process.env.VUE_APP_REQUEST_PRODUCT_URL + 'bargain/app/initiateBargain'
            params.type = 'post'
            params.data = {
                id: id,
                userId: this.uid,
                userKey: this.userKey,
                skuId: skuId,
            }
            console.log(params.data);
            self.createAjax(params, function(json) {
                console.log(json);
                if (json.code === '10000') {
                    const res = json.res
                    hybrid.nav.push("https://appstore.yuedaoec.com/h5/activities/bargain/bargain-detail.html?bargainId=" + res.id + "&first=true");
                } else {
                    Toast(json.msg)
                }
            })
        },
        toBargain(skuId, id, onShelf, inventoryNum) {
          console.log(skuId, id, onShelf, inventoryNum);
            if (!onShelf) {
                Dialog.alert({
                    message: '商品已下架'
                }).then(() => {
                    // on close
                });
            } else {
                if (inventoryNum && inventoryNum > 0) {
                    if (this.uid) {
                      this.initBargain(id, skuId);
                    } else {
                        hybrid.nav.toMe();
                    }
                } else {
                    Dialog.alert({
                        message: '商品库存不足'
                    }).then(() => {
                        // on close
                    });
                }
            }
        },
        onClickLeft() {
            hybrid.nav.back();
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

.van-nav-bar .van-icon {
    color: #333333;
}

.van-nav-bar__title {
    color: #333333;
    font-weight: normal;
    font-size: 16px;
}

.van-hairline--bottom::after {
    border-bottom-width: 0;
}

.van-icon-arrow-left:before {
    font-size: 20px;
}

.product_det_txt {
    width: 100%;
    background: url("https://resource.yuedaoec.com/promotions/bargain/detail_txt_bg.png") repeat-y center;
    background-size: 100%;
    color: #ffffff;
    font-size: 16px;
    padding: 10px 12px;
    box-sizing: border-box;
}

.product_det_txt p:nth-child(1) {
    margin-bottom: 5px;
}

.product_det_txt p:nth-child(2) {
    font-size: 14px;
}

.product_det_txt b {
    font-size: 18px;
    display: inline-block;
    margin-right: 10px;
}

.product_det_txt span {
    font-size: 14px;
}

.detailImgs {
    padding-bottom: 50px;
}

.footer {
    height: 50px;
    line-height: 50px;
    width: 100%;
    background: linear-gradient(90deg, #FF6893 0%, #FF1343 100%);
    color: #ffffff;
    font-size: 18px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
}

.van-dialog__confirm,
.van-dialog__confirm:active {
    color: #FE5472;
}
</style>