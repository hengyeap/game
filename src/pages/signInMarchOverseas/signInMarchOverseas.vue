<template>
  <div id='container'>
    <van-nav-bar title="" left-text=""  left-arrow @click-left="back"  />
    <div :class="platform=='newtingtaiwan' ? 'wrap1':'wrap'">
      <span class="rule" @click="rulesShow = true"><img :src="ruleBtn.replace('{}',platform)" alt=""></span>
      <!-- <span class="share" @click="shareShow = true"><img :src="shareBtn" alt=""></span> -->
      <div :class="platform=='newtingtaiwan' ? 'canlender1':'canlender'">
        <ul class="week">
          <li v-for="(item, index) in weeks" :key="index">{{item}}</li>
        </ul>
        <ul class="day">
          <li v-for="(item, index) in empty" :key="'empty' + index"></li>
          <li v-for="(item, index) in days" :key="index">
<!--            <img class="day8" v-if="item.day===8&&!isSign(item.date)" :src="day8" alt="">-->

            <span :class="!isSign(item.date) && isMiss(item.date) ? 'date miss' : 'date'">
              {{item.day}}
            </span>


            <img v-if="isSign(item.date)" :src="successImg.replace('{}',platform)" alt="">
<!--            <span class="buqian" v-if="isReissueSign(item.date)"></span>-->
<!--            <span class="buqian1" v-if="item.day===8&&!isSign(item.date)"></span>-->
<!--            <span class="miss2" v-if="!isSign(item.date) && isMiss(item.date)" @click="toBuQian(item.date)"></span>-->
          </li>
        </ul>
      </div>
      <div class="btns">
        <div class="signIn">
          <img @click="signInNow" :src="signInNowBtn.replace('{}',platform)" alt="">
          <div v-if="platform=='newtingtaiwan'" >已連續簽到{{initInfo.days}}天</div>
          <div v-else>已连续签到{{initInfo.days}}天</div>
        </div>
      </div>
<!--      <div class="coupons">-->
<!--        <img :src="coupons.replace('{}',platform)" alt="">-->
<!--        <div class="couponsBox">-->
<!--          <div v-for="(item,index) in checkData" class="couponsDays">-->
<!--            <div class="dayImg">-->
<!--              <img v-if="!item.checked" :src="dayImgs+item.daysNume+'-day.png'" alt="">-->
<!--              <img v-else :src="signSuccess.replace('{}',platform)" alt="">-->
<!--            </div>-->
<!--            <div style="font-size: 12px;text-align: center;color:#fed9b9;margin-bottom:0.2rem;">30元券</div>-->
<!--            <div class="receiveImg">-->
<!--              <img @click="toReceive(index)" v-if="!item.checked&&item.current" :src="receive.replace('{}',platform)" alt=""> &lt;!&ndash;去领取&ndash;&gt;-->
<!--              <img v-if="item.checked&&item.current" :src="received.replace('{}',platform)" alt="">&lt;!&ndash;已领取&ndash;&gt;-->
<!--              <img v-if="!item.current" :src="noReceive.replace('{}',platform)" alt="">&lt;!&ndash;不能领取&ndash;&gt;-->
<!--            </div>-->
<!--          </div>-->



<!--        </div>-->

<!--      </div>-->
<!--      <div class="coupon38">-->

