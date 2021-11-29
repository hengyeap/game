<template>
    <div class="page">
        <img @click="onClickLeft" src="https://public.tingmimi.net/image/timeGame/back-icon.png" alt=""
             class="back-icon">
        <div class="content">
            <img class="bg"
                 :src="'https://resource.yuedaoec.com/assets/july-carnival/{}/july-carnival-bg.jpg'.replace('{}',platform)"
                 alt="">
            <div class="total-ranking">
                <img class="bg"
                     :src="'https://resource.yuedaoec.com/assets/july-carnival/{}/total-ranking-bg.jpg'.replace('{}',platform)"
                     alt="">
                <div class="ranking-box">
                    <div class="first-box">
                        <div class="first-avatar">
                            <img :src="rankData[0].avatar ? 'https://resource.yuedaoec.com/' + rankData[0].avatar : 'https://resource.yuedaoec.com/assets/july-carnival/tingmimi/userImg.png'"
                                 alt="">
                        </div>
                        <div v-if="rankData[0].user_name==''" class="name">默认用户名</div>
                        <div v-else class="name">{{rankData[0]['user_name']}}</div>
                        <div class="code">{{rankData[0]['code'] }}</div>
                    </div>
                    <div class="second-box">
                        <div class="avatar">
                            <img :src="rankData[1].avatar ? 'https://resource.yuedaoec.com/' + rankData[0].avatar : 'https://resource.yuedaoec.com/assets/july-carnival/tingmimi/userImg.png'"
                                 alt="">
                        </div>
                        <div v-if="rankData[1].user_name==''" class="name">默认用户名</div>
                        <div v-else class="name">{{rankData[1]['user_name']}}</div>
                        <div class="code">{{rankData[1]['code']}}</div>
                    </div>
                    <div class="third-box">
                        <div class="avatar">
                            <img :src="rankData[2].avatar ? 'https://resource.yuedaoec.com/' + rankData[0].avatar : 'https://resource.yuedaoec.com/assets/july-carnival/tingmimi/userImg.png'"
                                 alt="">
                        </div>

                        <div v-if="rankData[2].user_name==''" class="name">默认用户名</div>
                        <div v-else class="name">{{rankData[2]['user_name']}}</div>
                        <div class="code">{{rankData[2]['code']}}</div>

                    </div>
                    <div class="else">
                        <div v-for="(rankD,index) in rankData.slice(3,10)" class="else-box">
                            <div class="rank">{{index+4}}</div>
                            <div class="else-avatar">
                                <img :src="rankD.avatar ? 'https://resource.yuedaoec.com/' + rankD.avatar : 'https://resource.yuedaoec.com/assets/july-carnival/tingmimi/userImg.png'"
                                     alt="">
                            </div>
                            <div v-if="rankD['user_name']==''" class="else-name">默认用户名</div>
                            <div v-else class="else-name">{{rankD['user_name']}}</div>

                            <div class="else-code">{{rankD['code']}}</div>
                        </div>


                    </div>
                </div>
                <div @click="jumpToTotalRanking" class="view-more"></div>

            </div>
            <div class="current-ranking">
                <img class="bg"
                     :src="'https://resource.yuedaoec.com/assets/july-carnival/{}/current-ranking-bg.jpg'.replace('{}',platform)"
                     alt="">
                <div class="current-ranking-num">{{self.currentRank}}</div>
                <div v-if="self.currentRank == '50+'" class="current-ranking-word">您距离上榜仅差<span>{{(rankData[rankData.length -1]['total_amount'] - self['total_amount']).toFixed(2)}}元</span><br/>C位出道还有一步之遥
                </div>
                <div v-else-if="self.currentRank <= 50 " class="current-ranking-word">您与第一名的小姐姐仅差<span>{{(rankData[0]['total_amount'] - self['total_amount']).toFixed(2)}}元</span><br/>C位女王在等你
                </div>
                <div v-else-if="self.currentRank =='暂无' " class="current-ranking-word">
                    您本月还没有产生业绩哦，<span>快点下单吧！</span><br/>C位女王在等你
                </div>
                <div class="go-to-mall-btn" @click="goMall"></div>

            </div>
        </div>
    </div>
</template>

