<template>
  <div class="page">
    <van-nav-bar
      fixed
      :style="'background-color:#fff' + ';color: #fff;z-index: 9999'"
      :title="'520大哥送福利'"
    >
      <van-icon
        @click="tapBack"
        style="color: #fff"
        name="arrow-left"
        slot="left"
      />
    </van-nav-bar>
    <div class="overlayer" @touchmove.prevent v-if="showMask"></div>
    <div class="content-top" v-for="(item, index) in imgUrl" :key="index">
      <img :src="imgSource + item.imgUrl + '?1234'" alt="" />
    </div>
    <img
      v-if="!over"
      :src="imgSource + claimImg"
      @click="ljReceive"
      class="claim-img"
      alt=""
    />
    <img v-if="over" :src="imgSource + claimOver" class="claim-img" alt="" />
    <div class="jump-shop" @click="jumpShop"></div>
    <van-loading v-if="showLoading" size="80" class="loading" />
  </div>
</template>
<script>
import { NavBar, Icon, Toast, Loading, Popup } from "vant";
import hy from "hybridify-js";
export default {
  naem: "birthday-roll",
  data() {
    return {
      imgSource: "https://public.tingmimi.net/image/birthday-roll/",
      imgUrl: [
        {
          imgUrl: "bg.jpg",
        },
        {
          imgUrl: "bg-bottom.jpg",
        },
      ],
      clickImg: "click-claim.png",
      jxClickImg: "jx-claim.png",
      claimOver: "claim-over.png",
      claimImg: "click-claim.png",
      claimNumber: 35,
      userId: 278883,
      couponId: 1371,
      count: 3,
      over: false,
      platform: "tingmimi",
      showLoading: false,
      showMask: false,
    };
  },
  components: {
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Loading.name]: Loading,
  },
  mounted() {
    this.queryClaimNum();
  },
  methods: {
    queryClaimNum() {
      let uid = this.getUrlParam("uid");
      this.userId = uid;
      let params = {
        type: "get",
        url: "skudetail/commonCheckCount",
        query: {
          userId: uid ? uid : this.userId,
          couponId: this.couponId,
          total: this.claimNumber,
        },
      };
      this.reqwest(params)
        .then((res) => {
          if (res.result.code == "10000") {
            let num = res.result.res;
            console.log(num, "num");
            if (num == 35) {
              console.log("clickimg");
              this.claimImg = this.clickImg;
            } else if (num == 0) {
              this.over = true;
            } else if (1 <= num < 35) {
              console.log("jx");
              this.claimImg = this.jxClickImg;
            } else {
              this.over = true;
            }
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ljReceive() {
      //   this.claimNumber = this.claimNumber-1
      this.showLoading = true;
      this.showMask = true;
      let params = {
        type: "get",
        url: "skudetail/commonSendCouponsByCount",
        query: {
          userId: this.userId,
          couponId: this.couponId,
          total: this.claimNumber,
          count: this.count,
        },
      };
      this.reqwest(params)
        .then((res) => {
          if (res.result.code == "10000") {
            this.queryClaimNum();
            setTimeout(() => {
              this.showLoading = false;
              this.showMask = false;
              Toast("领取成功");
            }, 300);
          } else {
            Toast(res.result.msg);
            this.over = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    jumpShop() {
      hy.nav.push(
        "https://appstore.yuedaoec.com/h5/skuDetail.html?productId=47647&appid=" +
          this.userId +
          "&platform=" +
          this.platform
      );
    },
    tapBack() {
      console.log('111')
      hy.nav.back();
    },
  },
};
</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100vh;
  position: relative;
  padding-top: 45px;
  .content-top {
    width: 100%;
    height: 560px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .claim-img {
    position: absolute;
    top: 646px;
    width: 74px;
    right: 28px;
  }
  .jump-shop {
    position: absolute;
    width: 284px;
    height: 50px;
    z-index: 10;
    top: 62.8%;
    left: 47px;
  }
}
.loading {
  position: absolute;
  top: 643px;
  width: 74px;
  right: 26px;
  z-index: 15;
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
</style>