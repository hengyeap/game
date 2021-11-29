<template>
  <div class="page">
    <img class="bg" src="https://resource.yuedaoec.com/image/kol0108/bg1.jpg" alt="">
    <img @tap.stop="toBack" src="https://public.tingmimi.net/image/midAutumnTmm/back-icon-white.png" alt=""
         class="back-icon">
    <div class="sign" @click="confirmAll"></div>

    <div class="content">
      <div class="row1">
        <div class="title">
          1.您的姓名
        </div>
        <van-field v-model="userName" placeholder="" />
      </div>
      <div class="row1">
        <div class="title">
          2.CODE码
        </div>
        <van-field v-model="userCode" placeholder="" />

      </div>
      <div class="row1">
        <div class="title">
          3.手机号
        </div>
        <van-field v-model="userTel" placeholder="" />

      </div>
      <div class="row1">
        <div class="title">
          4.邮寄地址
        </div>
        <van-field v-model="address" placeholder="" />

      </div>
      <div class="row1">
        <div class="title">
          5.您的肤质情况
        </div>
        <van-radio-group v-model="skinType">
          <van-radio  v-for="(item, index) in list"
                      :key="item"
                      :name="item">
            {{ item }}
          </van-radio>
        </van-radio-group>
      </div>

      <div class="row1">
        <div class="title">
          6.你常用的社交媒体平台是
        </div>
        <div class="mediaRow">
          <div class="name">快手</div>
          <van-field class="mediaInput1" v-model="kuaiShouName" placeholder="输入用户名" />
          <van-field class="mediaInput2"  v-model="kuaiShouFans" placeholder="粉丝数" />
        </div>
        <div class="mediaRow">
          <div class="name">小红书</div>
          <van-field class="mediaInput1" v-model="redBookName" placeholder="输入用户名" />
          <van-field class="mediaInput2"  v-model="redBookFans" placeholder="粉丝数" />
        </div>
        <div class="mediaRow">
          <div class="name">抖音</div>
          <van-field class="mediaInput1" v-model="douYinName" placeholder="输入用户名" />
          <van-field class="mediaInput2"  v-model="douYinFans" placeholder="粉丝数" />
        </div>
        <div class="mediaRow">
          <div class="name">公众号</div>
          <van-field class="mediaInput1" v-model="gongZhongHaoName" placeholder="输入用户名" />
          <van-field class="mediaInput2"  v-model="gongZhongHaoFans" placeholder="粉丝数" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import { Field } from 'vant';
    import { RadioGroup, Radio } from 'vant';
    import hy from 'hybridify-js';
    import axios from 'axios';
    export default {
        name: "kol0108",
        components:{
            [Field.name]: Field,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
        },
        data() {
            return {
                list: ['油性肤质', '干性肤质','混合性肤质','敏感性肌肤'],
                result: [],
                userName: '',
                userCode: '',
                userTel: '',
                address: '',//邮寄地址
                skinType:[],//肤质类型
                socialMediaPlatform: '',//社交媒体平台
                sociaMediaName: '',//社交媒体平台用户名
                sociaMediaFans: '',//社交媒体平台粉丝数
                uid: '', //用户uid
                kuaiShouName:'',
                kuaiShouFans:'',
                redBookName:'',
                redBookFans:'',
                douYinName:'',
                douYinFans:'',
                gongZhongHaoName:'',
                gongZhongHaoFans:''

            }
        },
        mounted() {
            this.uid = this.getUrlParam('uid')
            if (this.checkNull(this.uid)) {
                hy.nav.toMe();
                this.toast('您还没有登录！')
                return
            }
            this.getUserCodeByUid()
        },
        methods: {
            toBack() {
                hy.nav.back()
            },
            getUserCodeByUid: function () {
                axios .get("https://appdistapi.yuedaoec.com/getUserMessage/byUid/goodLooks/getUserCodeByUid.distribute", {
                    params: {
                        uid: this.uid,
                    },
                })
                    .then((json)=>{
                        console.log(json)
                        if(json.data.code=='10000'){
                            if (this.checkNull(json.data.res)) {
                                this.toast('仅限code用户参与')
                                setTimeout(() => {
                                    hy.nav.back()
                                }, 1000)
                            }
                        }else {
                            // this.toast(json.data.msg)
                        }
                    })
            },
            confirmAll(){
                console.log(111)
                if(this.checkNull(this.userName)){
                    this.$toast('姓名不能为空！')
                    return
                }

                if(this.checkNull(this.userCode)){
                    this.$toast('仅限code用户参与！')
                    return
                }
                if(this.checkNull(this.userTel)){
                    this.$toast('电话不能为空！')
                    return
                }
                if(this.checkNull(this.userName)){
                    this.$toast('邮寄地址不能为空！')
                    return
                }
                if(this.checkNull(this.skinType)){
                    this.$toast('请选择肤质！')
                    return
                }
                // if(this.checkNull(this.socialMediaPlatform)){
                //     this.$toast('社交媒体平台不能为空！')
                //     return
                // }
                // if(this.checkNull(this.socialMediaPlatform)){
                //     this.$toast('社交媒体平台的用户名不能为空！')
                //     return
                // }
                // if(this.checkNull(this.socialMediaPlatform)){
                //     this.$toast('社交媒体平台的粉丝数不能为空！')
                //     return
                // }
                this.savekol0108ByUid()
            },
            savekol0108ByUid() {
                axios
                    .get("https://store.yuedaoec.com/savekol0108ByUid.distribute", {
                        params: {
                            userName:this.userName,
                            userCode:this.userCode,
                            userTel:this.userTel,
                            address:this.address,
                            skinType: this.skinType,
                            kuaiShouName:this.kuaiShouName,
                            kuaiShouFans:this.kuaiShouFans,
                            redBookName:this.redBookName,
                            redBookFans:this.redBookFans,
                            douYinName:this.douYinName,
                            douYinFans:this.douYinFans,
                            gongZhongHaoName:this.gongZhongHaoName,
                            gongZhongHaoFans:this.gongZhongHaoFans,
                            uid: this.uid,
                        },
                    })
                    .then((json) => {
                        if(json.data.res.msg=='您已报名'){
                            this.$toast('您已报名')
                        }else {
                            this.$toast('您已报名成功！请耐心等待工作人员审核！符合条件会通知您！')

                        }
                    })
                    .catch((err) => {
                        // this.$toast(err)
                    });
            },
        }
    }
