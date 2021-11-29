<template>
  <div class="page">
    <img class="bg" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/bg.gif?11'" alt="">
<!--    <img class="bg" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/bg2.png'" alt="">-->
    <img @click="toRule" class="rule-icon" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/rule-icon.png'" alt="">
    <img @click="toBack" src="https://public.tingmimi.net/image/mothersDay2020/back-icon.png" alt=""
         class="back-icon">
    <div class="play">
      <img @click="play" class="play-icon" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/play.png'" alt="">
      <div @click="toNote" class="note"><span>抽签记录</span></div>
    </div>

    <van-popup :close-on-click-overlay="false" v-model="ruleShow">
      <img class="rule" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/rule.png'" alt="">
      <div @click="toCloseRule" class="close-icon"></div>

    </van-popup>

    <van-popup :close-on-click-overlay="false" v-model="noteShow">
      <img class="rule" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/note.png'" alt="">
      <div @click="toCloseNote" class="close-icon"></div>
      <div  class="noteWord">
        <div v-for="item in prizeLogs">
          <div v-if="item.type==0">
            {{item.createdAt}} <span>获得{{item.amount}}元代金券。</span>
          </div>
          <div v-else-if="item.type==1">
            {{item.createdAt}}<span>获得{{item.amount}}元红包。</span>
          </div>
          <div v-else-if="item.type==2">
            {{item.createdAt}}<span>未中奖</span>
          </div>
        </div>


      </div>
    </van-popup>
    <van-popup :close-on-click-overlay="false" v-model="tanKuangGif">
      <img class="tanKuang" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/tanKuangGif.gif'" alt="">
    </van-popup>
    <van-popup :close-on-click-overlay="false" v-model="tanKuangPrize">
      <img class="tanKuangPrize" :src="'https://resource.yuedaoec.com/image/draw202102/'+platform+'/prize.png'" alt="">
      <div @click="toClosePrize" class="close-icon"></div>
      <div v-if="type==0" class="price">恭喜您<br/>获得{{price}}元代金券</div>
      <div v-else-if="type==1" class="price">恭喜您<br/>获得{{price}}元红包</div>
      <div v-else-if="type==2" class="price">未中奖</div>
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
                platform: 'tingmimi',
                type:2,
                prizeLogs:[],


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
                    url: 'red-package/2021/0216/rotate',
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
                        console.log(111)
                        this.tanKuangGif=false
                        setTimeout(() => {
                            this.lock = false;
                            this.tanKuangGif=false
                            this.tanKuangPrize = false;
                            this.tanKuangGif=false
                        }, waitTime * 1000);
                        return Toast(response.result.msg);
                    }
                    // console.log(response.result.msg)

                    const result = response.result;
                    // console.log(response.result)
                    this.price = result.res.amount;
                    this.type = result.res.type
                    this.tanKuangGif=true

                    setTimeout(() => {
                        console.log(222)

                        this.lock = false;
                        this.tanKuangPrize = true;
                        this.tanKuangGif=false

                    }, waitTime * 1000);

                }).catch(error => {
                    const waitTime = Math.floor(Math.random() * 8);

                    setTimeout(() => {
                        this.lock = false;
                        this.tanKuangPrize = false;
                        this.tanKuangGif=false
                    }, waitTime * 1000);
                    console.log(error);
                    // Toast(error);
                });
            },
            getPrizeLogs() {
                const params = {
                    type: 'get',
                    url: 'red-package/2021/0216/prize-logs',
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
    top: 14.1rem;
    width: 46%;
    margin: auto;
    left: 0;
    right: 0;
  }

  .play-icon {
    width: 100%;
  }

  .note {
    margin: auto;
    text-align: center;
    line-height: 37px;
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
    top: 28%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 25px;
    font-weight: 400;
  }
  .noteWord{
    position: absolute;
    top: 1.5rem;
    font-size: 0.37333rem;
    left: 0;
    width: 68%;
    right: 0;
    margin: auto;
  }
  .noteWord div span{
    margin-left: 0.5rem;
  }
</style>
<style>
  .van-popup {
    width: 100%;
    background-color: rgba(255, 255, 255, 0) !important;
  }

</style>