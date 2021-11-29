<template>
  <div class="body">
    <div class="overlayer" @touchmove.prevent v-if="showMask"></div>
    <div class="page">
      <img
        :src="imgSource + '/' + platform + '/' + language + '/activity.png'"
        class="ndj-lottery"
        alt=""
      />
    </div>
    <div class="record" @click="showRecord"></div>
    <div class="record-dialog" v-if="showRecordImg">
      <img
        :src="imgSource + '/' + platform + '/' + language + '/record.png'"
        alt=""
      />
      <img
        :src="imgSource + '/' + platform + '/' + language + '/close.png'"
        class="close"
        alt=""
        @click="closeRecordDialog"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "day-by-day-lottery",
  data() {
    return {
      language: "cn",
      imgSource: "https://public.tingmimi.net/image/daydaylottery",
      showRecordImg: false,
      platform: "tingmimi",
      showMask: false,
    };
  },
  methods: {
    showRecord() {
      this.showRecordImg = true;
      this.showMask = true;
    },
    closeRecordDialog(){
        this.showRecordImg = false
        this.showMask = false
    }
  },
};
</script>
<style scoped lang="scss">
.body {
  width: 100%;
  height: 100%;
  position: relative;
  .record {
    width: 50px;
    height: 20px;
    position: absolute;
    right: 0px;
    top: 23px;
    border-top-left-radius: 10px 10px;
    border-bottom-left-radius: 10px 10px;
    z-index: 5;
  }
  .record-dialog {
    position: absolute;
    top: 0;
    left: 18px;
    width: 90%;
   height: 68%;
    img {
      width: 100%;
    }
    .close {
      width: 24px;
      position: absolute;
      left: 160px;
      bottom: 0px;
      z-index: 10;
    }
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
.page {
  width: 100%;
  height: 1800px;
  background-image: url("./assets/img/cn/bg.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  position: relative;
  .ndj-lottery {
    width: 355px;
    position: absolute;
    top: 10%;
    left: 10.5px;
  }
}
</style>