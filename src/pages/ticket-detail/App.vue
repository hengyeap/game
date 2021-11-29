<template>
    <div class="page">
        <van-nav-bar
                title="活动详情"
                left-arrow
                @click-left="onClickLeft"
        />

        <div v-if="show" class="content">
            <img class="ticketBgImg" src="https://public.tingmimi.net/image/eventTickets/ticketDetailsBg.png?11" alt="">
            <div class="ticketDetailsBox">
                <img class="ticketDetails" src="https://public.tingmimi.net/image/eventTickets/ticketDetails.png?11"
                     alt="">
                <div class="words">
                    <div class="ticketTitle">活动主题：{{promotion.promotion.promotionName}}</div>
                    <div class="ticketTime">活动时间：{{promotion.promotion.startDate}}-{{promotion.promotion.endDate}}</div>
                    <div class="ticketPlace">活动地址：{{promotion.promotion.address}}</div>
                    <div class="name">{{promotion.code}}</div>
                    <div class="code">{{promotion.name}}</div>
                </div>
            </div>

            <div class="bottomWord">最终解释权归上海达尔威贸易有限公司所有<br>地址：上海市青浦区徐泾镇蟠龙路18号</div>
        </div>

    </div>
</template>

<script>
    import {NavBar} from 'vant';
    import hy from 'hybridify-js';
    import axios from 'axios'
    import Rem from "../../rem";
    import QRCode from "qrcode";
    import moment from "moment"

    export default {
        name: "ticketDetails",
        components: {
            [NavBar.name]: NavBar
        },
        data() {
            return {
                status: 1,
                uid: '',
                code: '',
                name: '',
                show: false,
                qrcodeShow: false,
                promotion:{}
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
                axios.get('https://temp.yuedaoec.com/api/promotion-tickets/user/ticket', {params:params})
                    .then((json) => {
                        if (json.data.success) {
                            let data = json.data.res;
                            if (data != null) {
                                this.promotion = data
                                this.show = true
                                data.promotion.startDate =moment(data.promotion.promotionStartedDate).format('YYYY/M/D')
                                data.promotion.endDate =moment(data.promotion.promotionEndedDate).format('M/D')
                            }

                        } else {
                            this.toast(json.data.msg)
                        }
                    })
            },
            select(num) {
                this.status = num;
            },
            getQRCode(url) {
                let canvas = document.getElementById("qrcodecanvas");
                QRCode.toCanvas(
                    canvas,
                    url,
                    {width: Rem.getRem(200), height: Rem.getRem(200)},
                    error => {
                        if (error) console.error(error);
                        let image = document.getElementById("qrcodeimg");
                        image.src = canvas.toDataURL("image/png");
                        this.qrcodeShow = true;
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
        top: 2.5rem;
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
        bottom: 0.5rem;
        left: 0;
        right: 0;
        width: 61%;
        font-weight: 400;

    }

    .qr-code {
        position: absolute;
        top: 350px;
        left: 80px;
        background: transparent;

    }

</style>
