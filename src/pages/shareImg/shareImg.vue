<template>
  <div class="page">

    <van-nav-bar
            title=""
            left-text=""
            left-arrow @click-left="toBack"
            @click-right="shareShow"
    >
      <template v-if="isShare" #right>
        <van-icon name="share" size="18" />
      </template>
    </van-nav-bar>

    <div class="content">
      <img :src="imgUrl" alt="">
    </div>

    <van-popup v-model="show"  position="bottom" :style="{ height: '25%' }">

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
    import {popup,NavBar,Icon,Swipe, SwipeItem,Toast,List,cell,Dialog} from 'vant';

    import hy from 'hybridify-js'
    export default {
        name: "strategy",
        components:{
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [popup.name]: popup,
        },
        data(){
            return {
                appType:'',
                name:'',
                imgUrl:'',
                show:false,
                isShare:false,
                platform:'tingmimi'
            }
        },
        mounted(){
            this.appType = this.getUrlParam('appType')
            this.platform= this.getUrlParam('platform')
            this.name = this.getUrlParam('name')
            this.isShare = this.getUrlParam('isShare')
            this.imgUrl = 'https://resource.yuedaoec.com/image/shareImg/'+this.platform+'/'+this.name+'.png'
        },
        methods:{
            shareShow(){
                if(this.isShare){
                    this.show = true
                }else {
                }
            },
            hiddenShow(){
                this.show = false

            },

            shareWeChat(type){
                let obj ={
                    "url":this.imgUrl,
                    "type":type,
                }

                hy.app.share(obj);
            },
            toBack(){
                hy.nav.back()
            }
        }
    }
</script>

<style scoped>
  .page{
    width: 100%;
    position: relative;
  }
  .content{
    width: 100%;
    vertical-align: middle;
  }
  .content img{
    width: 100%;
    position: relative;
    vertical-align: bottom;
  }
  .share-icon{
    position: fixed;
    width: 0.25rem;
    height: 0.25rem;
    right: 0.1rem;
    top: 0.08rem;
    z-index: 999;
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
</style>
<style>
  .van-nav-bar .van-icon {
    color: #333333!important;
  }
  .van-nav-bar__text {
    color: #333333!important;
  }
</style>