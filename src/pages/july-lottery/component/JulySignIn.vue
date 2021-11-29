<template>
  <div class="content">
    <div class="sign-in">
      <img class="sign-in-bg"
           :src="'https://resource.yuedaoec.com/assets/july-lottery/{}/sign-in-bg.png'.replace('{}',platformInner)"
           alt="">
      <div class="signInStatusBox">
        <div v-for="(data,index) in checkData" class="signInStatus">
          <div class="signInStatusTop">
            <img v-if="data.current" @click="checkIn"
                 :src="'https://resource.yuedaoec.com/assets/july-lottery/{}/sign-in.png'.replace('{}',platformInner)"
                 alt="">
            <img v-else
                 :src="'https://resource.yuedaoec.com/assets/july-lottery/{}/signed-in.png'.replace('{}',platformInner)"
                 alt="">
          </div>
          <div class="signInStatusBottom">
            <img v-if="!data.checked && data.current" @click="checkIn"
                 :src="'https://resource.yuedaoec.com/assets/july-lottery/{}/sign-in-icon.png'.replace('{}',platformInner)"
                 alt="">
            <img v-if="data.checked"
                 :src="'https://resource.yuedaoec.com/assets/july-lottery/{}/signed-in-icon.png'.replace('{}',platformInner)"
                 alt="">
            <img v-if="!data.checked && !data.current"
                 :src="'https://resource.yuedaoec.com/assets/july-lottery/{}/wait-sign-in-icon.png'.replace('{}',platformInner)"
                 alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="invite">
      <img class="invite-bg"
           :src="'https://resource.yuedaoec.com/assets/july-lottery/{}/invite-bg.png'.replace('{}',platformInner)"
           alt="">
      <div class="jumpToInvite" @click="jump"></div>
    </div>
    <div class="order">
      <img class="order-bg"
           :src="'https://resource.yuedaoec.com/assets/july-lottery/{}/order-bg.png'.replace('{}',platformInner)"
           alt="">
    </div>
  </div>
</template>
<script>
    import {Popup, Toast, Dialog} from 'vant';
    import ImgFlip from './ImgFlip';
    import axios from 'axios';
    import hybrid from 'hybridify-js';

    export default {
        components: {},
        props: ['platform'],
        data() {
            return {

                platformInner: '',
                checkData: [],
                currentCheckedTimes: 0,
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

            };
        },
        watch: {
            currentCheckedTimes: function (newCurrentCheckedTimes, oldCurrentCheckedTimes) {
                this.checkInFormat()
            }
        },
        computed: {},
        created() {
            this.platformInner = this.platform;
            const result = hybrid.app.whereamiSync();
            if (result.indexOf('miniprogram') >= 0 || result.indexOf('Browser') >= 0) {
                this.miniprogram = true;
            }
        },
        mounted() {
            this.checkInFormat()
            this.init()
        },
        methods: {
            checkInFormat() {
                let checkData = [{checked: false, current: false}, {
                    checked: false,
                    current: false
                }, {checked: false, current: false}, {checked: false, current: false}]
                for (let i = 0; i < checkData.length; i++) {
                    if (i < this.currentCheckedTimes) {
                        checkData[i].checked = true
                    } else if (i == this.currentCheckedTimes) {
                        checkData[i].current = true
                    }
                }
                this.checkData = checkData
            },
          jump() {
            let url = 'https://appdist.yuedaoec.com/h5/opencardQRcode.html?platform={}&accessJwt={access}&uuid={uuid}'.replace(
                    '{}',
                    this.platform
            );
            url = url.replace('{access}', this.getUrlParam('accessJwt'));
            url = url.replace('{uuid}', this.getUrlParam('uuid'));
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
            init() {
                const params = {
                    type: 'get',
                    url: 'double-eleven/2020/07/init',
                    userToken: true
                };
                this.reqwest(params)
                    .then(response => {
                        if (response.success) {
                            const result = response.result.res;
                            this.currentCheckedTimes = result.checkCount;

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
            checkIn() {
                const params = {
                    type: 'get',
                    url: 'double-eleven/2020/07/check-in',
                    query: {},
                    userToken: true,
                }
                this.reqwest(params)
                    .then(response => {
                        if (response.success) {
                            this.toast("签到成功")
                            this.currentCheckedTimes = response.result.res
                        } else {
                            this.toast(response.result.msg)
                        }
                    }).catch(e => {
                    console.log(e)
                })
            }
        }
    };
</script>
<style scoped>
  .content {
    position: absolute;
    top: 459px;
    width: 78%;
    margin: auto;
    left: 0;
    bottom: 0;
    right: 4px;
    z-index: 1000;
  }

  .sign-in {
    position: relative;
    width: 100%;
  }

  .sign-in-bg {
    position: relative;
    width: 100%;
  }

  .invite {
    position: relative;
    width: 100%;
  }

  .invite-bg {
    position: relative;
    width: 100%;
  }

  .order {
    position: relative;
    width: 100%;
  }

  .jumpToInvite {
    width: 100px;
    height: 117px;
    position: absolute;
    top: 36px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .signInStatusBox {
    position: absolute;
    top: 68px;
    right: 0;
    left: 0;
    margin: auto;
    width: 85%;
    height: 72px;
    display: flex;
    justify-content: space-around;
    align-items: center;

  }

  .signInStatus {
    position: relative;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>



