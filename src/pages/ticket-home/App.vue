<template>
  <div class="page">
    <van-nav-bar
            title="我的活动门票"
            left-arrow
            @click-left="onClickLeft"
    />
    <div class="content">
      <div class="headerNav">
        <div class="slide-word1">
          <span @click="select(1)" :class="status == 1? 'nav1' : 'nav'">有效门票</span>
        </div>
        <div class="slide-word1">
          <span @click="select(2)" :class="status == 2? 'nav1' : 'nav'">失效门票</span>
        </div>
      </div>
      <div class="ticketsListBox">
        <div v-if="promotionList.length > 0" class="ticketsList">
          <div v-for="promotion in promotionList" class="ticketBg">
            <img class="ticketBgImg" :src="promotion.promotionInfo.background"
                 alt="">
            <div class="ticketCover">
              <img class="ticketCoverImg"
                   :src="promotion.promotionInfo.album" alt="">
            </div>
            <div class="ticketWord">
              <div class="ticketTitle">{{promotion.promotionInfo.promotionName}}</div>
              <div class="ticketTime">有效期：{{promotion.promotionInfo.startedAt}}-{{promotion.promotionInfo.endedAt}}
              </div>
              <div class="ticketPlace">活动地址：{{promotion.promotionInfo.address}}</div>
              <div class="btnBox">
                <div @click="jumpToDetails(promotion.promotionId)" class="btn1">活动详情</div>
                <div @click="jumpToQRcode(promotion.promotionId)" class="btn">出示二维码</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="promotionList.length < 1" class="noInvalidnoTickets">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
    import {NavBar} from 'vant';
    import hy from 'hybridify-js';
    import axios from 'axios'
    import moment from 'moment'

    export default {
        name: "eventTickets",
        components: {
            [NavBar.name]: NavBar
        },
        data() {
            return {
                status: 1,
                show: false,
                promotionList: []
            }
        },
        mounted() {
            this.uid = this.getUrlParam('uid')
            this.accessJwt = this.getUrlParam('accessJwt')
            this.getQuery202006Ticket()
        },
        methods: {
            onClickLeft() {
                hy.nav.back();
            },
            jump() {
                if (this.checkNull(this.uid)) {
                    hy.nav.toMe();
                    this.toast('您还没有登录！')
                    return
                }
                if (!this.checkNull(this.accessJwt)) {
                    hy.nav.push('https://appdist.yuedaoec.com/h5/bagList.html?uid=' + this.uid + '&accessJwt=' + this.accessJwt + '&weixinOpenId=1')
                } else {
                    hy.nav.push('https://appdist.yuedaoec.com/h5/bagList.html?uid=' + this.uid + '&weixinOpenId=1')
                }
            },
            select(num) {
                this.status = num;
                this.getQuery202006Ticket()
            },
            jumpToDetails(promotionId) {
                hy.nav.push(this.getRedirectUrl('ticket-detail',{promotionId: promotionId}))
            },
            jumpToQRcode(promotionId) {

                hy.nav.push(this.getRedirectUrl('ticket-QRcode',{promotionId: promotionId}))
            },
            getQuery202006Ticket() {
                this.promotionList = []
                if (this.checkNull(this.uid)) {
                    hy.nav.toMe();
                    this.toast('您还没有登录！')
                    return
                }
                let params = {
                    uid: this.uid
                }
                if (this.status == 1) {
                    params.status = [10, 20]
                } else if (this.status == 2) {
                    params.status = [30]
                }
                axios.get('https://temp.yuedaoec.com/api/promotion-tickets/user/list', {params: params})
                    .then((json) => {
                        if (json.data.success) {
                            let data = json.data.res
                            if (data) {
                                for (let i in data) {
                                    data[i].promotionInfo.startedAt = moment(data[i].promotionInfo.promotionStartedDate).format('YYYY年M月D日')
                                    data[i].promotionInfo.endedAt = moment(data[i].promotionInfo.promotionEndDate).format('M月D日')
                                }
                                this.promotionList = data
                            }
                        } else {
                            this.toast(json.data.msg)
                        }
                    })
            },

        }
    }
</script>
<style>
  @import "../../assets/global.css";
</style>
<style scoped>
  .page {
    width: 100%;
    position: relative;
  }

  .content {
    width: 100%;
    height: 100%;
    position: fixed;
    margin-top: 0.44rem;
    background-color: #fff;
    overflow: auto;
  }

  .headerNav {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .slide-word1 {
    text-align: center;
    width: 50%;
    font-weight: 400;
    color: #000;
    font-size: 16px;
    line-height: 0.5rem;
  }

  .nav1 {
    color: #FF1100;
    position: relative;
  }

  .nav1::after {
    content: '';
    width: 103%;
    height: 0.05rem;
    position: absolute;
    bottom: -0.1rem;
    right: 0;
    left: 0;
    margin: 0 auto;
    background-color: #FF1100;
  }

  .nav {
    text-align: center;
    width: 50%;
    font-weight: 400;
    color: #000;
    font-size: 16px;
    line-height: 0.5rem;
  }

  .ticketsListBox {
    width: 100%;
    margin: 0.5rem auto;
  }

  .invalidListBox {
    width: 100%;
  }

  .ticketsList {
    width: 95%;
    margin: 0.2rem auto;
  }

  .ticketBg {
    width: 100%;
    position: relative;
  }

  .ticketBgImg {
    width: 100%;
  }

  .ticketCover {
    position: absolute;
    width: 28%;
    /* left: 0; */
    top: 0;
    margin: 0.2rem;
  }

  .ticketCoverImg {
    width: 100%;
  }

  .ticketWord {
    position: absolute;
    width: 63%;
    right: 0;
    top: 0;
    margin: 0.2rem;
  }

  .ticketTitle {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }

  .ticketTime {
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
  }

  .ticketPlace {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }

  .btnBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .btn1 {
    font-size: 13px;
    border: 1px solid #FF1100;
    width: 40%;
    text-align: center;
    color: #FF1100;
    font-weight: 400;
    line-height: 25px;
    margin: 0.25rem 0 0;
    border-radius: 15px;
  }

  .btn {
    font-size: 13px;
    background: #FF1100;
    width: 40%;
    text-align: center;
    color: #fff;
    font-weight: 400;
    line-height: 25px;
    margin: 0.25rem 0 0;
    border-radius: 15px;

  }

  .btnInvalid {
    font-size: 13px;
    background: #D9D9D9;
    width: 40%;
    text-align: center;
    color: #fff;
    font-weight: 400;
    line-height: 25px;
    margin: 0.09rem 0 0;
  }

  .noInvalidnoTickets {
    font-size: 14px;
    color: #000;
    text-align: center;
    margin: 0.5rem auto;
  }
</style>
