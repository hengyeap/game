<template>
  <div class="page">
    <img @click="onClickLeft" src="https://public.tingmimi.net/image/timeGame/back-icon.png" alt="" class="back-icon">

    <div class="content">
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/july-carnival/{}/total-ranking-bg1.jpg'.replace('{}',platform)"
           alt="">
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/july-carnival/{}/total-ranking-bg2.jpg'.replace('{}',platform)"
           alt="">
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/july-carnival/{}/total-ranking-bg3.jpg'.replace('{}',platform)"
           alt="">
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/july-carnival/{}/total-ranking-bg4.jpg'.replace('{}',platform)"
           alt="">
      <img class="bg"
           :src="'https://resource.yuedaoec.com/assets/july-carnival/{}/total-ranking-bg5.jpg'.replace('{}',platform)"
           alt="">
      <div class="ranking-box">
        <div class="first-box">
          <div class="first-avatar">
            <img :src="rankData[0].avatar ? 'https://resource.yuedaoec.com/' + rankData[0].avatar : 'https://resource.yuedaoec.com/assets/july-carnival/tingmimi/userImg.png'"
                 alt="">
          </div>
          <div v-if="rankData[0].user_name==''" class="name">默认用户名</div>
          <div v-else class="name">{{rankData[0]['user_name']}}</div>
          <div class="code">{{rankData[0]['code'] }}</div>
        </div>
        <div class="second-box">
          <div class="avatar">
            <img :src="rankData[1].avatar ? 'https://resource.yuedaoec.com/' + rankData[0].avatar : 'https://resource.yuedaoec.com/assets/july-carnival/tingmimi/userImg.png'"
                 alt="">
          </div>
          <div v-if="rankData[1].user_name==''" class="name">默认用户名</div>
          <div v-else class="name">{{rankData[1]['user_name']}}</div>
          <div class="code">{{rankData[1]['code']}}</div>
        </div>
        <div class="third-box">
          <div class="avatar">
            <img :src="rankData[2].avatar ? 'https://resource.yuedaoec.com/' + rankData[0].avatar : 'https://resource.yuedaoec.com/assets/july-carnival/tingmimi/userImg.png'"
                 alt="">
          </div>

          <div v-if="rankData[2].user_name==''" class="name">默认用户名</div>
          <div v-else class="name">{{rankData[2]['user_name']}}</div>
          <div class="code">{{rankData[2]['code']}}</div>

        </div>

        <div class="else">
          <div v-for="(rankD,index) in rankData.slice(3,50)" :class="['else-box',(index + 4) % 10 == 0 ? 'more-padding-bottom':'',(index + 4) % 10 == 1 ? 'more-padding-top':'']">
            <div class="rank">{{index+4}}</div>
            <div class="else-avatar">
              <img :src="rankD.avatar ? 'https://resource.yuedaoec.com/' + rankD.avatar : 'https://resource.yuedaoec.com/assets/july-carnival/tingmimi/userImg.png'"
                   alt="">
            </div>
            <div v-if="rankD['user_name']==''" class="else-name">默认用户名</div>
            <div v-else class="else-name">{{rankD['user_name']}}</div>

            <div class="else-code">{{rankD['code']}}</div>
            <img v-if="(index + 4) % 10 == 0 && index + 4 != 50" class="split-line"
                 :src="'https://resource.yuedaoec.com/assets/july-carnival/{}/split-line.png'.replace('{}',platform)"
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

    export default {
        name: "App",
        data(){
            return{
                userKey: '',
                rankData: [],
                platform: null,
                texts:{
                    tingmimi: {
                        informations:[{
                            rank:'2',
                            avatar:'https://resource.yuedaoec.com/assets/july-carnival/tingmimi/1.jpg',
                            name:'我就是第一名',
                            code:'ASDA00000'
                        },]
                    },
                    tingo2o: {

                    },
                    newtingtaiwan: {

                    },
                    newtingmalaysia: {

                    },
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
            this.getData();
        },
        methods:{
            onClickLeft() {
                hybrid.nav.back();
            },
            getData(){
              axios.get('https://temp.yuedaoec.com/api/red-list/query',{params:{userKey: this.userKey}})
                  .then((json)=>{
                  if(json.data.success){
                      let data =json.data.res
                      if(data){
                          this.rankData = data.rank
                      }

                  }else {
                      this.toast(json.data.msg)
                  }
                  })
            },
        }
    }
</script>

<style scoped>
  .page{
    width: 100%;
    position: relative;
  }
  .content{
    width: 100%;
    position: relative;
  }
  .bg{
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
  .ranking-box{
    position: absolute;
    top: 21px;
    left: 0;
    right: 0;
    width: 100%;

  }
  .first-box{
    position: absolute;
    top: 81px;
    left: 135px;
    right: 0;
    width: 105px;
    height: 100px;
  }
  .second-box{
    position: absolute;
    top: 99.5px;
    left: 37.5px;
    right: 0;
    width: 90px;
    height: 100px;
  }
  .third-box{
    position: absolute;
    top: 99px;
    left: 248px;
    width: 90px;
    height: 100px;
  }
  .first-avatar{
    width: 100%;
    margin: 0 0 10px;
  }
  .first-avatar img{
    width: 60px;
    height: 60px;
    margin: auto;
    display: block;
    border-radius: 50%;
  }
  .avatar{
    width: 100%;
    margin: 0 0 10px;
  }
  .avatar img{
    width: 50px;
    height: 50px;
    margin: auto;
    display: block;
    border-radius: 50%;
  }
  .name{
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
  .code{
    font-size: 12px;
    color: #fff;
    text-align: center;

  }
  .else{
    position: absolute;
    top: 236px;
    width: 100%;
    margin: auto;
    height: 287px;
  }
  .else-box{
    width: 80%;
    margin: 5px auto;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
  }
  .else-avatar{
    width: 19%;
  }
  .else-avatar img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .rank{
    width: 17%;
    font-size: 14px;
    color: #37A1F9;
    text-align: center;
    font-weight: 400;

  }

  .else-name{
    width: 34%;
    padding-right: 6%;
    font-size: 0.32rem;
    color: #37A1F9;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }
  .else-code{
    width: 25%;
    font-size: 12px;
    color: #37A1F9;
  }
  .split-line{
    position: absolute;
    left: 0 ;
    bottom:0;
    width: 100%;
  }
  .more-padding-bottom {
    padding-bottom: 20px;
  }
  .more-padding-top {
    padding-top: 20px;
  }
</style>
