<template>
  <div>
    <van-nav-bar
            :title="headTitle"
            left-text=""
            left-arrow
            @click-left="toBack"
    />
  </div>
</template>

<script>
  import {NavBar} from 'vant';
  import hybrid from 'hybridify-js';
  export default {
    name: "NavBar",
    components:{
      [NavBar.name]: NavBar,
    },
    props:{
      headTitle:''
    },
    data(){
      return{
      }
    },
    mounted(){
    },
    methods:{
      toBack(){
        hybrid.nav.back()
      }
    }
  }
</script>

<style scoped>

</style>
<style>
  .van-nav-bar .van-icon {
    color: #333333!important;
  }
  .van-nav-bar__text {
    color: #333333!important;
  }


</style>