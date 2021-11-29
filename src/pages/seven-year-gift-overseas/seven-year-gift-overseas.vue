<template>
  <div class="body">
    <van-nav-bar
      fixed
      :style="'background-color:#fff' + ';color: #fff;z-index: 9999'"
    >
      <van-icon
        @click="tapBack"
        style="color: #fff"
        name="arrow-left"
        slot="left"
      />
    </van-nav-bar>
    <div class="overlayer" @touchmove.prevent v-if="showMask"></div>
    <div class="pageindex page-margin">
      <img :src="imgindexUrl" alt="" />
       <div class="get-btn" @click="ljGet(platform)" v-if="showTj"></div>
    </div>
    <div class="record-btn" @click="recordClick"></div>
    <div class="record-dialog" v-if="showRecordImg" @click="closeRecord">
      <img :src="imgSource + '/' + platform + '/record.png'" alt="" />
    </div>
  </div>
</template>
<script>
import { NavBar, Icon, Toast, Loading, Popup } from "vant";
import hy from "hybridify-js";

export default {
  name: "seven-year-gift",
  data() {
    return {
      isindex: true,
      isOne: false,
      showRecordImg: false,
      shareShow: false,
      showMask: false,
      platform: "tingo2o",
      imgSource: "https://public.tingmimi.net/image/sevenyeargift",
      isTw: false,
      isxjp: false,
      uid: 12345,
      iso2o: false,
      code: "",
      platform: "tingo2o",
      imgo2oindex:
        "https://public.tingmimi.net/image/sevenyeargift/tingo2o/index.jpg",
      imgo2oUrl:
        "https://public.tingmimi.net/image/sevenyeargift/tingo2o/1.jpg",
      imgnewtingmalaysiaindex:
        "https://public.tingmimi.net/image/sevenyeargift/newtingmalaysia/index.jpg",
      imgnewtingmalaysiaUrl:
        "https://public.tingmimi.net/image/sevenyeargift/newtingmalaysia/1.jpg",
      imgnewtingtaiwanindex:
        "https://public.tingmimi.net/image/sevenyeargift/newtingtaiwan/index.jpg?111",
      imgnewtingtaiwanUrl:
        "https://public.tingmimi.net/image/sevenyeargift/newtingtaiwan/1.jpg?111",
      imgtingsingaporeindex:
        "https://public.tingmimi.net/image/sevenyeargift/tingsingapore/index.jpg",
      imgtingsingaporeUrl:
        "https://public.tingmimi.net/image/sevenyeargift/tingsingapore/1.jpg",
      imgUrl: "",
      imgindexUrl: "",
      showTj:true
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
    this.getplatForm();
    this.getCode();
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
            console.log(status);
            if (status == 0) {
            } else {
              if (this.platform == "newtingmalaysia") {
                this.imgindexUrl = this.imgnewtingmalaysiaUrl;
                this.showTj = false
              } else if (this.platform == "newtingtaiwan") {
                 this.showTj = false
                this.imgindexUrl = this.imgnewtingtaiwanUrl;
              } else if (this.platform == "tingsingapore") {
                 this.showTj = false
                this.imgindexUrl = this.imgtingsingaporeUrl;
              } else if (this.platform == "tingo2o") {
                 this.showTj = false
                this.imgindexUrl = this.imgo2oUrl;
              } else {
                this.imgindexUrl = this.imgo2oUrl;
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
    ljGet(data) {
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
          } else {
            Toast(res.result.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    recordClick() {
      this.showMask = true;
      this.showRecordImg = !this.showRecordImg;
    },
    closeRecord() {
      this.showRecordImg = false;
      this.showMask = false;
    },
    showPopup() {
      this.shareShow = true;
    },
    getplatForm() {
      if (this.getUrlParam("platform")) {
        this.platform = this.getUrlParam("platform");
      } else {
        this.platform = "tingo2o";
      }
      if (this.platform == "newtingmalaysia") {
        this.imgindexUrl = this.imgnewtingmalaysiaindex;
      } else if (this.platform == "newtingtaiwan") {
        this.imgindexUrl = this.imgnewtingtaiwanindex;
      } else if (this.platform == "tingsingapore") {
        this.imgindexUrl = this.imgtingsingaporeindex;
      } else if (this.platform == "tingo2o") {
        this.imgindexUrl = this.imgo2oindex;
      }else {
        this.imgindexUrl = this.imgo2oindex;
      }
    },
    getCode() {
      this.uid = this.getUrlParam("uid");
      if(!this.uid){
          Toast('请先去登录') 
      }
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
            console.log(this.code);
            if (this.platform == "tingo2o") {
              this.code = res.result.res.o2oCode;
              this.checkuserisresive();
            } else {
              this.code = res.result.res.code;
              this.checkuserisresive();
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tapBack() {
      hy.nav.back();
    },
  },
};
</script>
<style scoped lang='scss'>
.body {
  position: relative;
  .get-btn {
    width: 192px;
    height: 50px;
    position: absolute;
    top: 630px;
    left: 92px;
    border-radius: 25px;
    z-index: 5;
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
    width: 100px;
    height: 100px;
    border-radius: 30px;
    position: absolute;
    top: 374px;
    left: 130px;
    z-index: 15;
  }
  .record-dialog {
    position: absolute;
    top: 180px;
    left: 16px;
    width: 92%;
    height: 60%;
    z-index: 15;
    img {
      width: 100%;
    }
  }
}
.page-margin {
  margin-top: 46px;
}
.pageindex {
  width: 100%;
  position: relative;
  img {
    width: 100%;
  }
}
.page1 {
  height: 100vh;
  width: 100%;
  background-image: url("https://public.tingmimi.net/image/sevenyeargift/newtingmalaysia/1.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
}
.pageindextw {
  height: 100vh;
  width: 100%;
  background-image: url("https://public.tingmimi.net/image/sevenyeargift/newtingtaiwan/index.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  position: relative;
}
.page1tw {
  height: 100vh;
  width: 100%;
  background-image: url("https://public.tingmimi.net/image/sevenyeargift/newtingtaiwan/1.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
}
.pageindexxjp {
  height: 100vh;
  width: 100%;
  background-image: url("https://public.tingmimi.net/image/sevenyeargift/tingsingapore/index.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  position: relative;
}
.page1xjp {
  height: 100vh;
  width: 100%;
  background-image: url("https://public.tingmimi.net/image/sevenyeargift/tingsingapore/1.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
}
.pageindexo2o {
  height: 100vh;
  width: 100%;
  background-image: url("https://public.tingmimi.net/image/sevenyeargift/tingo2o/index.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  position: relative;
}
.page1o2o {
  height: 100vh;
  width: 100%;
  background-image: url("https://public.tingmimi.net/image/sevenyeargift/tingo2o/1.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
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