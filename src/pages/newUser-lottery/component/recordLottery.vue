<template>
     <div>
        <van-overlay :show="rulesShow2" @click="closeRules2">
            <div class="rule_wrapper" @click.stop>
                    <h4>{{bargainRuleTit}} </h4>
                    <div class="uid-div">
                     ID: &nbsp;{{uid}}
                    </div>
                <div class="contxt">
                     <div v-for="(item,index) in bargainRuleContxt" :key='index' class="contxt-body">
                        <span class="shop"> {{item.prize_name}}</span>  
                        <span class="time">{{item.lottery_time}}</span>  
                     </div>
                </div>
                <span class="close" @click="closeRules2"></span>
            </div>
        </van-overlay>
    </div>
</template>
<script>
import moment from 'moment';
import { Overlay, Toast } from 'vant';
import hybrid from 'hybridify-js';
export default {
    name:'recordLottery',
      components: {
        [Overlay.name]: Overlay
    },
    props: ["rulesShow2"],
     data() {
        return {
            bargainRuleTit: "中奖记录",
            bargainRuleContxt:  [],
            uid:null,
        };
    },
    created() {
        
    },
    mounted() {
    },
     methods: {
        closeRules2() {
            this.$emit('closeRules2', this.rulesShow2);
        },
        lotteryRecord(){
            let uid = localStorage.getItem("uid");
            this.uid = uid
            if(uid){
             let params = {
                    type: 'get',
                    url: 'api/lottery/record.lottery',
                    userToken: false,
                    query: {
                        uid: uid,
                    },
            };
            this.reqwest(params).then(res => {
              this.bargainRuleContxt = res.result.list
              this.bargainRuleContxt.map((item)=>{
                        item.lottery_time =  moment(item.lottery_time).format('YYYY-MM-DD HH:mm:ss')
               })
            }).catch(err => {
                console.log(err);
            })  
            }else {
                Toast('请登录')
            }
               
        }
    }
}
</script>

<style  lang="scss" scoped>
.rule_wrapper {
    width: 336px;
    height: 372px;
    background: linear-gradient(180deg, #FFFAFA 0%, #FFE8EC 100%);
    border-radius: 5px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-sizing: border-box;
}

.contxt {
    overflow-y: auto;
    height: 300px;
    padding: 0 18px;
    margin-top: 10px;
}
.rule_wrapper::before {
    content: "";
    position: absolute;
    width: 75px;
    height: 76px;
    background-size: cover;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}

.rule_wrapper h4 {
    font-size: 16px;
    text-align: center;
    color: #FF1E49;
    margin-top: 20px;
    margin-bottom: 10px;
}
.uid-div{
    width: 40%;
    height: 14px;
    font-size: 12px;
     line-height: 16px;
     color: #aaa;
     text-align: center;
     margin: 0 auto;
}
.contxt-body{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom:1px solid #e5e5e5;
    .shop{
        display: inline-block;
        width: 55%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        line-height: 16px;
    }
    .time{
        display: inline-block;
        font-size: 10px;
        color:#aaa;
        line-height: 16px;

    }
}
</style>