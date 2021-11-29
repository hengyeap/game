<template>
    <div>
        <ul class="list_inProgress" v-if="inProgressList && inProgressList.length > 0">
            <li v-for="(item, index) in inProgressList" @click="toBargain(item.id)" :key="index">
                <div class="list_img">
                    <img :src="bannerImgBase + item.img" alt="">
                    <span>价值<b>¥{{item.giftPackageAmount}}</b></span>
                </div>
                <div class="list_text">
                    <p class="progress_text">已砍成{{item.poorBargainAmount}}元,仅差<b>{{item.haveBargainAmount}}元砍成</b></p>
                    <p class="progress"><span :class="'progress_wrap progress_wrap_' + index"></span></p>
                    <MyCountDown :time="new Date(item.endTime).getTime() - new Date(item.nowDate).getTime()" :name="item.skuName"></MyCountDown>
                    <b class="continue">{{continueTxt}}</b>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'vant';
import MyCountDown from './CountDown.vue';
import hybrid from 'hybridify-js';
export default ({
    name: 'listAll',
    components: {
        MyCountDown
    },
    props: ["inProgressList"],
    data() {
        return {
            bannerImgBase: "https://resource.yuedaoec.com/",
            continueTxt: "继续砍价"
        };
    },
    created() {
    },
    mounted() {

    },
    updated() {},
    methods: {
        toBargain(id) {
            this.$emit('toBargain', id);
        }
    }
});
</script>

<style scoped>
.list_inProgress {
    background-color: #ffffff;
    border-radius: 5px;
    padding: 0 14px;
    position: relative;
    padding-top: 35px;
}

.list_inProgress {
    margin-bottom: 12px;
}

.list_inProgress::before {
    content: "正在进行中";
    position: absolute;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    top: -3px;
    width: 293px;
    height: 45px;
    background: url("https://resource.yuedaoec.com/promotions/bargain/title_bg.png") no-repeat center;
    background-size: cover;
    line-height: 40px;
    left: 50%;
    margin-left: -146px;
}

.list_inProgress li {
    padding: 20px 0;
    border-bottom: 1px solid #FFE9EE;
}

.list_inProgress .list_img {
    float: left;
}

.list_img {
    width: 116px;
    height: 116px;
    margin-right: 12px;
    position: relative;
    float: left;
}

.list_img span {
    display: block;
    height: 22px;
    width: 92px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("https://resource.yuedaoec.com/promotions/bargain/price_bg.png") no-repeat center;
    background-size: cover;
    color: #ffffff;
    font-size: 10px;
    text-indent: 3px;
    line-height: 22px;
}

.list_img span b {
    font-size: 13px;
    font-weight: normal;
    position: relative;
    top: 1px;
}

.continue {
    display: block;
    background: linear-gradient(90deg, #FF6893 0%, #FF1343 100%);
    box-shadow: 0px 2px 6px 1px rgba(255, 47, 90, 0.26);
    font-size: 18px;
    color: #ffffff;
    line-height: 46px;
    text-align: center;
    width: 198px;
    height: 38px;
    font-size: 16px;
    line-height: 38px;
    border-radius: 19px;
    margin-top: 10px;
}

.list_text {
    font-size: 14px;
    margin-left: 128px;
}

.progress_text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.progress_text b {
    color: #FF1C49;
}

>>>.van-count-down .block {
    background-color: #FE5472;
    color: #ffffff;
    display: inline-block;
    width: 22px;
    text-align: center;
    border-radius: 4px;
    margin: 0 3px;
}


.progress {
    background-color: #FFD4D7;
    width: 158px;
    height: 10px;
    border-radius: 5px;
    margin: 8px 0 10px;
}

.progress_wrap {
    background: linear-gradient(90deg, #FF6893 0%, #FF2853 100%);
    border-radius: 5px;
    display: block;
    height: 10px;
}
</style>