</script>

<style scoped>
  .page{
    width: 100%;
    position: relative;
  }
  .bg{
    width: 100%;
    position: relative;
  }
  .content{
    width: 100%;
    position: absolute;
    top: 29rem;
  }
  .row1 {
    width: 84%;
    position: relative;
    margin: auto;
  }
  .title{
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 0.2rem;
    background: linear-gradient(to bottom, #E3C589, #fff);
    -webkit-background-clip:text;
    color: transparent;
  }
  .back-icon {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    left: 0.4rem;
    top: 0.4rem;
    z-index: 999;
  }
  .sign{
    width: 100%;
    height: 1.5rem;
    position: absolute;
    bottom: 3rem;
  }
  .mediaRow{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .name{
    /*background: linear-gradient(to bottom, #E3C589, #fff);*/
    /*-webkit-background-clip:text;*/
    color: #efcfd0;
    font-size: 14px;
    width: 29%;
    font-weight: 500;
    margin-top: -0.2rem;
    text-align: center;
  }
  .mediaInput1{
    width: 50%;
    margin-right: 0.8rem;
  }
  .mediaInput2{
    width: 40%;
    margin-right: 0.8rem;
  }
</style>
<style>
  /*input[type=text], input[type=password] {*/

  /*  text-align: left!important;*/
  /*}*/

  .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.2rem 0.42667rem!important;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
    background-color: #efcfd0!important;
    border-radius: 3px!important;
    margin-bottom: 0.3rem!important;
  }

  .van-radio{
    background-color: #cf7374!important;
    margin-bottom: 0.2rem!important;
    height: 1.04rem!important;
    font-size: 14px!important;
    border-radius: 3px!important;

  }
  .van-radio__label {
    color: #FFFBF7!important;
  }
  .van-radio__icon {

    margin-left: 0.3rem!important;

  }
  .van-radio__icon--checked .van-icon {
    color: #fff;
    background-color: #cf7374;
    border-color: #ccc;
  }
</style>