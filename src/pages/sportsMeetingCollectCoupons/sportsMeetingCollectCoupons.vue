<template>
  <div class="page">
    <van-nav-bar
            :title="platform=='tingmimi' ? '春暖花开,运动一夏':''"
            left-text=""
            left-arrow @click-left="toBack"
    />
    <img class="bg" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/coupon-page-bg.png'" alt="">
    <div class="content">
      <div class="coupon-steps">
        <img class="coupon" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/coupon-steps.png'" alt="">
        <div class="canUseSteps">{{texts[platform].canUseSteps}}
          <span>{{usableNumber}}</span>
        </div>
      </div>
      <div class="tips">{{texts[platform].tips}}
<!--        <span style="opacity: 0;">{{// canReceiveNum}}</span>-->
      </div>
      <div class="coupon-box">
        <img class="coupon-bg" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/coupon-bg.png'" alt="">
        <div class="coupon-icon">
          <div class="imgBox">
            <img @click="getCoupon('20000')" class="coupon-icon-img" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/coupon20.png'" alt="">
            <div class="canReceiveNum">
              {{texts[platform].canReceiveNum.replace('{}',canReceiveNum[0])}}
<!--              您还可兑换<span>{{canReceiveNum[0]}}</span>次-->
            </div>
          </div>
          <div class="imgBox">
          <img @click="getCoupon('30000')"  class="coupon-icon-img" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/coupon30.png'" alt="">
            <div class="canReceiveNum">
              {{texts[platform].canReceiveNum.replace('{}',canReceiveNum[1])}}
            </div>
          </div>
          <div class="imgBox">
            <img @click="getCoupon('50000')"  class="coupon-icon-img" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/coupon50.png'" alt="">
            <div class="canReceiveNum">
              {{texts[platform].canReceiveNum.replace('{}',canReceiveNum[2])}}
            </div>
          </div>
        </div>
      </div>
      <img @click="toReceiveSteps" class="to-receive-steps" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/to-receive-steps.png'" alt="">
    </div>
  </div>
</template>

<script>
    import hy from 'hybridify-js';
    import {NavBar,Toast} from 'vant';
    import axios from 'axios';
    import qs from 'qs'
    export default {
        name: "sportsMeetingCollectCoupons",
        components:{
            [NavBar.name]: NavBar,
            [Toast.name]: Toast,
        },
        data(){
            return{
                uid:'',
                platform:'tingmimi',
                region:86,
                usableNumber:0,
                look:0,
                couponId:[],
                canReceiveNum:[],
                texts:{
                    tingmimi: {
                            canUseSteps:'当前步数可用',
                            canReceiveNum:'您还可兑换{}次',
                            tips:'每张代金券，每个code仅可兑换10次'
                        },
                    newtingtaiwan: {
                            canUseSteps:'當前步數可用',
                            canReceiveNum:'您還可兌換{}次',
                            tips:'每張代金券，每個code僅可兌換10次'
                        },
                    newtingmalaysia:{
                            canUseSteps:'Redeemable Steps',
                            canReceiveNum:'can Redeem {} time(s)',
                            tips:'Each CODE can only Redeem 10 times.'
                        },
                    tingsingapore:{
                            canUseSteps:'Redeemable Steps',
                            canReceiveNum:'can Redeem {} time(s)',
                            tips:'Each CODE can only Redeem 10 times.'
                        },
                }
            }
        },
        mounted() {
            this.uid = this.getUrlParam('uid')
            this.platform = this.getUrlParam('platform')
            if(this.platform=='tingmimi'){
                this.region=86
            }else if(this.platform=='newtingtaiwan'){
                this.region=886
            }else if(this.platform=='newtingmalaysia'){
                this.region=60
            }else if(this.platform=='tingsingapore'){
                this.region=65
            }
            this.findTotalNumber()
            this.getCommonCheckCount()
        },
        methods:{
            toBack(){
                hy.nav.back()
            },
            getCoupon(number){
                if(this.region=='86'){
                    if(number=='20000'){
                        this.couponId = [1303];
                    }else if (number=='30000') {
                        this.couponId = [1304];
                    }else if (number=='50000') {
                        this.couponId = [1305];
                    }
                }else if(this.region=='886'){
                    if(number=='20000'){
                        this.couponId = [1306];
                    }else if (number=='30000') {
                        this.couponId = [1307];
                    }else if (number=='50000') {
                        this.couponId = [1308];
                    }
                }else if(this.region=='60'){
                    if(number=='20000'){
                        this.couponId = [1312];
                    }else if (number=='30000') {
                        this.couponId = [1313];
                    }else if (number=='50000') {
                        this.couponId = [1314];
                    }
                }else if(this.region=='65'){
                    if(number=='20000'){
                        this.couponId = [1309];
                    }else if (number=='30000') {
                        this.couponId = [1310];
                    }else if (number=='50000') {
                        this.couponId = [1311];
                    }
                }else {
                   Toast('平台号不存在')
                }

                axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/sportsMeeting/sendCount.distribute?userId="+this.uid+"&couponId=" + this.couponId+'&number='+number).then(res => {
                    if (res.data.code == "10000") {
                        Toast('兑换成功')
                        this.allSteps=this.allSteps-number
                        this.findTotalNumber()
                    } else {
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            toReceiveSteps(){
                this.setSession("look", this.look);
                hy.nav.push('https://appdist.yuedaoec.com/h5/activity/sportsMeeting.html?uid='+this.uid+'&platform='+this.platform)
            },
            findTotalNumber(){
                // axios.get("http://localhost:8988/sendCoupon/activity/sportsMeeting/findTotalNumber.distribute?userId=" + this.uid).then(res => {
                axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/sportsMeeting/findTotalNumber.distribute?userId=" + this.uid).then(res => {
                    if (res.data.code == "10000") {
                        this.usableNumber=res.data.res.usableNumber
                    } else {
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            getCommonCheckCount(){
                if(this.platform=='tingmimi'){
                    this.couponId=[1303,1304,1305]
                }else if(this.platform=='newtingtaiwan'){
                    this.couponId=[1306,1307,1308]
                }else if(this.platform=='newtingmalaysia'){
                    this.couponId=[1312,1313,1314]
                }else if(this.platform=='tingsingapore'){
                    this.couponId=[1309,1310,1311]
                }
                for(let i = 0; i<this.couponId.length; i++){
                    // axios.get("http://localhost:8988/sendCoupon/activity/sportsMeeting/findTotalNumber.distribute?total=10&userId=" + this.uid+'couponId='+this.couponId[i]).then(res => {
                        axios.get("https://store.yuedaoec.com/skudetail/commonCheckCount?userId=" + this.uid+'&couponId='+this.couponId[i]+'&total=10').then(res => {
                        if (res.data.code == "10000") {
                            // let num =res.data.res
                          // const item = {
                          //   index:i,
                          //   num:res.data.res
                          // }
                          this.canReceiveNum[i]=res.data.res
                          this.$forceUpdate();
                          console.log(this.canReceiveNum)
                        } else {
                            Toast(res.data.msg);
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            },
        }
    }
</script>

<style scoped>
  .page{
    width: 100%;
    position: relative;
  }
  .bg{
    width: 100%;
    vertical-align: bottom;
  }
  .content{
    position: absolute;
    top: 10.2rem;
  }
  .coupon{
    width: 100%;
  }
  .coupon-steps{
    width: 85%;
    margin: auto;
  }
  .coupon-box{
    width: 85%;
    margin: 0.7rem auto;
    position: relative;
  }
  .coupon-bg{
    width: 100%;
  }
  .coupon-icon{
    width: 90%;
    margin: auto;
    position: absolute;
    top: 1.5rem;
    left: 0;
    right: 0;
  }
  .coupon-icon-img{
    width: 100%;
    margin-bottom: 0.2rem;
  }
  .to-receive-steps{
    width: 85%;
    margin: 0.7rem auto;
    display: flex;
  }
  .canUseSteps{
    background: #EB6783;
    font-size: 16px;
    color: #fff;
    position: absolute;
    top: 0.6rem;
    width: 68%;
    margin: auto;
    left: 0;
    right: 0;
    line-height: 28px;
  }
  .tips{
    font-size: 10px;
    text-align: center;
    color: #cc2929;
  }
  .canReceiveNum{
    position: absolute;
    bottom: 0.8rem;
    font-size: 10px;
    background: #FF7C96;
    width: 49%;
    color: #fff;
    margin: auto;
    left: 0;
    right: 0;
    line-height: 25px;
    text-align: center;
  }
  .canReceiveNum span{
    color: #D9001C;
  }
  .imgBox{
    position: relative;
  }

</style>