<template>
  <div class="page">
    <div class="overlayer" @touchmove.prevent v-if="showMask"></div>
    <div v-if="isweixinBrowser" class="open-browser">
      <img src="./assets/openbrowser.png" alt="" />
    </div>
    <div class="loading-con" v-if="showLoading">
      <van-loading type="spinner" color="#aaa" size="25px" class="loading" />
    </div>
    <!-- 内容 -->
    <transition name="fade">
      <div class="content" v-if="!showLoading">
        <!--规则和记录  -->
        <img
          class="content-right-top-img"
          src="./assets/rule.png"
          alt=""
          @click="ruleTouch"
        />
        <lottery-rule
          :rulesShow="rulesShow"
          @closeRules="closeRules"
        ></lottery-rule>
        <img
          class="content-right-bottom-img"
          @click="recordingTouch"
          src="./assets/recording.png"
          alt=""
        />
        <record-lottery
          :rulesShow2="rulesShow2"
          @closeRules2="closeRules2"
          ref="mychild"
        ></record-lottery>
        <!-- 抽奖 -->
        <div class="content-lottery">
          <div
            :class="['prize-item', currentIndex == index ? 'active' : '']"
            v-for="(item, index) in prizeList"
            :key="item"
          ></div>
          <div class="content-lottery-span">
            <span>{{ lotteryNum }}</span>
          </div>
          <div class="content-lottery-start">
            <img
              src="./assets/login-lottery-btn.png"
              alt=""
              @click="loginLottery"
              v-if="!isLogin"
            />
            <img
              src="./assets/touch-lottery.png"
              alt=""
              @click="statrtLottery"
              v-else
            />
          </div>
        </div>
        <!-- 登录抽奖点击出现的弹窗 -->
        <transition name="plus-icon">
          <div class="content-dialog-lottery" v-if="showDialog">
            <div class="content-dialog-lottery-close">
              <img src="./assets/close.png" alt="" @click="closeDialog" />
            </div>
            <div class="content-dialog-lottery-info">
              <van-form class="form">
                <van-field
                  v-model="phoneValue"
                  type="phoneValue"
                  placeholder="请输入手机号"
                />
                <van-field
                  v-model="codeValue"
                  center
                  clearablelabel="短信验证码"
                  placeholder="请输入短信验证码"
                  style="margin-top：1rem"
                />
                <van-button
                  type="default"
                  :disabled="btndisabled"
                  class="sendCodeValue"
                  :class="{ sendcodeValue2: ischange }"
                  @click="getCode"
                  >{{ yzm }}</van-button
                >
                <div
                  style="margin: 16px"
                  class="login-btn"
                  type="info"
                  @click="loginTouch"
                ></div>
              </van-form>
            </div>
          </div>
        </transition>
        <!-- 输入手机号手机号未注册 -->
        <div v-if="isShowRegister">
          <no-register @close="getRegister"></no-register>
        </div>
        <!-- 中奖填写信息 -->
        <transition name="plus-icon">
          <div v-if="showWinLottery">
            <win-lottery
              @close="getWinLottery"
              :winLotteryData="winLotteryData"
              :uid="uid"
            >
            </win-lottery>
          </div>
        </transition>
        <!-- 结束弹窗 -->
        <div class="alter" v-if="overalter" @click="tapalter">
          <img src="./assets/alter.png" alt="" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { NavBar, Toast, Field, Button, Form, Dialog, Loading } from "vant";
