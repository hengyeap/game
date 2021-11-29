<template>
  <div class="page">
    <img @click="toBack" src="https://resource.yuedaoec.com/image/newProductZone/back-icon.png" alt=""
         class="back-icon">
    <img @click="showPopup" src="https://resource.yuedaoec.com/image/newProductZone/share-icon.png" alt=""
         class="share-icon">
    <div v-if="from=='sports'" class="christmasTree">
      {{timeSports}}s
    </div>

    <div class="swipe-box">
      <van-swipe class="my-swipe"  indicator-color="black">
        <van-swipe-item v-for="(item, index) in bannerImages" :key="index">
          <div class="banner-bg">
            <img :src="bannerBg" alt="">
          </div>
          <div class="banner">
            <div class="bar"></div>
            <img @click="jumpToSku(item.productId)" :src="item.bannerImg" alt="">
            <div @click="jumpToDetail(item.seriesId)" class="series">
              <div class="title">
                <div class="title-word1">{{item.seriesTitle}} </div>
                <div class="title-word2">详情></div>
              </div>
              <div class="seriesImgBox">
                <div class="seriesImg1">
                  <img :src="item.img_1" alt="">
                </div>
                <div class="seriesImg2">
                  <div class="seriesImg2-1">
                    <video @click.stop="" controls class="seriesViedo"  :src="item.video"  :poster="item.video+'?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_7000,f_jpg,m_fast'"></video>
                  </div>
                  <div class="seriesImg2-2">
                    <img :src="item.img_2" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </van-swipe-item>

      </van-swipe>
    </div>
    <div v-if="newActivity.length>0" class="newActivity">
      <div class="newActivityTitle">
        新品活动
      </div>
      <div class="newActivitySwipe">
        <van-swipe indicator-color="black">
          <van-swipe-item v-for="(item, index) in newActivity" :key="index">
            <img @click="jumpToUrl(item.url)" class="newActivityImg" :src="item.img" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>

    </div>
    <div class="newProducts">
      <div class="newActivityTitle">
        更多新品
      </div>
      <div v-for="item in newProductsImg.slice(0,newProductsImgLength)" class="newProductsImg">
        <img @click="jumpToDetail(item.url)" :src="item.img" alt="">
      </div>
      <div @click="seeMore" class="more">展开查看更多></div>
    </div>

    <div class="baokuanPros">
      <div class="newActivityTitle">
        精选爆款
      </div>
      <div class="productList">
        <ul class="proList">
          <li @click="jumpToSku(baokuanPros[index])" v-for="(item, index) in list" :key="index">
            <img :src="item.bannerImg" alt="">
            <p>{{item.name}}</p>
            <span>{{currency(item.referCurrency)}}{{item.price}}</span>
            <div class="buy">立即抢购</div>
          </li>
        </ul>
      </div>
    </div>

    <van-popup  v-model="show"  position="bottom" :style="{ height: '25%' }">

      <div class="share-box">
        <div class="share-weChat">
          <img @click="shareWeChat('wechat')" src="https://public.tingmimi.net/image/poster9/weChat.png" alt="" class="weChat-icon"><br/>微信
        </div>
        <div class="share-weChatCircle">
          <img @click="shareWeChat(('circle'))" src="https://public.tingmimi.net/image/poster9/weChatCircle.png" alt="" class="weChatCircle-icon"><br/>朋友圈
        </div>

      </div>

      <div @click="hiddenShow" class="close">取消</div>

    </van-popup>
  </div>
</template>

