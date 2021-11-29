<template>
  <div>
    <nav-bar  headTitle='绑定快手'></nav-bar>
    <img src="https://resource.yuedaoec.com/image/bindKwaiId/bg.png" alt="" class="bg">
    <div class="box">
      <div class="input">
        <van-field label-width="125px" v-model="kuaishouId" placeholder="请输入您的快手id"/>
      </div>
      <div class="allId">您已经绑定过快手id：
        <span v-for="item in kwaiInfo">
          {{item.kuaishouId}},
        </span>
       </div>
      <img @click="toPost" src="https://resource.yuedaoec.com/image/bindKwaiId/button.png" alt="" class="button">
    </div>
  </div>
</template>

<script>
  import NavBar from '../../components/NavBar.vue'
  import hy from 'hybridify-js';
  import {Dialog,Toast, Field} from 'vant';
  export default {
    name: "bindKwaiId",
    components:{
      NavBar,
      [Dialog.name]: Dialog,
      [Field.name]: Field,
    },
    data(){
      return{
        kuaishouId:'',
        uuid:'',
        kwaiInfo:[]
      }
    },
    mounted(){
      this.uuid = this.getUrlParam('uuid')
      this.getKwaiInfo()
    },
    methods:{
      toPost(){
        // this.getKwaiBindingInfo()
        this.toBind()
      },
      getKwaiInfo(){
        let self = this
        let params = {
          url:process.env.VUE_APP_REQUEST_PRODUCT_APPDIST_URL + 'distributor/kuaishou/list/binding.distribute',
          type:'get',
          data:{
            userKey:self.uuid,
            pageSize:10,
            currentPage:1
          }
        };
        self.createAjax(params, function (json) {
          if (json.code === '10000') {
            self.kwaiInfo = json.res.datas
          } else {
            Toast(json.msg)
          }
        })
      },
      getKwaiBindingInfo(){
        let self = this
        let params = {
          url:process.env.VUE_APP_REQUEST_PRODUCT_APPDIST_URL + 'distributor/kuaishou/binding.distribute',
          type:'get',
          data:{
            kuaishouId:self.kuaishouId,
            pageSize:10,
            currentPage:1
          }
        };
        self.createAjax(params, function (json) {
          if (json.code === '10000') {
            if(json.res.kuaishouId!=null){
              Toast('该快手id已绑定过账号')
            }else {
              self.toBind()
            }
          } else {
            Toast(json.msg)
          }
        })
      },
      toBind(){
        for (let i = 0 ; i<this.kwaiInfo.length;i++){
          if(this.kwaiInfo[i].kuaishouId==this.kuaishouId){
            Toast('请勿重复绑定')
            return
          }
        }

        let self = this
        let params = {
          url:process.env.VUE_APP_REQUEST_PRODUCT_APPDIST_URL +'distributor/kuaishou/to/bind.distribute',
          type:'post',
          data:{
            kuaishouId:self.kuaishouId,
            userKey:self.uuid
          }
        };
        self.createAjax(params, function (json) {
          if (json.code === '10000') {
            Toast('绑定成功')
          } else {
            Toast(json.msg)
          }
          self.getKwaiInfo()
        })
      }
    }
  }
</script>

<style scoped>
  .bg{
    width: 100%;
  }
  .box{
    position: absolute;
    top: 8.6rem;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  .input{
    box-shadow: #dddddd 0 0 8px;
    width: 85%;
    margin: auto;
    border-radius: 5px;
  }
  .button{
    width:85%;
    margin: 0 auto;
  }
  .allId{
    font-size: 10px;
    color: #f9955b;
    width: 85%;
    margin: 0.4rem auto;
    overflow: auto;
    height: 40px;
  }

</style>
