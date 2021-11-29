<template>
  <div class="page">
    <van-nav-bar
            left-arrow
            @click-left="navBarClickLeft"
    />
    <img @click="showRule" class="showRule"
         :src="'https://resource.yuedaoec.com/assets/november-lottery/{}/rule-icon.png'.replace('{}',platform)"
         alt="">
    <img @click="jumpNote" class="showNote"
         :src="'https://resource.yuedaoec.com/assets/november-lottery/{}/note-icon.png'.replace('{}',platform)"
         alt="">
<!--    <div @click="jumpNote" class="note"></div>-->
<!--    <div @click="showRule" class="rule"></div>-->

<!--    <div class="nav">-->
<!--      <div @click="navBarClickLeft"-->
<!--           class="back-box">-->
<!--        <img src="https://public.tingmimi.net/image/midAutumnTmm/back-icon-gray.png" alt="" class="back-icon">-->

<!--      </div>-->
<!--      <div class="nav-word">-->
<!--        <div @click="jumpNote"-->
<!--             class="note">{{texts[platform].logs}}-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div>
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/november-lottery/{}/diamond-bg.png?111'.replace('{}',platform)"
           alt="">
      <div class="content">
        <div class="box">
          <div class="countDown-box">

            {{texts[platform].luckyDraw}}

          </div>
          <div class="box-text0">{{rouletteQty}}</div>


          <November-lottery-com class="lottery-com" :rouletteQty=rouletteQty
                            :started=started
                            :platform=platform
                            @prizeGot=gotPrize />
        </div>

      </div>

      <van-popup v-model="ruleShow">
        <img class="rule-img"
             :src="'https://resource.yuedaoec.com/assets/november-lottery/{}/rule.png'.replace('{}',platform)"
             alt="">
        <div @click="hiddenRule" class="closeRule"></div>
      </van-popup>
    </div>

  </div>
</template>

