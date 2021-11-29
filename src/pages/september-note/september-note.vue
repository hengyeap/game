<template>
  <div class="page">
    <van-nav-bar :title="i18n[platform].title"
                 left-text
                 right-text
                 left-arrow
                 @click-left='navBarClickLeft'/>
    <div class="content">
      <div class="selectTap">
        <div @click="select(1)"
             :id="status == 1? 'active':''">{{i18n[platform].quaLog}}
        </div>
        <div @click="select(2)"
             :id="status == 2? 'active':''">{{i18n[platform].useLog}}
        </div>
      </div>
      <div v-if="status == 1">
        <div>
          <div class="word">
            <div class="word-chance">{{i18n[platform].gainRecordsTimes.replace('{}',logs.qty) +"，"+
              i18n[platform].gainRecordsAmount.replace('{}',logs.amount)}}
            </div>
          </div>
        </div>

      </div>

      <div v-if="status == 2">
        <div v-if="prizeLogs.length <= 0"
             class="no-word">
          {{i18n[platform].noUseLog}}
        </div>
        <div v-else>
          <div v-for="(log,index) in prizeLogs"
               :key="'prizeLog_' + index"
               class="word">
            <div class="word-time">{{log.createdAt}}</div>
            <div class="word-chance">{{log.orderCode ? i18n[platform].orderCode + log.orderCode : ''}}
              {{i18n[platform][log.name]}}
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
                logs: {amount:0,qty:0},
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
                i18n: {
                    tingmimi: {
                        title: '活动记录',
                        quaLog: '获得抽奖资格记录',
                        useLog: '参与抽奖记录',
                        noQuaInfo: '暂无抽奖资格',
                        noUseLog: '暂无抽奖记录',
                        huawei: '华为手机 * 1',
                        mask: '一等奖',
                        lipstick: '二等奖',
                        giftpackage: '三等奖',
                        diamond: '和庭姐连线直播',
                        one: '玲珑美体仪礼盒',
                        two: 'TST璀璨时尚水晶腕表-黄',
                        three: '花漾精灵彩妆盘+(米洛发箍+发绳)',
                        four: '巴罗斯三色眼影盘+防水晶盈睫毛膏',
                        five: '薰衣草银耳酵素面膜（2ml*5片+28g*5片）',
                        six: '炫彩发圈套组或彩色皮筋礼包或洗脸巾6片装(随机发)+ 马鞭草悦芯护手霜10g+活酵母三联包*1',
                        seven: '夏日夹脚拖+五菌三联包*1',
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
                        gainRecordsAmount: '消费金额累计{}元'
                    },
                    tingo2o: {
                        title: '活动记录',
                        quaLog: '获得抽奖资格记录',
                        useLog: '参与抽奖记录',
                        noQuaInfo: '暂无抽奖资格',
                        noUseLog: '暂无抽奖记录',
                        huawei: '华为手机 * 1',
                        mask: '一等奖',
                        lipstick: '二等奖',
                        giftpackage: '三等奖',
                        diamond: '和庭姐连线直播',
                        one: '玲珑美体仪礼盒',
                        two: 'TST璀璨时尚水晶腕表-黄',
                        three: '花漾精灵彩妆盘+(米洛发箍+发绳) ',
                        four: '巴罗斯三色眼影盘+防水晶盈睫毛膏',
                        five: '薰衣草银耳酵素面膜（2ml*5片+28g*5片）',
                        six: '炫彩发圈套组或彩色皮筋礼包或洗脸巾6片装(随机发)+ 马鞭草悦芯护手霜10g+活酵母逆龄修护面膜乳三联包*1',
                        seven: '夏日夹脚拖+五菌合一·逆龄修护面膜乳三联包*1',
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
                        gainRecordsAmount: '消费金额累计{}元'
                    },
                    newtingmalaysia: {
                        title: 'Event Records',
                        quaLog: 'Lucky Draw Eligibility Records',
                        useLog: 'Lucky Draw Participation Records',
                        noQuaInfo: 'Not qualified for lucky draw',
                        noUseLog: 'No lucky draw record',
                        huawei: 'HUAWEI PHONE * 1',
                        mask: '1st Prize',
                        lipstick: '2nd Prize',
                        giftpackage: '3rd Prize',
                        diamond: 'A Chance to Go Live with Chang Ting',
                        one: 'Body Reshaping Massage Instrument',
                        two: 'TST Stylish Crystal Watch-Yellow',
                        three: 'Colorful Fairy Palette + (Hair Band + Hair Tie)',
                        four: 'Baros Eye Shadow + Tin Secret Shining Waterproof Mascara',
                        five: 'Lavender & Tremella Enzymes Mask（2ml*5 Pcs+28g*5 Pcs）',
                        six: 'Colourful Hair Tie Set OR Colourful Rubber Hair Tie Gift Bag OR Facial Towel (6 Pcs) OR CHROLING Travel Pouch OR Facial Oil Absorbent Paper (Random)+ Ver Veine Hand Cream 10g OR Thyme Hand Cream 10g+Yeast Revitalizing Facial Mask 3 Sachets*1',
                        seven: 'Summer Flip-Flops OR Beach Flip-Flops (Random) +Five1+ in One Yeast Mask 3 Sachets*1',
                        thanks: 'Sorry! No Prize won, thank you for participating!',
                        gainQuas: 'get Lucky Draw Entry {} Times',
                        gainQua: 'get Lucky Draw Entry {} Time',
                        orderCode: 'Order No:',
                        netError: 'Abnormal network',
                        netErrorMsg:
                            'Your network seems to have some problems, the page will be closed, please try again later.',
                        netErrorAlert:
                            'The network seems to have some problems, please try again later.',
                        checkIn: 'Check In',
                        inviteNew: 'New Recruit Completed The First Order',
                        gainRecordsTimes: 'Accumulated {} entry(s)',
                        gainRecordsAmount: 'amount spent accumulated RM{}'
                    },
                    tingsingapore: {
                        title: 'Event Records',
                        quaLog: 'Lucky Draw Eligibility Records',
                        useLog: 'Lucky Draw Participation Records',
                        noQuaInfo: 'Not qualified for lucky draw',
                        noUseLog: 'No lucky draw record',
                        huawei: 'HUAWEI PHONE * 1',
                        mask: '1st Prize',
                        lipstick: '2nd Prize',
                        giftpackage: '3rd Prize',
                        diamond: 'A Chance to Go Live with Chang Ting',
                        one: 'Body Reshaping Massage Instrument',
                        two: 'TST Stylish Crystal Watch-Yellow',
                        three: 'Colorful Fairy Palette + (Hair Band + Hair Tie)',
                        four: 'Baros Eye Shadow + Tin Secret Shining Waterproof Mascara',
                        five: 'Lavender & Tremella Enzymes Mask(2ml*5 Pcs+28g*5 Pcs) ',
                        six: 'Colourful Hair Tie Set OR Colourful Rubber Hair Tie Gift Bag OR Facial Towel (6 Pcs)  (Random)+ Ver Veine Hand Cream 10g  +Yeast Revitalizing Facial Mask 3 Sachets*1',
                        seven: 'Summer Flip-Flops+Five1+ in One Yeast Mask 3 Sachets*1',
                        thanks: 'Sorry! No Prize won, thank you for participating!',
                        gainQuas: 'get Lucky Draw Entry {} Times',
                        gainQua: 'get Lucky Draw Entry {} Time',
                        orderCode: 'Order No:',
                        netError: 'Abnormal network',
                        netErrorMsg:
                            'Your network seems to have some problems, the page will be closed, please try again later.',
                        netErrorAlert:
                            'The network seems to have some problems, please try again later.',
                        checkIn: 'Check In',
                        inviteNew: 'New Recruit Completed The First Order',
                        gainRecordsTimes: 'Accumulated {} entry(s)',
                        gainRecordsAmount: 'amount spent accumulated SGD{}'
                    },
                    newtingtaiwan: {
                        title: '活動記錄',
                        quaLog: '抽獎資格記錄',
                        useLog: '參與抽獎記錄',
                        noQuaInfo: '暫無抽獎資格',
                        noUseLog: '暫無抽獎記錄',
                        huawei: '華為手機 * 1',
                        mask: '一等獎',
                        lipstick: '二等獎',
                        giftpackage: '三等獎',
                        diamond: '和庭姐連線直播',
                        one: '玲瓏美體儀禮盒',
                        two: 'TST璀璨時尚水晶腕表-黃',
                        three: '花漾精靈彩妝盤+(米洛發箍+發繩)',
                        four: '巴羅斯三色眼影盤+防水晶盈睫毛膏',
                        five: '薰衣草銀耳酵素面膜（2ml*5片+28g*5片）',
                        six: '炫彩發圈套組或彩色皮筋禮包或洗臉巾6片裝或寵愛吸油面紙或EVA按扣包(隨機發)+馬鞭草悅芯護手霜10g或麝香草瑩潤護手霜10g+活酵母三聯包*1',
                        seven: '夏日夾腳拖或海灘人字拖(隨機發)+五菌三聯包',
                        thanks: '謝謝參與',
                        gainQuas: '獲得抽獎資格{}次',
                        gainQua: '獲得抽獎資格{}次',
                        orderCode: '訂單編號：',
                        netError: '網路異常',
                        netErrorMsg: '您的網路好像出了點問題，頁面將被關閉，請您稍後再試。',
                        netErrorAlert: '網路好像出了點問題，請稍後再試',
                        checkIn: '簽到',
                        inviteNew: '新人完成首單',
                        gainRecordsTimes: '已累計獲得{}次',
                        gainRecordsAmount: '消費金額累計NT{}'
                    }
                },
                prizeLogs: []
            };
        },
        components: {
            [NavBar.name]: NavBar
        },
        mounted() {
            const platform = this.getUrlParam('platform');
            if (!this.isBlank(platform)) {
                this.platform = platform;
            } else {
                this.platform = 'tingmimi';
            }
            this.getQuaLogs();
            this.getPrizeLogs();
        },
        methods: {
            getQuaLogs() {
                const params = {
                    type: 'get',
                    url: 'double-eleven/2020/09/qua-logs',
                    query: {
                        platform: this.platform
                    },
                    userToken: true
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
                        return Toast(this.i18n[this.platform].netErrorAlert);
                    });
            },
            getPrizeLogs() {
                const params = {
                    type: 'get',
                    url: 'double-eleven/2020/09/prize-logs',
                    userToken: true
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
                        return Toast(this.i18n[this.platform].netErrorAlert);
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
