<template>
    <div class="win-lottery-content" >
        <div class="content-dialog-lottery-close">
            <img src="../assets/close.png" alt="" @click="closeDialogReg">
        </div>
        <div v-if="$$(()=> winLotteryData.isVirtual)=== 0">
            <div class="top-font" v-if="!isShowTJ">
                <div class="top-font-title">
                    恭喜你获得  
                </div>
                <div class="top-font-content">
                     {{$$(() => winLotteryData.shopname)}}
                </div>
            </div>
            <div class="top-font" v-if="isShowTJ">
                    <div class=" top-font-content2">
                        提交成功
                    </div>
                    <div class="top-font-title2">
                        请耐心等待发货
                    </div>
            </div>
            <div class='win-content'>
                <div class="win-content-img">
                <img :src="$$(()=> winLotteryData.imgsrc)" alt="">
                </div>
                <div class="win-content-form" v-if="!isShowTJ">
                        <van-form  class="form">
                            <van-field v-model="nameValue" type="phoneValue"   placeholder="请输入真实姓名"  />
                            <van-field v-model="phoneValue" center    placeholder="手机号" />
                            <van-field v-model="addresssValue" type="phoneValue"   placeholder="请输入收货地址"  />
                        </van-form>
                        <div class="win-content-form-btn">
                            <img src="../assets/tj.png" alt="" @click="submitLottery">
                        </div>
                </div>
                <div class="win-content-form" v-if="isShowTJ">
                <div class="win-content-form-font">
                    新用户下载APP尊享更多新人福利 
                    </div>
                    <div class="win-content-form-img">
                    <img src="../assets/download-app.png" alt="" @click="downLink">
                    <img src="../assets/open-app.png" alt="" @click="openLink">
                    </div>   
                </div>
            </div>
        </div>
        <div v-else> 
               <div class="top-font" >
                    <div class="top-font-title">
                        恭喜你获得
                    </div>
                    <div class="top-font-content">
                         {{$$(() => winLotteryData.shopname)}}
                    </div>
                </div>
                  <div class='win-content'>
                <div class="win-content-img">
                <img :src="$$(()=> winLotteryData.imgsrc)" alt="">
                </div>
                <div class="win-content-form" >
                <div class="win-content-form-font">
                    {{$$(()=>winLotteryData.shopname)}} <br>已放入您的账户, <br>
                   将随您在APP的下一笔订单一起发放
                    </div>
                    <div class="win-content-form-img">
                    <img src="../assets/download-app.png" alt="" @click="downloadapp">
                    <img src="../assets/open-app.png" alt="" @click="openLink">
                    </div>   
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Field,Button,Form, Toast } from 'vant';
import { isPoneAvailable } from '../utils/index.js'
import qs from 'qs'
export default {
    name:'winLottery',
    data(){
        return{
            addresssValue:'',
            phoneValue:null,
            nameValue:'',
            isShowTJ : false,
            isVirtual:false,
            lotteryData:{}

        }
    },
    props: {
        winLotteryData:{
            type:Object,
            require:true
        },
        uid:{
            type:String,
            require:true
        }
    },
    components:{
        [Form.name]:Form, 
        [Field.name]: Field,
        [Button.name]:Button,
    },
      mounted(){
           this.getCode()
        },
    methods:{
         getCode(){
             let  url =location.search
             let str = url.substr(1)
             let tcode = str.split('=')
             let code = tcode[1]
             this.shopcode = code
        },
        closeDialogReg(){
            this.$emit('close',false)
        },
        submitLottery(){
            if(isPoneAvailable(this.phoneValue)){
                // this.isShowTJ = true
                let uid = localStorage.getItem("uid");
                let self = this
                let params = {}
                params.url = "http://127.0.0.1:9999/api/lottery/submitAddrInfo.user"
                params.type = 'post'
                params.headers =  {'content-type': 'application/x-www-form-urlencoded'}
                params.data = qs.stringify( {
                  uid: uid,
                  code:this.shopcode,
                  mobile:this.phoneValue,
                  address:this.addresssValue,
                  real_name:this.nameValue
                  
                })
                // console.log(params);
                self.createAjax(params, function(json) {
                   console.log('json',json);
                   if(json.status === 1000){
                       self.isShowTJ = true
                       Toast(json.msg)
                   }else{
                       Toast(json.msg)
                   } 
                })
            //  self.createAjax(params, function(json) {
            //     if (json.code === '10000') {
            //         var res = json.res;
            //         self.shareCode = res;
            //         console.log(res);
            //         self.shareShow = true;
            //     } else {
            //         Toast(json.msg)
            //     }
            // })
         }
        },
        openLink() {
            console.log('ceshi')
             this.$parent.iswexinBrowser();
             this.closeDialogReg()
            
            // const url = 'https://appstore.yuedaoec.com/h5/activities/womensday.html?isNew=true';
            
        },
        // downLink() {
        //     console.log('down')
        //     var u = navigator.userAgent
        //     console.log(u)
        //     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
        //     console.log(isAndroid)
        //     if(isAndroid) {
        //         // if(u.indexOf('HUAWEI') != -1) { // 说明是华为手机
        //         //   window.location.href = 'https://public.yuedaoec.com/apk/my/tinsecret_latest_release.apk'
        //         // } else {
        //         //   window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tst.tinsecret&fromcase=40003'
        //         // }
        //         window.location.href = 'https://public.yuedaoec.com/apk/my/tinsecret_latest_release.apk'
        //     }
        //     // console.log(isIOS)
        //     var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        //     if(isIOS) {
        //         location.href = 'https://itunes.apple.com/us/app/tst-malaysia/id1436120790'
        //     }
        // },
        downloadapp() {
		var u = navigator.userAgent
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
		if(isAndroid) {
			if(u.indexOf('HUAWEI') != -1) { // 说明是华为手机
				window.location.href = 'https://appgallery.cloud.huawei.com/uowap/index.html#/detailApp/C100723693'
			} else {
				window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tst.tinsecret&fromcase=40003'
			}
		}
		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		if(isIOS) {
			window.location.href = 'https://itunes.apple.com/us/app/%E5%BA%AD%E7%A7%98%E5%AF%86/id1320395356?l=zh&ls=1&mt=8'
		}
	}
   
    }
}
</script>
<style scoped lang='scss'>
.win-lottery-content{
      position: relative;
           top: 2.4rem;
           left: 0.7rem;
           width: 86%;
           z-index: 15;
           height: 15rem;
           background-image: url('../assets/bg-winl.png') ;
           background-repeat: no-repeat;
           background-position: center top;
           background-size:100% auto;
            .content-dialog-lottery-close{
               position: absolute;
               right: 0.6rem;
               top: -1rem;
               img{
                   width: 24px;
                   height: 24px;
               }
           }
           .top-font{
               width: 8rem;
               height: 3.6rem;
               margin: 0 auto;
            //    background: linear-gradient(-43deg, #F0D29F, #FEFAE7);
               .top-font-title{
                       text-align: center;
                       padding-top:0.7rem;
                       font-size: 15px;
                       font-family: Source Han Sans CN;
                       font-weight: 400;
                       color: #AE6839;
                       
               }
                 .top-font-title2{
                       text-align: center;
                       padding-top:0.2rem;
                       font-size: 16px;
                       font-family: Source Han Sans CN;
                       font-weight: 400;
                       color: #AE6839;
                       
               }
               .top-font-content{
                      width: 89%;
                      margin: 0 auto;
                      padding-top:0.2rem;
                      text-align:center;
                      font-size: 14px;
                      font-family: Source Han Sans CN;
                      font-weight: bold;
                      color: #AE6839; 
                      overflow: hidden;
               }
                .top-font-content2{
                      padding-top:0.7rem;
                      text-align:center;
                      font-size: 18px;
                      font-family: Source Han Sans CN;
                      font-weight: bold;
                      color: #AE6839; 
               }
           }
           .win-content{
               width:100%;
               height:10rem;
            //    background:#333;
               .win-content-img{
                   height: 4.4rem;
                   width: 100%;
                //    background: #AE6839;
                   text-align: center;
                   img{
                       width: 5rem;
                       margin: 0.46rem auto;
                   }
               }
               .win-content-form{
                   width: 84%;
                   height: 5.6rem;
                //    background: chartreuse;
                   margin: 0 auto;
                   .win-content-form-btn{
                       width: 100%;
                       height: 2rem;
                       text-align: center;
                       img{
                           width: 5rem;
                           margin-top: 0.4rem;
                       }
                     }
                     .win-content-form-font{
                         width: 88%;
                         height: 2.8rem;
                         text-align: center;
                         line-height: 0.6rem;
                         margin: 0 auto;
                        //  background: chocolate;
                         font-size: 14px;
                         font-family: Source Han Sans CN;
                         font-weight: 400;
                         color: #AE6839;
                         overflow:auto
                     }
                     .win-content-form-img{
                         width: 88%;
                         height: 2.8rem;
                         text-align: center;
                         margin: 0  auto;
                         margin-top: 0.3rem;
                         img{
                             width: 100%;
                         }
                     }
               }
           }
}

.van-cell--center{
    margin-top: 0.3rem;
    background: #FFF5DB;
}
</style>