<template>
    <div id="container">
        <van-nav-bar :title="title" left-text="" left-arrow @click-left="onClickLeft" />
        <div v-if="successList && successList.length > 0" class="main">
            <p class="info">{{info}}</p>
            <van-list class="success_list" v-model="loading" :finished="finished" finished-text="没有更多了">
                <div class="success_li" v-for="(item, index) in successList" :key="index" @click="toBargain(item.id)">
                    <img :src="bannerImgBase + item.img" alt="">
                    <p class="text">
                        <span class="package_name">{{item.skuName}}</span>
                        <span class="time_success">砍成时间:{{item.lastUpdatedAt}}</span>
                        <span class="todet" @click.stop="toPackage()">查看礼包</span>
                    </p>
                </div>
            </van-list>
        </div>
        <p class="no_success" v-else>
            <img :src="imgBaseUrl + 'noSuccess.png'" alt="">
            <span>{{noSuccessTxt}}</span>
        </p>
    </div>
</template>

<script>
import { Toast, NavBar, List } from 'vant';
import hybrid from 'hybridify-js';
import moment from 'moment';
export default ({
    name: 'records',
    components: {
        [NavBar.name]: NavBar,
        [List.name]: List
    },
    data() {
        return {
            uid: "",
            title: "砍价免费拿",
            bannerImgBase: "https://resource.yuedaoec.com/",
            imgBaseUrl: "https://resource.yuedaoec.com/promotions/bargain/",
            info: "所有砍成商品将自动发放到礼包中，礼包随下一笔商城订单快递到家",
            noSuccessTxt: "暂无砍成纪录",
            list: [],
            loading: false,
            finished: true,
            successList: []
        };
    },
    created() {
       this.uid = this.getUrlParam("uid");
       this.init();
    },
    mounted() {},
    updated() {},
    methods: {
        init(){
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
                  this.loading = false;
                  const json = res.result.res;
                  for (let i = 0; i < json.length; i++) {
                      if(json[i].success === true) {
                          this.successList.push(json[i]);
                      }
                  }
              } else {
                  Toast(res.result.msg);
              }
          }).catch(err => {
              console.log(err);
          })
        },
        onClickLeft() {
            hybrid.nav.back();
        },
        toBargain(bargainId){
          hybrid.nav.push("https://appstore.yuedaoec.com/h5/activities/bargain/bargain-detail.html?uid=" + this.uid + "&bargainId=" + bargainId);
        },
        toPackage() {
            hybrid.nav.push("https://appdist.yuedaoec.com/h5/bagQualifications.html");
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

.main {
    background-color: #FFE9ED;
    padding: 0 12px 40px;
}

.info {
    color: #FF1848;
    line-height: 24px;
    text-align: center;
    padding: 15px 40px;
}

.van-nav-bar .van-icon {
    color: #333333;
}

.van-nav-bar__title {
    color: #333333;
    font-weight: normal;
    font-size: 16px;
}

.van-hairline--bottom::after {
    border-bottom-width: 0;
}

.van-icon-arrow-left:before {
    font-size: 20px;
}

.success_list {
    background-color: #ffffff;
    padding: 22px 12px;
    border-radius: 5px;
}

.success_li {
    height: 116px;
    margin-bottom: 20px;
}

.success_list div:last-of-type {
    margin-bottom: 0;
}

.success_list img {
    width: 116px;
    height: 116px;
    float: left;
}

.success_list .text {
    margin-left: 128px;
    position: relative;
    height: 100%;
}

.success_list span {
    display: block;
    margin-bottom: 5px;
}

.package_name {
    height: 48px;
    line-height: 24px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

.time_success {
    color: #959595;
    font-size: 12px;
}

.todet {
    display: block;
    background: linear-gradient(90deg, #FF6893 0%, #FF1343 100%);
    box-shadow: 0px 2px 6px 1px rgba(255, 47, 90, 0.26);
    color: #ffffff;
    text-align: center;
    width: 124px;
    height: 30px;
    font-size: 15px;
    border-radius: 15px;
    line-height: 30px;
    margin-bottom: 0;
    position: absolute;
    bottom: 0;
    right: 0;
}

.no_success {
    padding-top: 110px;
    color: #959595;
    text-align: center;
}

.no_success img {
    width: 192px;
    margin: 0 auto 28px;
}
</style>