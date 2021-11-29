<template>
  <div class="page">
    <van-nav-bar :title="tingmimi.title"
                 left-text
                 right-text
                 left-arrow
                 @click-left='navBarClickLeft'/>
    <div class="content">
      <div class="selectTap">
        <div @click="select(1)"
             :id="status == 1? 'active':''">{{tingmimi.quaLog}}
        </div>
        <div @click="select(2)"
             :id="status == 2? 'active':''">{{tingmimi.useLog}}
        </div>
      </div>
      <div v-if="status == 1">
        <div v-if="logs.length <= 0"
             class="no-word">
          {{tingmimi.noQuaInfo}}
        </div>
        <div v-else>
          <div v-for="(log,index) in logs"
               :key="'log_' + index"
               class="word">
            <div class="word-time">{{log.date}}</div>
            <div class="word-chance">{{log.orderCode ? tingmimi.orderCode + log.orderCode : ''}} {{log.qty == 1?
              tingmimi.gainQua.replace('{}',log.qty) :tingmimi.gainQuas.replace('{}',log.qty)}}
            </div>

          </div>
        </div>

      </div>
      <div v-if="status == 2">
        <div v-if="prizeLogs.length <= 0"
             class="no-word">
          {{tingmimi.noUseLog}}
        </div>
        <div v-else>
          <div v-for="(log,index) in prizeLogs"
               :key="'prizeLog_' + index"
               class="word">
            <div class="word-time">{{log.createdAt}}</div>
            <div class="word-chance">{{log.orderCode ? tingmimi.orderCode + log.orderCode : ''}}
              {{tingmimi[log.name]}}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import {NavBar, Toast} from 'vant';
    import hybrid from 'hybridify-js';
    import create from '../../utils/create-basic';

    export default create({
        name: 'note',
        data() {
            return {
                status: 1,
                logs: [],
                platform: null,
                gifts: [
                    {key: '0', name: 'diamond'},
                    {key: '1', name: 'one'},
                    {key: '2', name: 'two'},
                    {key: '3', name: 'three'},
                    {key: '4', name: 'four'},
                    {key: '5', name: 'five'},
                    {key: '6', name: 'six'},
                    {key: '7', name: 'seven'},
                    {key: '9', name: 'thanks'},
                ],
                tingmimi: {
                    title: '活动记录',
                    quaLog: '获得翻牌资格记录',
                    useLog: '翻牌记录',
                    noQuaInfo: '暂无翻牌资格',
                    noUseLog: '暂无翻牌记录',
                    huawei: '华为手机 * 1',
                    mask: '一等奖',
                    lipstick: '二等奖',
                    giftpackage: '三等奖',
                    diamond: '华为手机',
                    one: '华为手机',
                    two: '12天亮肤臻颜礼包',
                    three: 'iphone12',
                    four: '红包888元',
                    five: '红包88元',
                    six: '红包8.8元',
                    seven: '20元代金券',
                    thanks: '谢谢参与',
                    gainQuas: '获得{}次抽奖机会',
                    gainQua: '获得{}次抽奖机会',
                    orderCode: '订单号：',
                    netError: '网络异常',
                    netErrorMsg: '您的网络好像出了点问题，页面将被关闭，请您稍后再试。',
                    netErrorAlert: '网络好像出了点问题，请稍后再试',
                    checkIn: '签到',
                    inviteNew: '新人完成首单',
                    gainRecordsTimes: '已累计获得{}次',
                    gainRecordsAmount: '消费金额累计{}元',

                },
                prizeLogs: []
            };
        },
        components: {
            [NavBar.name]: NavBar
        },
        mounted() {
            this.getQuaLogs();
            this.getPrizeLogs();
        },
        methods: {
            getQuaLogs() {
                const params = {
                    type: 'get',
                    url: 'double-eleven/2021/03/qua-logs',
                    userToken: true,
                };
                this.reqwest(params)
                    .then(response => {
                        if (response.success) {
                            const result = response.result.res;
                            this.logs = result;
                        } else {
                            Toast(response.result.msg);
                        }
                    })
                    .catch(() => {
                        return Toast(this.tingmimi.netErrorAlert);
                    });
            },
            getPrizeLogs() {
                const params = {
                    type: 'get',
                    url: 'double-eleven/2021/03/prize-logs',
                    userToken: true,
                };
                this.reqwest(params)
                    .then(response => {
                        if (response.success) {
                            const result = response.result.res;
                            const prizeLogs = [];
                            for (let i = 0; i < result.length; i++) {
                                const log = result[i];
                                const key = log.prizeNo;
                                let gift = null;
                                for (let i = 0; i < this.gifts.length; i++) {
                                    if (this.gifts[i].key == key) {
                                        gift = this.gifts[i];
                                    }
                                }
                                log.name = gift.name;
                                // gift = Object.assign(gift, log);
                                prizeLogs.push(log);
                            }
                            this.prizeLogs = prizeLogs;
                        } else {
                            Toast(response.result.msg);
                        }
                    })
                    .catch(e => {
                        return Toast(this.tingmimi.netErrorAlert);
                    });
            },
            navBarClickLeft() {
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

            select(num) {
                this.status = num;
            }
        }
    });
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
    /*height: 55px;*/
    padding: 10px 0;
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
