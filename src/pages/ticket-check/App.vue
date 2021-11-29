<template>
  <div class="page">
    <van-nav-bar
            :title="title"
            left-arrow
            @click-left="onClickLeft"
    />
    <table v-if="checkResult.success">
      <tr v-for="(tableData,index) in tableDatas" :key="'tableData' + index">
        <th>{{tableData.tableTitle1}}</th>
        <th>{{tableData.tableTitle2}}</th>
      </tr>
      <tr v-for="(checkLog,index) in checkResult.checkLogs" :key="'checkLog' + index">
        <td class="tableTime">{{checkLog.createdAt}}</td>
        <td class="tableStatus"> 已验证</td>
      </tr>
    </table>
    <div class="checkStatus">
      <div>{{checkResult.message}}</div>
    </div>

    <div v-if="checkResult && checkResult.userInfo" class="words">
      <div class="name">姓名:<span>{{checkResult.userInfo.name}}</span></div>
      <div class="code">开卡时间:<span>{{checkResult.userInfo.createCardDate}}</span></div>
    </div>
    <div class="btnBox">
      <div @click="rollbackCheck()" v-if="checkResult.success" class="btn">取消</div>
      <div @click="onClickLeft" class="btn">继续核销</div>


    </div>
    <!--        <div v-show="loading" class="loading-module">-->
    <!--            <div class="loading-text">-->
    <!--                验证中....-->
    <!--            </div>-->
    <!--            <van-loading class="loading" type="spinner"/>-->
    <!--        </div>-->
  </div>
</template>
<script>
    import {NavBar} from 'vant';

    import {Loading, Dialog} from 'vant';
    import hy from "hybridify-js";
    import axios from "axios";

    export default {
        components: {
            [Loading.name]: Loading,
            [NavBar.name]: NavBar,
        },
        data() {
            return {
                isVerified: false,
                status: 1,
                loading: true,
                code: '',
                name: '',
                title: '入场门票',
                tableDatas: [
                    {
                        tableTitle1: '核销时间',
                        tableTitle2: '核销状态',
                        time: '6月7日',
                        notVerified: '未验证',
                        verified: '已验证'
                    },
                ],
                checkResult: {
                    success: null,
                    log: [],
                    message: '',
                    userInfo:{},
                    checkLogs:[],
                    savedId:''
                }

            }
        },
        mounted() {
            this.uid = this.getUrlParam('uid')
            this.entranceUserId = this.getUrlParam('entranceUserId')
            this.entranceUserCode = this.getUrlParam('entranceUserCode')
            this.ticketId = this.getUrlParam('ticketId')
            this.promotionId = this.getUrlParam('promotionId')
            if (this.checkNull(this.uid)) {
                hy.nav.toMe();
                this.toast('您还没有登录！')
                return
            }
            if (this.checkNull(this.entranceUserId)) {
                this.toast('扫码异常，请要求对方退出重试！')
                hy.nav.back();
                return
            }
            this.check();

        },
        methods: {

            rollbackCheck() {
                const self = this;
                let params = {

                }
                axios.get('https://temp.yuedaoec.com/api/promotion-tickets/rollback/check?id='+this.checkResult.savedId )
                    .then((json) => {
                        if (json.data.success) {
                            this.toast('撤销成功')
                            setTimeout(()=>{
                                hy.nav.back();
                            },500)


                        } else {
                            this.toast('取消失败，请重试')
                        }
                    })
            },


            onClickLeft() {
                hy.nav.back();
            },

            check() {
                const self = this;
                let params = {
                    entranceUserId: self.entranceUserId,
                    entranceUserCode: self.entranceUserCode,
                    ticketId: self.ticketId,
                    promotionId: self.promotionId,
                    checkUserId: self.uid

                }

                axios.get(' https://temp.yuedaoec.com/api/promotion-tickets/check', {params: params})
                    .then((json) => {
                        if (json.data.success) {
                            const data = json.data
                            if (data.res.checkResult) {
                                let checkResult = this.checkResult
                                checkResult.success = true
                                checkResult.message = '验证通过，允许入场'
                                checkResult.userInfo = data.res.userInfo
                                checkResult.res = data.res
                                checkResult.checkLogs = data.res.checkLogs
                                checkResult.savedId = data.res.savedId
                                this.checkResult = checkResult
                            } else {
                                let checkResult = this.checkResult
                                checkResult.success = false
                                checkResult.message = data.res.message
                                checkResult.userInfo = data.res.userInfo
                                this.checkResult = checkResult
                                console.log(this.checkResult)
                            }


                        } else {

                        }
                    })
            }
        }
    }
</script>
<style>
  @import "../../assets/global.css";
</style>
<style scoped>
  .page {
    width: 100%;
    position: relative;
  }

  .loading-module {
    position: absolute;
    width: 100%;
    left: 0;
    top: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loading {
    margin-top: 20px
  }

  .loading-text {
    font-size: 18px;
    line-height: 20px;
  }

  table, td, th {
    border: 1px solid #000;
    font-size: 14px;
    border-collapse: collapse;
    font-weight: 400;
    text-align: center;
    line-height: 35px;
  }

  table {
    width: 90%;
    margin: 0.5rem auto;
  }

  th {
    color: #868585;
  }

  .tableTime {
    color: #000;
  }

  .tableStatus {
    color: #ff5d4d;
  }

  .tableNoStatus {
    color: #059208;
  }

  .words {
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #000;
  }

  .checkStatus {
    text-align: center;
    margin: 1rem auto;
    font-size: 18px;
    color: #000;
    font-weight: 400;
  }

  .btnBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem auto;
    text-align: center;
  }

  .btn {
    width: 40%;
    background: #63a2d9;
    border-radius: 5px;
    font-size: 14px;
    line-height: 35px;
    color: #ffffff;
  }

  .btn1 {
    width: 80%;
    background: #63a2d9;
    border-radius: 5px;
    font-size: 14px;
    line-height: 35px;
    color: #ffffff;
  }

</style>
