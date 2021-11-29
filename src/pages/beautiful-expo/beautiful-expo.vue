<template>
  <div class="page">
    <div class="top">
      <img
        class="pic1"
        :src="'https://resource.yuedaoec.com/imagehkj/beautiful-expo/beautiful-expo1.jpg'"
        alt=""
      />
      <div class="rule" @click="rules()">
        <span></span>
      </div>
      <div class="top-pic">
         <div class="load" v-if="actime==1">
            <div class="received">
            <img
              :src="'https://resource.yuedaoec.com/imagehkj/beautiful-expo/received.png'"
              alt=""
            />
            <p style="font-size:0.5rem" @click="unstart()">活动未开始</p>
          </div>
        </div>
        <div class="load" v-else-if="actime==2">
          <div v-if="statusIndex == 0">
            <img
              :src="'https://resource.yuedaoec.com/imagehkj/beautiful-expo/sign-up.png'"
              alt=""
              @click="Sign()"
            />
          </div>
          <div v-else-if="statusIndex == 1">
            <img
              :src="'https://resource.yuedaoec.com/imagehkj/beautiful-expo/signed-up.png'"
              alt=""
              @click="getReceivedGift()"
            />
          </div>
          <div class="received" v-else-if="statusIndex == 2">
            <img
              :src="'https://resource.yuedaoec.com/imagehkj/beautiful-expo/received.png'"
              alt=""
            />
            <p>已领{{ receiveGiftNum ? receiveGiftNum : 0 }}份招新礼包</p>
          </div>
          <div v-else-if="statusIndex == 3">
            <img
              :src="'https://resource.yuedaoec.com/imagehkj/beautiful-expo/receive-again.png'"
              alt=""
              @click="getReceivedGift()"
            />
          </div>
        </div>
        <div class="load" v-if="actime==3">
            <div class="received">
            <img
              :src="'https://resource.yuedaoec.com/imagehkj/beautiful-expo/received.png'"
              alt=""
            />
            <p style="font-size:0.5rem;color:#999">活动已结束</p>
          </div>
        </div>
       
      </div>
      <p class="txt" v-if="statusIndex > 0">
        到达美博会现场后,请工作人员进行操作确认!请各位家人不要随意点击哦!
      </p>
    </div>
    <!-- 我的成就 -->
    <div class="tap">
      <img
        :src="'https://resource.yuedaoec.com/imagehkj/beautiful-expo/beautiful-expo2.jpg?1'"
        alt=""
      />
      <div class="back">
        <div class="achievement">
          <span>{{ receiveGiftNum ? receiveGiftNum : 0 }}</span>
          <span>{{ newDistributorNum ? newDistributorNum : 0 }}</span>
        </div>
        <div class="share">
          <span  @click="share()"></span>
          <span @click="share()"></span>
        </div>
      </div>
    </div>
    <div class="footer">
      <img
        :src="'https://resource.yuedaoec.com/imagehkj/beautiful-expo/beautiful-expo3.jpg'"
        alt=""
      />
      <div class="times">
        <span>CODE</span>
        <span>激活时间</span>
      </div>
      <div class="code">
        <div
          class="codes"
          v-for="(item, index) in newDistributorRecordVoList"
          :key="index"
        >
          <span>{{ item.code }}</span>
          <span>{{ item.activeDate }}</span>
        </div>
      </div>
    </div>
    <van-popup class="alertC" v-model="show" :closeable="close">
      <img
        :src="'https://resource.yuedaoec.com/imagehkj/beautiful-expo/rule.png'"
        alt=""
      />
    </van-popup>
  </div>
