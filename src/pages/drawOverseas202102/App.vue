<template>
  <div class="page">
    <img class="bg" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/bg.jpg'" alt="">

    <img @click="toBack" src="https://public.tingmimi.net/image/mothersDay2020/back-icon.png" alt=""
         class="back-icon">
    <div @click="toNote" class="note">{{texts[platform].note}}</div>
    <div @click="play" class="play">{{texts[platform].playWord}}</div>



    <van-popup :close-on-click-overlay="false" v-model="noteShow">
      <img class="rule" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/note.png'" alt="">
      <img @click="toCloseNote" class="close-icon1" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/close-icon.png'" alt="">
      <div class="noteWord">
        <div class="noteTab" v-for="item in prizeLogs" >
          <div v-if="item.type==0">
            {{item.createdAt}} <br/>{{texts[platform].couponNote.replace('{}',item.amount)}}
          </div>
          <div v-else-if="item.type==1">
            {{item.createdAt}} <br/>{{texts[platform].redPackageNote.replace('{}',item.amount)}}
          </div>
          <div v-else-if="item.type==2">
            {{item.createdAt}} <br/>{{texts[platform].thanks}}
          </div>
        </div>

      </div>
    </van-popup>

    <van-popup :close-on-click-overlay="false" v-model="tanKuangPrize">
      <img class="tanKuangPrize" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/tanKuang.png'" alt="">
      <img  @click="toClosePrize" class="close-icon1" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/close-icon.png'" alt="">
      <div v-if="type==0" :class="platform=='newtingtaiwan' ? 'price1':'price'">{{texts[platform].coupon.replace('{}',price)}}</div>
      <div v-else-if="type==1" :class="platform=='newtingtaiwan' ? 'price1':'price'">{{texts[platform].redPackage.replace('{}',price)}}</div>
      <div v-else-if="type==2" :class="platform=='newtingtaiwan' ? 'price1':'price'">{{texts[platform].thanks}}</div>
    </van-popup>
  </div>
</template>

