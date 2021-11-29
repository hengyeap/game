<template>
  <div class="body">
    <van-nav-bar
      fixed
      :style="'background-color:#fff' + ';color: #fff;z-index: 9999'"
      :title="'7周年全员礼'"
    >
      <van-icon
        @click="tapBack"
        color="#888"
        size="22"
        name="arrow-left"
        slot="left"
      />
      <img
        @click="showPopup"
        slot="right"
        src="https://public.tingmimi.net/image/poster9/share-icon.png"
        alt=""
        class="share-icon"
      />
    </van-nav-bar>
    <div class="overlayer" @touchmove.prevent v-if="showRecordImg"></div>
    <div class="page-margin pageindex">
      <img :src="imgUrl" alt="" />
      <div class="get-btn-test" @click="ljGet"></div>
      <div
        class="open-btn-receive"
        @click="openLink"
        v-if="this.getUrlParam('source')"
      ></div>
      <div
        class="download-btn"
        @click="downLink"
        v-if="this.getUrlParam('source')"
      ></div>
    </div>
    <div class="record-btn" @click="recordClick"></div>
    <div class="record-dialog" @click="closeRecord" v-if="showRecordImg">
      <img
        src="https://public.tingmimi.net/image/sevenyeargift/tingmimi/record.png"
        alt=""
      />
      <div class="close-dialog"></div>
    </div>
    <van-popup v-model="shareShow" position="bottom" :style="{ height: '25%' }">
      <div class="share-box">
        <div class="share-weChat">
          <img
            @click="shareWeChat('wechat')"
            src="https://public.tingmimi.net/image/poster9/weChat.png"
            alt=""
            class="weChat-icon"
          /><br />微信
        </div>
        <div class="share-weChatCircle">
          <img
            @click="shareWeChat('circle')"
            src="https://public.tingmimi.net/image/poster9/weChatCircle.png"
            alt=""
            class="weChatCircle-icon"
          /><br />朋友圈
        </div>
      </div>
      <div @click="hiddenshow" class="close">取消</div>
    </van-popup>
  </div>