</template>
<script>
import { NavBar, Swipe, SwipeItem, Dialog, Popup, Toast, Loading } from "vant";
import hybrid from "hybridify-js";
import create from "../../utils/create-basic";
import axios from "axios";
import qs from "qs";
import hy from 'hybridify-js';
export default create({
  name: "diamond-game",
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Popup.name]: Popup,
    [Loading.name]: Loading,
  },
  data() {
    return {
      platform: null,
      userKey: "",
      userId: "",
      userCode: "",
      statusIndex: "",
      newDistributorNum: 0, //邀请新人数
      receiveGiftNum: 0, //领取礼包数
      newDistributorRecordVoList: [], //邀请的人的code&时间
      show: false, //控制弹出层
      close: true,
      enroll: true, //控制报名按钮
      tengift: true, //控制领取按钮
      redBlueCardStatus: '', //判断红蓝卡
      actime:'',
      actime2:'',
    };
  },
  created() {
    this.isDuringDate("2021/05/01", "2021/05/08");
    this.isDuringDate2("2021/05/06", "2021/05/08");
    this.userKey = this.getUrlParam("uuid");
    this.userId = this.getUrlParam("uid");
    this.getCode();
    this.getDistributorCard();
    this.getBeautyExpoInits();
  },

  mounted() {},
  methods: {
    isDuringDate: function (beginDateStr, endDateStr) {
      var curDate = new Date(),
        beginDate = new Date(beginDateStr),
        endDate = new Date(endDateStr);
      if (curDate >= beginDate && curDate <= endDate) {
        this.actime=2
         console.log(this.actime);
      }else if(curDate<beginDate){
        this.actime=1
      }
      else{
        this.actime=3
        console.log(this.actime);
      }
     
    },
    isDuringDate2: function (beginDateStr, endDateStr) {
      var curDate = new Date(),
        beginDate = new Date(beginDateStr),
        endDate = new Date(endDateStr);
      if (curDate >= beginDate && curDate <= endDate) {
        this.actime2=true
      }
    },

    //判断红蓝卡
    getDistributorCard: function () {
      const self = this;
      let params = {
        userKey: self.userKey,
      };
      axios
        .get(
          "https://appdist.yuedaoec.com/distributor/userKey/distributor-card.distribute",
          { params: params }
        )
        .then((json) => {
          console.log(json);
          if (json.data.code == 10000) {
            let data = json.data.res;
            let redBlueCardStatus = data.redBlueCardStatus;
            self.redBlueCardStatus = redBlueCardStatus;
          }
        });
    },
    //报名
    Sign() {
      console.log(this.userCode);
      if (this.enroll && this.redBlueCardStatus == 2) {
        this.enroll = false;
        Dialog.confirm({
          message: "确认报名?",
        })
          .then(() => {
            let self = this;
            let params = {};
            params.url =
              process.env.VUE_APP_REQUEST_PRODUCT_URL +
              "beautifulExpo/sign.shop";
            params.type = "post";
            params.headers = {
              "content-type": "application/x-www-form-urlencoded",
            };
            console.log(self.userCode);
            params.data = qs.stringify({
              code: this.userCode,
              userId: this.userId,
              userKey: this.userKey,
            });
            self.createAjax(params, function (json) {
              console.log("报名返回值", json);
              if (json.code === "10000") {
                Toast("报名成功");
                setTimeout(() => {
                  self.statusIndex = 1;
                }, 1000);
              }
            });
          })
          .catch(() => {
            this.enroll = true;
          });
      } else {
        Dialog.alert({
          message: "限红卡用户参与!",
        }).then(() => {
        });
      }
    },
    //初始化页面
    getBeautyExpoInits() {
      let self = this;
      let params = {};
      params.url =
        process.env.VUE_APP_REQUEST_PRODUCT_URL +
        "beautifulExpo/beautyExpoInit.shop";
      params.type = "get";
      params.data = {
        userId: this.userId,
      };
      self.createAjax(params, function (json) {
        if (json.code === "10000") {
          console.log("按钮状态", json);
          self.statusIndex = json.res.buttonStatus;
          self.newDistributorNum = json.res.newDistributorNum;
          self.receiveGiftNum = json.res.receiveGiftNum;
          if (json.res.newDistributorRecordVoList.length > 0) {
            self.newDistributorRecordVoList = self.newDistributorRecordVoList.concat(
              json.res.newDistributorRecordVoList
            );
          }
        }
      });
    },

    //获取code
    getCode() {
      let self = this;
      let params = {};
      params.url = "https://store.yuedaoec.com/user/getCodeByUid.user";
      params.type = "get";
      params.data = {
        uid: self.userId,
      };
      self.createAjax(params, function (json) {
        console.log("code", json);
        if (json.code === "10000") {
          self.userCode = json.res.code;
        }
      });
    },

    //领取十个礼包
    getReceivedGift() {
      if (this.tengift &&this.actime2) {
        this.tengift = false;
        console.log("已领取礼包后按钮状态为:" + this.tengift);
        Dialog.confirm({
          message: "请确认你是工作人员?",
        })
          .then(() => {
            let self = this;
            let params = {};
            params.url =
              process.env.VUE_APP_REQUEST_PRODUCT_URL +
              "beautifulExpo/receivedgift.shop";
            params.type = "get";
            params.data = {
              userId: this.userId,
            };
            self.createAjax(params, function (json) {
              if (json.code === "10000") {
                Toast("领取成功");
                setTimeout(() => {
                  self.getBeautyExpoInits();
                  self.tengift = true;
                  console.log("礼包领取完毕跳入下一个状态" + self.tengift);
                }, 1000);
              }
            });
          })
          .catch(() => {
            this.tengift = true;
            console.log("取消领取十个礼包" + this.tengift);
          });
      }else{
        Dialog.alert({
          message:"活动开始时间为5月6号-5月8号"
        })
      }
    },

    //弹出规则
    rules() {
      this.show = !this.show;
    },
    //跳转开卡页面
    share() {
      if (this.redBlueCardStatus == 2) {
        hybrid.nav.push("https://appdist.yuedaoec.com/h5/opencardQRcode.html");
      } else {
        Dialog.alert({
          message: "限红卡用户参与!",
        })
      }
    },
    unstart(){
      if (this.redBlueCardStatus == 2) {
         Dialog.alert({
          message: "报名时间：5月1日-8日<br>活动时间：5月6日-8日",
        })
        }
        else{
           Dialog.alert({
          message: "限红卡用户参与!",
        })
      }
    }
    //分享微信
  //    shareWeChat(type) {
  //               let obj = {
  //                   "url": 'https://appdist.yuedaoec.com/h5/activity/awaken202104.html?platform=tingmimi&uid=' + this.userId,
  //                   "type": type,
  //                   "title": '喊TA回家',
  //                   "description": '唤醒直系代理拿好礼~',
  //                   "image": 'https://resource.yuedaoec.com/image/awaken202104/awaken202104.png'
  //               }

  //               hy.app.toShare(obj);
  //           },
  },
});
</script>
<style scoped lang="scss">
img {
  display: block;
}
.page {
  width: 100%;
  overflow: hidden;
  .top {
    width: 100%;
    position: relative;
    .pic1 {
      width: 100%;
      height: auto;
    }
    .rule {
      position: absolute;
      top: 1.31rem;
      width: 1.41rem;
      height: 0.7rem;
      right: 0;
      span {
        z-index: 1;
      }
    }
    .top-pic {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 1.75rem;
      width: 4.16rem;
      height: 1.04rem;
      .received {
        position: relative;
        p {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          font-size: 0.4rem;
          font-family: Alibaba PuHuiTi;
          font-weight: 500;
          color: #ff0c52;
          text-align: center;
          line-height: 1.04rem;
        }
      }
    }
    .txt {
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 0.7rem;
      width: 7.11rem;
      font-size: 0.35rem;
      font-family: Alibaba PuHuiTi;
      font-weight: 500;
      color: #ff3061;
      line-height: 0.43rem;
      text-align: center;
    }
  }
  .tap {
    position: relative;
    img {
      width: 100%;
      height: auto;
    }
    .back {
      width: 100%;
      height: 11.107rem;
      position: absolute;
      left: 0;
      top: 0;
      .achievement {
        width: 7.93rem;
        margin: 1.8rem 0rem 0 1.07rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.96rem;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        color: #ff1357;
        span {
          display: inline-block;
          width: 3.74rem;
          height: 3.1rem;
          line-height: 3.8rem;
          text-align: center;
        }
      }
      .share {
        height: 0.91rem;
        margin-top: 2.8rem;
        margin-left: 0.95rem;
        margin-right: 0.91rem;
        display: flex;
        justify-content: space-between;
        span {
          display: inline-block;
          width: 3.92rem;
          height: 0.91rem;
        }
      }
    }
  }
  .footer {
    position: relative;
    img {
      width: 100%;
      height: auto;
    }
    .times {
      position: absolute;
      top: 1.68rem;
      width: 5.1rem;
      left: 50%;
      transform: translate(-50%);
      display: flex;
      justify-content: space-between;
      span {
        font-size: 0.35rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #c8a09f;

        margin-right: 1rem;
      }
    }
    .code {
      position: absolute;
      top: 2.61rem;
      left: 50%;
      transform: translate(-50%);
      max-height: 6rem;
      overflow: scroll;
      .codes {
        height: 0.5rem;
        width: 5.1rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.37rem;
        span {
          display: inline-block;
          font-size: 0.4rem;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #ff1356;
        }
        span:last-child {
          font-weight: 500;
        }
      }
    }
  }
  .van-popup {
    width: 90%;
    background: none;
    /deep/ .van-popup__close-icon--top-right {
    top: -0.1rem;
    right: 0.42667rem;
}
  }
}
</style>
<style scoped>
@import "../../assets/css/fonts.css";

* {
  padding: 0;
  margin: 0;
}

body,
html {
  font-size: 13px;
  color: #333333;
}

img {
  display: block;
  max-width: 100%;
}
</style>
