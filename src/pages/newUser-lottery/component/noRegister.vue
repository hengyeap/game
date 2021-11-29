<template>
  <div class="content-dialog-noregister">
    <div class="content-dialog-lottery-close">
      <img src="../assets/close.png" alt="" @click="closeDialogReg" />
    </div>
    <div class="content-dialog-noregister-img">
      <img src="../assets/prize.png" alt="" />
    </div>
    <div class="content-dialog-noregister-downloadapp" @click="downLink">
      <img src="../assets/download-app.png" alt="" />
    </div>
    <div class="content-dialog-noregister-openapp" @click="openLink">
      <img src="../assets/open-app.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "noRegister",
  methods: {
    closeDialogReg() {
      this.$emit("close", false);
    },
    openLink() {
      console.log("ceshi");
      this.$parent.iswexinBrowser();
      this.closeDialogReg()
      // const url = 'https://appstore.yuedaoec.com/h5/activities/womensday.html?isNew=true';
      // location.href = `tinsecretapp://`
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
  },
};
</script>
<style scoped lang='scss'>
.content-dialog-noregister {
  position: relative;
  top: 2.4rem;
  left: 0.7rem;
  width: 86%;
  z-index: 15;
  height: 15rem;
  background-image: url("../assets/no-register.png");
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
  .content-dialog-noregister-img {
    position: absolute;
    top: 4.2rem;
    left: 2rem;
    img {
      height: 3.3rem;
    }
  }
  .content-dialog-noregister-downloadapp {
    position: absolute;
    top: 8rem;
    left: 1.2rem;
    img {
      width: 6.2rem;
    }
  }
  .content-dialog-noregister-openapp {
    position: absolute;
    top: 9.4rem;
    left: 1.2rem;

    img {
      width: 6.2rem;
    }
  }
}
</style>