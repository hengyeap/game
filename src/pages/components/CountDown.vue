<template>
    <div>
        <van-count-down :time="time" format="HH:mm:ss" @finish="finish" @change="change">
            <template #default="timeData">
                                <span class="block">{{ timeData.hours < 10 ? '0' + timeData.hours : timeData.hours}}</span>
                                <span class="colon">:</span>
                                <span class="block">{{ timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes}}</span>
                                <span class="colon">:</span>
                                <span class="block">{{ timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds}}</span>
                                {{finishTxt}}
</template>
        </van-count-down>
    </div>
</template>

<script>
import { Toast, CountDown, Dialog } from 'vant';
import hybrid from 'hybridify-js';
export default ({
    name: 'countDown',
    components: {
        [CountDown.name]: CountDown,
        [Dialog.name]: Dialog
    },
    props: ["time", "name"],
    data() {
        return {
            finishTxt: "后结束"
        };
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        finish() {
            let msg = "很遗憾！您的本次砍价失败";
            if(this.name) {
                msg = "很遗憾！您的" + this.name + "\n砍价失败";
            }
            Dialog.confirm({
                    message: msg,
                    confirmButtonText: "知道了",
                    cancelButtonText: "发起下一个砍价"
                })
                .then(() => {
                    hybrid.nav.push("https://appstore.yuedaoec.com/h5/activities/bargain/bargain-list.html");
                    // on confirm
                })
                .catch(() => {
                    // on cancel
                    hybrid.nav.push("https://appstore.yuedaoec.com/h5/activities/bargain/bargain-list.html");
                });
        },
        change() {
            console.log();
        }
    }
});
</script>

<style>
.van-dialog__message {
    line-height: 24px;
    font-size: 15px;
}

.van-dialog__cancel {
    color: #FE5472;
}

.van-dialog__confirm,
.van-dialog__confirm:active {
    color: #333333 !important;
}
</style>