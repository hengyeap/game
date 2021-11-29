<template>
  <div>
    <div class="lottery">
      <div class="lottery-start">
        <img style="width:100%;height: 100%;margin:0"
             :src="'https://resource.yuedaoec.com/assets/august-lottery/{}/start_button.png'.replace('{}',platformInner)"
             @click="start()"/>
      </div>
      <div class="light-icon">
        <img v-show="light"
             :src="'https://resource.yuedaoec.com/assets/august-lottery/{}/light-icon.png'.replace('{}',platformInner)"/>
      </div>
    </div>

    <van-popup v-model="prizeShow">
      <div class="prize-popup">
        <div class="prize-popup-row1">
          <img class="dialog-close"
               src="https://resource.yuedaoec.com/assets/doubleeleven/close.png"
               @click="hidePrize"/>
        </div>
        <div class="prize-show">
          <img class="prize-show-img" v-if="prize && prize.prizeShowImg"
               :src="prize == null ? '':  prize.prizeShowImg"/>
<!--          <img v-if="!miniprogram"-->
<!--               class="prize-show-button"-->
<!--               style="margin-top:5%;"-->
<!--               :src="'https://resource.yuedaoec.com/assets/doubleeleven/{}/april/share.png'.replace('{}',platformInner)"-->
<!--               @click="shareShow"/>-->
        </div>
      </div>

    </van-popup>

    <canvas width="750" height="490" style="position: fixed;top: -1000000px;right: 0px;width:375px; height:450px"
            ref="shareImg"></canvas>
  </div>
</template>
<script>
    import {Popup, Toast, Dialog} from 'vant';
    import ImgFlip from './ImgFlip';
    import axios from 'axios';
    import hybrid from 'hybridify-js';

    export default {
        components: {
            [Popup.name]: Popup,
            ImgFlip
        },
        props: ['platform'],
        data() {
            return {
                current: null,
                currentIndex: null,
                timer: null,
                showResult: false,
                prizeUrl: '',
                platformInner: '',
                miniprogram: false,
                lightStatus: false,
                gifts: [
                    {
                        key: '0',
                        name: 'diamond',
                        img: 'diamond.png',
                        prizeShowImg:
                            'https://resource.yuedaoec.com/assets/august-lottery/{}/prize_diamond.png'
                    },
                    {
                        key: '1',
                        name: 'one',
                        img: 'one.png',
                        prizeShowImg:
                            'https://resource.yuedaoec.com/assets/august-lottery/{}/prize_one.png'
                    },
                    {
                        key: '2',
                        name: 'two',
                        img: 'two.png',
                        prizeShowImg:
                            'https://resource.yuedaoec.com/assets/august-lottery/{}/prize_two.png'
                    },
                    {
                        key: '3',
                        name: 'three',
                        img: 'three.png',
                        prizeShowImg:
                            'https://resource.yuedaoec.com/assets/august-lottery/{}/prize_three.png'
                    },
                    {
                        key: '4',
                        name: 'four',
                        img: 'four.png',
                        prizeShowImg:
                            'https://resource.yuedaoec.com/assets/august-lottery/{}/prize_four.png'
                    }, {
                        key: '5',
                        name: 'five',
                        img: 'five.png',
                        prizeShowImg:
                            'https://resource.yuedaoec.com/assets/august-lottery/{}/prize_five.png'
                    }, {
                        key: '6',
                        name: 'six',
                        img: 'six.png',
                        prizeShowImg:
                            'https://resource.yuedaoec.com/assets/august-lottery/{}/prize_six.png'
                    },
                    {
                        key: '7',
                        name: 'seven',
                        img: 'seven.png',
                        prizeShowImg:
                            'https://resource.yuedaoec.com/assets/august-lottery/{}/prize_seven.png'
                    },
                    {
                        key: '8',
                        name: 'eight',
                        img: 'eight.png',
                        prizeShowImg:
                            'https://resource.yuedaoec.com/assets/august-lottery/{}/prize_eight.png'
                    },
                    {
                        key: '99',
                        name: 'thanks',
                        img: 'thanks.png',
                        prizeShowImg: 'https://resource.yuedaoec.com/assets/august-lottery/{}/prize_thanks.png',

                    }
                ],
                i18n: {
                    tingmimi: {
                        name: '姓名',
                        netErrorAlert: '网络好像出了点问题，请稍后再试',
                        rouletteQtyZero: '抽奖次数已用完'
                    },
                    tingo2o: {
                        name: '姓名',
                        netErrorAlert: '网络好像出了点问题，请稍后再试',
                        rouletteQtyZero: '抽奖次数已用完'
                    },
                    newtingtaiwan: {
                        name: '姓名',
                        netErrorAlert: '網路好像出了點問題，請稍後再試',
                        rouletteQtyZero: '抽獎次數已用完'
                    },
                    newtingmalaysia: {
                        name: 'NAME',
                        netErrorAlert:
                            'The network seems to have some problems, please try again later.',
                        rouletteQtyZero: 'The lucky draw chances have been used up'
                    }
                },
                seq: [1, 2, 3, 6, 9, 8, 7, 4],
                clickable: true,
                count: 0,
                prize: null,
                finished: false,
                remainingRouletteNumber: null,
                prizeShow: false,
                showShare: false,
                light: true
            };
        },
        watch: {},
        computed: {},
        created() {
            this.platformInner = this.platform;
            const result = hybrid.app.whereamiSync();
            if (result.indexOf('miniprogram') >= 0 || result.indexOf('Browser') >= 0) {
                this.miniprogram = true;
            }
        },
        mounted() {
            const orderCode = this.getUrlParam('orderCode');
            this.orderCode = orderCode
        },
        methods: {
            showPrize() {
                this.prizeShow = true;
            },
            hidePrize() {
                this.prizeShow = false;
            },
            closePrizeAlert() {
                this.showResult = false;
            },
            start() {
                if (!this.clickable) return;
                this.finished = false;
                this.count = 0;
                this.current = null;
                this.currentIndex = null;
                this.clickable = false;
                this.prize = null;
                this.timer = setInterval(() => {
                    this.light = !this.light
                    if (this.finished) {
                        this.light = false
                        clearInterval(this.timer)
                        this.clickable = true;
                    }
                }, 200);
                const params = {
                    type: 'get',
                    url: 'flip-game/2020/08/flip',
                    query: {
                        platform: this.platformInner,
                        orderCode: this.orderCode
                    },
                    userToken: true
                };

                this.reqwest(params)
                    .then(response => {
                        if (response.success) {
                            const result = response.result.res;
                            const key = result.prizeNo;
                            for (const index in this.gifts) {
                                if (this.gifts[index].key == key) {
                                    this.prize = this.gifts[index];
                                }
                            }
                            console.log(this.prize)

                            if (
                                (result.prizeNo == '0' ||
                                    result.prizeNo == '1' ||
                                    result.prizeNo == '2' ||
                                    result.prizeNo == '3' ||
                                    result.prizeNo == '4' ||
                                    result.prizeNo == '5' ||
                                    result.prizeNo == '6' || result.prizeNo == '7' || result.prizeNo == '8' ||
                                    result.prizeNo == '99'
                                ) &&
                                this.prize.prizeShowImg
                            ) {
                                const $ctx = this.$refs.shareImg;
                                const ctx = $ctx.getContext('2d');
                                ctx.clearRect(0, 0, 750, 490);

                                let i = 0;
                                console.log('弹出图:', this.prize.prizeShowImg)
                                this.loadImg(
                                    this.prize.prizeShowImg.replace('{}', this.platformInner),
                                    img => {
                                        ctx.drawImage(img, 0, 0, 750, 490);
                                        ctx.save();
                                        ctx.stroke();

                                        const dataURL = ctx.canvas.toDataURL('image/png');
                                        const prize = this.prize;
                                        prize.prizeShowImg = dataURL;
                                        this.prize = prize;
                                        const sleepTime = Math.floor(Math.random() * 8) * 1000
                                        setTimeout(() => {
                                            this.finished = true;
                                            this.prizeShow = true;

                                        }, sleepTime)
                                    }
                                );
                            }
                            return;
                        } else {
                            Toast(response.result.msg);
                            this.finished = true;
                        }
                    })
                    .catch(error => {
                        this.clickable = true;
                        this.finished = true;
                        console.log(error);
                        Toast(this.i18n[this.platformInner].netErrorAlert);
                    });
            }
        }
    };
