<template>
  <div class="page">
    <img @click="onClickLeft" src="https://public.tingmimi.net/image/timeGame/back-icon.png" alt="" class="back-icon">

    <div class="content">
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/total-ranking-bg1.jpg'.replace('{}',platform)"
           alt="">
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/total-ranking-bg2.jpg'.replace('{}',platform)"
           alt="">
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/total-ranking-bg3.jpg'.replace('{}',platform)"
           alt="">
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/total-ranking-bg4.jpg'.replace('{}',platform)"
           alt="">
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/total-ranking-bg5.jpg'.replace('{}',platform)"
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
          <div v-for="(rankD,index) in rankWeixinData.slice(3,50)"
               :class="['else-box',(index + 4) % 10 == 0 ? 'more-padding-bottom':'',(index + 4) % 10 == 1 ? 'more-padding-top':'']">
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
              <div v-else-if="rankD['rank'] == 2" class="lifting-icon1" >-</div>
            </div>

            <img v-if="(index + 4) % 10 == 0 && index + 4 != 50" class="split-line"
                 :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/split-line.png'.replace('{}',platform)"
                 alt="">
          </div>


        </div>

      </div>


      <div v-if="selectStatus == 2" class="ranking-box">
        <img class="select-img"
             :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/douYin-select.png?11'.replace('{}',platform)"
             alt="">
<!--        <div class="select-word">抖音达人榜每周一12点更新，数据展示仅供参考</div>-->

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
          <div v-for="(rankD,index) in rankDouyinData.slice(3,50)"
               :class="['else-box',(index + 4) % 10 == 0 ? 'more-padding-bottom':'',(index + 4) % 10 == 1 ? 'more-padding-top':'']">
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
              <div v-else-if="rankD['rank'] == 2" class="lifting-icon1" >-</div>
            </div>

            <img v-if="(index + 4) % 10 == 0 && index + 4 != 50" class="split-line"
                 :src="'https://resource.yuedaoec.com/assets/august-carnival/{}/split-line.png'.replace('{}',platform)"
                 alt="">
          </div>


        </div>

      </div>


    </div>
  </div>
</template>

<script>
    import hybrid from "hybridify-js";

    import axios from 'axios'
    import { Toast } from 'vant';
    export default {
        name: "App",
        components: {
            [Toast.name]: Toast,

        },
        data() {
            return {
                selectStatus: 1,
                userKey: '',
                rankWeixinData: [],
                rankDouyinData: [],
                platform: null,
                texts: {
                    tingmimi: {
                        informations: [{
                            rank: '2',
                            avatar: 'https://resource.yuedaoec.com/assets/july-carnival/tingmimi/1.jpg',
                            name: '我就是第一名',
                            code: 'ASDA00000'
                        },]
                    },
                    tingo2o: {},
                    newtingtaiwan: {},
                    newtingmalaysia: {},
                }
            }
        },
        created() {
            const platform = this.getUrlParam('platform');
            this.userKey = this.getUrlParam('uuid')
            if (!this.isBlank(platform)) {
                this.platform = platform;
            } else {
                this.platform = 'tingmimi';
            }
        },
        mounted() {
            this.getDouyinData();
            this.getWeixinData();
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
            getDouyinData() {
                axios.get('https://temp.yuedaoec.com/api/red-list/appAug', {params: {userKey: this.userKey,rankType:'douyin'}})
                    .then((json) => {
                        if (json.data.success) {
                            let data = json.data.res
                            if (data) {
                                this.rankDouyinData = data.rank
                                for(let i = 0; i < data.rank.length; i++){

                                    if(data.rank[i].avatar=='None'){
                                        data.rank[i].avatar =''
                                    }

                                }
                            }

                        } else {
                            this.toast(json.data.msg)
                        }
                    })
            },
            getWeixinData() {
                axios.get('https://temp.yuedaoec.com/api/red-list/appAug', {params: {userKey: this.userKey,rankType:'app'}})
                    .then((json) => {
                        if (json.data.success) {
                            let data = json.data.res
                            if (data) {
                                this.rankWeixinData = data.rank
                            }

                        } else {
                            this.toast(json.data.msg)
                        }
                    })
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

  .back-icon {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    left: 0.4rem;
    top: 0.4rem;
    z-index: 999;
  }

  .ranking-box {
    position: absolute;
    top: 21px;
    left: 0;
    right: 0;
    width: 100%;

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


  .else {
    position: absolute;
    top: 265px;
    width: 100%;
    margin: auto;
    height: 287px;
  }

  .else-box {
    width: 80%;
    margin: 0.15rem auto;
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

  .split-line {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .more-padding-bottom {
    padding-bottom: 20px;
  }

  .more-padding-top {
    padding-top: 20px;
  }


  .click-box {
    position: absolute;
    top: 1rem;
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

  .lifting {
    width: 25%;
    font-size: 10px;
    color: #7423D8;
  }

  .lifting-icon {
    width: 25%;
    margin-left: 8px;
  }
  .lifting-icon1{
    font-size: 28px;
    color: #7423D8;
    padding-left: 10px;
  }
</style>
