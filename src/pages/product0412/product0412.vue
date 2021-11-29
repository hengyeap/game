<template>
  <div class="page">
    <van-nav-bar
            left-text=""
            left-arrow @click-left="toBack"
            @click-right="shareShow = true"
    >
      <template #right>
        <van-icon name="share" size="18" />
      </template>
    </van-nav-bar>
    <div @click="ruleShow=true" class="rule"></div>
    <div v-for="(item,index) in imageArr" class="img">
      <img @click="jumpToPro(item.productId,index)"  :src="item.url" alt="">
    </div>

    <van-popup   v-model="shareShow" :close-on-click-overlay="false"  position="bottom" :style="{ height: '25%',backgroundColor:'#ffff'}">

      <div class="share-box">
        <div class="share-weChat">
          <img @click="shareWeChat('wechat')" src="https://public.tingmimi.net/image/poster9/weChat.png" alt="" class="weChat-icon"><br/>微信
        </div>
        <div class="share-weChatCircle">
          <img @click="shareWeChat(('circle'))" src="https://public.tingmimi.net/image/poster9/weChatCircle.png" alt="" class="weChatCircle-icon"><br/>朋友圈
        </div>

      </div>

      <div @click="close" class="close">取消</div>

    </van-popup>
    <van-popup v-model="ruleShow" :style="{backgroundColor: 'rgba(0,0,0,0)',width: '90%'}">
      <img class="ruleImg" src="https://resource.yuedaoec.com/image/product0412/rule-01.jpg" alt="">
      <div @click="ruleShow=false"  class="closeRule"></div>
    </van-popup>
  </div>
</template>

<script>
    import {popup,NavBar,Icon,Swipe, SwipeItem,Toast,List,cell,Dialog} from 'vant';
    import hy from 'hybridify-js';
    import axios from 'axios';
    export default {
        name: "product0405",
        components:{
            [popup.name]: popup,
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [List.name]: List,
            [cell.name]: cell,
            [Dialog.Component.name]: Dialog.Component,

        },
        data(){
            return{
                imageArr:[
                    {
                        url:'https://resource.yuedaoec.com/image/product0412/1@2x.png',
                        productId:''
                    },
                    {
                        url:'https://resource.yuedaoec.com/image/product0412/2@2x.png',
                        productId:'45566'

                    },{
                        url:'https://resource.yuedaoec.com/image/product0412/3@2x.png',
                        productId:'45581'

                    },
                ],
                shareShow:false,
                uid:'',
                ruleShow:false
            }
        },
        mounted() {
            this.uid=this.getUrlParam('uid')
            if(this.checkNull(this.uid)){
                hy.nav.toMe();
                Dialog.alert({
                    message: '您还没有登录',
                })

                return
            }
        },
        methods:{
            toBack(){
                hy.nav.back()
            },
            close(){
                this.shareShow=false
            },
            jumpToPro(productId,index){
                if(!this.checkNull(this.imageArr[index].productId)){
                    hy.nav.push('https://appstore.yuedaoec.com/h5/skuDetail.html?productId='+productId)

                }else {

                }
            },
            shareWeChat(type) {
                let obj = {
                    "url": 'https://appdist.yuedaoec.com/h5/activity/product0412.html?uid=' + this.uid,
                    "type": type,
                    "title": '128元抢提拉王后线雕水！',
                    "description": '再送100元复购券',
                    "image": 'https://resource.yuedaoec.com/image/product0412/product0412.png'
                }

                hy.app.toShare(obj);
            },

        }
    }
</script>

<style scoped>
  .page{
    width: 100%;
    position: relative;
  }
  .img{
    vertical-align: bottom;
    width: 100%;
  }
  img{
    vertical-align: bottom;
    width: 100%;
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
  .rule{
    position: absolute;
    top: 1.5rem;
    width: 14%;
    right: 0;
    height: 1rem;
  }
  .ruleImg{
    width: 100%;
  }

  .closeRule{
    position: absolute;
    width: 21%;
    height: 1.2rem;
    /*background: #e3e3;*/
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
  }
</style>
<style>
  .van-nav-bar .van-icon {
    color: #333333!important;
  }
  .van-nav-bar__text {
    color: #333333!important;
  }


</style>