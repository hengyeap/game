<template>
  <div>
    <van-nav-bar
            :title="headTitle"
            left-text=""
            left-arrow
            @click-left="toBack"
            @click-right="toShare"
    >
      <template #right v-if="isApp">
        <van-icon name="share" size="18" />
      </template>
    </van-nav-bar>
    <van-popup   v-model="shareShow" :close-on-click-overlay="false"  position="bottom" :style="{ height: '25%',backgroundColor:'#ffff'}">

      <div class="share-box">
        <div class="share-weChat">
          <img @click="shareWeChat('wechat')" src="https://public.tingmimi.net/image/poster9/weChat.png" alt="" class="weChat-icon"><br/>微信
        </div>
        <div class="share-weChatCircle">
          <img @click="shareWeChat(('circle'))" src="https://public.tingmimi.net/image/poster9/weChatCircle.png" alt="" class="weChatCircle-icon"><br/>朋友圈
        </div>

      </div>

      <div @click="shareShow=false" class="close">取消</div>

    </van-popup>
  </div>
</template>

<script>
  import {popup,NavBar,Icon} from 'vant';
  import hybrid from 'hybridify-js';
  export default {
    name: "ShareLink",
    components:{
      [popup.name]: popup,
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
    },
    props:['shareTexts','isShare','headTitle'],
    data(){
      return{
        shareShow:false,
        url:location.href,
        isApp:false,
      }
    },
    mounted(){
      const response = hybrid.app.whereamiSync();
      if(response=='App@Android'||response=='App@IOS'){
        this.isApp=true
      }
    },
    methods:{
      toBack(){
        hybrid.nav.back()
      },
      toShare(){
        if(this.isApp){
          this.shareShow=true
        }
      },
      shareWeChat(type) {
        let obj = {
          "url": this.url,
          "type": type,
          "title": this.shareTexts.title,
          "description": this.shareTexts.description,
          "image": this.shareTexts.image
        }
        hybrid.app.toShare(obj);
        console.log(obj)

      },
    }
  }
</script>

<style scoped>
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
  .content{
    position: absolute;
    top: 7.3rem;
    left: 0;
    right: 0;
    width: 100%;
  }
</style>
<style>
  .van-nav-bar .van-icon {
    color: #333333!important;
  }
  .van-nav-bar__text {
    color: #333333!important;
  }
  /*.van-popup{*/
  /*  background-color: rgba(0,0,0,0)!important;*/
  /*}*/

</style>