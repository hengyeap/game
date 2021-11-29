<template>
  <div class="page">
    <div>
      <img src="https://resource.yuedaoec.com/image/march-lottery/bg.png" alt="" class="bg">
      <img @click="toBack" :src="backIcon" alt="" class="back-icon">
      <img @click="showRule" :src="ruleIcon" alt="" class="rule-icon">
      <img @click="jumpNote" :src="noteIcon" alt="" class="note-icon">
      <div class="content">
        <div class="box">
          <div class="prizeNo">可翻牌次数:{{rouletteQty}}</div>

          <lottery-com-202103 class="lottery-com" :rouletteQty=rouletteQty
                            :started=started
                            :platform=platform
                            @prizeGot=gotPrize />
        </div>

      </div>

      <van-popup v-model="ruleShow">
        <img class="rule-img" :src="ruleImg" alt="">
        <div @click="hiddenRule" class="closeRule"></div>

      </van-popup>
    </div>

  </div>
</template>

<script>
    import {NavBar, Swipe, SwipeItem, Dialog,Popup} from 'vant';
    import hybrid from 'hybridify-js';
    import create from '../../utils/create-basic';
    import lotteryCom202103 from './component/lotteryCom202103';

    export default create({
        name: 'diamond-game',
        components: {
            [NavBar.name]: NavBar,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Popup.name]: Popup,
            lotteryCom202103,

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
                backIcon:'https://public.tingmimi.net/image/timeGame/back-icon.png',
                noteIcon:'https://resource.yuedaoec.com/image/march-lottery/note-icon.png',
                ruleIcon:'https://resource.yuedaoec.com/image/march-lottery/rule-icon.png',
                ruleImg:'https://resource.yuedaoec.com/image/march-lottery/rule.png',


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

                    }

                }
            };
        },
        created() {
            this.accessJwt = this.getUrlParam('accessJwt')
            // const platform = this.getUrlParam('platform');
            // if (!this.isBlank(platform)) {
            //     this.platform = platform;
            // } else {
            //     this.platform = 'tingmimi';
            // }
        },

        mounted() {
            this.uid = this.getUrlParam('uid')
            this.init();

        },
        methods: {
            toBack() {
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
            showRule() {
                this.ruleShow = true;
            },
            hiddenRule() {
                this.ruleShow = false;
            },


            init() {
                const params = {
                    type: 'get',
                    url: 'double-eleven/2021/03/init',
                    userToken: true,
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
                let url = 'https://appdist.yuedaoec.com/h5/activity/lottery-note202103.html?accessJwt={access}'
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
  .bg{
    width: 100%;
  }
  .back-icon {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    left: 0.2rem;
    top: 0.3rem;
    z-index: 999;
  }
  .rule-icon{
    position: absolute;
    width: 16%;
    top: 1rem;
    right: 0;
    z-index: 999;
  }
  .note-icon{
    position: absolute;
    width: 16%;
    top: 1.8rem;
    right: 0;
    z-index: 999;
  }
  .closeRule{
    position: relative;
    width: 10%;
  }
  .rule-img{
    width: 100%;
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
    /*z-index: 1000;*/
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
  .prizeNo{
    position: absolute;
    width: 29%;
    top: 536px;
    left: 0;
    font-size: 14px;
    right: 0;
    margin: auto;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    z-index: 1;
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
    width: 70%;
    background-color: #fff0;
  }
</style>