<script>
    import {NavBar, Swipe, SwipeItem, Dialog,Popup} from 'vant';
    import hybrid from 'hybridify-js';
    import create from '../../utils/create-basic';
    import NovemberLotteryCom from './component/NovemberLotteryCom';

    export default create({
        name: 'diamond-game',
        components: {
            [NavBar.name]: NavBar,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Popup.name]: Popup,
            NovemberLotteryCom,

        },
        data() {
            return {
                ruleShow:false,
                rouletteQty: 0,
                prizeNo: null,
                started: false,
                platform: null,
                nowDate:'',
                startedPlay: false,
                isEnd:false,

                timeRun1:{
                    hour:'00',
                    minutes:'00',
                    seconds:'00'
                },
                timeStatus:false,

                timetable:[
                    {startedAt: '2020-10-29 11:30:00',
                        endedAt:'2020-10-29 11:31:00',
                    },
                    {startedAt: '2020-10-29 11:33:00',
                        endedAt:'2020-10-29 11:34:00',
                    },
                    {startedAt: '2020-10-29 11:36:00',
                        endedAt:'2020-10-29 11:37:00',
                    },
                    {startedAt: '2020-10-29 11:39:00',
                        endedAt:'2020-10-29 11:40:00',
                    },
                    {startedAt: '2020-10-29 11:42:00',
                        endedAt:'2020-10-29 11:43:00',
                    },

                    // {startedAt: '2020/11/01 22:00:00',
                    //     endedAt:'2020/11/01 23:00:00',
                    // },
                    // {startedAt: '2020/11/06 22:00:00',
                    //     endedAt:'2020/11/06 23:00:00',
                    // },
                    // {startedAt: '2020/11/13 22:00:00',
                    //     endedAt:'2020/11/13 23:00:00',
                    // },
                    // {startedAt: '2020/11/20 22:00:00',
                    //     endedAt:'2020/11/20 23:00:00',
                    // },
                    // {startedAt: '2020/12/01 22:00:00',
                    //     endedAt:'2020/12/01 23:00:00',
                    // },

                    ],
                texts: {
                    tingmimi: {
                        logs: '抽奖记录',
                        noDrawChanceText:'抽奖余额不足<br />快去消费获得资格吧',
                        drawChanceText: '您有{}次抽奖机会',
                        drawChancesText: '您有{}次抽奖机会',
                        netError: '网络异常',
                        netErrorMsg: '您的网络好像出了点问题，页面将被关闭，请您稍后再试。',
                        netErrorAlert: '网络好像出了点问题，请稍后再试',
                        startingTimeLeft:'距抽奖开始',
                        endingTimeLeft:'距抽奖结束',
                        luckyDraw:'幸运抽奖'

                    },
                    tingo2o: {
                        logs: '抽奖记录',
                        noDrawChanceText:'抽奖余额不足<br />快去消费获得资格吧',
                        drawChanceText: '您有{}次抽奖机会',
                        drawChancesText: '您有{}次抽奖机会',
                        netError: '网络异常',
                        netErrorMsg: '您的网络好像出了点问题，页面将被关闭，请您稍后再试。',
                        netErrorAlert: '网络好像出了点问题，请稍后再试',
                        startingTimeLeft:'距抽奖开始',
                        endingTimeLeft:'距抽奖结束',
                        luckyDraw:'幸运抽奖'

                    },
                    newtingtaiwan: {
                        logs: '抽獎記錄',
                        noDrawChanceText:'抽獎餘額不足<br />快去消費獲得資格吧',
                        drawChanceText: '您有{}次抽獎機會',
                        drawChancesText: '您有{}次抽獎機會',
                        netError: '網路異常',
                        netErrorMsg: '您的網路好像出了點問題，頁面將被關閉，請您稍後再試。',
                        netErrorAlert: '網路好像出了點問題，請稍後再試',
                        startingTimeLeft:'距抽獎開始',
                        endingTimeLeft:'距抽獎結束',
                        luckyDraw:'幸運抽獎'


                    },
                    newtingmalaysia: {
                        logs: 'Lucky Draw Record',
                        noDrawChanceText:'Insufficient Lucky Draw Entries<br />Spend To Get More Chances!',
                        drawChanceText: 'You have {} chance to draw',
                        drawChancesText: 'You have {} chances to draw',
                        netError: 'Abnormal network',
                        netErrorMsg:
                            'Your network seems to have some problems, the page will be closed, please try again later.',
                        netErrorAlert:
                            'The network seems to have some problems, please try again later.',
                        startingTimeLeft:'Starting Time Left',
                        endingTimeLeft:'Ending Time Left',
                        luckyDraw:'Lucky Draw'


                    },
                    tingsingapore: {
                        logs: 'Lucky Draw Record',
                        noDrawChanceText:'Insufficient Lucky Draw Entries<br />Spend To Get More Chances!',
                        drawChanceText: 'You have {} chance to draw',
                        drawChancesText: 'You have {} chances to draw',
                        netError: 'Abnormal network',
                        netErrorMsg:
                            'Your network seems to have some problems, the page will be closed, please try again later.',
                        netErrorAlert:
                            'The network seems to have some problems, please try again later.',
                        startingTimeLeft:'Starting Time Left',
                        endingTimeLeft:'Ending Time Left',
                        luckyDraw:'Lucky Draw'


                    }
                }
            };
        },
        created() {
            this.accessJwt = this.getUrlParam('accessJwt')
            const platform = this.getUrlParam('platform');
            if (!this.isBlank(platform)) {
                this.platform = platform;
            } else {
                this.platform = 'tingmimi';
            }
        },

        mounted() {
            this.uid = this.getUrlParam('uid')
            this.platform = this.getUrlParam('platform')
            this.init();
            setInterval(()=>{
                this.timeRun()
            },1000)

        },
        methods: {


            timeRun(){
                let date = new Date()
                this.nowDate = date.Format('yyyy/MM/dd hh:mm:ss')
                if(this.nowDate <= '2020/11/01 22:00:00'){
                    let end = new Date('2020/11/01 22:00:00').getTime()
                    let now = new Date(this.nowDate).getTime()
                    let time = end - now
                    // this.generateLeftTimeToStr(leftTimestamp)
                    this.timeComputed(time)
                    this.timeStatus=false

                }else if(this.nowDate >= '2020/11/01 22:00:00'&& this.nowDate <= '2020/11/01 23:00:00'){
                    let end = new Date('2020/11/01 23:00:00').getTime()
                    let now = new Date(this.nowDate).getTime()
                    let time = end - now
                    // this.generateLeftTimeToStr(leftTimestamp)
                    this.timeComputed(time)
                    this.timeStatus=true
                }else if(this.nowDate >= '2020/11/01 23:00:00'&& this.nowDate <= '2020/11/06 22:00:00'){
                    let end = new Date('2020/11/06 22:00:00').getTime()
                    let now = new Date(this.nowDate).getTime()
                    let time = end - now
                    // this.generateLeftTimeToStr(leftTimestamp)
                    this.timeComputed(time)
                    this.timeStatus=false
                }else if(this.nowDate >= '2020/11/06 22:00:00'&& this.nowDate <= '2020/11/06 23:00:00'){
                    let end = new Date('2020/11/06 23:00:00').getTime()
                    let now = new Date(this.nowDate).getTime()
                    let time = end - now
                    // this.generateLeftTimeToStr(leftTimestamp)
                    this.timeComputed(time)
                    this.timeStatus=true

                }else if(this.nowDate >= '2020/11/06 23:00:00'&& this.nowDate <= '2020/11/13 22:00:00'){
                    let end = new Date('2020/11/13 22:00:00').getTime()
                    let now = new Date(this.nowDate).getTime()
                    let time = end - now
                    // this.generateLeftTimeToStr(leftTimestamp)
                    this.timeComputed(time)
                    this.timeStatus=false

                }else if(this.nowDate >= '2020/11/13 22:00:00'&& this.nowDate <= '2020/11/13 23:00:00'){
                    let end = new Date('2020/11/13 23:00:00').getTime()
                    let now = new Date(this.nowDate).getTime()
                    let time = end - now
                    // this.generateLeftTimeToStr(leftTimestamp)
                    this.timeComputed(time)
                    this.timeStatus=true

                }else if(this.nowDate >= '2020/11/13 23:00:00'&& this.nowDate <= '2020/11/20 22:00:00'){
                    let end = new Date('2020/11/20 22:00:00').getTime()
                    let now = new Date(this.nowDate).getTime()
                    let time = end - now
                    // this.generateLeftTimeToStr(leftTimestamp)
                    this.timeComputed(time)
                    this.timeStatus=false

                }else if(this.nowDate >= '2020/11/20 22:00:00'&& this.nowDate <= '2020/11/20 23:00:00'){
                    let end = new Date('2020/11/20 23:00:00').getTime()
                    let now = new Date(this.nowDate).getTime()
                    let time = end - now
                    // this.generateLeftTimeToStr(leftTimestamp)
                    this.timeComputed(time)
                    this.timeStatus=true

                }else if(this.nowDate >= '2020/11/20 23:00:00'&& this.nowDate <= '2020/12/01 22:00:00'){
                    let end = new Date('2020/12/01 22:00:00').getTime()
                    let now = new Date(this.nowDate).getTime()
                    let time = end - now
                    // this.generateLeftTimeToStr(leftTimestamp)
                    this.timeComputed(time)
                    this.timeStatus=false

                }else if(this.nowDate >= '2020/12/01 22:00:00'&& this.nowDate <= '2020/12/01 23:00:00'){
                    let end = new Date('2020/12/01 23:00:00').getTime()
                    let now = new Date(this.nowDate).getTime()
                    let time = end - now
                    // this.generateLeftTimeToStr(leftTimestamp)
                    this.timeComputed(time)
                    this.timeStatus=true

                }else {
                    this.timeStatus=false
                }

            },
            timeComputed(time){
                var hours    = time/ 1000 / 60 / 60;
                var hoursRound   = Math.floor(hours);
                if(hoursRound <10){
                    hoursRound = '0'+hoursRound
                }
                var minutes   = time / 1000 /60 - (60 * hoursRound);
                var minutesRound  = Math.floor(minutes);
                if(minutesRound <10){
                    minutesRound = '0'+minutesRound
                }
                var seconds   = time/ 1000 - (60 * 60 * hoursRound) - (60 * minutesRound);
                var secondsRound  = Math.floor(seconds);
                if(secondsRound <10){
                    secondsRound = '0'+secondsRound
                }

                return this.timeRun1 = {
                    hour:hoursRound,
                    minutes:minutesRound,
                    seconds:secondsRound
                }
            }
            ,
            // generateLeftTimeToStr(leftTimestamp) {
            //     leftTimestamp = Math.abs(leftTimestamp);
            //     const seconds = leftTimestamp / 1000;
            //     const hour = Math.floor(seconds / 60 / 60);
            //     const excludeHourSeconds = excludeDaySeconds - hour * 60 * 60;
            //     const minute = Math.floor(excludeHourSeconds / 60);
            //     const leftSecond = Math.floor(excludeHourSeconds - minute * 60);
            //     return this.countDownInfo = {
            //         hour: hour > 9 ? hour : '0' + hour,
            //         minute: minute > 9 ? minute : '0' + minute,
            //         second: leftSecond > 9 ? leftSecond : '0' + leftSecond
            //     };
            //
            // },




            // countTime: function() {
            //     let date = new Date()
            //     this.nowDate = date.Format('yyyy/MM/dd hh:mm:ss')
            //     console.log(this.nowDate)
            //     if(this.nowDate <= '2020/10/28 14:37:00'){
            //         const end = Date.parse(new Date('2020-1-12 10:10:10'))
            //         console.log(1)
            //     }else if(this.nowDate >= '2020/10/28 14:37:00'&& this.nowDate <= '2020/10/28 14:38:00'){
            //         console.log(2)
            //     }else if(this.nowDate >= '2020/10/28 14:38:00'){
            //         console.log(3)
            //     }
            //     // 定义结束时间戳
            //     const end = Date.parse(new Date('2020-1-12 10:10:10'))
            //     // 定义当前时间戳
            //     const now = Date.parse(new Date())
            // },
            // countTime: function() {
            //     // 定义结束时间戳
            //     // const end = Date.parse(new Date('2020-1-12 10:10:10'))
            //     // 定义当前时间戳
            //     this.countDownInfo.endTime= Date.parse(new Date(this.countDownInfo.endTime))
            //     this.nowDate = Date.parse(new Date())
            //     // 用结束时间减去当前时间获得倒计时时间戳
            //     const msec = this.countDownInfo.endTime - this.nowDate
            //     console.log(this.countDownInfo.endTime)
            //     let d = parseInt(msec / 1000 / 60 / 60 / 24) //算出天数
            //     let h = parseInt(msec / 1000 / 60 / 60 % 24)//算出小时数
            //     let m = parseInt(msec / 1000 / 60 % 60)//算出分钟数
            //     let s = parseInt(msec / 1000 % 60)//算出秒数
            //     //给数据赋值
            //     this.d = d
            //     this.h = h > 9 ? h : '0' + h
            //     this.m = m > 9 ? m : '0' + m
            //     this.s = s > 9 ? s : '0' + s
            //     console.log(m)
            //     //定义this指向
            //     const that = this
            //     // 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
            //     setTimeout(function () {
            //         that.countTime()
            //     }, 1000)
            // },



            jumpToGiftBag(){
                hybrid.nav.push('https://appdist.yuedaoec.com/h5/bagQualifications.html?uid='+this.uid+'&accessJwt='+this.accessJwt)
            },
            jumpToStore(){
                console.log(11)
                let url = 'https://appstore.yuedaoec.com/h5/store_index.html?platform={}'.replace(
                    '{}',
                    this.platform
                )
                hybrid.nav.push(url);
            },
            showRule() {
                this.ruleShow = true;
            },
            hiddenRule() {
                this.ruleShow = false;
            },
            init() {
                const params = {
                    type: 'get',
                    url: 'double-eleven/2020/11/init',
                    userToken: true,
                    query: {
                        platform: this.platform
                    },
                };
                this.reqwest(params)
                    .then(response => {
                        if (response.success) {
                            const result = response.result.res;
                            this.rouletteQty = result.remainingCount;
                        } else {
                            Dialog.alert({
                                message: response.result.msg
                            }).then(() => {
                                hybrid.nav.back();
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        Dialog.alert({
                            title: this.texts[this.platform].netError,
                            message: this.texts[this.platform].netErrorMsg
                        }).then(() => {
                            hybrid.nav.back();
                        });
                    });
            },
            jumpNote() {
                let url = 'https://appdist.yuedaoec.com/h5/activity/november-note.html?platform={}&accessJwt={access}'.replace(
                    '{}',
                    this.platform
                );
                // let url = 'https://appstore.yuedaoec.com/h5/doubleeleven/september/september-note.html?platform={}&accessJwt={access}'.replace(
                //     '{}',
                //     this.platform
                // );
                // let url = 'https://appstore.yuedaoec.com/h5/activities/september-note.html?platform={}&accessJwt={access}'.replace(
                //     '{}',
                //     this.platform
                // );
                // let url = 'https://appstore.yuedaoec.com/h5/doubleeleven/12/april-note.html?platform={}&accessJwt={access}'.replace(
                //   '{}',
                //   this.platform
                // );
                url = url.replace('{access}', this.getUrlParam('accessJwt'));
                // try {
                //   hybrid.nav.push(url);
                // } catch (e) {
                //   window.location.href = url;
                // }
                const result = hybrid.app.whereamiSync();
                if (
                    result.indexOf('miniprogram') >= 0 ||
                    result.indexOf('Browser') >= 0
                ) {
                    window.location.href = url;
                } else {
                    hybrid.nav.push(url);
                }
            },
            navBarClickLeft() {
                const result = hybrid.app.whereamiSync();
                if (
                    result.indexOf('miniprogram') >= 0 ||
                    result.indexOf('Browser') >= 0
                ) {
                    window.history.go(-1);
                } else {
                    hybrid.nav.back();
                }
            },
            gotPrize({remainingCount, prizeNo}) {
                console.log('gotPrize', remainingCount, prizeNo);
                this.rouletteQty = remainingCount;
                this.prizeNo = prizeNo;
            }
        }
    });
</script>

<style scoped>
  .page {
    width: 100%;
    position: relative;
  }

  /*.content{*/
  /*width: 100%;*/
  /*position: relative;*/
  /*z-index: 999;*/
  /*}*/
  .nav {
    width: 90%;
    height: 44px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
  }

  .back-box {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .back-icon {
    /*position: absolute;*/
    width: 0.6rem;
    height: 0.6rem;
    left: 0.4rem;
    top: 0.4rem;
    z-index: 999;
  }

  .nav-word {
    right: 0;
    top: 0.2rem;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
  }

  .page .bg {
    width: 100%;
    position: relative;
    height: 100%;
  }

  .content {
    width: 100%;
    position: absolute;
    top: 110px;
    left: 0;
    /*background-color: #FBDBE6;*/
  }

  .choujiang-bg {
    width: 92%;
    margin: 0 auto;
  }

  .choujiang-button {
    width: 82%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 9px;
    margin-bottom: 25px;
  }

  .choujiang-button img {
    width: 45%;
  }

  .alertTips {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .alertCon {
    width: 74%;
    height: 180px;
    background-color: #fff;
    border-radius: 5px;
  }

  .alertText {
    width: 80%;
    margin: 20px auto 10px;
    font-size: 14px;
  }

  .alertCon input {
    width: 80%;
    height: 30px;
    display: block;
    margin: 0 auto;
    border: 1px solid #999999;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .btnBox {
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px auto;
  }

  .btnBox div {
    width: 100px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    border-radius: 20px;
    color: #fff;
  }

  .btnBox .concel {
    background: linear-gradient(
            to right,
            #56b3f3,
            #6667ff
    ); /* 标准的语法（必须放在最后）*/
  }

  .btnBox .confirm {
    background: linear-gradient(
            to right,
            #fd5ba6,
            #c43ad1
    ); /* 标准的语法（必须放在最后）*/
  }

  .note {
    position: absolute;
    top: 46px;
    left: 0;
    width: 2.2rem;
    height: 0.9rem;
    /* background: #632b63c7; */
    z-index: 1;
  }
  .rule {
    position: absolute;
    top: 1.22667rem;
    right: 0;
    width: 2rem;
    height: 1.2rem;
    /* background: #632b63c7; */
    z-index: 1;
  }

  .note img {
    width: 100%;
  }

  .box {
    position: relative;
    top: 0;
    left: 0;
    height: 380px;
  }

  .box-text {
    position: absolute;
    width: 100%;
    height: 34px;
    top: 450px;
    right: 0;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #e93147;
    line-height: 34px;
    text-align: center;
  }
  .box-text0 {
    position: absolute;
    width: 7%;
    top: 460px;
    left: 4.21333rem;
    font-size: 14px;
    z-index: 200;
    /* background: #e3e3; */
    /* height: 0.90667rem; */
    /* right: 0; */
    font-family: PingFang SC;
    font-weight: 500;
    color: #e93147;
    text-align: center;
    z-index: 200;
  }

  .lottery-com {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }

  .lottery-qualification-bg {
    width: 82%;
    margin: auto;
  }

  .lottery-qualification {
    position: absolute;
    top: 459px;
    width: 78%;
    margin: auto;
    left: 0;
    bottom: 0;
    right: 4px;
    z-index: 1;
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
  .toGiftBag{
    width: 1.6rem;
    height: 0.6rem;
    position: absolute;
    bottom: 17px;
    left: 38px;
  }
  .showRule{
    position: absolute;
    top: 53px;
    z-index: 1;
    width: 16%;
    left: 7px;
  }
  .showNote{
    position: absolute;
    top: 53px;
    z-index: 1;
    width: 16%;
    right: 7px;
  }
  .countDown-box{
    color: #F22A62;
    font-size: 12px;
    position: absolute;
    top: 428px;
    text-align: center;
    left: 0;
    right: 0;
    font-weight: 500;
  }
</style>

<style>
  @import '../../assets/css/fonts.css';

  * {
    padding: 0;
    margin: 0;
  }

  body,
  html {
    font-size: 13px;
    color: #333333;
  }

  img {
    display: block;
    max-width: 100%;
  }

  .van-nav-bar .van-icon {
    color: #757575;
  }

  .van-nav-bar__arrow {
    min-width: 1em;
    margin-right: 0.10667rem;
    font-size: 0.6rem;
  }

  .van-popup {
    width: 80%;
    background-color: #fff0;
  }
</style>













