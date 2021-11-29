<template>
  <div class="page">
    <img @click="onClickLeft" src="https://public.tingmimi.net/image/timeGame/back-icon.png" alt=""
         class="back-icon">
    <div class="content">
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/august-carnival-bg.jpg'.replace('{}',platform)"
           alt="">
      <div class="total-ranking">
        <img class="bg"
             :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/total-ranking-bg.jpg?111'.replace('{}',platform)"
             alt="">


        <div class="click-box">
          <div @click="select(1)" class="click"></div>
          <div @click="select(2)" class="click"></div>
        </div>


        <div v-if="selectStatus == 1" class="ranking-box">
          <img class="select-img"
               :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/weChat-select.png'.replace('{}',platform)"
               alt="">
          <div class="select-word">微信达人榜每天12点更新，数据截至前一天24点</div>

          <div class="first-box">
            <div class="first-avatar">
              <img :src="rankWeixinData[0].avatar ? 'https://resource.yuedaoec.com/' + rankWeixinData[0].avatar : 'https://resource.yuedaoec.com/assets/august-carnival/tingmimi/userImg.png'"
                   alt="">
            </div>
            <div class="name">CODE</div>
            <div class="code">{{rankWeixinData[0]['code'] }}</div>
          </div>
          <div class="second-box">
            <div class="avatar">
              <img :src="rankWeixinData[1].avatar ? 'https://resource.yuedaoec.com/' + rankWeixinData[1].avatar : 'https://resource.yuedaoec.com/assets/august-carnival/tingmimi/userImg.png'"
                   alt="">
            </div>
            <div class="name">CODE</div>
            <div class="code">{{rankWeixinData[1]['code']}}</div>
          </div>
          <div class="third-box">
            <div class="avatar">
              <img :src="rankWeixinData[2].avatar ? 'https://resource.yuedaoec.com/' + rankWeixinData[2].avatar : 'https://resource.yuedaoec.com/assets/august-carnival/tingmimi/userImg.png'"
                   alt="">
            </div>

            <div class="name">CODE</div>
            <div class="code">{{rankWeixinData[2]['code']}}</div>

          </div>
          <div class="else">
            <div v-for="(rankD,index) in rankWeixinData.slice(3,10)" class="else-box">
              <div class="rank">{{index+4}}</div>
              <div class="else-avatar">
                <img :src="rankD.avatar ? 'https://resource.yuedaoec.com/' + rankD.avatar : 'https://resource.yuedaoec.com/assets/august-carnival/tingmimi/userImg.png'"
                     alt="">
              </div>
              <div class="else-code">{{rankD['code']}}</div>

              <div class="lifting">
                <img v-if="rankD['rank'] == 1" class="lifting-icon"
                     :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/up-icon.png'.replace('{}',platform)"
                     alt="">
                <img v-else-if="rankD['rank'] == 0" class="lifting-icon"
                     :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/down-icon.png'.replace('{}',platform)"
                     alt="">
                <div v-else-if="rankD['rank'] == 2" class="lifting-icon1">-</div>
              </div>
            </div>
          </div>
          <div @click="jumpToTotalRanking" class="view-more"></div>
          <div class="current-ranking">
            <img class="bg"
                 :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/current-ranking-bg.jpg'.replace('{}',platform)"
                 alt="">
            <div class="current-ranking-title">微信达人榜当前排名</div>

            <div class="current-ranking-num">{{selfWeixin.currentRank}}</div>

            <div v-if="selfWeixin.currentRank == 1 " class="current-ranking-word">
              太厉害啦！当前排名第一<br/>继续保持首位吧！
            </div>
            <div v-else-if="selfWeixin.currentRank >1 && selfWeixin.currentRank <= 10 " class="current-ranking-word">
              您距离第1名仅差<span>{{(rankWeixinData[0]['total_amount'] - selfWeixin['total_amount']).toFixed(2)}}元</span>
            </div>

            <div v-else-if="selfWeixin.currentRank>10 && selfWeixin.currentRank <= 50" class="current-ranking-word">
              您距离上榜仅差<span>{{(rankWeixinData[9]['total_amount'] - selfWeixin['total_amount']).toFixed(2)}}元</span>
            </div>
            <div v-else-if="selfWeixin.currentRank == '50+' " class="current-ranking-word">
              您距离上榜仅差<span>{{(rankWeixinData[9]['total_amount'] - selfWeixin['total_amount']).toFixed(2)}}元</span>
            </div>
            <div v-else-if="selfWeixin.currentRank =='暂无' " class="current-ranking-word">
              您本月还没有产生业绩，快点下单吧！
            </div>
            <div class="go-to-mall-btn" @click="goMall">
              <img :src="'https://resource.yuedaoec.com/assets/august-carnival/tingmimi/go-to-mall-btn.png'.replace('{}',platform)"
                   alt="">
            </div>

          </div>
        </div>

        <div v-if="selectStatus == 2 && rankDouyinData.length > 0" class="ranking-box">
          <img class="select-img"
               :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/douYin-select.png?22'.replace('{}',platform)"
               alt="">
