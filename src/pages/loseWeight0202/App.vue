<template>
  <div class="page">
    <img class="bg" src="https://resource.yuedaoec.com/image/loseWeight0202/bg.jpg" alt="">
    <img @tap.stop="toBack" src="https://public.tingmimi.net/image/midAutumnTmm/back-icon-white.png" alt=""
         class="back-icon">
    <div class="sign" @click="confirmAll"></div>

    <div class="content">
      <div class="row1"><van-field v-model="userName" label="姓名" :required="true" /></div>
      <div class="row1"><van-field v-model="sex" label="性别" :required="true" /></div>
      <div class="row1"><van-field v-model="city" label="所属城市" :required="true" /></div>
      <div class="row1"><van-field v-model="code" label="优惠码" :required="true" /></div>
      <div class="row1"><van-field v-model="company" label="所属公司" :required="false" /></div>
      <div class="row1"><van-field v-model="age" label="年龄" :required="true" /></div>
      <div class="row1"><van-field v-model="height" label="身高" :required="true" /></div>
      <div class="row1"><van-field v-model="weight" label="体重" :required="true" /></div>
      <div class="row1"><van-field v-model="bmi" label="BMI" :required="false" /></div>
      <div class="row1"><van-field v-model="waist" label="腰围" :required="false" /></div>
      <div class="row1"><van-field v-model="hipline" label="臀围" :required="false" /></div>
      <div class="row1"><van-field v-model="thigh" label="大腿围" :required="false" /></div>
      <div class="row1"><van-field v-model="bodyFatPercentage" label="体脂肪率" :required="false" /></div>
      <div class="row1"><van-field v-model="visceralFatGrade" label="内脏脂肪级数" :required="false" /></div>
      <div class="row1"><van-field v-model="healthStatus" label="身体健康状况" :required="false" /></div>
      <div class="row1"><van-field v-model="phpNum" label="联系电话" :required="true" /></div>
      <div class="row1"><van-field v-model="weChat" label="微信号" :required="true" /></div>
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
                userName:'',
                sex:'',
                city:'',
                code:'',
                company:'',
                age:'',
                height:'',
                weight:'',
                bmi:'',
                waist:'',
                hipline:'',
                thigh:'',
                bodyFatPercentage:'',
                visceralFatGrade:'',
                healthStatus:'',
                phpNum:'',
                weChat:'',
                result: [],
                uid: '', //用户uid


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
                if(this.checkNull(this.sex)){
                    this.$toast('性别不能为空！')
                    return
                }
                if(this.checkNull(this.city)){
                    this.$toast('所属城市不能为空！')
                    return
                }

                if(this.checkNull(this.code)){
                    this.$toast('优惠码不能为空！')
                    return
                }
                if(this.checkNull(this.age)){
                    this.$toast('年龄不能为空！')
                    return
                }
                if(this.checkNull(this.height)){
                    this.$toast('身高不能为空！')
                    return
                }
                if(this.checkNull(this.weight)){
                    this.$toast('体重不能为空！')
                    return
                }
                if(this.checkNull(this.phpNum)){
                    this.$toast('联系电话不能为空！')
                    return
                }
                if(this.checkNull(this.weChat)){
                    this.$toast('微信号不能为空！')
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
                    .get("https://store.yuedaoec.com/saveLoseWeight0202ByUid.distribute", {
                        params: {
                            userName:this.userName,
                            sex:this.sex,
                            city:this.city,
                            code:this.code,
                            company:this.company,
                            age:this.age,
                            height:this.height,
                            weight:this.weight,
                            bmi:this.bmi,
                            waist:this.waist,
                            hipline:this.hipline,
                            thigh:this.thigh,
                            bodyFatPercentage:this.bodyFatPercentage,
                            visceralFatGrade:this.visceralFatGrade,
                            healthStatus:this.healthStatus,
                            phpNum:this.phpNum,
                            weChat:this.weChat,
                            uid:this.uid,
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
                        this.$toast(err)
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
    top: 19.3rem;
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
    color: #fff;
    font-size: 0.37333rem;
    line-height: 0.6rem!important;
    background-color: #ffffff00!important;
    border-radius: 25px!important;
    margin-bottom: 0.3rem!important;
    border: 1px solid #c62c2b!important;
  }
  .van-cell--required::before {
    color: #fff!important;
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
  .van-field__control {
    color: #fff;
  }
</style>