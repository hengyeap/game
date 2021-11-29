<template>
  <div>
    <div class="page">
       <van-nav-bar
      fixed
      :style="'background-color:#fff' + ';color: #fff;z-index: 9999'"
      :title="'一元礼包'"
    >
      <van-icon
        @click="tapBack"
        style="color: #fff"
        name="arrow-left"
        slot="left"
      />
     
    </van-nav-bar>
      <div class="bg-div">
        <img
          src="https://public.tingmimi.net/image/oneMoneyGift/topbg.png?111"
          class="topbg"
          alt=""
        />
        <div class="gift">
            <img :src="item.imgUrl" v-for="(item,index) in giftImg"  :key='index'  @click="jumpToSku(item.skuId)" alt="" >
            
            <div>
                {{buyNumber}}
              </div>  
        </div>
      </div>
      <div class="bg-div1">
        <img
          src="https://public.tingmimi.net/image/oneMoneyGift/centerbg.png?111222"
          alt=""
          @click="inviteTap"
        />
      </div>
      <div class="bottom">
        <div class="getNewPeople">
          <img
            src="https://public.tingmimi.net/image/oneMoneyGift/getnew.png"
            class="get-new"
            alt=""
          />
          <div class="getnew-content">
            <div class="getnew-hang">
              <div class="username">优惠码</div>
              <div class="shu"></div>
              <div class="isgetgift">是否购买过礼包</div>
            </div>
            <div
              class="getnew-hang"
              v-for="(item, index) in inviteUser"
              :key="index"
            >
              <div class="username">{{ item.code }}</div>
              <div class="shu"></div>
              <div class="isgetgift">{{ item.status == 0 ? "否" : "是" }}</div>
            </div>
            <div class="getnew-hang" v-if="showNofont">
              <div class="type">暂无新人情况</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <van-overlay v-show="rulesShow2" @click="closeRules2">
          <div class="rule_wrapper">
            <div class="contxt">
              <h4>{{ bargainRuleTit }}</h4>
              <p v-html="bargainRuleContxt"></p>
            </div>
          </div>
        </van-overlay>
      </div>
    </div>
  
  </div>
