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
        <div v-if="logs.length <= 0"
             class="no-word">
          {{i18n[platform].noQuaInfo}}
        </div>
        <div v-else>
          <div v-for="(log,index) in logs"
               :key="'log_' + index"
               class="word">
            <div class="word-time">{{log.date}}</div>
            <div v-if="log.type == 'order'" class="word-chance">{{log.orderCode ? i18n[platform].orderCode + log.orderCode : ''}} {{log.qty == 1?
              i18n[platform].gainQua.replace('{}',log.qty) :i18n[platform].gainQuas.replace('{}',log.qty)}}
            </div>
            <div v-if="log.type == 'checkin' || log.type == 'check'" class="word-chance">{{i18n[platform].checkIn}} {{log.qty == 1?
              i18n[platform].gainQua.replace('{}',log.qty) :i18n[platform].gainQuas.replace('{}',log.qty)}}
            </div>
            <div v-if="log.type == 'new'" class="word-chance">{{i18n[platform].inviteNew}} {{log.qty == 1?
              i18n[platform].gainQua.replace('{}',log.qty) :i18n[platform].gainQuas.replace('{}',log.qty)}}
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
  import { NavBar, Toast } from 'vant';
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
          { key: '0', name: 'diamond' },
          { key: '1', name: 'one' },
          { key: '2', name: 'two' },
          { key: '3', name: 'three' },
          { key: '4', name: 'four' },
          { key: '5', name: 'five'},
          { key: '6', name: 'six'},
          { key: '9', name: 'thanks'},
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
            one: '夏日胶囊冰饮机',
            two: '莹彩润泽轻透BB霜',
            three:'柔润身体磨砂凝胶',
            four:'防水晶盈睫毛膏',
            five:'眉玩魅了三合一眉笔',
            six:'夏日旅行礼包',
            thanks: '谢谢参与',
            gainQuas: '获得{}次抽奖机会',
            gainQua: '获得{}次抽奖机会',
            orderCode: '订单号：',
            netError: '网络异常',
            netErrorMsg: '您的网络好像出了点问题，页面将被关闭，请您稍后再试。',
            netErrorAlert: '网络好像出了点问题，请稍后再试',
            checkIn: '签到',
            inviteNew: '新人完成首单'
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
            one: '夏日胶囊冰饮机',
            two: '莹彩润泽轻透BB霜',
            three:'柔润身体磨砂凝胶',
            four:'防水晶盈睫毛膏',
            five:'眉玩魅了三合一眉笔',
            six:'夏日旅行礼包',
            thanks: '谢谢参与',
            gainQuas: '获得{}次抽奖机会',
            gainQua: '获得{}次抽奖机会',
            orderCode: '订单号：',
            netError: '网络异常',
            netErrorMsg: '您的网络好像出了点问题，页面将被关闭，请您稍后再试。',
            netErrorAlert: '网络好像出了点问题，请稍后再试',
            checkIn: '签到',
            inviteNew: '新人完成首单'
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
            one: 'Cold Drink Capsule Machine',
            two: 'Translucent BB Cream 30g',
            three:'Soft-run Body Exfoliant Scrub For Gel',
            four:'Tin Secret Shining Waterproof Mascara',
            five:'3 in 1 Beauty Eyebrow',
            six:'Summer Travel Gift Bag',
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
            inviteNew: 'New Recruit Completed The First Order'
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
            one: '夏日膠囊冰飲機',
            two: '瑩彩潤澤輕透BB霜',
            three:'柔潤身體磨砂凝膠',
            four:'防水晶盈睫毛膏',
            five:'眉玩魅了三合一眉筆',
            six:'夏日旅行禮包',
            thanks: '謝謝參與',
            gainQuas: '獲得抽獎資格{}次',
            gainQua: '獲得抽獎資格{}次',
            orderCode: '訂單編號：',
            netError: '網路異常',
            netErrorMsg: '您的網路好像出了點問題，頁面將被關閉，請您稍後再試。',
            netErrorAlert: '網路好像出了點問題，請稍後再試',
            checkIn: '簽到',
            inviteNew: '新人完成首單'
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
          url: 'double-eleven/2020/07/qua-logs',
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
          url: 'double-eleven/2020/07/prize-logs',
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