<script>
    import hy from 'hybridify-js';
    import axios from 'axios';
    import { Swipe, SwipeItem ,Dialog,popup,Toast} from 'vant';
    export default {
        name: "newProductZone",
        components:{
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Dialog.name]: Dialog,
            [popup.name]: popup,
            [Toast.name]: Toast,
        },
        data(){
            return{
                from: '',
                timeSports:15,
                show: false,
                seriesUrl:'',
                bannerBg:'',
                bannerImages:[],
                newActivity:[],
                newProductsImg:[],
                baokuanPros:[],
                list:[],
                newProductsImgLength:'4',
                newProductsImgStatus:false,
                uid:'',
                share:{},
            }
        },
        created() {

        },
        mounted() {
            this.uid = this.getUrlParam('uid')
            this.from = this.getUrlParam('from')
            this.deviceId = this.getUrlParam('deviceId')
            if(this.checkNull(this.uid)){
                hy.nav.toMe();
                Dialog.alert({
                    message: '您还没有登录',
                })

                return
            }
            this.findNewProductMessage()


            this.startSports()
        },
        methods:{
            startSports(){
                if (this.from == 'sports') {
                    setTimeout(() => {
                        this.getSports()
                    }, 15000)
                    setInterval(() => {
                        if (this.timeSports > 0) {
                            this.timeSports = this.timeSports - 1
                        } else {
                            this.timeSports == 0
                        }

                    }, 1000)

                }
            },
            getSports(){
                axios.post("https://appdistapi.yuedaoec.com/sendCoupon/activity/sportsMeeting/addSteps.distribute?userId=" + this.uid+"&gainType=3&number=200&deviceId="+this.deviceId).then(res => {
                    if (res.data.code == "10000") {
                        Toast('任务成功！步数+200')
                    } else {
                        Toast(res.data.msg)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            findNewProductMessage(){
                let self = this;
                let params = {};
                params.url = 'https://appdist.yuedaoec.com/find/newProduct/message';
                params.type = 'get';
                params.data = {

                };
                self.createAjax(params, function (json) {
                    if (json.msg == 'success') {
                        self.bannerBg=json.res[0].bannerBg
                        self.bannerImages=json.res[0].bannerImages
                        self.newProductsImg=json.res[0].newProductsImg
                        self.newActivity = json.res[0].newActivity
                        self.share = json.res[0].share
                        self.baokuanPros=json.res[0].baokuanPros.split(",")
                        self.baoKuanPros()
                        console.log(123,self.baokuanPros)
                    }
                });
            },
            toBack(){
                if(this.from=='sports'){
                   window.history.go(-1)
                }else {
                    hy.nav.back()
                }
            },
            showPopup() {
                this.show = true;
            },
            hiddenShow() {
                this.show = false

            },
            shareWeChat(type) {
                let obj = {
                    "url": 'https://appdist.yuedaoec.com/h5/newProductZone.html?uid=' + this.uid,
                    "type": type,
                    "title": this.share.title,
                    "description": this.share.abstract,
                    "image": this.share.coverImg
                }

                hy.app.toShare(obj);
            },
            seeMore(){
                console.log(11)
                this.newProductsImgStatus=!this.newProductsImgStatus
               if(this.newProductsImgStatus){
                   this.newProductsImgLength=this.newProductsImg.length
               }else {
                   this.newProductsImgLength =4
               }
                // if(!this.newProductsImgStatus){
                //     this.newProductsImgLength=5
                // }else {
                //     this.newProductsImgLength==this.newProductsImg.length
                // }

            },
            jumpToSku(productId) {
                hy.nav.push('https://appstore.yuedaoec.com/h5/skuDetail.html?productId=' + productId)
            },
            jumpToDetail(jumpToDetail) {
                hy.nav.push('https://apph5.yuedaoec.com/articleDetail.html?id=' + jumpToDetail+'&uid='+this.uid)
            },
            jumpToUrl(url) {
                hy.nav.push(url+'?uid='+this.uid)
            },
            baoKuanPros(){
                console.log(11,this.baokuanPros)
                for (let i = 0; i < this.baokuanPros.length; i++) {
                    this.list[i] = {};
                    axios.get("https://appdistapi.yuedaoec.com/product/getProductById.shop?id=" +this.baokuanPros[i]).then(ress => {
                        const item = {
                            bannerImg: "https://resource.yuedaoec.com/" + ress.data.res.product.bannerImg,
                            productId: ress.data.res.product.productId,
                            name: ress.data.res.product.name,
                            referCurrency: ress.data.res.product.referCurrency,
                            price: ress.data.res.product.saleLowPrice
                        }
                        this.list[i] = item;
                        this.$forceUpdate();
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        }
    }
</script>

<style scoped>
  .page{
    width: 100%;
    position: relative;
    margin-bottom: 1rem;
  }
  .swipe-box{
    width: 100%;
    position: relative;
    margin-bottom: -15px;
  }
  .banner-bg{
    width: 100%;
  }
  .banner-bg img{
    width: 100%;
  }
  .back-icon{
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    width: 0.3rem;
    /*height: 0.5rem;*/
    z-index: 1;
  }
  .share-icon{
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 0.5rem;
    /*height: 0.5rem;*/
    z-index: 1;
  }
  .banner{
    position: absolute;
    top: 0;
  }
  .bar{
    height: 55px;
  }
  .banner img{
    width: 95%;
    margin: auto;
    display: flex;
  }
  .series{
    width: 95%;
    background: #ffffff;
    border-radius: 0.4rem;
    margin:10px auto 0;
    display: flex;
    flex-direction: column;
    box-shadow:0 0 10px #E1E1E1;
  }
  .title{
    width: 95%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
  }
  .title-word1{
    font-size: 15px;
    color: #000000;
    width: 70%;
  }
  .title-word2{
    font-size: 12px;
    color: #000000;
    width: 20%;
    text-align: right;
  }
  .seriesImgBox{
    width: 97%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 10px;
  }
  .seriesImg1{
    width: 46%;
  }
  .seriesImg2{
    width: 54%;
  }
  .seriesViedo{
    width: 95%;
    min-height: 128.67px;
    object-fit: fill;
    /* margin: auto; */
    display: flex;
    align-items: center;
    margin: auto;
  }
  .seriesImg2-1{
    margin-bottom:11px;
  }
  .newActivity{
    width: 95%;
    background: #ffffff;
    border-radius: 0.4rem;
    margin:10px auto 0;
    display: flex;
    flex-direction: column;
    box-shadow:0 0 10px #E1E1E1;
  }
  .newActivityTitle{
    font-size: 15px;
    color: #000000;
    width: 95%;
    position: relative;
    margin: 10px auto;
  }
  .more{
    font-size: 15px;
    color: #000000;
    width: 95%;
    position: relative;
    margin: 10px auto;
    text-align: center;
  }

  .newActivitySwipe{
    width: 95%;
    margin: auto;
  }
  .newActivityImg{
    width: 100%;
  }
  .newProducts{
    width: 95%;
    background: #ffffff;
    border-radius: 0.4rem;
    margin:10px auto 0;
    display: flex;
    flex-direction: column;
    box-shadow:0 0 10px #E1E1E1;
  }
  .newProductsImg{
    width: 85%;
    margin: auto;
  }
  .newProductsImg img{
    width: 100%;
  }
  .baokuanPros{
    width: 95%;
    background: #ffffff;
    border-radius: 0.4rem;
    margin:10px auto 0;
    display: flex;
    flex-direction: column;
    box-shadow:0 0 10px #E1E1E1;
  }

  .productList .title {
    height: 37px;
    margin: 40px auto 0;
  }

  .proList {
    padding: 0 15px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .proList li {
    background-color: #ffffff;
    box-shadow: 4px 4px 15px #ececec;
    width: 48%;
    margin-bottom: 15px;
    font-size: 14px;
    padding-bottom: 10px;
  }

  .proList p{
    display: block;
    padding: 0 10px;
    font-size: 10px;
  }
  .proList span{
    display: block;
    padding: 0 10px;
    font-size: 12px;
  }

  .proList p {
    color: #666666;
    margin: 10px auto 5px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .proList li img{
    width: 100%;
  }

  .proList span {
    color: #FF4F4F;
  }
  .buy{
    width: 80%;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
    background-image: linear-gradient(to right,#EB003B, #FF8787,#FF8787,#EB003B);
    border-radius: 20px;
    margin: 5px auto 0;
    font-size: 10px;
  }

  .share-box{
    width: 100%;
    top: 0;
    height: 75%;
    /*background-color: #FFFFFF;*/
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    border-bottom: 1px  solid #f1f1f1;
  }
  .share-weChat{
    width: 50%;
    position: relative;
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  .share-weChat img{
    width: 25%;
  }
  .share-weChatCircle{
    width: 50%;
    position: relative;
    font-size: 14px;
    color: #333;
    text-align: center;

  }
  .share-weChatCircle img{
    width: 25%;

  }

  .close{
    font-size: 16px;
    color: #333;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25%;
  }




  .christmasTree {
    display: block;
    position: fixed;
    height: 49px;
    width: 40px;
    top: 400px;
    right: 20px;
    z-index: 9999;
    text-align: center;
    line-height: 56px;
    font-size: 15px;
    color: #ffffff;
    background: url("https://resource.yuedaoec.com/icon/countdown.png") no-repeat center;
    background-size: cover;
  }

  .christmasTree img {
    width: 100%;
  }

</style>
<style>
  .van-swipe-item{
    padding-bottom:76px
  }
  .van-swipe__indicators {
    position: absolute;
    top: 10.32rem !important;
  }
  .newActivitySwipe .van-swipe .van-swipe__indicators{
    position: absolute;
    top: 3.52rem !important;
  }
  .newActivitySwipe .van-swipe-item{
    padding-bottom: 0;
  }

</style>