</template>
<script>
import { NavBar, Icon, Toast, Loading, Popup } from "vant";
import hy from "hybridify-js";
import postUserTrack from '../../post-user-track'
// import vConsole from 'vconsole'
// new vConsole()
export default {
  name: "seven-year-gift",
  data() {
    return {
      isindex: true,
      isOne: false,
      isTwo: false,
      isThree: false,
      isFour: false,
      isFive: false,
      isSix: false,
      showMask: false,
      showRecordImg: false,
      shareShow: false,
      platform: "tingmimi",
      code: "",
      uid: null,
      imgindex:
        "https://public.tingmimi.net/image/sevenyeargift/tingmimi/index.jpg",
      imgUrl: "",
      img1: "https://public.tingmimi.net/image/sevenyeargift/tingmimi/1.jpg",
      img2: "https://public.tingmimi.net/image/sevenyeargift/tingmimi/2.jpg",
      img3: "https://public.tingmimi.net/image/sevenyeargift/tingmimi/3.jpg",
      img4: "https://public.tingmimi.net/image/sevenyeargift/tingmimi/4.jpg",
      img5: "https://public.tingmimi.net/image/sevenyeargift/tingmimi/5.jpg",
      img6: "https://public.tingmimi.net/image/sevenyeargift/tingmimi/6.jpg",
      showBtn: true,
      imgtaiwan:
        "https://public.tingmimi.net/image/sevenyeargift/newtingtaiwan/1.jpg",
      imgxjp:
        "https://public.tingmimi.net/image/sevenyeargift/tingsingapore/1.jpg",
      imgmalai:
        "https://public.tingmimi.net/image/sevenyeargift/newtingmalaysia/1.jpg",
      imgsms:
        "https://public.tingmimi.net/image/sevenyeargift/tingmimi/sms.jpg",
    };
  },
  components: {
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Loading.name]: Loading,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
  },
  mounted() {
    this.getPlatFrom();
    // this.checkuserisresive();
    this.getCode();
    if (this.getUrlParam("source")) {
      this.imgUrl = this.imgsms;
      this.showBtn = false;
    } else {
      this.showBtn = true;
    }
     postUserTrack({
      userId: this.getUrlParam("uid")+(this.getUrlParam("source")?'|'+this.getUrlParam("source"):''),
      operateType: "0013.0000.0000.0000.0002",
    });
  },
  methods: {
    checkuserisresive() {
      let params = {
        type: "get",
        url: "api/sevenGift/checkGiftCode",
        query: {
          code: this.code,
          platform: this.platform,
        },
      };
      this.reqwest(params)
        .then((res) => {
          //   console.log(res.result);
          console.log(res);
          if (res.result.code == "10000") {
            let gift = res.result.res.giftId;
            console.log(gift);
            let status = res.result.res.status;
            if (status == 0) {
            } else {
              if (gift == 331) {
                this.imgUrl = this.img1;
                this.showBtn = false;
              } else if (gift == 332) {
                this.showBtn = false;
                this.imgUrl = this.img2;
              } else if (gift == 333) {
                this.showBtn = false;
                this.imgUrl = this.img3;
              } else if (gift == 334) {
                this.showBtn = false;
                this.imgUrl = this.img4;
              } else if (gift == 335) {
                this.showBtn = false;
                this.imgUrl = this.img5;
              } else if (gift == 336) {
                this.showBtn = false;
                this.imgUrl = this.img6;
              } else if (gift == 351) {
                this.showBtn = false;
                this.imgUrl = this.imgtaiwan;
              } else if (gift == 370) {
                this.showBtn = false;
                this.imgUrl = this.imgmalai;
              } else if (gift == 365) {
                this.showBtn = false;
                this.imgUrl = this.imgxjp;
              }
            }
          } else {
            Toast(res.result.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ljGet() {
      if (!this.showBtn) return;
      this.showBtn = false;
      let params = {
        type: "get",
        url: "api/sevenGift/receiveSevenYearGift",
        query: {
          code: this.code,
          platform: this.platform,
        },
      };
      this.reqwest(params)
        .then((res) => {
          console.log(res);
          if (res.result.code == "10000") {
            this.checkuserisresive();
            this.showBtn = true;
            // 0013.0000.0000.0000.0002
            // source=sms
          } else {
            Toast(res.result.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    recordClick() {
      this.showRecordImg = !this.showRecordImg;
    },
    closeRecord() {
      this.showRecordImg = false;
    },
    hiddenshow() {
      this.shareShow = false;
    },
    showPopup() {
      this.shareShow = true;
    },
    getPlatFrom() {
      if (this.getUrlParam("platform")) {
        this.platform = this.getUrlParam("platform");
      } else {
        this.platform = "tingmimi";
      }
    },
    shareWeChat(type) {
      this.uid = this.getUrlParam("platform");
      let obj = {
        url:
          "https://apph5.yuedaoec.com/seven-year-gift.html?uid=" +
          this.uid +
          "&appType=wx",
        type: type,
        title: "你有一份周年庆礼包！",
        description: "请及时领取",
        image:
          "https://public.tingmimi.net/image/sevenyeargift/tingmimi/share.png",
      };

      hy.app.toShare(obj);
    },
    tapBack() {
      hy.nav.back();
    },
    getCode() {
      this.imgUrl = this.imgindex;
      this.uid = this.getUrlParam("uid");
      let params = {
        type: "get",
        url: "user/getCodeByUid.user",
        query: {
          uid: this.uid,
        },
      };
      this.reqwest(params)
        .then((res) => {
          console.log(res);
          if (res.result.code == "10000") {
            this.code = res.result.res.code;
            console.log(this.code);
            this.checkuserisresive();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    downLink() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      if (isAndroid) {
        if (u.indexOf("HUAWEI") != -1) {
          // 说明是华为手机
          window.location.href =
            "https://appgallery.cloud.huawei.com/uowap/index.html#/detailApp/C100723693";
        } else {
          window.location.href =
            "http://a.app.qq.com/o/simple.jsp?pkgname=com.tst.tinsecret&fromcase=40003";
        }
      }
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        window.location.href =
          "https://itunes.apple.com/us/app/%E5%BA%AD%E7%A7%98%E5%AF%86/id1320395356?l=zh&ls=1&mt=8";
      }
    },
    openLink() {
      location.href = `tinsecretapp://activity?url=https://apph5.yuedaoec.com/seven-year-gift.html`;
    },
  },
};
</script>
<style scoped lang='scss'>
.body {
  position: relative;
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
  .get-btn-test {
    width: 196px;
    height: 50px;
    position: absolute;
    top: 620px;
    left: 90px;
    border-radius: 25px;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.01);
  }
  .open-btn-receive {
    width: 196px;
    height: 50px;
    position: absolute;
    top: 586px;
    left: 90px;
    border-radius: 25px;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.01);
  }
  .download-btn {
    width: 196px;
    height: 50px;
    position: absolute;
    top: 648px;
    left: 90px;
    border-radius: 25px;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.01);
  }
  .record-btn {
    width: 64px;
    height: 20px;
    position: absolute;
    right: 0px;
    top: 46px;
    border-top-left-radius: 10px 10px;
    border-bottom-left-radius: 10px 10px;
    z-index: 5;
  }
  .close-dialog {
    width: 28px;
    height: 28px;
    border-radius: 30px;
    position: absolute;
    top: 77%;
    left: 45%;
    z-index: 15;
  }
  .record-dialog {
    position: absolute;
    top: 180px;
    left: 16px;
    width: 92%;
    height: 55%;
    img {
      width: 100%;
    }
    z-index: 999;
  }
}
.page-margin {
  margin-top: 46px;
}
.pageindex {
  width: 100%;
  // background-image: url("https://public.tingmimi.net/image/sevenyeargift/tingmimi/index.jpg");
  // background-repeat: no-repeat;
  // background-position: center top;
  // background-size: 100% auto;
  position: relative;
  overflow: hidden;
  // background-size: cover;
  // background-position: center center;
  img {
    width: 100%;
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
  opacity: 0.1;
}
.share-icon {
  /* position: absolute; */
  width: 0.6rem;
  /* height: 0.2rem; */
  /* right: 0.2rem; */
  /* top: -0.32rem; */
  z-index: 8;
  vertical-align: middle;
}
.share-box {
  width: 100%;
  top: 0;
  height: 75%;
  /*background-color: #FFFFFF;*/
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  border-bottom: 1px solid #f1f1f1;
}

.share-weChat {
  width: 50%;
  position: relative;
  font-size: 14px;
  color: #333;
  text-align: center;
}

.share-weChat img {
  width: 25%;
}

.share-weChatCircle {
  width: 50%;
  position: relative;
  font-size: 14px;
  color: #333;
  text-align: center;
}

.share-weChatCircle img {
  width: 25%;
}
.close {
  font-size: 16px;
  color: #333;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25%;
}
</style>