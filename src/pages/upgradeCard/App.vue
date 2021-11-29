<template>
  <div class="page">
    <img @click="onClickLeft" src="https://public.tingmimi.net/image/mothersDay2020/back-icon.png" alt=""
         class="back-icon">
    <div class="titleWord">成长值任务</div>

    <div class="content">
      <div v-if="redBlueCardStatus==1" class="blueCardShow">
        <van-swipe class="my-swipe" :show-indicators="false">
          <van-swipe-item>
            <img class="card" src="https://public.tingmimi.net/image/developmentalTask/blueCard.png" alt="">
            <div class="line-bar">
              <div :style="'width:'+currentGrowthValue/totalGrowthValue * 100 + '%'" class="line-bar-con">
                <div class="line-bar-num"><span>{{currentGrowthValue}}</span>/{{totalGrowthValue}}</div>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <img class="card" src="https://public.tingmimi.net/image/developmentalTask/redCard.png" alt="">
          </van-swipe-item>
        </van-swipe>
        <div class="tip">可滑动查看红卡权益></div>
        <div class="title">
          {{$t('growthValue.growthValueAchievements')}}
        </div>
        <div class="text-all">

          <div v-for="(item,index) in detailVos" class="text1" :key="index">
            <img class="icon" :src="item.icon" alt="">
            <!--          <img v-if="index == 0" class="icon" src="https://public.tingmimi.net/image/developmentalTask/icon1.png" alt="">-->
            <!--          <img v-else-if="index == 1" class="icon" src="https://public.tingmimi.net/image/developmentalTask/icon2.png" alt="">-->
            <!--          <img v-else class="icon" src="https://public.tingmimi.net/image/developmentalTask/icon3.png" alt="">-->
            <div class="word">
              {{getWord(index)}}

              <div v-if="index == 1">
                {{$t('growthValue.receiveBonus')}}
              </div>
              <div class="growthValue">
                {{'+'+item.growthValue+'成长值'}}

              </div>


            </div>


            <div v-if="item.finish" class="complete">
            <span>
              <img class="tick" src="https://public.tingmimi.net/image/developmentalTask/confirm.png" alt="">
            </span>
              {{$t('growthValue.complete')}}
            </div>

            <div @click="jump(index)" v-if="!item.finish" class="noComplete">
              {{$t('growthValue.goComlete')}}
            </div>

          </div>
        </div>
        <div class="bottom">
          <div v-if="status == 1" class="bottom-word">
            {{$t('growthValue.completeAllGrowthValue')}}
          </div>
          <div v-if="status == 2" class="bottom-word">
            {{$t('growthValue.completedAllGrowthValue')}}
          </div>
          <div v-if="status == 3" class="bottom-word">
            {{$t('growthValue.applicationSubmitted')}}
          </div>
          <div @click="getUpgradeRequest" :style="status == 2?'background-color:#FFB72D':'background-color:#D1D1D1'"
               class="button">
            {{btnText}}
          </div>
        </div>
      </div>
      <div v-if="redBlueCardStatus==2" class="redCardShow">
        <img class="card" src="https://public.tingmimi.net/image/developmentalTask/redCard.png" alt="">

      </div>


    </div>
  </div>
</template>

<script>
    import {NavBar} from 'vant';
    import {Swipe, SwipeItem} from 'vant';
    import hy from 'hybridify-js';
    import axios from "axios";
    import hybrid from 'hybridify-js';


    // import HeadBar from '../../../commons/global/Header.vue'
    export default {
        name: "developmental-task",
        components: {
            [NavBar.name]: NavBar,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem

// HeadBar
        },

        data() {
            return {

                detailVos: [],
                btnText: '',
                status: '',
                totalGrowthValue: 0,
                currentGrowthValue: 0,
                redBlueCardStatus: '',

            }
        },

        mounted() {
            this.uuid = this.getUrlParam('uuid')
            this.code = this.getUrlParam('code')
            this.uid = this.getUrlParam('uid')
            this.getGrowthValue()
            this.getDistributorCard()


        },

        methods: {

            getDistributorCard: function () {
                const self = this

                let params = {
                    userKey: self.uuid
                }
                axios.get('https://appdist.yuedaoec.com/distributor/userKey/distributor-card.distribute', {params: params})
                    .then((json) => {
                        if (json.data.code == 10000) {
                            let data = json.data.res
                            let redBlueCardStatus = data.redBlueCardStatus
                            self.redBlueCardStatus = redBlueCardStatus
                        }

                    })
            },


            onClickLeft() {
                hybrid.nav.back();
            },

            getWord(index) {
                let word = ''
                if (index == 0) {
                    word = this.$t('growthValue.addingID')
                } else if (index == 1) {
                    word = this.$t('growthValue.addingBankAccountNumber')
                } else if (index == 2) {
                    word = this.$t('growthValue.successfulSharing1')
                } else if (index == 3) {
                    word = this.$t('growthValue.successfulSharing2')
                } else if (index == 4) {
                    word = this.$t('growthValue.successfulSharing3')
                } else if (index == 5) {
                    word = this.$t('growthValue.purchaseAnyMall')
                }
                return word;
            },


            getGrowthValue() {
                let self = this
                let params = {}
                params.url = 'https://appdist.yuedaoec.com/distributor/growth-value/userKey.user'
                params.type = 'get'
                params.data = {
                    userKey: self.uuid
                }
                self.createAjax(params, function (json) {
                    self.detailVos = json.res.detailVos
                    self.currentGrowthValue = json.res.currentGrowthValue
                    self.totalGrowthValue = json.res.totalGrowthValue
                    console.log(self.detailVos)
                    for (let i = 0; i < self.detailVos.length; i++) {
                        console.log(self.detailVos[i])
                        if (i == 0 || i == 1 || i == 2) {
                            self.detailVos[i].icon = 'https://public.tingmimi.net/image/developmentalTask/icon' + i + '.png'
                        } else {
                            self.detailVos[i].icon = 'https://public.tingmimi.net/image/developmentalTask/icon2.png'
                        }

                    }
                    self.status = json.res.status
                    if (json.res.status == 1 || json.res.status == 2) {
                        self.btnText = self.$t('growthValue.applyForCard')
                    } else if (json.res.status == 3) {
                        self.btnText = self.$t('growthValue.underReview')
                    } else if (json.res.status == 4) {
                        self.btnText = self.$t('growthValue.auditAndApproval')
                    }
                })
            },

            getUpgradeRequest() {

                if (this.status == 1) {
                    this.toast(this.$t('growthValue.pleaseGrowthValueTask'))
                    return
                } else if (this.status == 3) {
                    this.toast(this.$t('growthValue.waitReview'))
                    return
                } else if (this.status == 4) {
                    this.toast(this.$t('growthValue.auditAndApproval'))
                    return
                }

                let self = this
                let params = {}
                params.url = 'https://appdist.yuedaoec.com/distributor/blue-upgrade-red-request/userKey.user'
                params.type = 'get'
                params.data = {
                    userKey: self.uuid
                }
                self.createAjax(params, function (json) {
                    self.toast(json.msg)
                })
            },

            jump(index) {
                if (index == 0) {
                    window.location.href = this.getRedirectUrl('../userInfoList.html', {userKey: this.uuid})
                } else if (index == 1) {
                    window.location.href = this.getRedirectUrl('../bank.html', {uuid: this.uuid, code: this.code})
                } else if (index == 2 || index == 3 || index == 4 || index == 5) {
                    this.toast(this.$t('growthValue.shareMall'))
                }

            }
        }
    }
