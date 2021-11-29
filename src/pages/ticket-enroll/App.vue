<template>
  <div class="page">
    <van-nav-bar
            title="活动门票"
            left-arrow
            @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-field v-model="value" label="code" placeholder="请输入code" />
    </van-cell-group>
    <div class="listWord">请选择发放的门票</div>
    <van-checkbox-group v-model="result" direction="horizontal">
      <van-checkbox name="1">入场门票</van-checkbox>
      <van-checkbox name="2">伴手礼</van-checkbox>
    </van-checkbox-group>
    <div @click="saveData" class="btn">提交</div>
  </div>
</template>

<script>
    import {NavBar} from 'vant';
    import hy from 'hybridify-js';
    import { Field } from 'vant';
    import { Checkbox, CheckboxGroup } from 'vant';
    import axios from 'axios'
    export default {
        name: "App",
        components: {
            [Field.name]: Field,
            [NavBar.name]: NavBar,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
        },
        data() {
            return {
                value: '',
                result: ["1", "2"],
            }
        },
        methods:{
            onClickLeft() {
                hy.nav.back();
            },
            saveData(){
                axios.post('https://temp.yuedaoec.com/api/promotion-tickets/promotion/ticket/add',
                    {code:this.value,ticketIds:this.result,promotionId:1})
                    .then((json)=>{
                        console.log(json)
                        if (json.data.success) {
                            this.toast('添加成功')
                            setTimeout(()=>{
                                this.value=''
                            },500)


                        } else {
                            this.toast(json.data.message)
                        }
                    })

            }
        }
    }
</script>

<style scoped>
  .page{
    width: 100%;
    position: relative;
  }
  .listWord{
    font-size: 14px;
    margin: 0.4rem;
    color: #ccc;
  }
  .btn{
    background: #1a89fa;
    width: 65%;
    margin: 1rem auto;
    text-align: center;
    border-radius: 26px;
    font-size: 16px;
    color: #fff;
    line-height: 41px;
  }
</style>
<style>
  .van-checkbox--horizontal {
    margin: 0 0.4rem;
  }
  .van-checkbox__label {
    margin-left: 0.21333rem;
    color: #323233;
    line-height: 30px;
    font-size: 14px;
  }
</style>
