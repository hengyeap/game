<template>
  <div class="page">

    <img @click="toBack" src="https://public.tingmimi.net/image/mothersDay2020/back-icon.png" alt=""
         class="back-icon">
    <img @click="showPopup" slot="right"
         src="https://public.tingmimi.net/image/AprilDouYin/share-icon.png" alt="" class="share-icon">
    <div >
      <img class="bg" :src="'https://resource.yuedaoec.com/image/live0112/banner.jpg?11'" alt="">
      <div class="tab">
        <div @click="select(2)" class="word">
          <span :class="status==2?'word1':''">他牌精选</span>
        </div>
        <div @click="select(1)" class="word">
          <span  :class="status==1?'word1':''">TST爆款</span>
        </div>

        <div @click="select(3)" class="word">
          <span :class="status==3?'word1':''">欧希纳</span>
        </div>

      </div>

    </div>


    <div @click="onLiveRoomBtn">
      <img v-if="status==1" class="bg" :src="'https://resource.yuedaoec.com/image/live0112/img1.jpg'" alt="">
      <img v-else-if="status==2" class="bg" :src="'https://resource.yuedaoec.com/image/live0112/img2.jpg?111'" alt="">
      <img v-else-if="status==3" class="bg" :src="'https://resource.yuedaoec.com/image/live0112/img3.jpg?111'" alt="">
    </div>
    <van-popup v-model="shareShow" position="bottom" :style="{ height: '25%' }">

      <div class="share-box">
        <div class="share-weChat">
          <img @click="shareWeChat('wechat')" src="https://public.tingmimi.net/image/poster9/weChat.png" alt=""
               class="weChat-icon"><br/>微信
        </div>
        <div class="share-weChatCircle">
          <img @click="shareWeChat(('circle'))" src="https://public.tingmimi.net/image/poster9/weChatCircle.png"
               alt="" class="weChatCircle-icon"><br/>朋友圈
        </div>

      </div>
      <div @click="hiddenshow" class="close">取消</div>

    </van-popup>
  </div>
</template>

<script>
    import { Popup } from 'vant'
    import axios from 'axios';
    import hy from 'hybridify-js'
    export default {
        name: "App",
        components:{
            [Popup.name]: Popup,

        },
        data(){
            return{
                status:1 ,
                shareShow:false,
                uid:'',
                appType:'',
                link: {},
                currentPage:1,
                pageSize:10

            }
        },
        created() {
            this.platfotm = this.getUrlParam("platform");
            this.accessJwt = this.getUrlParam('accessJwt')

            // let self = this;
            // self.setupWebViewJavascriptBridge(function(bridge) {
            //     self.JSBridge = bridge;
            // });
        },
        mounted() {
            this.uid=this.getUrlParam('uid')
            this.appType = this.getUrlParam('appType')
            this.orderCode = this.getUrlParam("orderCode");
            this.getLink()
        },
        onLoad() {
            this.getLink()
        },
        methods:{

            toBack() {
                hy.nav.back()
            },
            select(num){
                this.status= num
            },
            showPopup() {
                // if (this.checkNull(this.uid)) {
                //     hy.nav.toMe()
                //     return
                // }
                this.shareShow = true;

            },
            shareWeChat(type) {
                let obj = {
                    "url": 'https://appdist.yuedaoec.com/h5/activity/live0112.html?uid=' + this.uid + '&appType=wx',
                    "type": type,
                    "title": '307大哥献礼女神节',
                    "description": '林大哥快手直播，3月7日15点火热开播！准时来直播间抢好货吧',
                    "image": 'https://resource.yuedaoec.com/image/live0112/share.png'
                }

                hy.app.toShare(obj);
            },
            hiddenshow() {
                this.shareShow = false

            },
            getLink() {
                let params = {};
                let that = this;

                axios.get('https://wx.tingmimi.net/api/kuaishou/getCpsLinkList.shop?accessJwt='+this.accessJwt)
                    .then(function (response) {
                        console.log(response)
                        if(response.data.code == 10000){

                            that.link = response.data.res.datas[0].linkUrl;
                            console.log(that.link)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            onLiveRoomBtn() {
                // let liveRoomUrl = decodeURIComponent(this.link.linkUrl);
                hy.nav.push(this.link)
                // wx.navigateTo({ url: "./liveRoomWebview?liveRoomUrl=" + liveRoomUrl });
            },

        }
    }
</script>

<style scoped>
  .page {
    width: 100%;
    position: relative;
  }

  .content {
    width: 100%;
    position: absolute;
    top: 7.1rem;
  }

  .bg {
    width: 100%;
    position: relative;
    vertical-align: bottom;
  }

  .back-icon {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    left: 0.2rem;
    top: 0.3rem;
    z-index: 999;
  }
  .share-icon {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    right: 0.2rem;
    top: 0.3rem;
    z-index: 999;
  }
  .tab{
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 7.8rem;
    color: #fff;
  }
  .word1{
    width: 50%;
    font-size: 14px;
    color: #e64e03;
    text-align: center;
    line-height: 42px;
    padding-bottom: 8px;
  }
  .word{
    width: 50%;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 42px;
  }

  .share-box {
    width: 100%;
    top: 0;
    height: 75%;
    /*background-color: #FFFFFF;*/
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    border-bottom: 1px solid #f1f1f1;
  }

  .share-weChat {
    width: 50%;
    position: relative;
    font-size: 14px;
    color: #333;
    text-align: center;
  }

  .share-weChat img {
    width: 25%;
  }

  .share-weChatCircle {
    width: 50%;
    position: relative;
    font-size: 14px;
    color: #333;
    text-align: center;

  }

  .share-weChatCircle img {
    width: 25%;

  }

  .close {
    font-size: 16px;
    color: #333;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25%;
  }
  .word3{
    font-size: 14px;
    line-height: 100px;
    text-align: center;
  }
</style>
