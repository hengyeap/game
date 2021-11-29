<template>
  <div>
    <nav-bar  headTitle="订单记录"></nav-bar>

    <ul v-if="listArr.length>0 ">
      <li v-for="item in listArr">
        {{item.date.substring(0,16)}}&nbsp&nbsp&nbsp订单号:{{item.orderCode}}，实付金额:{{item.orderAmount}}元
      </li>
    </ul>
    <div v-else class="noNote">暂无记录</div>
  </div>
</template>

<script>
  import {Toast} from 'vant';
  import NavBar from '../../../components/NavBar.vue'
  export default {
    name: "Details",
    components:{
      NavBar
    },
    data(){
      return{
        listArr:[],
        uid:''
      }
    },
    mounted(){
      this.uid = this.getUrlParam('uid')
      this.getList()
    },
    methods:{
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
            self.listArr = json.res.motherDayOrderDetailVos;
          } else {
            Toast(json.msg)
          }
        })

      }
    }
  }
</script>

<style scoped>
  li{
    font-size: 14px;
    padding: 10px 20px 0;
    color: #333;
  }
  .noNote{
    font-size: 14px;
    padding: 50px 20px 0;
    color: #333;
    text-align: center;
  }
</style>