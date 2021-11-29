<template>
  <div class="page">
    <img class="bg" src="https://resource.yuedaoec.com/image/sittingAroundStove/bg-sit.png" alt="">
    <img @click="toBack" src="https://public.tingmimi.net/image/timeGame/back-icon.png" alt=""
         class="back-icon">
    <div class="time">
      <div class="timeword">成炉剩余时间</div>
      <van-count-down :time="time">
      </van-count-down>
    </div>

    <div class="owner">炉主：<span>asdfgf</span></div>
    <div v-if="isInvite" class="sit">
      <img @click="toInviteSit" class="sitImg" src="https://resource.yuedaoec.com/image/sittingAroundStove/sit.png" alt="">
      <div @click="toInvite" class="sit-word">邀请好友入座 ></div>


    </div>
    <div v-else class="sit">
      <div class="sit-word">还需x人即可成炉，至少2名新人可拿成炉礼包</div>
      <img @click="toInvite" class="sitImg" src="https://resource.yuedaoec.com/image/sittingAroundStove/invite-sit.png"
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

    <van-popup v-model="inviteShow">
      <img @click="downloadImg" class="invite"
           :src="'https://resource.yuedaoec.com/image/sittingAroundStove/invite-tanKuang.png'" alt="">
      <img class="close-icon" @click="toCloseInvite"
           :src="'https://resource.yuedaoec.com/image/sittingAroundStove/close-icon.png'" alt="">
    </van-popup>
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
</template>

<script>
    import hy from 'hybridify-js'
    import {Popup, CountDown} from 'vant'

    export default {
        name: "App",
        components: {
            [Popup.name]: Popup,
            [CountDown.name]: CountDown,
        },
        data() {
            return {
                currentSitTimes: 0,
                sitData: [],
                inviteShow: false,
                isInvite: false,
                sitStatusShow: false,
                sitStatus: 2,
                time: 48 * 60 * 60 * 1000,
            }
        },
        mounted() {
            this.isInvite = this.getUrlParam('isInvite')
            this.uid = this.getUrlParam('uid')
            if (this.checkNull(this.uid)) {
                hy.nav.toMe();
                this.toast('您还没有登录！')
                return
            }
            this.sitFormat();
        },
        methods: {
            sitFormat() {
                let sitData = [
                    {sited: true, newPeople: false},
                    {sited: true, newPeople: true},
                    {sited: true, newPeople: false},
                    {sited: false, newPeople: false},
                    {sited: false, newPeople: false},
                    {sited: false, newPeople: false},
                    {sited: false, newPeople: false},
                    {sited: false, newPeople: false},
                    {sited: false, newPeople: false},
                    {sited: false, newPeople: false},
                ]
                for (let i = 0; i < sitData.length; i++) {
                    // if(this.currentSitTimes==0){
                    //     sitData[0].sited = false
                    //     sitData[0].current = false
                    // }else if (i < this.currentSitTimes-1) {
                    //     sitData[i].sitData = true
                    // } else if (i == this.currentSitTimes-1) {
                    //     sitData[i].current = true
                    // }
                }
                this.sitData = sitData
            },
            toBack() {
                hy.nav.back()
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
            toSit() {
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
                hy.nav.push('stove-create.html?uid=' + this.uid)
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
  .timeword{
    margin-right:0.4rem;

  }
  .van-count-down{
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
</style>
<style>
  .van-popup {
    width: 100%;
    background-color: rgba(255, 255, 255, 0) !important;
  }

</style>