<!--          <div class="select-word">抖音达人榜每周一12点更新，数据展示仅供参考</div>-->

          <div class="first-box">
            <div class="first-avatar">
              <img :src="rankDouyinData[0].avatar ? 'https://resource.yuedaoec.com/' + rankDouyinData[0].avatar : 'https://resource.yuedaoec.com/assets/august-carnival/tingmimi/userImg.png'"
                   alt="">
            </div>
            <div class="name">CODE</div>
            <div class="code">{{rankDouyinData[0]['code'] }}</div>
          </div>
          <div class="second-box">
            <div class="avatar">
              <img :src="rankDouyinData[1].avatar ? 'https://resource.yuedaoec.com/' + rankDouyinData[1].avatar : 'https://resource.yuedaoec.com/assets/august-carnival/tingmimi/userImg.png'"
                   alt="">
            </div>
            <div class="name">CODE</div>
            <div class="code">{{rankDouyinData[1]['code']}}</div>
          </div>
          <div class="third-box">
            <div class="avatar">
              <img :src="rankDouyinData[2].avatar ? 'https://resource.yuedaoec.com/' + rankDouyinData[2].avatar : 'https://resource.yuedaoec.com/assets/august-carnival/tingmimi/userImg.png'"
                   alt="">
            </div>

            <div class="name">CODE</div>
            <div class="code">{{rankDouyinData[2]['code']}}</div>

          </div>
          <div class="else">
            <div v-for="(rankD,index) in rankDouyinData.slice(3,10)" class="else-box">
              <div class="rank">{{index+4}}</div>
              <div class="else-avatar">
                <img :src="rankD.avatar ? 'https://resource.yuedaoec.com/' + rankD.avatar : 'https://resource.yuedaoec.com/assets/august-carnival/tingmimi/userImg.png'"
                     alt="">
              </div>
              <div class="else-code">{{rankD['code']}}</div>

              <div class="lifting">
                <img v-if="rankD['rank'] == 1" class="lifting-icon"
                     :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/up-icon.png'.replace('{}',platform)"
                     alt="">
                <img v-else-if="rankD['rank'] == 0" class="lifting-icon"
                     :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/down-icon.png'.replace('{}',platform)"
                     alt="">
                <div v-else-if="rankD['rank'] == 2" class="lifting-icon1">-</div>
              </div>
            </div>
          </div>
          <div @click="jumpToTotalRanking" class="view-more"></div>
          <div class="current-ranking">
            <img class="bg"
                 :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/current-ranking-bg.jpg'.replace('{}',platform)"
                 alt="">
            <div class="current-ranking-title">直播达人榜当前排名</div>

            <div class="current-ranking-num">{{selfDouyin.currentRank}}</div>

            <div v-if="selfDouyin.currentRank == 1 " class="current-ranking-word">
              太厉害啦！当前排名第一<br/>继续保持首位吧！
            </div>
            <div v-else-if="selfDouyin.currentRank >1 && selfDouyin.currentRank <= 10 " class="current-ranking-word">
              您距离第1名仅差<span>{{(rankDouyinData[0]['total_amount'] - selfDouyin['total_amount']).toFixed(2)}}元</span><br/>快去乘风破浪带货吧
            </div>

            <div v-else-if="selfDouyin.currentRank>10 && selfDouyin.currentRank <= 50" class="current-ranking-word">
              您距离上榜仅差<span>{{(rankDouyinData[rankDouyinData.length >= 9 ? 9: rankDouyinData.length - 1]['total_amount'] - selfDouyin['total_amount']).toFixed(2)}}元</span><br/>快去乘风破浪带货吧
            </div>
            <div v-else-if="selfDouyin.currentRank == '50+' " class="current-ranking-word">
              您距离上榜仅差<span>{{(rankDouyinData[rankDouyinData.length >= 9 ? 9: rankDouyinData.length - 1]['total_amount'] - selfDouyin['total_amount']).toFixed(2)}}元</span><br/>快去乘风破浪带货吧
            </div>
            <div v-else-if="selfDouyin.currentRank =='暂无' " class="current-ranking-word"><br/>快去乘风破浪带货吧
              您本月还没有产生业绩，快点下单吧！
            </div>
            <div class="go-to-mall-btn" @click="goMall">
              <img :src="'https://resource.yuedaoec.com/assets/august-carnival/tingmimi/go-to-mall-btn.png'.replace('{}',platform)"
                   alt="">
            </div>

          </div>
        </div>


      </div>

      <div class="rule-box">
        <img class="bg"
             :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/rule.jpg'.replace('{}',platform)"
             alt="">
      </div>
    </div>
  </div>
</template>

