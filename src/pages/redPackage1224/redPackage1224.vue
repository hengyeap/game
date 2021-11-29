<template>
  <div class="page">
    <img class="bg" :src="'https://resource.yuedaoec.com/image/redPackage1224/'+language+'/bg.jpg?11111'" alt="">
    <img @click="toNote" class="note-icon" :src="'https://resource.yuedaoec.com/image/redPackage1224/'+language+'/note-icon.png?111'" alt="">
    <img @click="toBack" src="https://public.tingmimi.net/image/mothersDay2020/back-icon.png" alt=""
         class="back-icon">
    <div class="content">
      <img @click="play" class="play" :src="'https://resource.yuedaoec.com/image/redPackage1224/'+language+'/play.png?111'" alt="">
    </div>
    <van-popup v-model="hongbaoShow">
      <img class="tanKuangImg" :src="'https://resource.yuedaoec.com/image/redPackage1224/'+language+'/tanKuang.png'" alt="">
      <div class="price">SGD{{price}}</div>
      <div @click="toClose"  class="close-icon"></div>
    </van-popup>
  </div>
</template>

<script>
    import hy from 'hybridify-js'

    import { Popup ,Toast,Dialog} from 'vant'
    import utilString from '../../utils/utilString';

    export default {
        name: "App",
        components:{
            [Popup.name]: Popup,
            [Toast.name]: Toast,
            [Dialog.name]: Dialog,
        },
        data(){
            return{
                language:'us',
                hongbaoShow:false,
                uid:'',
                price:5,
                lock:false,
                platform: 'tingsingapore'

            }
        },
        mounted() {
            this.uid = this.getUrlParam('uid')
            this.language = this.getLang()
            this.platform = this.getUrlParam('platform');

            this.getToken(); //登录凭证获取

        },
        methods:{
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
                if(this.language=='us'){
                    let url = 'https://appdist.yuedaoec.com/h5/activity/redPackage1224Note.html?platform=tingsingapore&language=en&accessJwt={access}'

                    url = url.replace('{access}', this.getUrlParam('accessJwt'));
                    hy.nav.push(url);
                }else if(this.language=='cn') {
                    let url = 'https://appdist.yuedaoec.com/h5/activity/redPackage1224Note.html?platform=tingsingapore&language=cn&accessJwt={access}'

                    url = url.replace('{access}', this.getUrlParam('accessJwt'));
                    hy.nav.push(url);
                }


            },
            play(){
                this.draw()
            },
            toClose(){
                this.hongbaoShow=false
            },
            draw() {
                if (this.lock) {
                    return Toast('点击太频繁啦，请稍后再试~');
                }
                this.lock = true;
                // this.remainingCount = this.remainingCount - 1;
                const params = {
                    url: 'red-package/2020/12/rotate',
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
                            this.hongbaoShow = false;
                        },  waitTime * 1000);
                        return Toast(response.result.msg);
                    }
                    const result = response.result;
                   this.price = result.res.points;


                    setTimeout(() => {
                        this.lock = false;
                        this.hongbaoShow = true;
                    },  waitTime * 1000);
                }).catch(error => {
                    const waitTime = Math.floor(Math.random() * 8);

                    setTimeout(() => {
                        this.lock = false;
                        this.hongbaoShow = true;
                    },  waitTime * 1000);
                    console.log(error);
                    // Toast(this.texts[this.platform].netErrorAlert);
                });
            },


        }
    }
</script>

<style scoped>
  .page{
    width: 100%;
    position: relative;
  }
  .content{
    width: 100%;
    position: absolute;
    top: 7.1rem;
  }
  .bg{
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
  .play{
    width: 27%;
    margin: auto;
    position: relative;
    display: block;
  }
  .tanKuangImg{
    width: 100%;
  }
  .close-icon{
    position: absolute;
    bottom: 0;
    width: 20%;
    height: 1.5rem;
    left: 0;
    right: 0;
    margin: auto;
  }
  .price{
    color: #FFE9BC;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 50px;
    font-weight: 600;
  }
  .note-icon{
    position: absolute;
    right: 0;
    width: 15%;
    top: 1%;
    top: 0.3rem;
  }
</style>
<style>
  .van-popup {
    width: 80%;
    background-color: rgba(255, 255, 255, 0)!important;
  }

</style>