<template>
  <div class="page">

    <van-nav-bar
            title=""
            left-text=""
            left-arrow
            @click-left="toBack"
            @click-right="shareShow = true"
    >
      <template  #right>
        <van-icon name="share" size="18" />
      </template>
    </van-nav-bar>
    <div @click="ruleShow=true" class="rule"></div>

    <div class="content">
      <img :src="nowDate>='2021/05/01 00:00:00' ? link+'3.jpg':link+'1.jpg'" class="bg" alt="">
      <div class="box">
        <img :src="link+'2.jpg'" class="bg" alt="">
        <div class="num-box">
          <div class="num">{{count}}
            <span>人</span>
          </div>
          <div class="num">{{Math.floor(count/3)}}
            <span>份</span>
          </div>
        </div>
        <div class="list-box">
          <van-list
                  v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
          >
            <div class="raw" v-for="item in list">
              <div class="name">{{item.name}}</div>
              <div class="code">{{item.code}}</div>
              <div class="phoneNum">{{item.phoneNumber}}</div>
              <div v-if="item.status==0" class="isAwaken" style="color: #333333">否</div>
              <div v-else-if="item.status==1||item.status==2" class="isAwaken">是</div>
            </div>
          </van-list>

        </div>
      </div>
    </div>

    <van-popup v-model="shareShow"  position="bottom" :style="{ height: '25%' }">

      <div class="share-box">
        <div class="share-weChat">
          <img @click="shareWeChat('wechat')" src="https://public.tingmimi.net/image/poster9/weChat.png" alt="" class="weChat-icon"><br/>微信
        </div>
        <div class="share-weChatCircle">
          <img @click="shareWeChat(('circle'))" src="https://public.tingmimi.net/image/poster9/weChatCircle.png" alt="" class="weChatCircle-icon"><br/>朋友圈
        </div>

      </div>

      <div @click="shareShow = false" class="close">取消</div>

    </van-popup>
    <van-popup v-model="ruleShow" :style="{backgroundColor: 'rgba(0,0,0,0)',width: '90%'}">
      <img class="ruleImg" :src="nowDate>='2021/05/01 00:00:00' ? link+'rule1.png':link+'rule.png'" alt="">
    </van-popup>



  </div>
</template>

<script>
    import {popup,NavBar,Icon,Swipe, SwipeItem,Toast,List,cell,Dialog} from 'vant';
    import axios from 'axios'
    import hy from 'hybridify-js'
    export default {
        name: "strategy",
        components:{
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [popup.name]: popup,
            [List.name]: List,
        },
        data(){
            return {
                link:'https://resource.yuedaoec.com/image/awaken202104/',
                ruleShow:false,
                shareShow:false,
                uid:'',
                pageSize:10,
                currentPage:1,
                loading: false,
                finished: false,
                list:[],
                count:0,
                nowDate:''

            }
        },

        mounted(){
            this.uid=this.getUrlParam('uid')
            if(this.checkNull(this.uid)){
                hy.nav.toMe();
                Dialog.alert({
                    message: '您还没有登录',
                })

                return
            }
            let date = new Date()
            this.nowDate =date.Format('yyyy/MM/dd hh:mm:ss')

            this.getAwakenCount()
        },
        methods:{
            onLoad(){
                this.currentPage++
                this.getInfo()
            },
            getInfo(){
                axios.get("https://appdistapi.yuedaoec.com/activity-address/awaken/findCommonAwakenVo.distribute?parentUserId=" +this.uid+'&sendTime=202104&pageSize=20&currentPage='+this.currentPage).then(res => {
                    if (res.data.code == "10000") {
                        console.log(res.data.res.datas)
                        this.list =this.list.concat(res.data.res.datas)
                        this.loading = false;
                        if(this.pageSize * this.currentPage >= res.data.res.count){
                            this.finished = true
                        }
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            getAwakenCount(){
                axios.get("https://appdistapi.yuedaoec.com/activity-address/awaken/getAwakenCount.distribute?sendTime=202104&parentUserId=" +this.uid).then(res => {
                    if (res.data.code == "10000") {
                        console.log(res.data.res.datas)
                        this.count=res.data.res
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            shareWeChat(type) {
                let obj = {
                    "url": 'https://appdist.yuedaoec.com/h5/activity/awaken202104.html?platform=tingmimi&uid=' + this.uid,
                    "type": type,
                    "title": '喊TA回家',
                    "description": '唤醒直系代理拿好礼~',
                    "image": 'https://resource.yuedaoec.com/image/awaken202104/awaken202104.png'
                }

                hy.app.toShare(obj);
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
  .bg{
    width: 100%;
    position: relative;
    vertical-align: bottom;
  }
  .box{
    width: 100%;
    position: relative;
  }
  .num-box{
    position: absolute;
    top: 1.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 86%;
    margin: auto;
    right: 0;
    left: 0;
  }
  .num{
    width: 50%;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    color: #ea5c50;
  }
  .num span{
    font-size: 16px;
  }
  .list-box{
    position: absolute;
    top: 6.3rem;
    left: 0;
    right: 0;
    margin: auto;
    overflow-y: auto;
    height: 6.5rem;
  }
  .raw{
    display: flex;
    font-size: 13px;
    width: 81%;
    color: #ea5c50;
    margin: auto;
    line-height: 35px;
  }
  .name{
    width: 21%;
  }
  .code{
    width: 30%;
  }
  .phoneNum{
    width: 39%;
  }
  .isAwaken{
    width: 10%;
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
    top: 4.8rem;
    width: 18%;
    right: 0;
    height: 1rem;
    z-index: 11;
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