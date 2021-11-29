<template>
    <div>
        <van-list class="list_all" v-model="loading" :finished="finished" finished-text="没有更多了" @load="getAllList">
            <div class="li" v-for="(item, index) in allList" :key="index" @click="toDet(item.bargainUserId, item.id, item.userKey, item.ongoing)">
                <div class="list_img">
                    <img :src="bannerImgBase + item.img" alt="">
                    <span>价值<b>¥{{item.bargainAmount}}</b></span>
                </div>
                <p class="name">{{item.skuName}}</p>
                <p class="successNum">已送出{{item.bargainComplete}}件</p>
                <b class="toBargain">我要免费拿</b>
            </div>
        </van-list>
    </div>
</template>

<script>
import { Toast, List } from 'vant';
import hybrid from 'hybridify-js';
export default ({
    name: 'listAll',
    components: {
        [List.name]: List
    },
    props: ["uid"],
    data() {
        return {
            bannerImgBase: "https://resource.yuedaoec.com/",
            finished: false,
            loading: false,
            allList: [],
            pageSize: 10,
            currentPage: 1
        };
    },
    created() {},
    mounted() {
        console.log(this.uid);
    },
    updated() {},
    methods: {
        getAllList() {
            this.loading = true;
            let params = {
                type: 'get',
                url: 'bargain/app/getBargainGoodDetail',
                userToken: false,
                query: {
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    userId: this.uid
                },
            };
            this.reqwest(params).then(res => {
                if (res.success) {
                    this.loading = false;
                    this.allList = this.allList.concat(res.result.res);
                    if (res.result.res.length < this.pageSize) {
                        this.finished = true;
                    } else {
                        this.currentPage++;
                    }
                } else {
                    Toast(res.result.msg);
                }
            }).catch(err => {
                console.log(err);
            })
        },
        toDet(bargainUserId, id, userKey, onging) {
            if (onging) {
                this.$router.push({
                    path: "/bargainDet",
                    name: "BargainDet",
                    query: {
                        id: bargainUserId,
                        uid: this.uid
                    }
                })
            } else {
                this.$router.push({
                    path: "/proDet",
                    name: "ProDet",
                    query: {
                        id: id,
                        uid: this.uid
                    }
                })
            }
        }
    }
});
</script>

<style scoped>
.list_all {
    background-color: #ffffff;
    border-radius: 5px;
    position: relative;
    padding: 16px 14px 0;
    overflow: hidden;
}

.list_all .li {
    margin-bottom: 14px;
    font-size: 13px;
    width: 155px;
    display: inline-block;
}

.list_all .li:nth-child(odd) {
    float: left;
}

.list_all .li:nth-child(even) {
    float: right;
}

.list_all .list_img {
    width: 155px;
    height: 155px;
    float: none;
}

.list_img img {
    width: 100%;
    height: 100%;
}

.list_all .name {
    margin: 8px 0 4px;
    height: 36px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

.successNum {
    font-size: 11px;
    color: #FF1545;
}

.toBargain {
    width: 150px;
    height: 32px;
    line-height: 32px;
    border-radius: 18px;
    margin-top: 8px;
    font-size: 15px;
}

.list_img {
    width: 116px;
    height: 116px;
    margin-right: 12px;
    position: relative;
}

.list_img span {
    display: block;
    height: 22px;
    width: 92px;
    position: absolute;
    bottom: 2px;
    left: 0;
    background: url("https://resource.yuedaoec.com/promotions/bargain/price_bg.png") no-repeat center;
    background-size: cover;
    color: #ffffff;
    font-size: 10px;
    text-indent: 3px;
    line-height: 22px;
}

>>>.van-list__error-text,
>>>.van-list__finished-text,
>>>.van-list__loading {
    clear: both;
}
</style>