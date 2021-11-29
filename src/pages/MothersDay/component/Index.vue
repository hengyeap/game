<template>
  <div class="page">
    <share-link  :shareTexts="shareTexts" headTitle='母亲节向妈妈“饰”爱'></share-link>
    <div class="content">
      <img class="pic" src="https://resource.yuedaoec.com/image/MothersDay/1@2x.png" alt="">
      <div @click="toRules" class="toRule"></div>
    </div>
    <div class="box">
      <img src="https://resource.yuedaoec.com/image/MothersDay/2@2x.png?11" alt="" class="pic">
      <div class="box-texts">
        <div class="texts" v-html="totalOrderAmount>=3000 ? receiveWord : noReceiveWord.replace('{0}',totalOrderAmount).replace('{1}',3000-totalOrderAmount)"></div>

      </div>
      <div @click="toDetails" class="jumpToBox"></div>
    </div>
  </div>
</template>

<script>
  import ShareLink from '../../../components/ShareLink.vue'
  import hy from 'hybridify-js';
  import {Dialog,Toast} from 'vant';

  export default {
    name: "Index",
    components:{
      ShareLink,
      [Dialog.name]: Dialog,

    },
    data(){
      return{
        receiveWord:'您在庭秘密商城下单实付金额已达3000元，获得【古法手镯礼盒】一份',
        noReceiveWord:'您在庭秘密商城下单实付金额已达{0}元，还差<span style="color: #dc0c20;font-size: 18px">{1}</span>元即可获得【古法手镯礼盒】一份',
        shareTexts:{
          title:'母亲节向妈妈“饰”爱',
          description:'庭秘密商城累计满3000元送【古法手镯礼盒】一个',
          image:'https://resource.yuedaoec.com/image/MothersDay/shareImg.png'
        },
        uid:'',
        totalOrderAmount:0
      }
    },
    mounted(){
      this.uid = this.getUrlParam('uid')
      if(this.checkNull(this.uid)){
        hy.nav.toMe();
        Dialog.alert({
          message: '您还没有登录',
        })

        return
      }
      this.getList()
    },
    methods:{
      toRules(){
        this.$router.push({
          path: '/rules'
        });
      },
      toDetails(){
        this.$router.push({
          path: '/details'
        });
      },
      getList(){
        let self = this
        let params = {}
        params.url = process.env.VUE_APP_REQUEST_PRODUCT_APPDIST_URL + 'sendCoupon/activity/motherDay/list.distribute'
        params.type = 'get'
        params.data = {
          platform: 'tingmimi',
          userId: self.uid
        }
        self.createAjax(params, function(json) {
          if (json.code === '10000') {
            self.totalOrderAmount = json.res.totalOrderAmount;
          } else {
            Toast(json.msg)
          }
        })

      }
    }
  }
</script>

<style scoped>
  .page{
    width: 100%;
    position: relative;
  }
  .content{
    position: relative;
  }
  .pic{
    width: 100%;
    vertical-align: bottom;
  }
  .box{
    position: relative;
  }
  .box-texts{
    position: absolute;
    width: 100%;
    top: 2.1rem;
    margin: auto;
    left: 0;
    right: 0;
    color: #fff;
    font-size: 0.42667rem;
    text-align: center;
    height: 3.3rem;
    display: flex;
  }

  .jumpToBox{
    position: absolute;
    width: 68%;
    top: 6.2rem;
    margin: auto;
    left: 0;
    right: 0;
    height: 1rem;
  }
  .toRule{
    position: absolute;
    top: 0.3rem;
    right: 0;
    width: 30%;
    height: 1rem;
  }
  .texts{
    width: 70%;
    margin: auto;
    letter-spacing: 1px;
  }

</style>