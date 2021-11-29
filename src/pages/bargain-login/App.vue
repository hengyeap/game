<template>
    <div id='container'>
        <img class="icon" :src="imgBaseUrl + 'tst_icon.png'" />
        <van-form>
            <van-field v-model="tel" name="手机" label="+86" placeholder="请输入手机号" />
            <van-field name="验证码" v-model="validateCode" center clearable placeholder="请输入验证码">
              <template #button>
                <van-button size="small" type="primary" @click="getValidateCode">发送验证码</van-button>
              </template>
            </van-field>
            <div></div>
            <van-field v-model="password" type="password" name="密码"  placeholder="请输入密码" />
            <p class="pwd_notice">密码由6-20位英文字母、数字或符号组成</p>
            <p class="notice">未注册手机验证后完成注册</p>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click="onSubmit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { Form ,Field, Button, Toast} from 'vant';
import qs from 'qs'
import hybird from 'hybridify-js';
export default ({
    name: 'bargainLogin',
    components: {
      [Form.name]: Form,
      [Field.name]: Field,
      [Button.name]: Button
    },
    data() {
        return {
            uid: "",
            bargainId: "",
            bargainUserId: "",
            skuId: "",
            olduser: true,
            tel: "",
            validateCode: "",
            password: "",
            imgBaseUrl: "https://resource.yuedaoec.com/promotions/bargain/",
            parentCode: ""
        };
    },
    created() {
      this.uid = this.getUrlParam("uid"); //砍价者uid
      this.skuId = this.getUrlParam("skuId");
      this.bargainUserId = this.getUrlParam("bargainUserId"); //发起者uid
      if(this.uid && this.uid != "null") {
        hybird.nav.push("https://appstore.yuedaoec.com/h5/activities/bargain/bargain-help.html?uid=" + this.uid + "&skuId=" + this.skuId + "&bargainUserId=" + this.bargainUserId + "&olduser=" + this.olduser);
      }
      this.getCodeByUid();
    },
    mounted() {
    },
    updated() {},
    methods: {
      getCodeByUid() {
        let self = this
        let params = {}
        params.url = "https://store.yuedaoec.com/user/getCodeByUid.user"
        params.type = 'get'
        params.data = {
          uid: this.bargainUserId
        }
        console.log(params);
        self.createAjax(params, function(json) {
          if (json.code === '10000') {
            self.parentCode = json.res.code
            console.log(self.parentCode)
          } else {
            Toast(json.msg)
          }
        })
      },
      getValidateCode() {
        let self = this
        let params = {}
        params.url = "https://store.yuedaoec.com/sendSeemsPhoneCode.shop"
        params.type = 'post'
        params.headers =  {'content-type': 'application/x-www-form-urlencoded'}
        params.data = qs.stringify({
          phoneNumber: this.tel,
          phoneRegion: 86,
          type: 4
        })
        // console.log(params);
        self.createAjax(params, function(json) {
          console.log(json);
          if (json.code === '10000') {
            Toast("验证码发送成功")
          } else {
            Toast(json.msg)
          }
        })
      },
      onSubmit() {
        let self = this
        let params = {}
        params.url = "https://store.yuedaoec.com/openOrLogin.shop"
        params.type = 'post'
        params.data = {
          parentCode: this.parentCode,
          password: this.password,
          phoneNumber: this.tel,
          phoneRegion: 86,
          protocolVersion: "1.0",
          validateCode: this.validateCode
        }
        console.log(params);
        self.createAjax(params, function(json) {
          console.log(json);
          if (json.code === '10000') {
            console.log(json.res.uid, json.res.exist);
            if(json.res.exist === true) {
              self.olduser = true;
            } else {
              self.olduser = false;
            }
             hybird.nav.push("https://appstore.yuedaoec.com/h5/activities/bargain/bargain-help.html?uid=" + json.res.uid + "&skuId=" + self.skuId + "&bargainUserId=" + self.bargainUserId + "&olduser=" + self.olduser);
          } else {
            Toast(json.msg)
          }
        })
      }
    }
});
</script>

<style>
* {
    padding: 0;
    margin: 0;
}

img {
    display: block;
    max-width: 100%;
}

body,
html {
    background-color: #ffffff;
    font-size: 14px;
}

#container{
  padding: 100px 25px 0;
}

.icon{
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
}

.van-button--primary{
  background-color: transparent;
  border: none;
  color: #FE5472;
  font-size: 14px;
  border-left: 1px solid #DDDDDD;
}

.van-button--info{
  background: linear-gradient(126deg, #FF6D20 0%, #FE5472 100%);
  border: none;
}

.van-field__label{
  width: 40px;
}

.pwd_notice {
  font-size: 12px; 
  color: #BDBDBD;
  padding: 10px 17px 0;
}

.notice {
  text-align: center; 
  color: #FE5472; 
  margin-top: 30px;
}
</style>