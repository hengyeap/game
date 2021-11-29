<template>
  <div class="page">
    <van-nav-bar
            title="活动二维码"
            left-arrow
            @click-left="onClickLeft"
    />
    <div class="content">
      <img class="ticketBgImg" src="https://public.tingmimi.net/image/eventTickets/ticketDetailsBg.png?11" alt="">
      <div class="words">
        <div class="name">{{promotion.code}}</div>
        <div class="code">{{promotion.name}}</div>
      </div>
      <van-swipe class="qrcodeBox">
        <van-swipe-item v-for="(qrcode,index) in qrcodes" :key="'qrcode_' + index">
          <div class="qrcode-title">{{qrcode.info.ticketName}}</div>
          <img  :id="'qrcodeimg'+index" :src="qrcode.img">
          <div class="ruleWord" v-html="qrcode.info.notice"></div>
        </van-swipe-item>
      </van-swipe>
      <div class="bottomWord">最终解释权归上海达尔威贸易有限公司所有<br>地址：上海市青浦区徐泾镇蟠龙路18号</div>
    </div>
    <div v-for="(qrcode,index) in qrcodes" style="display:none">
      <canvas :id="'qrcodecanvas' + index" style="display:none"/>
    </div>

  </div>
</template>

<script>
    import {NavBar} from 'vant';
    import {Swipe, SwipeItem} from 'vant';
    import hy from 'hybridify-js';
    import axios from 'axios'
    import Rem from "../../rem";
    import QRCode from "qrcode";

    export default {
        name: "ticket-QRcode",
        components: {
            [NavBar.name]: NavBar,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem
        },
        data() {
            return {
                status: 1,
                uid: '',
                code: '',
                name: '',
                qrcodes: [],
                show: false,
                qrcodeShow: false,
                promotion: {},
                tickets:[]
            }
        },
        mounted() {
            this.uid = this.getUrlParam('uid')
            this.promotionId = this.getUrlParam('promotionId')
            if (this.checkNull(this.uid)) {
                hy.nav.toMe();
                this.toast('您还没有登录！')
                return
            }

            this.getQuery202006Ticket()


        },
        methods: {
            onClickLeft() {
                hy.nav.back();
            },
            getQuery202006Ticket() {
                let params = {
                    uid: this.uid,
                    promotionId: this.promotionId
                }
                axios.get('https://temp.yuedaoec.com/api/promotion-tickets/user/ticket', {params: params})
                    .then((json) => {
                        if (json.data.success) {
                            let data = json.data.res;
                            if (data != null) {
                                this.show = true
                                this.promotion = data
                                let tickets = data.tickets
                                this.qrcodes = tickets
                                setTimeout(() => {
                                    for (let index in tickets) {
                                        let qrCodeUrl = this.getRedirectUrl("ticket-check").split('?')[0];
                                        qrCodeUrl = this.addURLParam(qrCodeUrl, 'entranceUserId', this.uid)
                                        qrCodeUrl = this.addURLParam(qrCodeUrl, 'entranceUserCode', data.code)
                                        qrCodeUrl = this.addURLParam(qrCodeUrl, 'ticketId', tickets[index].ticketId)
                                        qrCodeUrl = this.addURLParam(qrCodeUrl, 'promotionId', data.promotionId)
                                        console.log(qrCodeUrl)
                                        this.getQRCode(index, qrCodeUrl)
                                    }
                                }, 100)


                            }
                        } else {
                            this.toast(json.data.msg)
                        }
                    })
            },
            select(num) {
                this.status = num;
            },
            getQRCode(index, url) {
                let canvas = document.getElementById("qrcodecanvas" + index);
                QRCode.toCanvas(
                    canvas,
                    url,
                    {width: Rem.getRem(200), height: Rem.getRem(200)},
                    error => {
                        if (error) console.error(error);
                        setTimeout(() => {
                            let image = document.getElementById("qrcodeimg" + index);
                            image.src = canvas.toDataURL("image/png");
                        }, 100)

                    }
                );
            }

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
    position: relative;
    /*margin-top: 0.44rem;*/
  }

  .ticketBgImg {
    width: 100%;
  }

  .ticketDetailsBox {
    width: 90%;
    position: absolute;
    top: 1.5rem;
    margin: auto;
    left: 0;
    right: 0;
  }

  .ticketDetails {
    width: 100%;
  }

  .words {
    width: 75%;
    position: absolute;
    top: 0.5rem;
    left: 0;
    right: 0;
    margin: auto;
  }

  .ticketTitle {
    font-size: 18px;
    font-weight: 400;
  }

  .ticketTime {
    font-size: 18px;
    font-weight: 400;
  }

  .ticketPlace {
    font-size: 18px;
    font-weight: 400;
  }

  .name {
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    margin-top: 0.1rem;
  }

  .code {
    font-size: 14px;
    font-weight: 400;
    text-align: center;
  }

  .bottomWord {
    font-size: 10px;
    color: #000;
    margin: auto;
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    width: 61%;
    font-weight: 400;

  }

  .ruleWord {
    font-size: 10px;
    color: #000;
    margin: auto;
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    width: 63%;
    font-weight: 400;
    padding-bottom: 1.5rem;
  }

  .qrcode-title {
    font-size: 18px;
    line-height: 60px;
    background-color: #D9D9D9;
    color: #000000;

  }

  .qr-code {
    position: absolute;
    top: 350px;
    left: 80px;
    background: transparent;

  }


  .qrcodeBox {
    width: 90%;
    /*height: 8rem;*/
    background-color: #fff;
    position: absolute;
    top: 2.5rem;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }


</style>
<style>
  .van-swipe__indicator {
    background-color: #b7b7b7;
  }
</style>
