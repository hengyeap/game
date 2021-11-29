<template>
    <div class="container">
        <van-nav-bar title="庭直播苹果肌订单换货" left-arrow @click-left="onClickLeft" />
        <div class="main">
            <div class="form">
                <van-cell-group>
                    <van-field v-model="sendObj.name" label="姓名" input-align="right" placeholder="收货人姓名" />
                    <van-field v-model="sendObj.code" label="CODE" input-align="right" placeholder="请输入天猫收货地址内所填写的CODE" />
                    <van-field v-model="sendObj.taobaoId" input-align="right" label="淘宝ID(天猫会员名)" placeholder="请输入" />
                    <div class="isRequestRefundWrap">
                        <span>您是否已申请退款</span>
                        <select name="isRequestRefund" v-model="sendObj.isRequestRefund" id="isRequestRefund">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                    </div>
                </van-cell-group>
    
                <div class="groups">
                    <Group v-for="(item,index) in sendObj.details" :key="index" :group="item"></Group>
                </div>
    
                <van-button class="add" type="default" icon="plus" @click="add()">继续添加苹果肌换货订单</van-button>
    
                <van-cell-group>
                    <van-checkbox shape="square" checked-color="#FF4848" v-model="sendObj.isDirectToShip">若您已申请退款，如想取消退货申请，可勾选此项，并可进入云仓直接发货</van-checkbox>
                    <van-field class="refundOrderCodes" v-model="sendObj.refundOrderCodes" rows="2" autosize label="" type="textarea" placeholder="请填写想取消退货的天猫订单号，不同订单用“，”分隔" />
                    <van-button class="submit" @click="onSubmit()" :disabled="disabled" type="default">提交信息</van-button>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script>
import { NavBar, Field, Button, Checkbox, Toast } from 'vant';
import hy from 'hybridify-js';
import axios from 'axios';
import Group from './assets/Group.vue';

export default {
    name: "orderExchange",
    components: {
        [NavBar.name]: NavBar,
        [Field.name]: Field,
        [Button.name]: Button,
        [Checkbox.name]: Checkbox,
        Group
    },
    data() {
        return {
            sendObj: {
                name: '',
                code: '',
                taobaoId: '',
                isRequestRefund: '0',
                isDirectToShip: false,
                refundOrderCodes: '',
                details: [{
                    tmallOrderCode: '',
                    fromSkuName: 'TST苹果肌面膜5片',
                    toSkuName: 'TST苹果肌面膜套组A',
                    qty: ''
                }]
            },
            disabled: false
        }
    },
    mounted() {
    },
    methods: {
        onClickLeft() {
            hy.nav.back();
        },
        onSubmit() {
            this.disabled = true;
            axios.post("https://temp.yuedaoec.com/api/live-show-bug-order/save", this.sendObj).then(res => {
                console.log(res);
                if (res.data.message) {
                    this.disabled = false;
                    Toast(res.data.message);
                }
                if (res.data.success == true) {
                    this.disabled = false;
                    Toast("提交成功");
                    setTimeout(function() {
                        hy.nav.back();
                    }, 2000)
                }
            })
        },
        add() {
            this.sendObj.details.push({
                tmallOrderCode: '',
                fromSkuName: 'TST苹果肌面膜5片',
                toSkuName: 'TST苹果肌面膜套组A',
                qty: ''
            });
        }
    }
}
</script>

<style>
@import "../../assets/global.css";
</style>

<style scoped>
.container {
    font-size: 14px;
    background-color: #F8F8F9;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}

.main {
    padding: 15px 15px 30px;
}

.van-nav-bar__title {
    font-weight: normal;
}

#isRequestRefund {
    height: 44px;
    width: 60%;
    text-align: rihgt;
    background: url("https://appstore.yuedaoec.com/h5/temp/img/down.png") no-repeat scroll right 15px center transparent;
    background-size: 10px;
    padding: 0 35px 0 10px;
    box-sizing: border-box;
    direction: rtl;
    font-size: 14px;
}

.isRequestRefundWrap {
    background-color: #ffffff;
    vertical-align: top;
    text-align: justify;
    font-size: 0;
}

.isRequestRefundWrap span {
    display: inline-block;
    padding-left: 15px;
    width: 40%;
    box-sizing: border-box;
    font-size: 14px;
}

>>>.van-field__label {
    width: auto;
}

>>>.van-field__value {
    padding-left: 10px;
}

.van-checkbox {
    margin: 15px 0;
    font-size: 13px;
}

>>>.van-checkbox__label {
    color: #FF4848;
}

.van-button--default.add {
    width: 100%;
    margin: 20px auto 0;
    border: 1px dashed #979797;
    display: block;
    background: transparent;
    color: #333333;
}

.refundOrderCodes {
    width: 100%;
    margin: 10px auto;
}

.submit {
    background-color: #FF4848;
    color: #ffffff;
    border: none;
    margin: 20px auto 0;
    display: block;
    width: 100%;
}
</style>
