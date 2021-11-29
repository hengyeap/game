<template>
  <div class="page">
    <van-nav-bar :title="word[language].title"
                 left-text
                 right-text
                 left-arrow
                 @click-left='navBarClickLeft'/>
    <div class="content">

      <div>
        <div v-if="prizeLogs.length <= 0"
             class="no-word">
          {{word[language].noUseLog}}
        </div>
        <div v-else>
          <div v-for="(log,index) in prizeLogs"
               :key="'prizeLog_' + index"
               class="word">
            <div class="word-time">{{log.date}}</div>
            <div class="word-chance">
              {{word[language].prize.replace('{}',log.points)}}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import hy from 'hybridify-js'
    import utilString from "../../utils/utilString";
    import { Popup ,Toast,Dialog,NavBar} from 'vant'

    export default {
        name: "redPackage1224Note",
        components: {
            [Popup.name]: Popup,
            [Toast.name]: Toast,
            [Dialog.name]: Dialog,
            [NavBar.name]: NavBar,
        },
        data(){
            return{
                logs: [],
                prizeLogs: [],
                language:'us',
                uid:'',
                price:5,
                platform: 'tingsingapore',
                word:{
                    us:{
                        title:'Red Packet Record',
                        noUseLog: 'No Red Packet record',
                        prize:'won Red Packet SGD{}',
                        netErrorAlert:
                            'The network seems to have some problems, please try again later.',
                    },
                    cn:{
                        title:'红包记录',
                        noUseLog: '暂无记录',
                        prize: '获得SGD{}红包',
                        netErrorAlert: '网络好像出了点问题，请稍后再试',


                    }
                }

            }
        },
        mounted() {
            this.uid = this.getUrlParam('uid')
            this.language = this.getLang()
            this.platform = this.getUrlParam('platform');

            this.getToken(); //登录凭证获取
            this.getPrizeLogs()

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
            navBarClickLeft() {
                hy.nav.back();
            },
            getPrizeLogs() {
                const params = {
                    type: 'get',
                    url: 'red-package/2020/12/prize-logs',
                    header: {
                        token: this.token
                    }
                };
                this.reqwest(params)
                    .then(response => {
                        if (response.success) {

                            const result = response.result.res;
                            const prizeLogs = [];
                            for (let i = 0; i < result.length; i++) {
                                const log = result[i];
                                if (log.points > 0) {
                                    prizeLogs.push(log);
                                }
                            }
                            this.prizeLogs = prizeLogs;
                            console.log(this.prizeLogs)
                        } else {
                            Toast(response.result.msg);
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        return Toast(this.word[this.language].netErrorAlert);
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
    position: relative;
  }

  .selectTap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
  }

  .selectTap div {
    font-size: 14px;
    color: #030303;
    text-align: center;
    position: relative;
    width: 50%;
  }

  .word {
    width: 90%;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 13px;
    height: 55px;
    margin: 0 auto;
    border-bottom: 1px solid #e5e5e5;
  }

  .no-word {
    width: 90%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    height: 55px;
    margin: 0 auto;
  }

  .word-time {
    color: #030303;
    padding: 0 0.3rem;
  }

  .word-chance {
    color: #000000;
    font-weight: bold;
  }

  #active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 40px;
    height: 4px;
    background: linear-gradient(90deg, #fd5ba6, #c43ad1);
    left: 0;
    right: 0;
    margin: 0 auto;
  }
</style>
<style>
  .van-icon-arrow-left:before {
    color: #323233;
  }
</style>