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
            <img :src="item.bannerBg" alt="">
          </div>
          <div class="banner">
            <div class="bar"></div>
            <img @click="jumpToSku(item.productId)" :src="item.bannerImg" alt="">
            <div @click="jumpToDetail(item.series.seriesId)" class="series">
              <div class="title">
                <div class="title-word1">{{item.series.seriesTitle}} </div>
                <div class="title-word2">详情></div>
              </div>
              <div class="seriesImgBox">
                <div class="seriesImg1">
                  <img v-if="item.series.seriesImg[0].type=='img'" :src="item.series.seriesImg[0].img" alt="">
<!--                  <video class="video" controls poster="https://resource.yuedaoec.com/cloth/video1-img.png"-->
<!--                         src="https://resource.yuedaoec.com/cloth/video-index.mp4"></video>-->
                  <video v-else controls class="seriesViedo" :poster="item.series.seriesImg[0].poster" :src="item.series.seriesImg[0].img"></video>
                </div>
                <div class="seriesImg2">
                  <div class="seriesImg2-1">
                    <img v-if="item.series.seriesImg[1].type=='img'" :src="item.series.seriesImg[1].img" alt="">
                    <video v-else controls class="seriesViedo" :poster="item.series.seriesImg[1].poster" :src="item.series.seriesImg[1].img"></video>
                  </div>
                  <div class="seriesImg2-2">
                    <img v-if="item.series.seriesImg[2].type=='img'" :src="item.series.seriesImg[2].img" alt="">
                    <video @click.stop="" v-else controls class="seriesViedo" :poster="item.series.seriesImg[2].poster" :src="item.series.seriesImg[2].img"></video>
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
            <img @click="jumpToUrl(item.imgUrl)" class="newActivityImg" :src="item.img" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>

    </div>
    <div class="newProducts">
      <div class="newActivityTitle">
        更多新品
      </div>
      <div v-for="item in newProductsImg.slice(0,newProductsImgLength)" class="newProductsImg">
        <img @click="jumpToDetail(item.newProductsId)" :src="item.img" alt="">
      </div>
      <div  @click="seeMore" class="more">展开查看更多></div>
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
                bannerImages:[
                    {
                        bannerBg:'https://resource.yuedaoec.com/image/newProductZone/top-bg.png',
                        bannerImg:'https://resource.yuedaoec.com/image/newProductZone/bannerImages/4.png',
                        productId:'44926',
                        series:{
                            seriesTitle:'争相追捧黑科技，试用1次爱上',
                            seriesId:'60740612e6e998282d12c0f1',
                            seriesImg:[
                                {
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/5-1.jpg',
                                    type: 'img'
                                },
                                {
                                    poster:'https://resource.yuedaoec.com/image/newProductZone/series/5-2.jpg',
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/5.mp4',
                                    type: 'video'
                                },{
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/5-3.jpg',
                                    type: 'img'
                                },
                            ]
                        }
                    },
                    {
                        bannerBg:'https://resource.yuedaoec.com/image/newProductZone/top-bg.png',
                        bannerImg:'https://resource.yuedaoec.com/image/newProductZone/bannerImages/5.png',
                        productId:'44973',
                        series:{
                            seriesTitle:'补充膳食纤维，纤纤"冻"人秘密⋯',
                            seriesId:'60754c1ae6e998282d130ad3',
                            seriesImg:[
                                {
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/4-1.jpg',
                                    type: 'img'
                                },
                                {
                                    poster:'https://resource.yuedaoec.com/image/newProductZone/series/4-2.jpg',
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/4.mp4',
                                    type: 'video'
                                },{
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/4-3.jpg',
                                    type: 'img'
                                },
                            ]
                        }
                    },
                    {
                        bannerBg:'https://resource.yuedaoec.com/image/newProductZone/top-bg.png',
                        bannerImg:'https://resource.yuedaoec.com/image/newProductZone/bannerImages/3.png',
                        productId:'44773',
                        series:{
                            seriesTitle:'小企鹅婴幼儿洗护，可爱又好用',
                            seriesId:'60643a82f27cf06cdc2455eb',
                            seriesImg:[
                                {
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/3-1.jpg',
                                    type: 'img'
                                },
                                {
                                    poster:'https://resource.yuedaoec.com/image/newProductZone/series/3-2.jpg',
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/3.mp4',
                                    type: 'video'
                                },{
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/3-3.jpg',
                                    type: 'img'
                                },
                            ]
                        }
                    },
                    {
                        bannerBg:'https://resource.yuedaoec.com/image/newProductZone/top-bg.png',
                        bannerImg:'https://resource.yuedaoec.com/image/newProductZone/bannerImages/1.png',
                        productId:'44155',
                        series:{
                            seriesTitle:'发酵豆薯乳酸菌&百香果酵素',
                            seriesId:'60546ec47a25fb57f486f7f8',
                            seriesImg:[
                                {
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/1-1.jpg',
                                    type: 'img'
                                },{
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/1-2.jpg',
                                    type: 'img'
                                },{
                                    poster:'https://resource.yuedaoec.com/image/newProductZone/series/1-3.jpg',
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/1.mp4',
                                    type: 'video'
                                },
                            ]

                        }
                    },
                    {
                        bannerBg:'https://resource.yuedaoec.com/image/newProductZone/top-bg.png',
                        bannerImg:'https://resource.yuedaoec.com/image/newProductZone/bannerImages/2.png',
                        productId:'43218',
                        series:{
                            seriesTitle:'匠心新品——玛咖牡蛎三鞭膏',
                            seriesId:'605438527a25fb57f486c44c',
                            seriesImg:[
                                {
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/2-1.jpg',
                                    type: 'img'
                                },{
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/2-2.jpg',
                                    type: 'img'
                                },{
                                    poster:'https://resource.yuedaoec.com/image/newProductZone/series/2-3.jpg',
                                    img:'https://resource.yuedaoec.com/image/newProductZone/series/2.mp4',
                                    type: 'video'
                                },
                            ]
                        }
                    },

                ],
                newActivity:[
                    {
                        img:'https://resource.yuedaoec.com/image/newProductZone/newActivity/1.png',
                        imgUrl:'https://appdist.yuedaoec.com/h5/activity/product0405.html'
                    },
                ],
                newProductsImg:[
                    {
                        img:'https://resource.yuedaoec.com/image/newProductZone/newProducts/4.png',
                        newProductsId:'60740612e6e998282d12c0f1'
                    },
                    {
                        img:'https://resource.yuedaoec.com/image/newProductZone/newProducts/5.png',
                        newProductsId:'60754c1ae6e998282d130ad3'
                    },
                    {
                        img:'https://resource.yuedaoec.com/image/newProductZone/newProducts/6.png',
                        newProductsId:'6066d61c987e1a4d8b14b70b'
                    },
                    {
                        img:'https://resource.yuedaoec.com/image/newProductZone/newProducts/3.png',
                        newProductsId:'60643a82f27cf06cdc2455eb'
                    },
                    {
                        img:'https://resource.yuedaoec.com/image/newProductZone/newProducts/1.png',
                        newProductsId:'60546ec47a25fb57f486f7f8'
                    },  {
                        img:'https://resource.yuedaoec.com/image/newProductZone/newProducts/2.png',
                        newProductsId:'605438527a25fb57f486c44c'
                    },
                ],
                baokuanPros:[44926,44973,44984,44986,45652,45351,45349,44980,45353,44773,44775,44778,44780,44794,44154,44155],
                list:[],
                newProductsImgLength:'4',
                newProductsImgStatus:false,
                uid:''
            }
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
            this.baoKuanPros()
            this.startSports()
        },
        methods:{
            jumpToUrl(url){
                hy.nav.push(url)
            },
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
                    "title": '4月更多上新',
                    "description": '关注好货上新专区！TST更多专研新品陆续来啦~',
                    "image": 'https://resource.yuedaoec.com/image/newProductZone/newProductZone.png'
                }

                hy.app.toShare(obj);
            },
            seeMore(){
                this.newProductsImgStatus=!this.newProductsImgStatus
               if(this.newProductsImgStatus){
                   this.newProductsImgLength=this.newProductsImg.length
               }else {
                   this.newProductsImgLength =4
               }
                console.log(111,this.newProductsImgLength)

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
            baoKuanPros(){
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