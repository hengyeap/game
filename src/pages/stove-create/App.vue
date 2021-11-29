<template>
  <div class="page">
    <div v-if="isCreate">
      <div v-if="isCreateSuccess==0">
        <img class="bg" src="https://resource.yuedaoec.com/image/sittingAroundStove/bg-sit.png" alt="">
        <img @click="toBack" src="https://public.tingmimi.net/image/timeGame/back-icon.png" alt=""
             class="back-icon">
        <div class="time">
          <div class="timeword">成炉剩余时间</div>
          <van-count-down :time="time2">
          </van-count-down>
        </div>

        <div class="owner">炉主：<span>{{master}}</span></div>
        <div v-if="isInvite" class="sit">
          <img @click="toInviteSit" class="sitImg" src="https://resource.yuedaoec.com/image/sittingAroundStove/sit.png"
               alt="">
          <div @click="toInvite" class="sit-word">邀请好友入座 ></div>
        </div>
        <div v-else class="sit">
          <div class="sit-word">还需x人即可成炉，至少2名新人可拿成炉礼包</div>
          <img @click="toInvite" class="sitImg"
               src="https://resource.yuedaoec.com/image/sittingAroundStove/invite-sit.png"
               alt="">
        </div>

        <div class="stove-circle">
          <div v-for="data in sitData" class="circle">
            <img v-if="!data.sited" class="circleImg"
                 src="https://resource.yuedaoec.com/image/sittingAroundStove/no-sit-circle.png" alt="">
            <img v-else-if="data.sited&&!data.newPeople" class="circleImg"
                 src="https://resource.yuedaoec.com/image/sittingAroundStove/sit-circle.png" alt="">
            <img v-else-if="data.sited&&data.newPeople" class="circleImg"
                 src="https://resource.yuedaoec.com/image/sittingAroundStove/sit-circle-new.png" alt="">
          </div>
        </div>

        <div class="welfare">
          <img class="welfareImg" src="https://resource.yuedaoec.com/image/sittingAroundStove/welfare1.png" alt="">
          <img class="welfareImg" src="https://resource.yuedaoec.com/image/sittingAroundStove/welfare2.png" alt="">
        </div>


        <van-popup v-model="sitStatusShow">
          <div>
            <img @click="toNewBorn" v-if="sitStatus==0" class="sitStatus"
                 :src="'https://resource.yuedaoec.com/image/sittingAroundStove/sitSuccessNew.png'" alt="">
            <img @click="toStore" v-else-if="sitStatus==1" class="sitStatus"
                 :src="'https://resource.yuedaoec.com/image/sittingAroundStove/sitSuccess.png'" alt="">
            <img @click="toCreate" v-else-if="sitStatus==2" class="sitStatus"
                 :src="'https://resource.yuedaoec.com/image/sittingAroundStove/sitFail.png'" alt="">
          </div>


          <img class="close-icon" @click="toCloseSitStatus"
               :src="'https://resource.yuedaoec.com/image/sittingAroundStove/close-icon.png'" alt="">
        </van-popup>
      </div>
      <div v-else-if="isCreateSuccess==1">
        <img class="bg" src="https://resource.yuedaoec.com/image/sittingAroundStove/stove-sit-success-bg.png?111"
             alt="">
        <div class="welfare">
          <img class="welfareImg" src="https://resource.yuedaoec.com/image/sittingAroundStove/to-welfare1.png" alt="">
          <img class="welfareImg" src="https://resource.yuedaoec.com/image/sittingAroundStove/to-welfare2.png" alt="">
        </div>
        <div class="countDown">
          <van-count-down :time="time2">
            <template #default="timeData">
              <!--              {{timeData}}-->
              <span class="block">{{timeData.days * 24 + timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
        <div class="progress">
          <div class="progress-bar progress-bar-striped" :style="{width: 20 + '%'}">
            <div class="progress-mark"></div>
          </div>
          <!--      <span class="progress-value">{{progress + '%'}}</span>-->
        </div>
      </div>
      <div v-else-if="isCreateSuccess==2">
        <img class="bg" src="https://resource.yuedaoec.com/image/sittingAroundStove/stove-sit-fail-bg.png" alt="">
        <div @click="toSit" class="jump"></div>
      </div>
    </div>
    <div v-else>
      <img class="bg" src="https://resource.yuedaoec.com/image/sittingAroundStove/bg.png" alt="">
      <div @click="toSit" class="toSit"></div>
    </div>

    <img @click="toBack" src="https://public.tingmimi.net/image/timeGame/back-icon.png" alt=""
         class="back-icon">
    <img @click="toRule" class="rule-icon" src="https://resource.yuedaoec.com/image/sittingAroundStove/rule-icon.png"
         alt="">
    <van-popup v-model="ruleShow">
      <img class="rule" :src="'https://resource.yuedaoec.com/image/sittingAroundStove/rule.png'" alt="">
      <img class="close-icon" @click="toCloseRule"
           :src="'https://resource.yuedaoec.com/image/sittingAroundStove/close-icon.png'" alt="">
    </van-popup>


    <div v-show="inviteShow" class="mask">
      <img @click="downloadImg" class="invite"
           :src="'https://resource.yuedaoec.com/image/sittingAroundStove/invite-tanKuang.png'" alt="">

      <div id="qrCode">
        <div id='code'></div>
        <canvas id="canvas"></canvas>
      </div>
      <img class="close-icon1" @click="toCloseInvite"
           :src="'https://resource.yuedaoec.com/image/sittingAroundStove/close-icon.png'" alt="">
    </div>
  </div>
</template>

<script>
    import hy from 'hybridify-js'
    import {Popup, CountDown} from 'vant'
    import QRCode from "qrcode";
    import Rem from "../../rem";

    export default {
        name: "App",
        components: {
            [Popup.name]: Popup,
            [CountDown.name]: CountDown,
            QRCode: QRCode
        },
        data() {
            return {
                master:'',//炉主name
                ruleShow: false,
                isCreate: false,//是否创建
                isCreateSuccess: 0,//创建状态 0 围炉中 1 围炉成功 2 围炉失败
                time1: 120 * 60 * 60 * 1000, //业绩倒计时
                currentSitData:[],//入座数量
                sitDatas: [],//入座情况
                inviteShow: false,//邀请弹框
                isInvite: false,//是否是邀请进来的
                sitStatusShow: false, //入座状态弹框
                sitStatus: 2,//入座状态 0新人入座成功 1入座成功 2入座失败
                time2: 48 * 60 * 60 * 1000,//围炉倒计时
                userKey:'',
                endDate:'',
                nowDate:'',
                masterUserKey:''

            }
        },
        mounted() {
            this.isInvite = this.getUrlParam('isInvite')
            this.uid = this.getUrlParam('uid')
            this.userKey = this.getUrlParam('uuid')
            // if (this.checkNull(this.uid)) {
            //     hy.nav.toMe();
            //     this.toast('您还没有登录！')
            //     return
            // }
            this.getStove();
            this.getStoveAchievement()
            this.getMasterUserInfo()

            this.useqrcode();




        },
        methods: {
            useqrcode() {
                var opts = {
                    errorCorrectionLevel: 'H',
                    type: 'image/jpeg',
                    quality: 0.2,
                    margin: 1,
                    color: {
                        dark:"#000000",
                        light:"#0000"
                    }
                }
                var canvas = document.getElementById('canvas')
                QRCode.toCanvas(canvas, 'https://www.baidu.com',opts, {width: Rem.getRem(50), height: Rem.getRem(50)},function (error) {
                    if (error) console.error(error)
                    console.log('QRCode success!');
                })
            },
            toBack() {
                hy.nav.back()
            },
            toRule() {
                this.ruleShow = true
            },
            toCloseRule() {
                this.ruleShow = false
            },
            toSit() {
                this.isCreate = true
                this.isInvite=false
                this.createStove()

            },

            toInvite() {
                this.inviteShow = true
            },
            toCloseInvite() {
                this.inviteShow = false
            },
            downloadImg() {
                hy.app.download('https://resource.yuedaoec.com/image/sittingAroundStove/downImg.png');
            },
            toInviteSit() {
                this.sitStatusShow = true
            },
            toCloseSitStatus() {
                this.sitStatusShow = false
            },
            toNewBorn() {
                hy.nav.push('https://appdist.yuedaoec.com/h5/newbornZone202006.html?uid=' + this.uid)
            },
            toStore() {
                hy.nav.push('https://appstore.yuedaoec.com/h5/tingmimi-home/mall-tingmimi.html?platform=tingmimi&uid=' + this.uid)
            },
            toCreate() {
                this.isCreate = false
            },

            createStove () {
                let self = this
                let params = {}
                params.url = process.env.VUE_APP_REQUEST_PRODUCT_URL + 'createStove.distribute'
                params.type = 'post'
                params.data = {
                    userKey: self.masterUserKey,
                }
                self.createAjax(params, function(json) {
                    if (json.code === '10000') {
                        const res = json.res
                    } else {
                        // Toast(json.msg)
                    }
                })

            },
            getMasterUserInfo () {
                let self = this
                let params = {}
                params.url = 'https://store.yuedaoec.com/user/getUserInfoByUserKey.user'
                params.type = 'get'
                params.data = {
                    userKey: self.masterUserKey,
                }
                self.createAjax(params, function(json) {
                    if (json.code === '10000') {
                        const res = json.res
                    } else {
                        // Toast(json.msg)
                    }
                })

            },
            getStove () {
                let self = this
                let params = {}
                params.url = process.env.VUE_APP_REQUEST_PRODUCT_URL + 'getStove.distribute'
                params.type = 'get'
                params.data = {
                    userKey: self.userKey,
                }
                self.createAjax(params, function(json) {
                    if (json.code === '10000') {
                        if(json.res==null){
                            self.isCreate=false
                        }else {
                            self.isCreate=true
                            let result = json.res
                            self.currentSitData=result.firesideResultDetailVoList
                            let sitData = [
                                {sited: false, newPeople: false},
                                {sited: false, newPeople: false},
                                {sited: false, newPeople: false},
                                {sited: false, newPeople: false},
                                {sited: false, newPeople: false},
                                {sited: false, newPeople: false},
                                {sited: false, newPeople: false},
                                {sited: false, newPeople: false},
                                {sited: false, newPeople: false},
                                {sited: false, newPeople: false},
                            ]
                            for (let i = 0; i < self.currentSitData.length; i++) {
                                if( self.currentSitData[i].master==true){
                                    self.masterUserKey=self.currentSitData[i].userKey
                                    console.log(self.masterUserKey)
                                    //炉主名字
                                }else {
                                    self.currentSitData[i].newPeople == self.currentSitData[i].newFlag
                                    sitData[i].sited=true
                                }
                            }
                            self.sitData = sitData
                            self.endDate = result.limitSuccessDate
                            let date = new Date()
                            self.nowDate = date.Format('yyyy/MM/dd hh:mm:ss')
                            let end = new Date(self.endDate).getTime()
                            let now = new Date(self.nowDate).getTime()
                            self.time2 = end - now
                            self.timeComputed(self.time2)
                            console.log(self.timeComputed(self.time2))

                            console.log('endDate',self.endDate,'nowDate',self.nowDate)



                        }
                    } else {
                        this.toast(json.msg)
                    }
                })

            },
            getStoveAchievement () {
                let self = this
                let params = {}
                params.url = process.env.VUE_APP_REQUEST_PRODUCT_URL + 'getStoveAchievement.distribute'
                params.type = 'get'
                params.data = {
                    uuid: this.userKey,
                }
                self.createAjax(params, function(json) {
                    // console.log(json);
                    if (json.code === '10000') {
                        // const res = json.res
                    } else {
                        // Toast(json.msg)
                    }
                })

            },
            //倒计时
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

                return (this.time1 =hoursRound * minutesRound * secondsRound * 1000)


            }
            ,

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

  .rule-icon {
    position: absolute;
    width: 13%;
    /* height: 0.6rem; */
    right: 0;
    top: 0.26rem;
    z-index: 999;
  }

  .rule {
    width: 80%;
    display: flex;
    margin: auto;
  }

  .close-icon {
    width: 7%;
    display: flex;
    margin: auto;
    margin-top: 0.5rem;
  }

  .toSit {
    width: 100%;
    height: 2rem;
    position: absolute;
    top: 11.5rem;
  }

  .jump {
    width: 100%;
    height: 2.2rem;
    /*background: #e3e3;*/
    top: 9rem;
    position: absolute;
  }

  .welfare {
    position: absolute;
    top: 8.2rem;
    width: 100%;
  }

  .welfareImg {
    width: 100%;
  }

  .countDown {
    position: absolute;
    top: 16.9rem;
    right: 1rem;
    width: 44%;
    text-align: left;
    color: #fff5bb;
  }

  .block[data-v-650c0262] {
    color: #fff5bb;
  }

  .colon {
    display: inline-block;
    margin: 0 6px;
    color: #fff5bb;

    font-size: 18px;
  }

  .block {
    display: inline-block;
    /* width: 1rem; */
    color: #fff;
    font-size: 16px;
    width: 1.1rem;
    /* height: 1rem; */
    line-height: 30px;
    border-radius: 5px;
    text-align: center;
    background-color: #970b0f;
  }


  .welfare {
    width: 100%;
    margin: auto;
    position: absolute;
    top: 16.7rem;
  }

  .welfareImg {
    width: 100%;
  }

  .close-icon {
    width: 7%;
    display: flex;
    margin: auto;
    margin-top: 0.5rem;
  }

  .time {
    color: #C91903;
    font-size: 16px;
    position: absolute;
    top: 1.48rem;
    width: 53%;
    margin: auto;
    left: 0;
    right: 0;
    font-weight: 500;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .timeword {
    margin-right: 0.4rem;

  }

  .van-count-down {
    color: #C91903;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 2px;
  }

  .owner {
    font-size: 14px;
    color: #FFF1D5;
    position: absolute;
    top: 3.1rem;
    width: 80%;
    left: 0;
    right: 0;
    margin: auto;
    font-weight: 500;
  }

  .owner span {
    font-weight: 400;
  }

  .sitImg {
    width: 55%;
    display: flex;
    margin: auto;
  }

  .sit-word {
    font-size: 12px;
    color: #FFF5BB;
    text-align: center;
    margin-bottom: 0.3rem;
  }

  .sit {
    width: 100%;
    position: absolute;
    top: 12.7rem;
  }

  .stove-circle {
    width: 100%;
    background-color: #cca2a28c;
    position: absolute;
    top: 4.04rem;
    margin: auto;
    left: 0;
    right: 0;
  }

  .circle {
    width: 40px;
    height: 40px;
    position: absolute;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
    left: 50%;
    margin-left: -20px;
    margin-top: -20px;
  }

  .circle:nth-of-type(2) {
    transform: rotate(36deg);
    transform-origin: 20px 165px;
  }

  .circle:nth-of-type(3) {
    transform: rotate(72deg);
    transform-origin: 20px 165px;
  }

  .circle:nth-of-type(4) {
    transform: rotate(108deg);
    transform-origin: 20px 165px;
  }

  .circle:nth-of-type(5) {
    transform: rotate(144deg);
    transform-origin: 20px 165px;
  }

  .circle:nth-of-type(6) {
    transform: rotate(180deg);
    transform-origin: 20px 165px;
  }

  .circle:nth-of-type(7) {
    transform: rotate(216deg);
    transform-origin: 20px 165px;
  }

  .circle:nth-of-type(8) {
    transform: rotate(252deg);
    transform-origin: 20px 165px;
  }

  .circle:nth-of-type(9) {
    transform: rotate(288deg);
    transform-origin: 20px 165px;
  }

  .circle:nth-of-type(10) {
    transform: rotate(324deg);
    transform-origin: 20px 165px;
  }

  .circleImg {
    width: 100%;
  }

  .invite {
    width: 90%;
    display: flex;
    margin: auto;
  }

  .sitStatus {
    width: 80%;
    display: flex;
    margin: auto;
  }

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #00000094;
    top: 0;
  }
  .invite[data-v-650c0262] {
    width: 90%;
    display: flex;
    margin: auto;
    top: 2.9rem;
    right: 0;
    left: 0;
    position: absolute;
  }
  #qrCode{
    position: absolute;
    top: 5.3rem;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }
  .close-icon1{
    width: 7%;
    display: flex;
    margin: auto;
    margin-top: 0.5rem;
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    top: 13rem;
  }

  /* progress style */

  .progress {
    height: 20px;
    width: 290px;
    background: linear-gradient(to bottom, #ffbbbb, #F96946, #F96946, #F96946);
    overflow: visible;
    border-radius: 12px;
    /*border: 2px #ffffff solid;*/
    position: absolute;
    top: 18.3rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .progress-bar {
    float: left;
    width: 0;
    height: 100%;
    background-color: #F96946;
    transition: width .6s ease;
    background-color: #F96946;
    border-radius: 20px;
    position: relative;
    animation: animate-positive 2s;
    z-index: 99;
  }

  .progress-bar-striped {
    background-image: -webkit-linear-gradient(135deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    background-image: -o-linear-gradient(135deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    background-image: linear-gradient(135deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    -webkit-background-size: 20px 20px;
    background-size: 20px 20px;
  }

  .progress .progress-mark {
    display: block;
    width: 3.96rem;
    height: 0.85333rem;
    background: url("https://resource.yuedaoec.com/image/sittingAroundStove/love.png") no-repeat center;
    position: absolute;
    top: -0.16667rem;
    right: -1.4rem;
    background-size: 100%;
  }

  .progress .progress-value {
    position: absolute;
    font-size: 14px;
    font-weight: bolder;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #639EFF;
  }

  @-webkit-keyframes animate-positive {
    0% {
      width: 0;
    }
  }

  @keyframes animate-positive {
    0% {
      width: 0;
    }
  }

  .animated.delay-1s {
    -webkit-animation-delay: .5s;
    animation-delay: .5s;
  }

  .van-icon-arrow-left {
    position: fixed !important;
    z-index: 9999;
    top: 15px;
    left: 15px;
    font-size: 28px;
  }

  .againCover {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ffffff;
    z-index: 99;
  }

  @keyframes bounce {
    from,
    20%,
    53%,
    80%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -10px, 0);
    }
    70% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -5px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }
</style>
<style>
  .van-popup {
    width: 100%;
    background-color: rgba(255, 255, 255, 0) !important;
  }

</style>