<template>
    <div id="container">
        <van-nav-bar :title="title" left-text="" :right-text="record" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <img :src="imgBaseUrl + 'banner.png'" alt="">
        <span class="rules" @click="rulesShow = true">{{rulesWords}}</span>
        <div class="list">
            <InProgressList @toBargain="toBargain" :inProgressList="inProgressList"></InProgressList>
            <ListAll :uid="uid"></ListAll>
        </div>
        <RulesDialog :rulesShow="rulesShow" @closeRules="closeRules"></RulesDialog>
    </div>
</template>

<script>
import { NavBar, Toast } from 'vant';
import hybrid from 'hybridify-js';
import ListAll from "./../components/ListAll.vue";
import RulesDialog from "./../components/RulesDialog.vue";
import InProgressList from "./../components/InProgressList.vue";
import axios from 'axios';
export default ({
    name: 'list',
    components: {
        [NavBar.name]: NavBar,
        ListAll,
        RulesDialog,
        InProgressList
    },
    data() {
        return {
            title: "砍价免费拿",
            record: "砍成纪录",
            rulesWords: "规则",
            imgBaseUrl: "https://resource.yuedaoec.com/promotions/bargain/",
            uid: "",
            rulesShow: false,
            inProgressList: []
        };
    },
    created() {
        this.uid = this.getUrlParam('uid');
        this.getBargainList();
    },
    mounted() {},
    updated() {},
    methods: {
        progressInit() {
            // 进度条初始化
            const head = document.getElementsByTagName('head')[0];
            var style = document.createElement("style");
            style.type = "text/css";
            head.appendChild(style);
            const myStyle = document.getElementsByTagName('style')[document.getElementsByTagName('style').length - 1];
            for (let i = 0; i < this.inProgressList.length; i++) {
                const percent = Math.floor((this.inProgressList[i].poorBargainAmount / this.inProgressList[i].giftPackageAmount * 100)) + '%';
                console.log(i + '-' + percent);
                myStyle.appendChild(document.createTextNode(".progress_wrap_" + i + " {animation: progressing" + i + " .8s forwards} @keyframes progressing" + i + " {from {width: 0;}to {width: " + percent + ";}}"));
            }
        },
        getBargainList() {
            let params = {
                type: 'get',
                url: 'bargain/app/getBargainByUid',
                userToken: true,
                query: {
                    userId: this.uid
                },
            };
            this.reqwest(params).then(res => {
                if (res.success) {
                    for(let i = 0; i < res.result.res.length; i++) {
                        if(!res.result.res[i].bargainStatus) {
                            this.inProgressList.push(res.result.res[i]);
                        }
                    }
                    this.progressInit();
                } else {
                    Toast(res.result.msg);
                }
            }).catch(err => {
                console.log(err);
            })
        },
        closeRules() {
            this.rulesShow = false;
        },
        onClickLeft() {
            hybrid.back();
        },
        onClickRight() {
            hybrid.nav.push("https://appstore.yuedaoec.com/h5/activities/bargain/bargain-records.html");
        },
        toBargain(bargainId) {
            hybrid.nav.push("https://appstore.yuedaoec.com/h5/activities/bargain/bargain-detail.html?bargainId=" + bargainId);
        }
    }
});
</script>

<style>
* {
    padding: 0;
    margin: 0;
}

img {
    display: block;
    max-width: 100%;
}

body,
html {
    background-color: #ffffff;
}

#container {
    width: 100%;
    max-width: 375px;
    font-size: 14px;
    color: #333333;
    position: relative;
    margin: 0 auto;
}

.van-nav-bar {
    background-color: #FF2349;
}

.van-nav-bar__title {
    color: #ffffff;
    font-weight: normal;
    font-size: 16px;
}

.van-icon-arrow-left:before,
.van-nav-bar__text {
    color: #ffffff;
}

.van-icon-arrow-left:before {
    font-size: 20px;
}

.van-hairline--bottom::after {
    border-bottom-width: 0;
}

.list {
    min-height: 600px;
    background: linear-gradient(180deg, #FF6A71 0%, #FFE9ED 100%);
    padding: 0 12px 14px;
}

.rules {
    background-color: rgba(255, 255, 255, .8);
    width: 50px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: #FF1C49;
    display: block;
    position: absolute;
    right: 0;
    top: 70px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}
</style>