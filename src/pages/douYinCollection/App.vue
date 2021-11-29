<template>
  <div class="page">
    <img @click="onClickLeft" src="https://public.tingmimi.net/image/timeGame/back-icon.png" alt="" class="back-icon">

    <img src="https://resource.yuedaoec.com/image/douYinCollection/bg.png?111111" alt="" class="bg">
    <div class="content">
      <div class="timeBox">
        <div class="timePointBox">
          <div v-for="(data,index) in datas" class="timePoint">
            <img @click="jumpTo(data.link)" :src="data['pic_1']" alt=""
                 class="timeIcon">
            <div class="timeWord">{{data['name_1']}}</div>
          </div>
        </div>
      </div>
      <div class="detailsBox">
        <div v-for="(data,index) in datas" :class="[index == 0 ? 'details' : 'details1']">
          <div v-if="index== 0" class="newBox">
            <img src="https://resource.yuedaoec.com/image/douYinCollection/new-icon.png?111111" alt="" class="new-icon">
            <div class="title">{{data['name_2']}}</div>
          </div>
          <div v-else >
            <div class="title">{{data['name_2']}}</div>
          </div>
          <img @click="jumpTo(data.link)" :src="data['pic_2']" alt="" class="detailsImg">
        </div>


      </div>
    </div>
  </div>
</template>

<script>
    import hybrid from "hybridify-js";
    import axios from 'axios'
    import {Swipe, SwipeItem} from 'vant';

    export default {
        name: "douYinCollection",
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,

        },
        data() {
            return {
                datas: [],
                isJump:true,
            }
        },
        mounted() {
            this.getData()
            setTimeout(() => {
                console.log(this.datas)
            }, 1000)
        },
        methods: {
            getData() {
                axios.get('https://apph5.yuedaoec.com/api/get/activityCollectionDouYin/info.survey')
                    .then((json) => {
                        if (json.data.success) {
                            let data = json.data.res
                            if (data) {
                                this.datas = data
                            }
                        } else {
                            this.toast(json.data.msg)
                        }
                    })
            },
            jumpTo(link){
                if(this.checkNull(link)){
                    return;
                }
                hybrid.nav.push(link)
            },

            onClickLeft() {
                hybrid.nav.back();
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
    margin: 0 auto;
    position: absolute;
    top: 410px;
    z-index: 999;
  }

  .bg {
    width: 100%;
    position: relative;
  }

  .back-icon {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    left: 0.4rem;
    top: 0.4rem;
    z-index: 999;
  }

  .timeBox {
    width: 100%;
    height: 2.5rem;
    position: relative;
    margin-bottom: 1rem;
  }

  .timePointBox {
    width: 91.2%;
    margin: auto;
    display: flex;
    justify-content: flex-start;
    overflow-x: scroll;
    padding-top: 18px;
  }

  .timePoint {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 75px;
    font-weight: 400;
  }

  .time {
    font-size: 13px;
    color: #F8F8F8;
    text-align: center;
    position: absolute;
    top: 8px;
    left: 0;
    right: 0;
  }

  .timeWord {
    font-size: 13px;
    color: #F8F8F8;
    text-align: center;
  }

  .timeIcon {
    width: 60px;
    position: relative;
  }

  .detailsBox {
    position: relative;
    margin: 0 auto;
    width: 85%;

    height: 14.5rem;
    overflow-y: auto;
  }

  .details {
    position: relative;
    margin: auto 0;

  }

  .details1 {
    position: relative;
    margin: 0 auto;

  }

  .title {
    background: linear-gradient(to top, #fff, #fff, #fff, #FA5FE8, #FA5FE8);
    -webkit-background-clip: text;
    color: transparent;

    /*background: linear-gradient(to top, red, blue);*/
    /*-webkit-background-clip: text;*/
    /*color:#fff;*/
    /*-webkit-mask: linear-gradient(to top, #FA5FE8, #00000030 );*/
    font-weight: 400;
    font-size: 16px;
    line-height: 40px;
    overflow: hidden; /*溢出隐藏*/
    text-overflow: ellipsis; /*以省略号...显示*/
    white-space: nowrap; /*强制不换行*/
  }

  .detailsImg {
    width: 100%;
    border-radius: 5px;
  }

  .newBox {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .new-icon {
    position: relative;
    width: 12%;
    margin-right: 10px;
  }

  .van-swipe {
    overflow: hidden;
    position: relative;
    -webkit-user-select: none;
    user-select: none;
    border-radius: 5px;
  }
</style>

<style>
  .van-swipe__indicators {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: absolute;
    left: 90%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }


  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
  }

  .van-swipe__indicator {
    border-radius: 100%;
    background-color: #d0d0d0;
    width: 0.1rem;
    height: 0.1rem;
  }

  .van-swipe__indicator--active {
    background-color: #fff;
  }


</style>
<style>
  .van-toast{
    background-color: rgb(50 50 51 / 0%);
  }
</style>