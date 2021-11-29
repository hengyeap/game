<template>
    <div class="group">
        <p style="margin: 2px 0;text-align:center">苹果肌换货订单</p>
        <p style="margin: 2px 0;text-align:center;color:#FF4848">（D套组不参与换货）</p>
        <van-cell-group>
            <van-field v-model="group.tmallOrderCode" input-align="right" label="天猫订单号" placeholder="请填写需要更换的天猫订单号" />
            <div class="fromSkuNameWrap">
                <span>您的商品</span>
                <select name="you" v-model="group.fromSkuName" id="fromSkuName">
                              <option value="TST苹果肌面膜5片">TST苹果肌面膜5片</option>
                              <option value="TST苹果肌面膜150ml">TST苹果肌面膜150ml</option>
                              <option value="TST苹果肌面膜150g">TST苹果肌面膜150g</option>
                          </select>
            </div>
            <van-divider />
            <div class="toSkuNameWrap">
                <span>套组更换为</span>
                <select name="change" v-model="group.toSkuName" id="toSkuName">
                            <option value="TST苹果肌面膜套组A">TST苹果肌面膜套组A</option>
                            <option value="TST苹果肌面膜套组B">TST苹果肌面膜套组B</option>
                            <option value="TST苹果肌面膜套组C">TST苹果肌面膜套组C</option>
                        </select>
            </div>
            <van-divider />
            <van-field v-model="group.qty" input-align="right" label="变更数量为" placeholder="单位为'组'" />
        </van-cell-group>
    </div>
</template>

<script>
import hybrid from 'hybridify-js';
import { Field, Divider } from 'vant';
export default {
    name: '',
    components: {
        [Field.name]: Field,
        [Divider.name]: Divider
    },
    props: {
        group: {
            type: Object,
            default: {
                tmallOrderCode: '',
                fromSkuName: 'TST苹果肌面膜5片',
                toSkuName: 'TST苹果肌面膜套组A',
                qty: ''
            }
        }
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style>
.group {
    margin: 20px auto 0;
    background-color: #FFFFFF;
    padding: 10px 0 0;
    border-top: 3px solid #FF6F6F;
    border-radius: 4px;
}

.fromSkuNameWrap,
.toSkuNameWrap {
  font-size: 0;
}

.fromSkuNameWrap span,
.toSkuNameWrap span {
    display: inline-block;
    width: 40%;
    padding-left: 15px;
    font-size: 14px;
    box-sizing: border-box;
}

#fromSkuName,
#toSkuName {
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

>>>.van-checkbox__label {
    color: #FF4848 !important;
}

.van-divider {
  margin: 0;
}
</style>