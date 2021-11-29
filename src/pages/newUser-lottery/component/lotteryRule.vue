<template>
    <div>
        <van-overlay :show="rulesShow" @click="closeRules">
            <div class="rule_wrapper" @click.stop>
                <div class="contxt">
                    <h4>{{bargainRuleTit}}</h4>
                    <p v-html="bargainRuleContxt"></p>
                </div>
                <span class="close" @click="closeRules"></span>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import { Overlay } from 'vant';
import hybrid from 'hybridify-js';
export default ({
    name: 'lotteryRule',
    components: {
        [Overlay.name]: Overlay
    },
    props: ["rulesShow"],
    data() {
        return {
            bargainRuleTit: "活动规则",
            bargainRuleContxt: "1、用户通过扫码抽奖，一物一码，每个码只可抽奖1次 <br>2、用户必须先注册庭秘密APP，并在一物一码活动页面登录后才可抽奖 <br>3、每个注册手机号不限抽奖次数 <br>4、中奖后请前往庭秘密APP，礼包奖品将随下一单发，其他实物奖品填写正确收货信息后会有客服联系您 <br>5、若发现作弊行为，我方有权取消该用户所有中奖资格 "
        };
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        closeRules() {
            this.$emit('closeRules', this.rulesShow);
        }
    }
});
</script>

<style scoped>
.rule_wrapper {
    width: 336px;
    height: 372px;
    background: linear-gradient(180deg, #FFFAFA 0%, #FFE8EC 100%);
    border-radius: 5px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-sizing: border-box;
}

.contxt {
    overflow-y: auto;
    height: 300px;
    padding: 0 18px;
}

.rule_wrapper::before {
    content: "";
    position: absolute;
    width: 75px;
    height: 76px;
    background-size: cover;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}

.rule_wrapper h4 {
    font-size: 16px;
    text-align: center;
    color: #FF1E49;
}

.rule_wrapper p {
    line-height: 22px;
    margin-top: 10px;
    font-size: 13px;
}
</style>