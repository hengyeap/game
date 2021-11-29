<template>
  <div class="page">
    <img @click="onClickLeft" src="https://public.tingmimi.net/image/timeGame/back-icon.png" alt="" class="back-icon">

    <img class="bg" src="https://resource.yuedaoec.com/image/awaken202007/awaken202007.png?111" alt="">
    <div @click="jumpToSku(33212)" class="free-buy"></div>
    <div @click="jump" class="get-coupon"></div>
    <div @click="jumpToSku(33140)" class="product"></div>
  </div>

</template>

<script>
    import hy from "hybridify-js";


    export default {
        name: "App",
        data(){
            return{
                uid:'',

            }
        },
        created() {
        },
        mounted() {
            this.uid = this.getUrlParam('uid')
            this.accessJwt = this.getUrlParam('accessJwt')
        },
        methods:{
            onClickLeft() {
                hy.nav.back();
            },
            jumpToSku(productId){
                hy.nav.push('https://appstore.yuedaoec.com/h5/skuDetail.html?productId='+productId)
            },
            jump(){
                if (this.checkNull(this.uid)) {
                    hy.nav.toMe();
                    this.toast('您还没有登录！')
                    return
                }
                hy.nav.push('https://appdist.yuedaoec.com/h5/bagList.html?uid='+this.uid+'&accessJwt='+this.accessJwt)
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
  .free-buy{
    position: absolute;
    top: 370px;
    left: 0;
    right: 0;
    margin: auto;
    width: 60%;
    height: 41px;
  }
  .get-coupon{
    position: absolute;
    top: 490px;
    left: 0;
    right: 0;
    margin: auto;
    width: 70%;
    height: 90px;
  }
  .product{
    position: absolute;
    top: 595px;
    left: 0;
    right: 0;
    margin: auto;
    width: 85%;
    height: 130px;
  }
</style>