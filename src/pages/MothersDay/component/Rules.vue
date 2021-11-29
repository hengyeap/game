<template>
  <div>
    <nav-bar  headTitle='活动规则'></nav-bar>

    <div class="words">
      活动内容：<br/>
      5月1日-5月9日，用户在庭秘密商城累计实付金额满3000元，即可加送【古法手镯礼盒】一个，每个用户（code）仅限一份。<br/>
      <br/>
      活动时间：<br/>
      5月1日0点-5月9日24点<br/>
      <br/>
      活动规则：<br/>
      1、以订单支付时间为准，计算庭秘密商城累计实付金额，蓝星商品、秒杀商品除外；<br/>
      2、用户在庭秘密商城累计实付金额满3000元（统计至下单用户对应的id中），即可获得【古法手镯礼盒】一个，每个用户（code）限一次；<br/>
      3、礼盒以礼包资格形式发放，发放至本人id内，请各位家人使用本人id所绑定的code下单（请务必确认id、code及手机号互相绑定）；避免使用他人code或下单时临时更改code。满足条件后即可发放，预计24小时内到账，可在【我的-礼包】中查看，有效期至5月31日24点；<br/>
      4、礼包发放后，需自行支付0.01元即可包邮带走；<br/>
      5、购买路径：进入【我的-礼包】，找到【母亲节赠礼】，点击即可购买；<br/>
      6、购买时间：5月1日0点-5月31日24点；<br/>
      7、发货时间：5月7日起；<br/>
      8、本活动最终解释权归达尔威所有。<br/>

    </div>
  </div>
</template>

<script>
  import NavBar from '../../../components/NavBar.vue'
  export default {
    name: "Rules",
    components:{
      NavBar
    },
  }
</script>

<style scoped>
  .words{
    font-size: 15px;
    padding: 20px;
    line-height: 27px;
    color: #333333;
  }
</style>