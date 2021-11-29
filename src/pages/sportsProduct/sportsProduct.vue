<template>
  <div class="page">
    <van-nav-bar
            title="下单本页面活动套组，额外赠5000步数"
            left-text=""
            left-arrow @click-left="toBack"

    >
    </van-nav-bar>
    <div class="productList">
      <ul class="proList">
        <li @click="jumpToSku(baokuanPros[index])" v-for="(item, index) in productList" :key="index">
          <img :src="item.bannerImg" alt="">
          <p>{{item.name}}</p>
          <span v-if="platform=='tingmimi'">¥{{item.price}}</span>
          <span v-else-if="platform=='newtingtaiwan'">NT${{item.price}}</span>
          <span v-else-if="platform=='newtingmalaysia'">RM{{item.price}}</span>
          <span v-else-if="platform=='tingsingapore'">S${{item.price}}</span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
    import {NavBar,Toast,Dialog} from 'vant';
    import hy from 'hybridify-js';
    import axios from 'axios';
    export default {
        name: "sportsMeeting",
        components:{
            [NavBar.name]: NavBar,
            [Toast.name]: Toast,
            [Dialog.name]: Dialog,

        },
        data(){
            return{
                baokuanPros:[],
                productList:[],
                platform:'tingmimi'

            }
        },
        created() {


        },
        mounted() {
            this.uid = this.getUrlParam('uid')
            if(this.checkNull(this.uid)){
                hy.nav.toMe();
                Dialog.alert({
                    message: '您还没有登录',
                })

                return
            }
            this.platform = this.getUrlParam('platform')
            this.baoKuanPros()
            this.postUserTrack('0020.0000.0000.0000.0001',)
        },
        methods:{

            baoKuanPros(){
                if(this.platform=='tingmimi'){
                    this.baokuanPros=[44968,45349,45351,44980,45353,45355,45356,45357,44969,44970,44973,44974,44984,44986,44975,44976,44979,44981,44982,44983]
                }else if(this.platform=='newtingtaiwan'){
                    this.baokuanPros=[44891,45148,45330,45370,45372,45373,45374,45375,44919,45135,45136,45137,45138,45144,45146,45141,45142,45143,45149,45150,45151]
                }else if(this.platform=='newtingmalaysia'){
                    this.baokuanPros=[45229,45256,45346,45380,45382,45383,45384,45385,45233,45234,45235,45236,45247,45251,45238,45239,45241,45242,45265,45258,45259,45262]
                }else if(this.platform=='tingsingapore'){
                    this.baokuanPros=[45065,45139,45140,45152,45153,45154,45156,45158,45160,45162,45164,45165,45168,45171,45173,45175,45168,45337,45164,45165,45376,45377,45378]
                }

                for (let i = 0; i < this.baokuanPros.length; i++) {
                    this.productList[i] = {};
                    axios.get("https://appdistapi.yuedaoec.com/product/getProductById.shop?id=" +this.baokuanPros[i]).then(ress => {
                        const item = {
                            bannerImg: "https://resource.yuedaoec.com/" + ress.data.res.product.bannerImg,
                            productId: ress.data.res.product.productId,
                            name: ress.data.res.product.name,
                            // referCurrency: ress.data.res.product.referCurrency,
                            price: ress.data.res.product.saleLowPrice
                        }
                        this.productList[i] = item;
                        this.$forceUpdate();
                    }).catch(err => {
                        console.log(err);
                    })
                }
            },

            toBack(){
                hy.nav.back()
            },
            jumpToSku(productId) {
                hy.nav.push('https://appstore.yuedaoec.com/h5/skuDetail.html?productId=' + productId)
            },
        }
    }
</script>

<style scoped>
  .page{
    width: 100%;
    position: relative;
  }

  .productList{
    position: absolute;
    top: 1.5rem;
    width: 100%;
    left: 0;
    right: 0;
    margin: auto;
  }
  .productList .title {
    height: 37px;
    margin: 40px auto 0;
  }

  .proList {
    padding: 0 15px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: auto;
  }

  .proList li {
    background-color: #ffffff;
    box-shadow: 4px 4px 15px #ececec;
    width: 48%;
    margin-bottom: 15px;
    font-size: 14px;
    padding-bottom: 10px;
  }

  .proList p{
    display: block;
    padding: 0 10px;
    font-size: 10px;
  }
  .proList span{
    display: block;
    padding: 0 10px;
    font-size: 12px;
  }

  .proList p {
    color: #666666;
    margin: 10px auto 5px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .proList li img{
    width: 100%;
  }

  .proList span {
    color: #FF4F4F;
  }


</style>
<style>
  .van-nav-bar .van-icon {
    color: #333333!important;
  }
  .van-nav-bar__text {
    color: #333333!important;
  }
  /*.van-popup{*/
  /*  background-color: rgba(0,0,0,0)!important;*/
  /*}*/

</style>