</template>
<script>
import axios from "axios";
import { NavBar,Overlay, Popup, Toast,Icon } from "vant";
import hybrid from "hybridify-js";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      bgImgdata: [
        {
          imgUrl: "https://public.tingmimi.net/image/oneMoneyGift/topbg.png",
        },
      ],
      giftId: 381,
      inviteUser: [],
      buyNumber: 0,
      showInvit: false,
      uid: null,
      url: "https://www.baidu.com",
      showNofont: false,
      userKey: null,
      redBlueCardStatus: null,
      bargainRuleTit: "邀新规则",
      bargainRuleContxt:
        "1、活动时间：2021年6月1日10点 至 2021年12月31日24点<br> 2、老用户每邀请3名新人开卡，且新人购买【1元新人礼包】后，老用户可获得【1元代理商礼包】购买<br> 3、所有平台用户都可发起邀请新人任务并获得【1元代理商礼包】<br> 4、若发起邀请者不是红卡用户，则他邀请的新人开卡后将归属他的上级<br> 5、邀请者1元包邮购买【1元代理商礼包】，数量上不封顶<br> 6、新人1元包邮购买【1元新人礼包】，仅限一次（活动对象：2021年6月1日起开卡未下单的用户）  ",
      uid: null,
      rulesShow2: false,
      show: false,
      giftImg:[
         {
          imgUrl:'https://public.tingmimi.net/image/oneMoneyGift/onemoneygift.png',
          skuId:48227
        },
        {
          imgUrl:'https://public.tingmimi.net/image/oneMoneyGift/newpeoplegift.png',
          skuId:48228
        },
        
      ]
    };
  },
  mounted() {
    this.isnewPeople();
    this.getBuyOneMoneyGift();
  },
  components: {
    [Overlay.name]: Overlay,
    [Popup.name]: Popup,
     [NavBar.name]: NavBar,
     [Icon.name]: Icon,
  },
  methods: {
    isnewPeople() {
      this.uid = this.getUrlParam("uid");
      if (this.uid == null) {
        Toast("请登录");
      }
      let params = {
        type: "get",
        url: "api/oneMoneyGift/isGetGift",
        query: {
          parentUid: this.uid,
          type: "202106",
        },
      };
      this.reqwest(params)
        .then((res) => {
          //   console.log(res.result);
          console.log(res);
          if (res.result.code == "10000") {
            this.inviteUser = res.result.res;
            console.log(res.result.res);
            if (this.inviteUser.length == 0) {
              this.showNofont = true;
            } else {
              this.showNofont = false;
            }
          } else {
            Toast(res.result.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBuyOneMoneyGift() {
      this.userKey = this.getUrlParam("userKey");
      if (this.userKey == null || this.userKey == "") {
        Toast("请登录");
      }
      let giftId = this.giftId;
      let params = {
        type: "get",
        url: "api/oneMoneyGift/getOneMoneyGiftNum",
        query: {
          userKey: this.userKey,
          giftId: giftId,
        },
      };
      this.reqwest(params)
        .then((res) => {
          //   console.log(res.result);
          console.log(res);
          if (res.result.code == 10000) {
            this.buyNumber = res.result.res;
            console.log(res.result.res);
          } else {
            Toast(res.result.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    inviteTap() {
      this.getDistributorCard();
    },
    // getDistributorCard: function () {
    //   const self = this;
    //   let params = {
    //     userKey: self.userKey,
    //   };
    //   axios
    //     .get(
    //       "https://appdist.yuedaoec.com/distributor/userKey/distributor-card.distribute",
    //       { params: params }
    //     )
    //     .then((json) => {
    //       console.log(json);
    //       if (json.data.code == 10000) {
    //         let data = json.data.res;
    //         let redBlueCardStatus = data.redBlueCardStatus;
    //         self.redBlueCardStatus = redBlueCardStatus;
    //         if (self.redBlueCardStatus == 2) {
    //           this.show = true;
    //           this.showInvit = true;
    //           let accessJwt = this.getUrlParam("accessJwt");
    //           this.url =
    //             "https://appdist.tingmimi.net/h5/activeCard2.html?key=" +
    //             accessJwt;
    //         } else {
    //           Toast(
    //             "非红卡用户直接邀请新用户即可领取奖励，若需绑定关系请先升级红卡"
    //           );
    //         }
    //       } else {
    //         Toast(json.data.msg);
    //       }
    //     });
    // },
    closeRules2() {
      this.rulesShow2 = false;
    },
    recordClick() {
      this.rulesShow2 = true;
    },
    // getImgDaatbase(type) {
    //   this.type = type;
    //   let self = this;
    //   let ref;
    //   ref = this.$refs.faultTree; // 截图区域
    //   html2canvas(ref, {
    //     backgroundColor: null,
    //     useCORS: true,
    //     allowTaint: true,
    //     //   width:750,
    //     //   height:200
    //   }).then((canvas) => {
    //     let dataURL = canvas.toDataURL("image/jpeg", 0.5);
    //     //   console.log(dataURL,'dataURL')
    //     self.dataUrl = dataURL;
    //     var formData = new FormData();
    //     formData.append("data", self.dataUrl);
    //     //   console.log(formData,'formData')
    //     self.uploadImg(formData);
    //   });
    // },

    // uploadImg(formData) {
    //   let self = this;
    //   let params = {
    //     url:
    //       process.env.VUE_APP_REQUEST_PRODUCT_URL +
    //       "uploadImg/opencardQRcode.distribute",
    //     data: formData,
    //     type: "post",
    //     dataType: "json",
    //     async: true,
    //     cache: false,
    //     contentType: false,
    //     processData: false,
    //   };
    //   this.createAjax(params, (res) => {
    //     let item = JSON.parse(res.text);
    //     console.log(item);
    //     if (item.code === "10000") {
    //       let url = self.getImgUrl(item.res);
    //       console.log(url)
    //       if (self.type == "download") {
    //         self.downLoadImg(url);
    //       }
    //       if (self.type == "wechat") {
    //         self.shareToWx(url);
    //       }
    //       if (self.type == "circle") {
    //         self.shareToCircle(url);
    //       }
    //     }
    //   });
    //   // window.mui.ajax('/uploadImg/opencardQRcode.distribute', {
    //   //   data: formData,
    //   //   type: 'post',
    //   //   dataType: 'json',
    //   //   async: true,
    //   //   cache: false,
    //   //   contentType: false,
    //   //   processData: false,
    //   //   success: function (json) {
    //   //     if(json.status == 200){
    //   //       let res = JSON.parse(json.text)
    //   //       if(res.code==='10000'){
    //   //         let url = self.getImgUrl(res.res)
    //   //         if(self.type == 'download'){
    //   //           self.download(url)
    //   //         }
    //   //         if(self.type == 'wechat'){
    //   //           self.sharewechat(url)
    //   //         }
    //   //         if(self.type == 'circle'){
    //   //           self.sharecircle(url)
    //   //         }
    //   //       }
    //   //     }

    //   //   }
    //   // })
    // },
    close() {
      this.show = false;
    },
    downLoadImg(url) {
        console.log(url)
      hybrid.app.download(url);
    },
    shareToWx(url) {
      const obj = {
        type: "wechat",
        image:url
      };
      console.log(obj.image)
      hybrid.app.share(obj);
    },
    shareToCircle(url) {
      const obj = {
        type: "circle",
        image:url
      };
       console.log(obj.image)
      hybrid.app.share(obj);
    },
       jumpToSku(productId) {
          hybrid.nav.push(
            "https://appstore.yuedaoec.com/h5/skuDetail.html?productId=" +
              productId
          );
    },
     tapBack() {
      hy.nav.back();
    },
     

   
  },
};
</script>
<style scoped lang='scss'>
.page {
  height: 100%;
  width: 100%;
  background: #e63231;
}
.page1 {
  width: 100%;
  height: 100%;
  background: #e63231;
  position: relative;
  img {
    width: 100%;
  }
  .Q-Rcode {
    position: absolute;
    top: 500px;
    left: 24px;
    /deep/ {
      canvas {
        width: 145px;
      }
    }
  }
}
.bg-div {
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 40px;
  .gift{
    position: absolute;
    width: 337.5px;
    left: 18.75px;
    top: 404px;
    img{
      width: 50%;
    }
  div {
      font-size: 18px;
      color: #D01D18;
      position: absolute;
      top: 142px;
      left: 116px;
    }
  }
  .topbg {
    width: 100%;
  }
  .record {
    position: absolute;
    right: 0px;
    width: 50px;
    top: 20px;
  }
  .one-num {
    width: 348px;
    position: absolute;
    top: 384px;
    left: 13.5px;
  }
  .number {
    position: absolute;
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #ffffff;
    line-height: 19px;
    top: 420px;
    left: 210px;
  }
}
.bg-div1 {
  width: 100%;
  text-align: center;
  margin-top: 90px;
  img {
    width: 90%;
  }
}
.bottom {
  width: 100%;
  height: 328px;
   margin-top: 6px;
}
.getNewPeople {
  width: 337.5px;
  min-height: 308px;
  background: #fff1dd;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  margin: 0 auto;
  position: relative;
  .get-new {
    width: 160px;
    position: absolute;
    top: 0;
    left: 90px;
  }
  .getnew-content {
    width: 100%;
    padding-top: 60px;
    .getnew-hang {
      height: 30px;
      width: 100%;
      display: flex;
      .type {
        font-size: 13px;
        font-family: Source Han Sans CN;
        color: #bbb;
        line-height: 29px;
        width: 100%;
        text-align: center;
        margin-top: 30px;
      }
      .username {
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #e63231;
        line-height: 29px;
        width: 50%;
        text-align: center;
      }
      .shu {
        width: 1px;
        height: 100%;
        background: #e63231;
        opacity: 0.23;
      }
      .isgetgift {
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #e63231;
        line-height: 29px;
        width: 50%;
        text-align: center;
      }
    }
  }
}
.rule_wrapper {
  width: 336px;
  height: 372px;
  background: linear-gradient(180deg, #fffafa 0%, #ffe8ec 100%);
  border-radius: 5px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  box-sizing: border-box;
}

.contxt {
  overflow-y: auto;
  height: 300px;
  padding: 0 18px;
}

.rule_wrapper::before {
  content: "";
  position: absolute;
  width: 75px;
  height: 76px;
  background-size: cover;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.rule_wrapper h4 {
  font-size: 16px;
  text-align: center;
  color: #ff1e49;
}

.rule_wrapper p {
  line-height: 22px;
  margin-top: 10px;
  font-size: 13px;
}

.btnBox {
  width: 90%;
  /*position: absolute;*/
  bottom: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
// //   .wenzi{
// //    display: flex;
// //    width: 89%;
// //    margin: 0 auto;
// //    justify-content: space-around;
// //    div{
// //        font-size: 18px;
// //    }
//   }
.btn img {
  width: 60px;
}
.btn {
  font-size: 14px;
  text-align: center;
}

.close {
  width: 30px;
  height: 30px;
  margin: 40px auto 50px;
}

.close img {
  width: 100%;
}
</style>
