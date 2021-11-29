<template>
  <div>
    <div class="lottery">
      <img :src="lottery" alt="" class="lottery-bg">
      <div class="prize-box">
        <div v-for="item in brandImg" class="brand">
          <img :src="item.imgUrl" alt="" class="brandImg">
        </div>
      </div>
    </div>
    <div @click="start" class="start">
      <img :src="startIcon" alt="" class="start-icon">
    </div>

    <van-popup v-model="prizeShow"
               @close=cancelShare>
      <div class="prize-popup">
        <div @click="hidePrize" class="prize-popup-row1">

        </div>
        <div class="prize-show">
          <img class="prize-show-img" v-if="prize && prize.prizeShowImg"
               :src="prize == null ? '':  prize.prizeShowImg"/>
          <!--                    <img v-if="!miniprogram"-->
          <!--                         class="prize-show-button"-->
          <!--                         style="margin-top:5%;"-->
          <!--                         :src="'https://resource.yuedaoec.com/assets/doubleeleven/{}/april/share.png'.replace('{}',platformInner)"-->
          <!--                         @click="shareShow"/>-->
        </div>
      </div>

    </van-popup>
    <!--        <div id='cover'-->
    <!--             v-show='showShare'>-->
    <!--            <div id='shareContent'-->
    <!--                 class='slideUp'>-->
    <!--                <p>分享到</p>-->
    <!--                <div class='shareBtn'>-->
    <!--                    <div @click='shareToWx()'>-->
    <!--                        <img src='../assets/wx.png'-->
    <!--                             alt='微信'/>-->
    <!--                        <span>微信</span>-->
    <!--                    </div>-->
    <!--                    <div @click='shareToCircle()'>-->
    <!--                        <img src='../assets/circle.png'-->
    <!--                             alt='朋友圈'/>-->
    <!--                        <span>朋友圈</span>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--                <div @click='cancelShare()'-->
    <!--                     class='cancel'>取消-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
    <canvas width="1696" height="1370" style="position: fixed;top: -1000000px;right: 0px;width:375px; height:450px"
            ref="shareImg"></canvas>

  </div>