</script>

<style scoped>
  .page {
    width: 100%;
    position: relative;
  }

  .content {
    /*padding-top: 44px;*/
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #FFFFFF;
    overflow: auto;
  }

  .title {
    width: 90%;
    font-size: 14px;
    font-weight: bold;
    color: #101010;
    margin: 0.1rem auto 0;
    letter-spacing: 1px;
    position: relative;
  }

  .text-all {
    width: 90%;
    margin: 0 auto;
    position: relative;
  }

  .text1 {
    width: 100%;
    min-height: 70px;
    margin: 0 auto;
    display: flex;
    justify-content: left;
    align-items: center;
    border-bottom: 1px solid #E5E5E5;
    position: relative;
  }

  .word {
    max-width: 230px;
    font-size: 12px;
    color: #101010;
    letter-spacing: 1px;
    position: relative;
    padding-right: 0.1rem;
  }

  .word div {
    /*color: #666666;*/
    font-size: 10px;
  }

  .text1 span {
    text-align: center;
    width: 13%;
  }

  .growthValue {
    width: 100%;
    font-size: 10px;
    color: #FB2E15;
    position: relative;
    /*text-align: center;*/
    vertical-align: center;
  }

  .noComplete {
    color: #FFFFFF;
    background: linear-gradient(#FF7F60, #FB2E15);
    font-size: 12px;
    border-radius: 15px;
    letter-spacing: 1px;
    line-height: 25px;
    position: absolute;
    right: 0;
    padding: 0.01rem 0.2rem;
  }

  .complete {
    color: #333333;
    font-size: 12px;
    letter-spacing: 1px;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .complete span {
    width: 26%;
    position: relative;
    /*margin-right: 0.05rem;*/
  }

  /*span img{*/
  /*  width: 100%;*/
  /*}*/
  .tick {
    width: 70%;
  }

  .bottom {
    width: 100%;
    position: relative;
  }

  .bottom-word {
    font-size: 12px;
    color: #101010;
    text-align: center;
    margin: 0.5rem auto;
    letter-spacing: 1px;
  }

  .button {
    width: 60%;
    position: relative;
    margin: 0.5rem auto 1rem;
    /*background-color: #D1D1D1;*/
    border-radius: 20px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    font-weight: bold;
    letter-spacing: 1px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    width: 1rem;
    margin-right: 0.4rem;
  }

  .back-icon {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    left: 0.2rem;
    top: 0.4rem;
    z-index: 8;
  }

  .titleWord {
    position: absolute;
    font-size: 16px;
    color: #fff;
    left: 0;
    right: 0;
    top: 0.4rem;
    margin: auto;
    z-index: 1;
    width: 77%;
    text-align: center;
  }

  .card {
    width: 100%;
    position: relative;
  }

  .tip {
    font-size: 10px;
    color: #ccc;
    text-align: center;
  }

  .line-bar {

    background-color: #DEEDFF;
    width: 50%;
    border-radius: 10px;
    height: 5px;
    margin: 0 auto;
    position: absolute;
    top: 4rem;
    left: 1.2rem;
  }

  .line-bar-con {
    height: 100%;
    background-color: #F6DCBD;
    border-radius: 10px;
    position: relative;
  }

  .line-bar-num {
    position: absolute;
    top: -25px;
    font-size: 12px;
    color: #F6DCBD;
    left: 0;
  }

  .line-bar-num span {
    font-size: 18px;
  }

</style>
<style>
  .mui-title[data-v-79bfef42] {
    color: #000000;
    letter-spacing: 1px;
  }
</style>