import hybrid from "hybridify-js";
import noRegister from "./component/noRegister";
import winLottery from "./component/winLottery";
import GLRandom from "./utils/GLRandom";
import WinLottery from "./component/winLottery.vue";
import { prizeData } from "./utils/shopData";
import { isPoneAvailable } from "./utils/index.js";
import lotteryRule from "./component/lotteryRule.vue";
import recordLottery from "./component/recordLottery.vue";
export default {
  name: "newUserLottery",
  data() {
    return {
      showMask: true,
      showDialog: false,
      phoneValue: null,
      codeValue: null,
      isShowRegister: false,
      isLogin: false,
      currentIndex: 0,
      prizeList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      timer: "",
      lotteryNum: 0,
      showWinLottery: false,
      winLotteryIndex: null,
      winLotteryData: {},
      uid: null,
      prizeIndex: null,
      shopcode: "",
      rulesShow: false,
      rulesShow2: false,
      imgUrl: [
        require("./assets/bg.png"),
        require("./assets/bg-winl.png"),
        require("./assets/login-lottery-btn.png"),
        require("./assets/dialog-bg.png"),
        require("./assets/login-btn.png"),
        require("./assets/login-lottery-btn.png"),
        require("./assets/login-lottery.png"),
        require("./assets/lottery.png"),
        require("./assets/no-register.png"),
        require("./assets/download-app.png"),
        require("./assets/rule.png"),
        require("./assets/recording.png"),
        require("./assets/close.png"),
        require("./assets/openbrowser.png"),
      ],
      showLoading: true,
      btndisabled: false,
      yzm: "获取验证码",
      time: 60,
      ischange: false,
      showLoading: false,
      isweixinBrowser: false,
      openapp: "",
      userkey: "",
      overalter:true
    };
  },
  components: {
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Form.name]: Form,
    [Loading.name]: Loading,
    noRegister,
    winLottery,
    lotteryRule,
    recordLottery,
  },
  async mounted() {
    this.checkCode();
    await this.loadImg();
    await this.loaShopImg();
    await this.sleep(1000);

    // this.iswexinBrowser();
    this.removeLocal();
  },
  methods: {
    tapalter(){
      this.overalter = false
      this.showMask = false
    },
    sleep(time) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    },
    loadImg() {
      return new Promise(async (resolve) => {
        let imgLoad = 0;
        let imgCount = this.imgUrl.length;
        for (let i = 0; i < this.imgUrl.length; i++) {
          let bgImg = new Image();
          bgImg.src = this.imgUrl[i];
          bgImg.onload = () => {
            imgLoad++;
            if (imgLoad === imgCount) {
              this.showLoading = false;
              //   console.log("加载完毕");
              resolve();
            }
          };
        }
      });
    },
    loaShopImg() {
      return new Promise(async (resolve) => {
        let shopimgLoad = 0;
        let shopimgCount = prizeData.length;
        for (let j = 0; j < prizeData.length; j++) {
          let shopimg = new Image();
          shopimg.src = prizeData[j].imgsrc;
          shopimg.onload = () => {
            shopimgLoad++;
            if (shopimgLoad === shopimgCount) {
              resolve();
            }
          };
        }
      });
    },
    closeRules() {
      this.rulesShow = false;
    },
    closeRules2() {
      this.rulesShow2 = false;
    },
    checkCode() {
      this.overalter = true
      this.showMask = true
      if (!localStorage.getItem("uid") || !localStorage.getItem("userKeyC3")) {
        // this.showMask = true;
        // this.showDialog = true;
        this.isLogin = false;
      } else {
        let uid = localStorage.getItem("uid");
        // console.log(uid);
        // Toast('你已登录过')
        this.showMask = false;
        this.showDialog = false;
        this.isLogin = true;
      }

      let url = location.search;
      let str = url.substr(1);
      //   console.log(str);
      let tcode = str.split("=");
      let code = tcode[1];
      this.shopcode = code;
      let strs = str.split("&");
      this.openapp = strs[1];
      let openapp = strs[1];
      if (openapp) {
        this.iswexinBrowser();
      }
      let params = {
        type: "get",
        url: "api/lottery/checkCode.lottery",
        userToken: false,
        query: {
          code: this.shopcode,
        },
      };
      this.reqwest(params)
        .then((res) => {
          if (res.result.is_used === false) {
            this.lotteryNum = 1;
          } else {
            // console.log(res.result);
            Toast("二维码已被使用");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 规则点击
    ruleTouch() {
      //   console.log("规则点击");
      this.rulesShow = true;
    },
    // recored点击
    recordingTouch() {
      //   console.log("内容点击");
      if (localStorage.getItem("uid") && localStorage.getItem("userKeyC3")) {
        this.rulesShow2 = true;
        this.$refs.mychild.lotteryRecord();
      } else {
        Toast("请登录");
      }
    },
    // 登录抽奖点击
    loginLottery() {
       this.overalter = true
      // if(!localStorage.getItem("uid")){
      this.showMask = true;
      this.showDialog = false;
      //  }else{
      //     let uid = localStorage.getItem("uid");
      //     console.log(uid)
      //     // Toast('你已登录过')
      //      this.showMask = false
      //      this.showDialog = false
      //      this.isLogin = true
      // }
    },
    // 关闭登录抽奖的弹窗
    closeDialog() {
      this.showMask = false;
      this.showDialog = false;
      this.phoneValue = null;
      this.codeValue = null;
    },
    // closeDialogReg(){
    //      this.showMask = false;
    //      this.isShowRegister = false;
    // },
    // 关闭未注册弹窗
    getRegister(val) {
      this.isShowRegister = val;
      this.showMask = val;
    },
    // 关闭收货地址
    getWinLottery(val) {
      this.showWinLottery = val;
      this.showMask = val;
    },
    // 获取验证码
    getCode() {
         this.overalter = true
         this.showMask = true
      if (isPoneAvailable(this.phoneValue)) {
        //是手机号
        let params = {
          type: "get",
          url: "api/lottery/checkRegisterByMobile.user",
          userToken: false,
          query: {
            mobile: this.phoneValue,
          },
        };
        this.reqwest(params)
          .then((res) => {
            // console.log(res.result);
            if (res.result.status === 1000) {
              // console.log('已注册')
              let params = {
                type: "get",
                url: "api/lottery/sendVailateCode.user",
                userToken: false,
                query: {
                  mobile: this.phoneValue,
                },
              };
              this.reqwest(params)
                .then((res) => {
                  //   console.log(res.result);
                  if (res.result.status === 1000) {
                    Toast("获取验证码成功");
                    this.ischange = true;
                    this.btndisabled = true;
                    let i = 60;
                    let timer = setInterval(() => {
                      this.yzm = "重新获取验证码" + i + "s";
                      i--;
                      if (i < 0) {
                        this.btndisabled = false;
                        this.yzm = "获取验证码";
                        clearInterval(timer);
                      }
                    }, 1000);
                  } else {
                    //    Toast('获取验证码失败')
                    Toast(res.result.msg);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              // Toast(res.result.msg);
              Toast(res.result.msg);
              this.showMask = true;
              this.isShowRegister = true;
              this.showDialog = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Toast("请输入正确的11位手机号");
      }
    },
    // 登录点击
    loginTouch() {
      if (isPoneAvailable(this.phoneValue)) {
        //是手机号
        if (this.phoneValue && this.codeValue) {
          //   console.log(this.phoneValue);
          //   console.log(this.codeValue);
          let params = {
            type: "get",
            url: "api/lottery/signInByVailateCode.user",
            userToken: false,
            query: {
              mobile: this.phoneValue,
              code: this.codeValue,
            },
          };
          this.reqwest(params)
            .then((res) => {
              //   console.log(res.result);
              if (res.result.code == "10000") {
                if (res.result.res.isOnlyO2oUser) {
                  this.showMask = false;
                  this.showDialog = false;
                  setTimeout(() => {
                    Toast("请先前往庭秘密App完成开卡！");
                  }, 500);
                  return;
                }
                Toast("登录成功");
                this.showMask = false;
                this.showDialog = false;
                this.isLogin = true;
                this.uid = res.result.res.uid;
                this.userkey = res.result.res.userKey;
                console.log(res.result.res);
                localStorage.setItem("uid", this.uid);
                localStorage.setItem("userKeyC3", this.userkey);
              } else {
                Toast("登录失败");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Toast("验证码或者手机号不能为空");
        }
      }
    },

    // 点击抽奖
    statrtLottery() {
      if (this.lotteryNum <= 0) {
        Toast("您已没有抽奖机会");
        return;
      } else {
        let uid = localStorage.getItem("uid");
        let userkey = localStorage.getItem("userKeyC3");
        let params = {
          type: "get",
          url: "api/lottery/lotteryStart.lottery",
          userToken: false,
          query: {
            uid: uid,
            userKey: userkey,
            code: this.shopcode,
          },
        };
        this.reqwest(params)
          .then((res) => {
            // console.log(res, "中奖");
            if (res.result.data.prizeIndex != -1) {
              this.prizeIndex = res.result.data.prizeIndex;
              let prizeCode = res.result.data.prizeCode;
              //   console.log(this.prizeIndex);
              this.lotteryNum--;
              if (this.timer) clearInterval(this.timer);
              this.currentIndex = 0;
              let startIndex = 0,
                endIndex = this.prizeIndex,
                length = 8,
                cycles = 6,
                speed = [50, 100, 200],
                intervalNumber = length * cycles + (endIndex - startIndex),
                remainInterval = intervalNumber;
              //   console.log("endIndex=" + endIndex);
              createInterval.call(this, speed[0], () => {
                this.getLottery(endIndex);
                if (remainInterval < 8) {
                  clearInterval(this.timer);
                  createInterval.call(this, speed[1], () => {
                    if (remainInterval < 5) {
                      clearInterval(this.timer);
                      createInterval.call(this, speed[2], () => {
                        if (remainInterval <= 0) {
                          if (prizeCode != -1) {
                            setTimeout(() => {
                              this.showGetLottery();
                            }, 300);
                          } else {
                            Dialog.alert({
                              message: "抱歉，奖品已赠完~",
                            }).then(() => {
                              // on close
                            });
                          }
                        }
                      });
                    }
                  });
                }
              });
              function createInterval(speed, fn) {
                this.timer = setInterval(() => {
                  remainInterval--;
                  if (remainInterval <= 0) clearInterval(this.timer);
                  this.currentIndex++;
                  if (this.currentIndex > length - 1) this.currentIndex = 0;
                  if (fn) fn();
                }, speed);
              }
            } else {
              Toast("商品已送完");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        // console.log(this.timer)
      }
    },
    //中奖之后的执行
    getLottery(index) {
      this.showMask = false;
      this.showWinLottery = false;
      //   console.log("index", index);
      for (let i of prizeData) {
        if (index === i.shopdataindex) {
          this.winLotteryData = i;
        }
      }
    },
    showGetLottery() {
      this.showMask = true;
      this.showWinLottery = true;
    },
    removeLocal() {
      let uid = localStorage.getItem("uid");
      if (uid) {
        setTimeout(() => {
          window.localStorage.removeItem("uid");
        }, 604800000);
      }
      let userkey = localStorage.getItem("userKeyC3");
      if (userkey) {
        setTimeout(() => {
          window.localStorage.removeItem("userKeyC3");
        }, 604800000);
      }
    },
    iswexinBrowser() {
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf("micromessenger") != -1,
        a = 123;
      if (isWeixin) {
        // console.log("是微信浏览器");
        this.isweixinBrowser = true;
        this.showMask = true;
        if (!this.openapp) {
          window.location.href =
            window.location.origin +
            window.location.pathname +
            "?tCode=" +
            this.shopcode +
            "&openApp=true";
        }
        return true;
      } else {
        // console.log("不是微信浏览器");
        location.href = `tinsecretapp://`;
        return false;
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.page {
  width: 100%;
  .loading-con {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    //  padding-top:100px;
    box-sizing: border-box;
    .loading {
      margin-top: -50px;
    }
  }
  .overlayer {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: #000;
    opacity: 0.3;
  }
  .open-browser {
    position: fixed;
    top: 0;
    left: 1.6rem;
    z-index: 30;
    width: 8rem;
    img {
      width: 100%;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .content {
    height: 100vh;
    min-height: 17.6rem;
    background-image: url("./assets/bg.png");
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% auto;
    background-color: #ffc7e1;
    position: relative;
    // animation: show_content 0.3s ease-in-out forwards;
    @keyframes show_content {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .alter {
      position: absolute;
      width: 8rem;
      top: 240px;
      left: 40px;
      z-index: 666;
      img {
        width: 100%;
      }
    }
    .loading {
      position: absolute;
      top: 40%;
      left: 40%;
      z-index: 10;
    }
    .content-right-top-img {
      position: absolute;
      right: 0px;
      top: 0.3rem;
      width: 1rem;
    }
    .content-right-bottom-img {
      position: absolute;
      right: 0px;
      top: 1rem;
      width: 1rem;
    }
    .content-lottery {
      position: absolute;
      top: 9.5rem;
      left: 0.5rem;
      width: 9rem;
      height: 7.98rem;
      background: url("./assets/lottery.png") no-repeat top center;
      background-size: 100% auto;
      margin: 0 auto;
    }
    .content-lottery-span {
      position: absolute;
      top: -0.23rem;
      left: 4rem;
      span {
        font-size: 18px;
        color: #fff;
      }
    }
    .content-lottery-start {
      position: absolute;
      left: 2.7rem;
      bottom: 2.7rem;
      img {
        width: 3.6rem;
      }
    }
    .content-dialog-lottery {
      position: absolute;
      top: 2.9rem;
      left: 1rem;
      width: 80%;
      z-index: 15;
      height: 11rem;
      background-image: url("./assets/login-lottery.png");
      background-repeat: no-repeat;
      background-position: center top;
      background-size: 100% auto;
      .content-dialog-lottery-close {
        position: absolute;
        right: 0.6rem;
        top: -1rem;
        img {
          width: 24px;
          height: 24px;
        }
      }
      .content-dialog-lottery-info {
        position: absolute;
        width: 84%;
        top: 4rem;
        left: 0.7rem;
      }
    }
    .form {
      position: relative;
    }
    .sendCodeValue {
      position: absolute;
      right: 0;
      top: 1.46rem;
      border: 0px;
    }
    .sendcodeValue2 {
      position: absolute;
      right: 0;
      top: 1.46rem;
      border: 0px;
      /deep/ .van-button__text {
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ccc;
      }
    }
    .login-btn {
      background: url("./assets/login-btn.png");
      background-size: cover;
      height: 1.2rem;
      width: 90%;
      background-repeat: no-repeat;
      background-position: center top;
      background-size: 100% auto;
    }
    .prize-item {
      position: absolute;
      width: 1.86rem;
      height: 1.86rem;
      top: 1.2rem;
      left: 0.44rem;
      color: #fff;
      text-align: center;
      line-height: 1.91rem;
      font-size: 14px;
      &.active {
        border-radius: 10px;
        background-color: #fff;
        opacity: 0.6;
      }
      &:nth-child(2) {
        left: 2.52rem;
        top: 1.24rem;
      }
      &:nth-child(3) {
        left: 4.6rem;
        top: 1.2rem;
        width: 4rem;
      }
      &:nth-child(4) {
        top: 3.36rem;
        left: 6.75rem;
      }
      &:nth-child(5) {
        top: 5.46rem;
        left: 6.75rem;
      }
      &:nth-child(6) {
        top: 5.46rem;
        left: 4.6rem;
      }

      &:nth-child(7) {
        top: 5.46rem;
        width: 4rem;
      }
      &:nth-child(8) {
        top: 3.34rem;
      }
    }
  }
}

.van-cell--center {
  margin-top: 0.3rem;
  width: 50%;
  font-size: 12px;
}
.van-button__content {
  width: 2.3rem;
}
.van-button__text {
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #f61750;
}

.plus-icon-enter-active {
  transition: opacity 0.3s;
}
.plus-icon-enter {
  opacity: 0.4;
}
.plus-icon-leave-active {
  transition: opacity 0.3s;
}
.plus-icon-leave-to {
  opacity: 0;
}

.van-cell {
  padding: 0.26667rem 0.32667rem;
}
</style>