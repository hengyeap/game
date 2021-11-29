<template>
  <div>
    <share-link :shareTexts="shareTexts" headTitle='欧希纳'></share-link>
    <img class="pic" :src="link+fileDate+'/banner.jpg'" alt="">
    <div v-for="item in products">
      <img @click="jumpToSku1(item)" :src="link+fileDate+'/'+item+'.jpg'" alt="" class="pic">
    </div>
    <img class="pic" :src="link+fileDate+'/bottom.jpg'" alt="">

  </div>
</template>

<script>
  import ShareLink from '../../components/ShareLink.vue'
  import hy from 'hybridify-js';
  import {Dialog,Toast} from 'vant';
  export default {
    name: "ocean",
    components:{
      ShareLink,
      [Dialog.name]: Dialog,
    },
    data(){
      return{
        link:'https://resource.yuedaoec.com/image/ocean/',
        shareTexts:{
          title:'',
          description:'',
          image:''
        },
        fileDate:'',
        products:[],
      }
    },
    mounted(){
      this.uid = this.getUrlParam('uid')
      if(this.checkNull(this.uid)){
        Dialog.alert({
          message: '您还没有登录',
        })
        hy.nav.toMe();
        return
      }
      this.fileDate = this.getUrlParam('fileDate')
      this.shareTexts.title = this.getUrlParam_china('shareTitle')
      this.shareTexts.description = this.getUrlParam_china('shareDesc')
      this.shareTexts.image = this.link+this.fileDate+'/share.jpg'
      this.products = this.getUrlParam('products').split(",")
    },
    methods:{
      jumpToSku1(productId){
        hy.nav.push('https://appstore.yuedaoec.com/h5/skuDetail.html?productId='+productId)
      },
    }
  }
</script>

<style scoped>
  .pic{
    width: 100%;
    vertical-align: bottom;
  }
</style>