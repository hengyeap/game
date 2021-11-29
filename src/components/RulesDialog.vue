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
    name: 'rulesDialog',
    components: {
        [Overlay.name]: Overlay
    },
    props: ["rulesShow"],
    data() {
        return {
            bargainRuleTit: "砍价规则",
            bargainRuleContxt: "一、参与对象：所有code用户都可发起砍价，新老用户都可参与砍价： <br/>1. 红卡用户发起砍价，可绑定上下级关系：新注册用户参与砍价后，则自动成为红卡用户的下级；若为非新注册用户，但此用户并无上级绑定关系，参与砍价后也可自动成为其下级 <br/>2. 蓝卡、临时卡用户发起砍价，不可绑定上下级关系；若蓝卡、临时卡用户在发起砍价前升级为红卡用户，则参与砍价的新用户可自动成为下级 <br><br>二、活动规则： <br/>1. 在活动期间，用户进入庭秘密APP，点击弹窗/轮播，可进入砍价活动详情页 <br>2. 选择心仪礼包，点击【我要免费拿】发起砍价，同时分享给好友帮忙砍，在24小时内砍到0元则砍价成功，否则视为砍价失败 "
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
    padding-top: 50px;
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
    background: url("https://resource.yuedaoec.com/promotions/bargain/glodCoin.png") no-repeat center;
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