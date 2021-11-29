<template>
  <div class="page">
    <img src="https://resource.yuedaoec.com/image/march-lottery/bg.png" alt="" class="bg">
    <img @click="toBack" :src="backIcon" alt="" class="back-icon">
    <img @click="showRule" :src="ruleIcon" alt="" class="rule-icon">
    <img :src="noteIcon" alt="" class="note-icon">
    <div class="lottery">
      <img :src="lottery" alt="" class="lottery-bg">
      <div class="prize-box">
        <div v-for="item in brandImg" class="brand">
          <img :src="item.imgUrl" alt="" class="brandImg">
        </div>
      </div>
    </div>
    <div @click="start" class="start">
      <img :src="startIcon" alt="" class="start-icon">
    </div>
    <div class="box">
      <a class="b" href="#">反</a>
      <a class="a" href="#">正</a>
    </div>

    <van-popup v-model="ruleShow">
      <img class="rule-img" :src="ruleImg" alt="">
      <img @click="hiddenRule" class="closeRule" src="https://resource.yuedaoec.com/promotions/signInEleven/close.png" alt="">
    </van-popup>
  </div>
</template>

<script>
    import hy from 'hybridify-js'
    import {Popup} from 'vant';
    import NovemberLotteryCom from "../november-lottery/component/NovemberLotteryCom";

    export default {
        name: "march-lottery",
        components: {
            [Popup.name]: Popup,
        },
        data(){
            return{
                ruleShow:false,
                backIcon:'https://public.tingmimi.net/image/timeGame/back-icon.png',
                noteIcon:'https://resource.yuedaoec.com/image/march-lottery/note-icon.png',
                lottery:'https://resource.yuedaoec.com/image/march-lottery/lottery.png',
                ruleIcon:'https://resource.yuedaoec.com/image/march-lottery/rule-icon.png',
                ruleImg:'https://resource.yuedaoec.com/image/march-lottery/rule.png',
                startIcon:'https://resource.yuedaoec.com/image/march-lottery/start-icon.png',
                brand:{
                    "0":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                        {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'}],
                "1":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'}],

                "2":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'}],
                "3":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'}],
                "4":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'}],

                "5":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'}],
                "6":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'}],
                "7":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand3.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand2.png'}],



                "9":[{imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand1.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand1.png'},
                    {imgUrl:'https://resource.yuedaoec.com/image/march-lottery/brand1.png'}],

                },
                brandImg:[],


            }
        },
        mounted() {
            this.brandImg = this.brand[9];
        },
        methods:{
            toBack() {
                hy.nav.back()
            },
            showRule() {
                this.ruleShow = true;
            },
            hiddenRule() {
                this.ruleShow = false;
            },
            start(){

                let randomKeys = ["2", "3", "4","5","6","7"];
                let index = Math.floor(Math.random() * 6);
                this.brandImg = this.brand[randomKeys[index]];

            }
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
  }
  .back-icon {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    left: 0.2rem;
    top: 0.3rem;
    z-index: 999;
  }
  .rule-icon{
    position: absolute;
    width: 16%;
    top: 1rem;
    right: 0;
    z-index: 999;
  }
  .note-icon{
    position: absolute;
    width: 16%;
    top: 1.8rem;
    right: 0;
    z-index: 999;
  }
  .closeRule{
    position: relative;
    width: 10%;
  }
  .rule-img{
    width: 100%;
  }
  .lottery{
    width: 100%;
    position: absolute;
    top: 17rem;
    right: 0;
    left: 0;
    margin: auto;
  }
  .lottery-bg{
    width: 100%;
  }
  .prize-box{
    position: absolute;
    top: 1.7rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 81%;
    left: 0;
    right: 0;
    margin: auto;
  }
  .brand{
    width: 30%;
  }
  .brandImg{
    width: 100%;
  }
  .start-icon{
    width: 100%;
  }
  .start{
    width: 52%;
    position: absolute;
    top: 23.1rem;
    left: 0;
    right: 0;
    margin: auto;
  }
</style>