<script>
    import hybrid from "hybridify-js";
    import {Dialog,Toast} from 'vant'
    import axios from 'axios'

    export default {
        name: "august-carnival",
        components: {

        },
        data() {
            return {
                selectStatus: 1,
                platform: null,
                userKey: '',
                selfWeixin: {},
                selfDouyin: {},
                rankWeixinData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                rankDouyinData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                texts: {
                    tingmimi: {
                        douYinWord: '抖音达人榜当前排名',
                        weChatWord: '微信达人榜当前排名',
                        currentRankingNum: '{}',
                        currentRankingWord: '您与第一名的小姐姐仅差{}元C位女王在等你',
                        informations: [{
                            rank: '2',
                            avatar: 'https://resource.yuedaoec.com/assets/august-carnival/tingmimi/1.jpg',
                            name: '我就是第一名',
                            code: 'ASDA00000'
                        }]

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
                this.getDouyinData();
                this.getWeixinData();
            }
        },
        methods: {
            select(num) {
                this.selectStatus = num;
            },
            select1() {
                Toast('暂未开放');
            },
            onClickLeft() {
                hybrid.nav.back();
            },
            jumpToTotalRanking() {
                hybrid.nav.push(this.getRedirectUrl('august-total-ranking', {uuid: this.userKey}))
            },
            getWeixinData() {
                axios.get('https://temp.yuedaoec.com/api/red-list/appAug', {
                    params: {
                        userKey: this.userKey,
                        rankType: 'app'
                    }
                })
                    .then((json) => {
                        if (json.data.success) {
                            let data = json.data.res
                            if (data) {
                                let self = data.self
                                this.rankWeixinData = data.rank
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
                                this.selfWeixin = self
                            }
                        } else {
                            this.toast(json.data.msg)
                        }
                    })
            },
            getDouyinData() {
                axios.get('https://temp.yuedaoec.com/api/red-list/appAug', {
                    params: {
                        userKey: this.userKey,
                        rankType: 'douyin'
                    }
                })
                    .then((json) => {
                        if (json.data.success) {
                            let data = json.data.res
                            if (data) {
                                let self = data.self
                                this.rankDouyinData = data.rank
                                for(let i = 0; i < data.rank.length; i++){

                                    if(data.rank[i].avatar=='None'){
                                        data.rank[i].avatar =''
                                    }

                                }
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

                                this.selfDouyin = self
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
    color: #FFF684;
    font-weight: 700;
    position: absolute;
    top: 80px;
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
    top: 130px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }

  .current-ranking-word span {
    font-size: 16px;
    color: #FFF684;
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
    top: 112px;
    left: 135px;
    right: 0;
    width: 105px;
    height: 100px;
  }

  .second-box {
    position: absolute;
    top: 131px;
    left: 37.5px;
    right: 0;
    width: 90px;
    height: 100px;
  }

  .third-box {
    position: absolute;
    top: 131px;
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
    font-size: 10px;
    color: #fff;
    text-align: center;
  }

  .code {
    font-size: 10px;
    color: #fff;
    text-align: center;

  }

  .view-more {
    width: 46%;
    height: 40px;
    position: absolute;
    top: 557px;
    margin: auto;
    left: 0;
    right: 0;
  }

  .else {
    position: absolute;
    top: 265px;
    width: 100%;
    margin: auto;
    height: 287px;
  }

  .else-box {
    width: 80%;
    margin: 4px auto;
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
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .rank {
    width: 17%;
    font-size: 14px;
    color: #7423D8;
    text-align: center;
    font-weight: 400;

  }

  .else-code {
    width: 34%;
    padding-right: 6%;
    font-size: 10px;
    color: #7423D8;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }

  .lifting {
    width: 25%;
    font-size: 10px;
    color: #7423D8;
  }

  .go-to-mall-btn {
    width: 160px;
    height: 40px;
    position: absolute;
    top: 190px;
    left: 108px;
    right: 0;
  }

  .go-to-mall-btn img {
    width: 100%;
  }

  .select-box {
    position: absolute;
    top: 20px;

    height: 62px;
    width: 100%;

  }

  .click-box {
    position: absolute;
    top: 13px;
    left: 0;
    right: 0;
    margin: auto;
    /*height: 62px;*/
    z-index: 1;
    width: 93%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .click {
    position: relative;
    width: 49%;
    height: 52px;
    /*background: #e6/e6;*/
  }

  .select-img-box {
    position: absolute;
    top: 13px;
    left: 0;
    right: 0;
    margin: auto;
    width: 93%;
  }

  .select-img {
    width: 93%;
    position: absolute;
    top: 14px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .select-word {
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;
    font-size: 12px;
    text-align: center;
    color: #fff;
  }

  .lifting-icon {
    width: 25%;
    margin-left: 8px;
  }

  .current-ranking-title {
    font-size: 18px;
    color: #fff;
    font-weight: 700;
    position: absolute;
    top: 27px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }

  .lifting-icon1 {
    font-size: 32px;
    color: #7423D8;
    padding-left: 10px;
  }
</style>