</script>
<style scoped>
  img {
    width: 100%;
    transform-origin: 50% 50%;
    cursor: pointer;
    transform: scaleY(1) translateZ(0);
    /*margin: 5px;*/
  }

  .lottery {
    width: 100%;
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .lottery-start {
    width: 47%;
    position: absolute;
    top: 252px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1000;
  }

  .light-icon {
    position: absolute;
    width: 69%;
    left: 0;
    right: 0;
    top: 4px;
    margin: auto;
  }

  .light-icon img {
    width: 100%;
  }

  .title {
    position: absolute;
    top: 13px;
    right: 50px;
    font-size: 14px;
    transform: scale(0.8);
    color: white;
  }

  .activity-roulette {
    position: absolute;
    right: 0;
    margin-bottom: 70px;
    height: 300px;
    top: 13px;
    width: 338px;
    margin-right: 10px;
  }

  .activity-roulette-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    height: 85%;
    margin: 16% 10% 8% 5.5%;
    display: flex;
    flex-wrap: wrap;
  }

  .roulette-item {
    width: 30%;
    margin-right: 1.5%;
    font-size: 10px;
    color: #000000;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .enlighted {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../assets/enlighten.png');
  }

  .left-roulette-qty {
    position: absolute;
    top: 345px;
    left: 120px;
    font-size: 16px;
    color: white;
  }

  .timeTips {
    width: 82%;
    height: 50px;
    line-height: 50px;
    background-color: #000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    z-index: 100;
  }

  .dialog {
    position: relative;
    margin: 15px;
    width: 250px;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .dialog-close {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 8px;
    top: 8px;
  }

  .dialog-row {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .prize-color {
    color: #ff8300;
  }

  .small {
    color: #666666;
    font-size: 10px;
  }

  .button {
    width: 160px;
    height: 35px;
    border-radius: 100px;
    line-height: 35px;
    font-size: 14px;
    text-align: center;
    color: white;
    background: linear-gradient(0.25turn, #fd5ba6, #c43ad1);
  }

  .prize-popup-row1 {
    width: 100%;
    height: 30px;
    position: relative;
    top: 0;
    left: 0;
  }

  .prize-popup {
    position: relative;
    top: 0;
    left: 0;
  }

  .prize-show {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 350px;
  }

  .prize-show-img {
    width: 100%;
  }

  .prize-show-button {
    width: 190px;
  }

  .van-popup {
    background-color: transparent;
  }

  .swiperIcon {
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .swiperIcon img {
    height: 40px;
    width: 40px;
    margin: 0 20px;
  }

  #cover {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 20001;
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

  .dialog-close {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 1000;
    margin: 0;
  }
</style>

<style>
  .van-popup {
    border-radius: 10px;
  }
</style>