<script>
    import hybrid from "hybridify-js";
    import {Dialog} from 'vant'
    import axios from 'axios'

    export default {
        name: "july-carnival",
        data() {
            return {
                platform: null,
                userKey: '',
                self: {},
                rankData: [],
                texts: {
                    tingmimi: {
                        currentRankingNum: '{}',
                        currentRankingWord: '您与第一名的小姐姐仅差{}元C位女王在等你',
                        informations: [{
                            rank: '2',
                            avatar: 'https://resource.yuedaoec.com/assets/july-carnival/tingmimi/1.jpg',
                            name: '我就是第一名',
                            code: 'ASDA00000'
                        },]

                    },
                    tingo2o: {
                        rank: '',
                        avatar: '',
                        name: '',
                        code: ''
                    },
                    newtingtaiwan: {},
                    newtingmalaysia: {},
                }
            }
        },
        created() {
            const platform = this.getUrlParam('platform');
            this.userKey = this.getUrlParam('uuid');
            if (!this.isBlank(platform)) {
                this.platform = platform;
            } else {
                this.platform = 'tingmimi';
            }

            if (this.isBlank(this.getUrlParam('uuid'))) {
                return Dialog.alert({
                    message: '登录状态已失效，请重新登录！'
                }).then(() => {
                    hybrid.nav.toMe();
                });
            }
        },
        mounted() {
            if (!this.isBlank(this.getUrlParam('uuid'))) {
                this.getData();
            }
        },
        methods: {
            onClickLeft() {
                hybrid.nav.back();
            },
            jumpToTotalRanking() {
                hybrid.nav.push(this.getRedirectUrl('july-total-ranking', {uuid: this.userKey}))
            },
            getData() {
                axios.get('https://temp.yuedaoec.com/api/red-list/query', {params: {userKey: this.userKey}})
                    .then((json) => {
                        if (json.data.success) {
                            let data = json.data.res
                            if (data) {
                                let self = data.self
                                this.rankData = data.rank
                                if (self == null) {
                                    self = {
                                        currentRank: '暂无'
                                    }
                                } else {
                                    let selfUserKey = self['user_key'];
                                    let rank = null;
                                    for (let i = 0; i < data.rank.length; i++) {
                                        if (selfUserKey == data.rank[i]['user_key']) {
                                            rank = i + 1
                                        }
                                    }
                                    if (!rank) {
                                        rank = '50+'
                                    }
                                    self.currentRank = rank;
                                }

                                this.self = self
                            }
                        } else {
                            this.toast(json.data.msg)
                        }
                    })
            },
            goMall() {
                this.goToMall()
            }
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        position: relative;
    }

    .content {
        width: 100%;
        position: relative;
    }

    .bg {
        width: 100%;
        position: relative;
        vertical-align: bottom;
    }

    .total-ranking {
        width: 100%;
        position: relative;
    }

    .current-ranking {
        width: 100%;
        position: relative;
    }

    .current-ranking-num {
        font-size: 40px;
        color: #FFAE00;
        font-weight: 700;
        position: absolute;
        top: 33px;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
    }

    .current-ranking-word {
        font-size: 14px;
        color: #fff;
        font-weight: 700;
        position: absolute;
        top: 102px;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
    }

    .current-ranking-word span {
        font-size: 16px;
        color: #F6D691;
    }

    .back-icon {
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        left: 0.4rem;
        top: 0.4rem;
        z-index: 999;
    }

    .first-box {
        position: absolute;
        top: 81px;
        left: 135px;
        right: 0;
        width: 105px;
        height: 100px;
    }

    .second-box {
        position: absolute;
        top: 99.5px;
        left: 37.5px;
        right: 0;
        width: 90px;
        height: 100px;
    }

    .third-box {
        position: absolute;
        top: 99px;
        left: 248px;
        width: 90px;
        height: 100px;
    }

    .first-avatar {
        width: 100%;
        margin: 0 0 10px;
    }

    .first-avatar img {
        width: 60px;
        height: 60px;
        margin: auto;
        display: block;
        border-radius: 50%;
    }

    .avatar {
        width: 100%;
        margin: 0 0 10px;
    }

    .avatar img {
        width: 50px;
        height: 50px;
        margin: auto;
        display: block;
        border-radius: 50%;
    }

    .name {
        font-size: 12px;
        color: #fff;
        text-align: center;
    }

    .code {
        font-size: 12px;
        color: #fff;
        text-align: center;

    }

    .view-more {
        width: 46%;
        height: 40px;
        position: absolute;
        top: 524px;
        margin: auto;
        left: 0;
        right: 0;
    }

    .else {
        position: absolute;
        top: 236px;
        width: 100%;
        margin: auto;
        height: 287px;
    }

    .else-box {
        width: 80%;
        margin: 7px auto;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
    }

    .else-avatar {
        width: 19%;
    }

    .else-avatar img {
        width: 56%;
        border-radius: 50%;
    }

    .rank {
        width: 17%;
        font-size: 14px;
        color: #37A1F9;
        text-align: center;
        font-weight: 400;

    }

    .else-name {
        width: 34%;
        padding-right: 6%;
        font-size: 0.32rem;
        color: #37A1F9;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
    }

    .else-code {
        width: 25%;
        font-size: 12px;
        color: #37A1F9;
    }

    .go-to-mall-btn {
        width: 160px;
        height: 40px;
        position: absolute;
        top: 150px;
        left: 108px;
        right: 0;
    }


</style>