</template>
<script>
    import {Popup, Toast} from 'vant';
    import ImgFlip from './ImgFlip';
    import axios from 'axios';
    import hybrid from 'hybridify-js';

    export default {
        components: {
            [Popup.name]: Popup,
            ImgFlip
        },
        props: ['rouletteQty', 'started', 'platform'],
        data() {
            return {
                brand:{
                    "0":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'}],
                    "1":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'}],

                    "2":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'}],
                    "3":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'}],
                    "4":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'}],

                    "5":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'}],
                    "6":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'}],
                    "7":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'}],



                    "9":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand1.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand1.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand1.png'}],

                },
                brandImg:[],
                lottery:'https://resource.yuedaoec.com/image/march-lottery/lottery.png',
                startIcon:'https://resource.yuedaoec.com/image/march-lottery/start-icon.png',
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
                        key: '1',
                        name: 'one',
                        img: 'one.png',
                        prizeShowImg:
                            'https://resource.yuedaoec.com/image/march-lottery/prize_one.png'
                    },
                    {
                        key: '2',
                        name: 'two',
                        img: 'two.png',
                        prizeShowImg:
                            'https://resource.yuedaoec.com/image/march-lottery/prize_two.png'
                    },

                    {
                        key: '9',
                        name: 'thanks',
                        img: 'thanks.png',
                        prizeShowImg: 'https://resource.yuedaoec.com/image/march-lottery/prize_thanks.png',

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
                    },
                    tingsingapore: {
                        name: 'NAME',
                        netErrorAlert:
                            'The network seems to have some problems, please try again later.',
                        rouletteQtyZero: 'The lucky draw chances have been used up'
                    },
                },
                seq: [1, 2, 3, 6, 9, 8, 7, 4],
                clickable: true,
                count: 0,
                prize: null,
                finished: false,
                remainingRouletteNumber: null,
                prizeShow: false,
                showShare: false,

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
            this.brandImg = this.brand[9];
        },
        mounted() {
        },
        methods: {
            showPrize() {
                this.prizeShow = true;
            },
            hidePrize() {
                this.prizeShow = false;
                this.brandImg =  this.brand[9];
            },
            closePrizeAlert() {
                this.showResult = false;
            },
            convertBase64UrlToBlob(basestr) {
                const type = 'image/jpeg';
                const text = window.atob(basestr.split(',')[1]);
                const buffer = new ArrayBuffer(text.length);
                const ubuffer = new Uint8Array(buffer);

                for (var i = 0; i < text.length; i++) {
                    ubuffer[i] = text.charCodeAt(i);
                }

                const Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
                let blob;

                if (Builder) {
                    var builder = new Builder();
                    builder.append(buffer);
                    blob = builder.getBlob(type);
                } else {
                    blob = new window.Blob([buffer], {type: type});
                }
                return blob;
            },
            upLoad(data, callback) {
                const file = data;
                const formData = new FormData();
                formData.append('file', file);
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                axios
                    .post(
                        'https://apph5.yuedaoec.com/api/pullNewH5/bgImg/upload.community',
                        formData,
                        config
                    )
                    .then(res => {
                        callback(res);
                    })
                    .catch(res => {
                        callback(res);
                    });
            },
            downLoadImg() {
                hybrid.app.download(this.prize.prizeShowImg);
            },
            shareToWx(eve) {
                const obj = {
                    url: this.prize.prizeShowImg,
                    type: 'wechat'
                };
                hybrid.app.share(obj);
            },
            shareToCircle(eve) {
                const obj = {
                    url: this.prize.prizeShowImg,
                    type: 'circle'
                };
                hybrid.app.share(obj);
            },
            shareShow() {
                const $ctx = this.$refs.shareImg;
                const ctx = $ctx.getContext('2d');
                const dataURL = ctx.canvas.toDataURL('image/png');
                const convertResult = this.convertBase64UrlToBlob(dataURL);
                this.upLoad(convertResult, result => {
                    const uploadResult = result.data;
                    if (uploadResult.code == '10000') {
                        const prize = this.prize;
                        prize.prizeShowImg = uploadResult.res;
                        this.prize = prize;
                        this.setPrizeImg(prize.key, uploadResult.res);
                        this.showShare = true;
                    }
                });
            },
            cancelShare() {
                this.showShare = false;
            },
            setPrizeImg(prize, url) {
                const params = {
                    type: 'get',
                    url: '/double-eleven/2020/11/img',
                    query: {
                        prize: prize,
                        url: url
                    },
                    userToken: true
                };
                this.reqwest(params)
                    .then(response => {
                    })
                    .catch(error => {
                        console.log('ignore setPrizeImg error', error);
                    });
            },
            start() {
                if(this.clickable){
                    console.log(111);
                }else {
                    console.log(22)
                }
                if (!this.clickable) return;
                this.finished = false;
                this.count = 0;
                this.current = null;
                this.currentIndex = null;
                this.clickable = false;
                this.prize = null;
                // if(this.finished){
                //     this.clickable=true
                // }
                const params = {
                    type: 'get',
                    url: 'double-eleven/2021/03/rotate',
                    userToken: true
                };

                this.reqwest(params)
                    .then(response => {
                        if (response.success) {
                            const result = response.result.res;
                            if(result.prizeNo == '9'){
                                let randomKeys = ["2", "3", "4","5","6","7"];
                                let index = Math.floor(Math.random() * 6);
                                this.brandImg = this.brand[randomKeys[index]];
                            }else if(result.prizeNo == '1'||
                                result.prizeNo == '2'){
                                let randomKeys = ["0", "1"];
                                let index = Math.floor(Math.random() * 2);
                                this.brandImg = this.brand[randomKeys[index]];
                            }
                            const key = result.prizeNo;
                            for (const index in this.gifts) {
                                if (this.gifts[index].key == key) {
                                    this.prize = this.gifts[index];
                                }
                            }
                            console.log(this.prize)
                            this.$emit('prizeGot', {
                                remainingCount: result.remainingCount,
                                prizeNo: result.prizeNo
                            });

                            if (
                                (result.prizeNo == '1' ||
                                    result.prizeNo == '2' ||
                                    result.prizeNo == '9') &&
                                this.prize.prizeShowImg)
                            {
                                const $ctx = this.$refs.shareImg;
                                const ctx = $ctx.getContext('2d');
                                ctx.clearRect(0, 0, 1696, 1370);

                                let i = 0;
                                console.log('弹出图:', this.prize.prizeShowImg)
                                this.loadImg(
                                    this.prize.prizeShowImg.replace('{}', this.platformInner),
                                    img => {
                                        ctx.drawImage(img, 0, 0, 1696, 1370);
                                        ctx.save();
                                        ctx.stroke();

                                        const dataURL = ctx.canvas.toDataURL('image/png');
                                        const convertResult = this.convertBase64UrlToBlob(
                                            dataURL
                                        );
                                        const prize = this.prize;
                                        prize.prizeShowImg = dataURL;
                                        this.prize = prize;
                                        const sleepTime = Math.floor(Math.random() * 3) * 1000
                                        setTimeout(() => {
                                            this.finished = true;
                                            this.prizeShow = true;
                                            this.clickable = true;
                                        }, sleepTime)

                                    }
                                );
                            }
                            return;
                        } else {
                            Toast(response.result.msg);
                            this.clickable = true;
                            // this.finished = true;
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
    margin: 5px;
  }

  .lottery{
    width: 100%;
    position: absolute;
    top: 14rem;
    right: 0;
    left: 0;
    margin: auto;
  }
  .lottery-bg{
    width: 100%;
  }
  .prize-box{
    position: absolute;
    top: 1.7rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 81%;
    left: 0;
    right: 0;
    margin: auto;
  }
  .brand{
    width: 30%;
  }
  .brandImg{
    width: 100%;
  }
  .start-icon{
    width: 100%;
  }
  .start{
    width: 52%;
    position: absolute;
    top: 20.1rem;
    left: 0;
    right: 0;
    margin: auto;
  }






  .prize-popup-row1 {
    width: 15%;
    height: 1.1rem;
    position: absolute;
    right: 0;
    margin: 0 auto;
    z-index: 99;
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