<script>
    import hy from 'hybridify-js'

    import {Popup, Toast, Dialog} from 'vant'
    import utilString from '../../utils/utilString';

    export default {
        name: "App",
        components: {
            [Popup.name]: Popup,
            [Toast.name]: Toast,
            [Dialog.name]: Dialog,
        },
        data() {
            return {
                hongbaoShow: false,
                ruleShow: false,
                noteShow: false,
                tanKuangGif: false,
                tanKuangPrize: false,
                uid: '',
                price: 5,
                lock: false,
                platform: 'newtingtaiwan',
                type:2,
                prizeLogs:[],
                texts: {
                    newtingtaiwan: {
                        playWord: '點擊抽紅包',
                        redPackage: '恭喜獲得NT{}紅包',
                        coupon: '恭喜獲得NT{}代金券',
                        redPackageNote: '獲得NT{}紅包',
                        couponNote: '獲得NT{}代金券',
                        thanks:'未中獎',
                        note:'查看记录',
                        netError: '網路異常',
                        netErrorMsg: '您的網路好像出了點問題，頁面將被關閉，請您稍後再試。',
                        netErrorAlert: '網路好像出了點問題，請稍後再試',
                    },
                    newtingmalaysia: {
                        playWord: 'Tap to Draw',
                        redPackage: 'Congratulations! You’ve won RM{} Red Packet!',
                        coupon: 'Congratulations! You’ve won RM{} Voucher!',
                        redPackageNote: 'You’ve won RM{} Red Packet!',
                        couponNote: 'You’ve won RM{} Voucher!',
                        note:'Check Record',
                        thanks:'Sorry, you didn’t win a prize!',
                        netError: '網路異常',
                        netErrorMsg: '您的網路好像出了點問題，頁面將被關閉，請您稍後再試。',
                        netErrorAlert: '網路好像出了點問題，請稍後再試',

                    },
                    tingsingapore:{
                        note:'Check Record',
                        thanks:'Sorry, you didn’t win a prize!',
                        playWord: 'Tap to Draw',
                        redPackage: 'Congratulations! You’ve won SGD{} Red Packet!',
                        coupon: 'Congratulations! You’ve won SGD{} Voucher!',
                        redPackageNote: 'You’ve won SGD{} Red Packet!',
                        couponNote: 'You’ve won SGD{} Voucher!',
                        netError: '網路異常',
                        netErrorMsg: '您的網路好像出了點問題，頁面將被關閉，請您稍後再試。',
                        netErrorAlert: '網路好像出了點問題，請稍後再試',
                    }
                }

            }
        },
        mounted() {
            this.uid = this.getUrlParam('uid')
            this.platform = this.getUrlParam('platform')

            this.getToken(); //登录凭证获取

        },
        methods: {
            getToken() {
                let token = null;
                token = this.getUrlParam('accessJwt');

                if (utilString.isBlank(token)) {
                    return Dialog.alert({
                        message: '登录状态已失效，请重新登录！'
                    }).then(() => {
                        hy.nav.toMe();
                    });
                }
                this.token = token;

            },
            toBack() {
                hy.nav.back()
            },
            toNote() {
                this.noteShow = true
                this.getPrizeLogs()
            },
            toCloseNote() {
                this.noteShow = false
                console.log(11)
            },
            toClosePrize(){
                this.tanKuangPrize=false
                this.tanKuangGif=false
            },
            play() {
                this.draw()
                // this.tanKuangGif = true
                // setTimeout(() => {
                //     this.draw()
                //     this.tanKuangGif = false
                //     this.tanKuangPrize=true
                // }, 2000)

            },
            toClose() {
                this.hongbaoShow = false
            },
            toRule() {
                this.ruleShow = true
            },
            toCloseRule() {
                this.ruleShow = false
            },
            draw() {
                if (this.lock) {
                    return Toast('点击太频繁啦，请稍后再试~');
                }
                this.lock = true;
                // this.remainingCount = this.remainingCount - 1;
                const params = {
                    url: 'red-package/2021/0211/rotate',
                    type: 'get',
                    header: {
                        token: this.token
                    },
                    query: {
                        platform: this.platform,
                    }
                };



                this.reqwest(params).then(response => {

                    const waitTime = Math.floor(Math.random() * 4);
                    if (!response.success) {
                        setTimeout(() => {
                            this.lock = false;
                            this.tanKuangPrize = false;
                        }, waitTime * 1000);
                        return Toast(response.result.msg);
                    }
                    const result = response.result;
                    // console.log(response.result)
                    this.price = result.res.amount;



                    this.type = result.res.type
                    setTimeout(() => {
                        this.lock = false;
                        this.tanKuangPrize=true
                    }, waitTime * 1000);
                }).catch(error => {
                    const waitTime = Math.floor(Math.random() * 8);

                    setTimeout(() => {
                        this.lock = false;
                        this.tanKuangPrize = true;
                    }, waitTime * 1000);
                    console.log(error);
                    // Toast(this.texts[this.platform].netErrorAlert);
                });
            },
            getPrizeLogs() {
                const params = {
                    type: 'get',
                    url: 'red-package/2021/0211/prize-logs',
                    header: {
                        token: this.token,

                    },
                    query: {
                        platform: this.platform,
                    }
                };
                this.reqwest(params)
                    .then(response => {
                        if (response.success) {

                            const result = response.result.res;
                            // console.log(result[0].couponId)
                            // const prizeLogs = [];
                            // for (let i = 0; i < result.length; i++) {
                            //     const log = result[i];
                            //     if (log.couponId > 0) {
                            //         prizeLogs.push(log);
                            //     }
                            // }

                            this.prizeLogs = result;
                            console.log(this.prizeLogs)
                        } else {
                            Toast(response.result.msg);
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        // return Toast(this.word[this.language].netErrorAlert);
                    });
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

  .rule-icon {
    position: absolute;
    width: 20%;
    /* height: 0.6rem; */
    right: 0.2rem;
    top: 0.26rem;
    z-index: 999;
  }

  .play {
    position: absolute;
    top: 13.99rem;
    width: 46%;
    margin: auto;
    left: 0;
    right: 0;
    font-size: 23px;
    color: #F20B00;
    font-weight: 500;
    text-align: center;
  }

  .play-icon {
    width: 100%;
  }

  .note {
    margin: auto;
    text-align: center;
    line-height: 23px;
    color: #FDDB8C;
    position: absolute;
    top: 0.2rem;
    right: 0.3rem;
    border-radius: 20px;
    padding: 0 0.2rem;
    font-size: 12px;
    background: linear-gradient(to bottom,#FFA836,#FC0038,#FC0038);

  }

  .note span {
    font-size: 16px;
    color: #fff;
    border-bottom: 2px solid #fff;
    padding-bottom: 8px;
  }

  .close-icon {
    position: absolute;
    bottom: 0;
    width: 20%;
    height: 1.5rem;
    left: 0;
    right: 0;
    margin: auto;
  }
  .close-icon1{
    position: relative;
    /* bottom: 0; */
    width: 8%;
    /* height: 1.5rem; */
    /* left: 0; */
    /* right: 0; */
    margin: 0.5rem auto;
    display: flex;
  }

  .rule {
    width: 80%;
    display: flex;
    margin: auto;
  }
  .tanKuangPrize {
    width: 97%;
    display: flex;
    margin: auto;
  }

  .tanKuang {
    width: 100%;
  }
  .price{
    color: #FEEF45;
    position: absolute;
    top: 58%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    width: 41%;
    margin: auto;
    word-break: break-word;
  }
  .price1{
    color: #FEEF45;
    position: absolute;
    top: 58.5%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    width: 50%;
    margin: auto;
    word-break: break-word;
  }
  .noteWord{
    position: absolute;
    top: 1.5rem;
    font-size: 10px;
    left: 0;
    width: 68%;
    right: 0;
    margin: auto;
  }
  .noteWord div span{
    margin-left: 0.5rem;
  }
  .noteTab{
    margin-bottom: 0.2rem;
  }
</style>
<style>
  .van-popup {
    width: 100%;
    background-color: rgba(255, 255, 255, 0) !important;
  }

</style>