<!--        <img @click="toReceive38" v-if="!coupons38Status" :src="coupons38Receive" alt="">-->
<!--        <img v-else :src="coupons38Received" alt="">-->
<!--      </div>-->
      <div class="gifts">
        <img :src="gifts.replace('{}',platform)" alt="">
      </div>
      <div class="productList">
        <img class="title" :src="title.replace('{}',platform)" alt="">
        <ul class="proList">
          <li v-for="(item, index) in list" @click="toDet(item.productId)" :key="index">
            <img :src="item.bannerImg" alt="">
            <p>{{item.name}}</p>
            <span>{{currency(item.referCurrency)}}{{item.price}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div v-show="rulesShow" class="rulesWrap">
      <img :src="rules.replace('{}',platform)" alt="">
      <span class="closeRules" @click="rulesShow = false"></span>
    </div>




    <div id='cover' v-show='shareShow' @click='cancelShare()'>
      <div id='shareContent' class='slideUp' @click='stopP($event)'>
        <p>分享到</p>
        <div class='shareBtn'>
          <div @click='share("wechat")'>
            <img src='https://resource.yuedaoec.com/icon/wxcircle_icon.png' alt='微信' />
            <span>微信</span>
          </div>
          <div @click='share("circle")'>
            <img src='https://resource.yuedaoec.com/icon/wx_icon.png' alt='朋友圈' />
            <span>朋友圈</span>
          </div>
        </div>
        <div @click='cancelShare()' class='cancel'>取消</div>
      </div>
    </div>
  </div>
</template>

<script>
    import hybrid from 'hybridify-js';
    import create from '../../utils/create-basic';
    import { NavBar, Toast, Dialog } from 'vant';
    // import Share from './assets/Share.vue';
    import { isBlank } from 'underscore.string'
    import urlParamGetter from '../../utils/url-param';
    import axios from 'axios';
    export default create({
        name: 'signInEleven',
        components: {
            [NavBar.name]: NavBar,
            [Toast.name]: Toast,
            [Dialog.name]: Dialog
            // Share
        },
        data() {
            return {
                uid: "",
                pageTitle: "春暖花开 签到有礼",
                url: window.location.href,
                ruleBtn: "https://resource.yuedaoec.com/image/signInMarch/{}/rulesBtn.png",
                shareBtn: "https://resource.yuedaoec.com/promotions/signInEleven/{}/shareBtn.png",
                successImg: "https://resource.yuedaoec.com/image/signInMarch/{}/success.png",
                rules: "https://resource.yuedaoec.com/image/signInMarch/{}/rules.png",
                signInNowBtn: "https://resource.yuedaoec.com/image/signInMarch/{}/signInNowBtn.png",
                gifts: "https://resource.yuedaoec.com/image/signInMarch/{}/gifts.png",
                title: "https://resource.yuedaoec.com/image/signInMarch/{}/title.png",
                cancelBtn: "https://resource.yuedaoec.com/image/signInMarch/{}/cancelBtn.png",
                confirmBtn: "https://resource.yuedaoec.com/image/signInMarch/{}/confirmBtn.png",
                coupons: "https://resource.yuedaoec.com/image/signInMarch/{}/coupons-bg.png?11",
                coupons38Receive: "https://resource.yuedaoec.com/image/signInMarch/{}/coupons38Receive.png",
                coupons38Received: "https://resource.yuedaoec.com/image/signInMarch/{}/coupons38Received.png",
                dayImgs: "https://resource.yuedaoec.com/image/signInMarch/",
                receive: "https://resource.yuedaoec.com/image/signInMarch/receive.png",
                received: "https://resource.yuedaoec.com/image/signInMarch/received.png",
                noReceive: "https://resource.yuedaoec.com/image/signInMarch/noReceive.png",
                signSuccess: "https://resource.yuedaoec.com/image/signInMarch/signSuccess.png?11",

                list: [],
                initInfo: {},
                conditionList: [],
                weeks: ["日", "一", "二", "三", "四", "五", "六"],
                days: [],
                empty: [],
                monthDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                success: false,
                miss: false,
                buqian: false,
                rulesShow: false,
                shareShow: false,
                buqianShow: false,
                conditionShow: false,
                buqianDate: "",
                currentCheckedTimes: 0,
                checkData: [
                    {checked: false, current: false,daysNume:'7'},
                    {checked: false, current: false,daysNume:'14'},
                ],
                coupons38Status:false,
                clickable:true,
                platform:''
            };
        },
        created() {
            this.uid = urlParamGetter("uid");
            this.platform = urlParamGetter('platform')
            if (!isBlank(this.uid)) {} else {
                Dialog.alert({
                    message: '登录状态已失效，请重新登录！'
                }).then(() => {
                    hybrid.nav.toMe();
                });
                return;
            }
        },
        mounted() {
            this.init();
            // this.toFindCouponByUserId()
            this.baokuanPros();
            // this.getConditions();
            // this.checkInFormat()

        },
        updated() {},
        methods: {
            checkInFormat() {
                // let checkData = [
                //     {checked: false, current: false,daysNume:'7'},
                //     {checked: false, current: false,daysNume:'14'},
                //     {checked: false, current: false,daysNume:'21'},
                //     {checked: false, current: false,daysNume:'28'},
                // ]
                // console.log(11,this.initInfo.days)

                let num = parseInt(this.initInfo.days/7)
                for(let i = 0; i < num; i++){
                    this.checkData[i].current = true
                }
                // for(let i =0 ; i<this.checkData.length;i++){
                //
                // }


            },
            toReceive(index){
                // axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/overseas/marchSign/sendCoupon/userId.distribute?userId=" + this.uid+'&platform='+this.platform).then(res => {
                axios.get("http://localhost:8988/sendCoupon/activity/overseas/marchSign/sendCoupon/userId.distribute?userId=" + this.uid+'&platform='+this.platform).then(res => {
                    if (res.data.code == "10000") {
                        this.checkData[index].checked = true;
                        Toast("领取成功");
                    } else {
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            toFindCouponByUserId(){
                // axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/overseas/marchSign/findCouponByUserId/userId.distribute?userId=" + this.uid+'&platform='+this.platform).then(res => {
                axios.get("http://localhost:8988/sendCoupon/activity/overseas/marchSign/findCouponByUserId/userId.distribute?userId=" + this.uid+'&platform='+this.platform).then(res => {
                    if (res.data.code == "10000") {
                        this.checkData[0].checked=res.data.res.flag07
                        this.checkData[1].checked=res.data.res.flag14

                    } else {
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            init() {
                axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/overseas/marchSign/getSignIn/userId.distribute?userId=" + this.uid+'&platform='+this.platform).then(res => {
                // axios.get("http://localhost:8988/sendCoupon/activity/overseas/marchSign/getSignIn/userId.distribute?userId=" + this.uid+'&platform='+this.platform).then(res => {
                    this.initInfo = res.data.res;
                    this.checkInFormat()
                    // const date = new Date();
                    // const year = date.getFullYear(); //获取年份
                    // const month = date.getMonth() + 1; //获取月份
                    // const day = date.getDate(); //获取天

                    // const month = this.initInfo.nowDate.split("-")[0];
                    const month = 3;
                    const week = this.whatDay(2021, month); //获取当前月份的1号是周几
                    this.empty = [];
                    this.days = [];
                    for (let j = 0; j < week; j++) {
                        this.empty.push(j);
                    }
                    for (let i = 0; i < this.monthDay[month - 1]; i++) {
                        this.days.push({ day: i + 1, date: month + '-' + ((i + 1) > 9 ? (i + 1) : '0' + (i + 1)) });
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            // toReceive38(){
            //     // if(this.initInfo.date.indexOf('03-08')!=-1){
            //     //     console.log(111)
            //     // }
            //
            //
            //     let date = new Date()
            //     this.nowDate = date.Format('yyyy/MM/dd hh:mm:ss')
            //     if(this.nowDate >= '2021/03/08 00:00:00'&& this.nowDate <= '2021/03/08 24:00:00'&&this.initInfo.date.indexOf('03-08')!=-1){
            //         this.toCheck38()
            //     }else {
            //         Toast("仅限当天领取或当天您还没有签到");
            //     }
            // },

            isSign(date) {
                for (let i = 0; i < this.initInfo.date.length; i++) {
                    if (this.initInfo.date[i] == '0'+date) {
                        return true;
                    }
                }
            },
            isReissueSign(date) {
                for (let i = 0; i < this.initInfo.date.length; i++) {
                    if (this.initInfo.date[i] == date) {
                        return true;
                    }
                }
            },
            isMiss(date) {
                const day = date.split("-")[1];
                const nowDay = this.initInfo.nowDate.split("-")[1];
                if (day < nowDay) {
                    return true;
                }
            },
            baokuanPros() {
                axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/overseas/marchSign/queryPresentInfo.distribute?platform="+this.platform).then(res => {
                // axios.get("http://localhost:8988/sendCoupon/activity/overseas/marchSign/queryPresentInfo.distribute?platform="+this.platform).then(res => {
                    const products = res.data.res;
                    for (let i = 0; i < products.length; i++) {
                        this.list[i] = {};
                        axios.get("https://appdistapi.yuedaoec.com/product/getProductById.shop?id=" + products[i]).then(ress => {
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
                }).catch(err => {
                    console.log(err);
                })
            },

            back() {
                hybrid.nav.back();
            },
            isLeap(year) { //判断是否喂闰年
                if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                    return true;
                } else {
                    return false;
                }
            },
            whatDay(year, month, day = 1) { //判断年、月、日是周几,默认为1号
                var sum = 0;
                sum += (year - 1) * 365 + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + day;
                for (var i = 0; i < month - 1; i++) {
                    sum += this.monthDay[i];
                }
                if (month > 2) {
                    if (this.isLeap(year)) {
                        sum += 29;
                    } else {
                        sum += 28;
                    }
                }
                return sum % 7; //余数为0代表那天是周日，为1代表是周一，以此类推
            },
            queryConditions() {
                this.conditionShow = true;
            },
            signInNow() {
                if (this.initInfo.nowDate.split("-")[0] != "03") {
                    Toast("活动已结束!");
                } else {
                    if (this.initInfo.signToday == true) {
                        Toast("今日已签")
                    } else {
                        axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/overseas/marchSign/signIn/userId?userId=" + this.uid+'&platform='+this.platform).then(res => {
                        // axios.get("http://localhost:8988/sendCoupon/activity/overseas/marchSign/signIn/userId?userId=" + this.uid+'&platform='+this.platform).then(res => {
                            if (res.data.code == "10000") {
                                Toast("签到成功");
                                this.init();
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }
            },

            cancelShare() {
                this.shareShow = false;
                this.slideUp = false;
            },
            currency(currency) {
                switch (currency) {
                    case 'CNY':
                        return '￥';
                    case 'TWD':
                        return 'NT$';
                    case 'MYR':
                        return 'RM'
                    case 'SGD':
                        return "S$";
                }
                return '￥';
            },
            toDet(productId) {
                hybrid.nav.push("https://appstore.yuedaoec.com/h5/skuDetail.html?productId=" + productId);
            },
            stopP(eve) {
                eve.stopPropagation();
            },
            share(type) {
                const obj = {
                    url: this.url,
                    type: type,
                    title: "春暖花开，签到有礼！",
                    description: '春季旅行包带回家~',
                    image: 'https://resource.yuedaoec.com/image/signInMarch/shareImg.jpg'
                };
                console.log(obj);
                hybrid.app.toShare(obj);
                this.shareShow = false;
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
    max-height: 100%;
  }

  ul,
  li {
    list-style: none;
  }

  #container {
    max-width: 375px;
    margin: 0 auto;
    position: relative;
  }
  .day8{
    position: relative !important;
    width: 17px!important;
    height: 17px!important;
    top: 0.1rem!important;
  }

  .wrap {
    background: url('https://resource.yuedaoec.com/image/signInMarch/newtingmalaysia/bg.png') no-repeat center top;
    background-size: 100%;
    padding-top: 460px;
  }
  .wrap1 {
    background: url('https://resource.yuedaoec.com/image/signInMarch/newtingtaiwan/bg.png?111') no-repeat center top;
    background-size: 100%;
    padding-top: 460px;
  }

  .van-nav-bar {
    width: 100%;
  }

  .van-nav-bar__title,
  .van-nav-bar__text {
    color: #333333 !important;
  }

  .van-icon-arrow-left:before {
    color: #333333 !important;
    font-size: 22px !important;
  }

  .rule {
    position: absolute;
    height: 23px;
    top: 60px;
    left: 15px;
  }

  .share {
    position: absolute;
    height: 25px;
    top: 52px;
    right: 15px;
  }

  .canlender {
    background: url("https://resource.yuedaoec.com/image/signInMarch/canlenderBg.png") no-repeat center;
    width: 358.8px;
    height: 264.5px;
    background-size: cover;
    margin: 0 auto;
  }
  .canlender1 {
    background: url("https://resource.yuedaoec.com/image/signInMarch/newtingtaiwan/canlenderBg.png") no-repeat center;
    width: 358.8px;
    height: 264.5px;
    background-size: cover;
    margin: 0 auto;
  }

  .canlender {
    font-size: 14px;
    color: #2F3F5A;
    padding: 0 14px;
    box-sizing: border-box;
  }
  .canlender1 {
    font-size: 14px;
    color: #2F3F5A;
    padding: 0 14px;
    box-sizing: border-box;
  }

  .canlender ul, .canlender1 ul {
    text-align: center;
    overflow: hidden;
  }

  .canlender li {
    float: left;
    width: 47px;
  }
  .canlender1 li {
    float: left;
    width: 47px;
  }

  .canlender .week {
    border-bottom: 1px solid #CED8EA;
    padding-top: 32px;
  }
  .canlender1 .week {
    border-bottom: 1px solid #CED8EA;
    padding-top: 32px;
  }

  .canlender .day {
    padding: 0 0 15px;
    color: #8D9AB0;
  }
  .canlender1 .day {
    padding: 0 0 15px;
    color: #8D9AB0;
  }

  .canlender .week li {
    padding: 7px 0;
  }
  .canlender1 .week li {
    padding: 7px 0;
  }

  .canlender .day li {
    padding: 7px 0;
    position: relative;
  }
  .canlender1 .day li {
    padding: 7px 0;
    position: relative;
  }

  .day .date {
    display: inline-block;
    width: 22px;
    height: 22px;
    font-size: 14px;
    position: relative;
    top: 3px;
    line-height: 22px;
  }

  .day .miss {
    background: url("https://resource.yuedaoec.com/promotions/signInEleven/miss.png") no-repeat center;
    background-size: cover;
  }

  .canlender .day li img {
    height: 22px;
    width: 22px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  .canlender1 .day li img {
    height: 22px;
    width: 22px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  .canlender .day li .miss2,
  .canlender .day li .buqian,
  .canlender .day1 li .miss2,
  .canlender .day1 li .buqian {
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .canlender .day li .miss2,.canlender1 .day li .miss2 {
    width: 34px;
    height: 22px;
    background: url("https://resource.yuedaoec.com/promotions/signInEleven/buqianBtn.png") no-repeat center;
    background-size: 34px;
    bottom: -15px;
    z-index: 1;
  }
  .canlender .day li .buqian1,.canlender1 .day li .buqian1 {
    width: 1.64rem;
    height: 0.29333rem;
    background: url('https://resource.yuedaoec.com/image/signInMarch/day8Img.png') no-repeat center;
    background-size: 40px;
    bottom: -10px;
    position: absolute;
    left: -7px;
  }
  .canlender .day li .buqian,.canlender .day li .buqian {
    width: 24px;
    height: 11px;
    background: url("https://resource.yuedaoec.com/promotions/signInEleven/replenishSign.png") no-repeat center;
    background-size: 24px;
    bottom: -7px;
  }





  .rulesWrap,
  .buqianConfirm,
  .queryConditions {
    background-color: rgba(0, 0, 0, .4);
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .rulesWrap img {
    width: 283px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .closeRules,
  .closeCondition {
    width: 28px;
    height: 28px;
    background: url("https://resource.yuedaoec.com/promotions/signInEleven/close.png") no-repeat center;
    background-size: 28px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.5rem;
  }
  .closeCondition1 {
    width: 28px;
    height: 28px;
    background: url("https://resource.yuedaoec.com/promotions/signInEleven/close.png") no-repeat center;
    background-size: 28px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 240px;
  }
  .words{
    color: #F5354F;
    font-size: 12px;
    text-align: center;
    margin: 14.5px 0 0;
  }
  .btns {
    padding: 20px 48px 0;
    color: #F5354F;
    font-size: 12px;
    text-align: center;
    margin: auto;
  }

  .btns img {
    height: 50px;
    margin: auto;
  }

  .gifts {
    width: 355px;
    margin: 20px auto 0;
  }
  .coupon38{
    width: 355px;
    margin: 20px auto 0;
  }
  .coupons {
    width: 355px;
    margin: 20px auto 0;
    position: relative;
  }

  .productList .title {
    height: 37px;
    margin: 40px auto 0;
  }

  .proList {
    padding: 20px 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .proList li {
    background-color: #ffffff;
    box-shadow: 4px 4px 15px #ececec;
    width: 165px;
    margin-bottom: 15px;
    font-size: 14px;
    padding-bottom: 10px;
  }

  .proList p,
  .proList span {
    display: block;
    padding: 0 10px;
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

  .proList span {
    color: #f12121;
  }

  /* buqian */

  .buqianContent {
    background: url("https://resource.yuedaoec.com/image/signInMarch/dialogBg.png?11") no-repeat center;
    width: 277.5px;
    height: 292.5px;
    background-size: cover;
    position: fixed;
    left: 0;
    right: 0;
    top: 20%;
    /*bottom: 0;*/
    margin: auto;
  }

  .buqianContent span {
    display: block;
    margin: 20px auto 0;
    background-color: #FF4461;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    text-align: center;
    font-size: 18px;
    border-radius: 15px;
    width: 180px;
  }

  .buqianContent b {
    display: block;
    text-align: center;
    font-size: 22px;
    color: #FD363B;
    padding-top: 160px;
  }

  .cancelBtn {
    height: 30.5px;
  }

  .confirmBtn {
    height: 30.5px;
    /*position: relative;*/
    /*top: -6px;*/
  }

  .buqianBtns {
    display: flex;
    justify-content: space-between;
    padding: 62px 15px 0;
  }

  /* buqian */

  .conditionContent {
    background: url("https://resource.yuedaoec.com/image/signInMarch/zigeBg.png") no-repeat center;
    width: 283px;
    height: 435px;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    font-size: 12px;
    color: #9E313B;
    box-sizing: border-box;
    padding: 52px 0 20px;
    overflow: hidden;
  }

  .conditionContent b {
    display: block;
    text-align: center;
    padding-top: 10px;
  }

  .conditionContent ul {
    height: 360px;
    overflow-y: auto;
  }

  .conditionContent li {
    padding: 0 38px;
    margin-bottom: 4px;
  }

  /* share */

  #cover {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }

  #shareContent {
    width: 100%;
    background-color: #e3e3e3;
    position: absolute;
    left: 0;
    font-size: 16px;
  }

  #shareContent p {
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid #d8d8d8;
  }

  .shareBtn {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    font-size: 14px;
    text-align: center;
  }

  .shareBtn img {
    margin: 0 30px 5px;
    height: 54px;
    width: 54px;
  }

  .cancel {
    border-top: 1px solid #d8d8d8;
    text-align: center;
    line-height: 50px;
  }

  .slideUp {
    bottom: -220px;
    animation-name: slideUp;
    animation-duration: 0.35s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-direction: normal;
    animation-timing-function: ease-out;
  }

  @keyframes slideUp {
    from {
      bottom: -220px;
    }
    to {
      bottom: 0;
    }
  }

  @-webkit-keyframes slideUp {
    from {
      bottom: -220px;
    }
    to {
      bottom: 0;
    }
  }



  .couponsBox{
    width: 80%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    top: 1.15rem;
    left: 0;
    right: 0;
    margin: auto;
  }
  .couponsDays{
    width: 25%;
  }
  .dayImg{
    width: 53%;
    margin: auto;
    margin-bottom: 0.2rem;
  }
  .receiveImg{
    width: 72%;
    margin: auto;
  }
  .day8{
    position: relative;
    top: 0.2rem;
  }
  .ziGe{
    color: #9E313B;
    font-size: 12px;
  }
  .ziGe1{
    color:#a1a1a1;
    font-size: 12px;

  }

  /* share */
</style>
