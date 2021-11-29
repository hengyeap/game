<template>
  <div class="page">
    <van-nav-bar
            :title="platform=='tingmimi' ? '春暖花开,运动一夏':''"
            left-text=""
            left-arrow @click-left="toBack"
            @click-right="shareShow = true"
    >
      <template #right v-if="platform=='tingmimi'">
        <van-icon name="share" size="18" />
      </template>
    </van-nav-bar>
    <img class="bg" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/bg.png?1'" alt="">
    <div @click="jumpToRule" class="rule"></div>
    <div class="content">
      <div class="calorie">
        {{Math.floor((toadyDaySteps-todayCanReceiveSteps)/30)}}<br/>{{texts[platform].daKa}}
      </div>
<!--      :style="platform =='tingmimi' ? '':{opacity:'0'}"-->

      <div v-if="platform=='newtingtaiwan'" :style="platform=='newtingtaiwan'? {opacity: '0'}:''" class="swipe-box" >
        <van-swipe :style="platform =='tingmimi'||platform=='newtingtaiwan' ? {height: '26px'}:{height: '50px'}" vertical :show-indicators="false" :autoplay="2000">
          <van-swipe-item v-for="(item ,index) in texts[platform].swipeTexts" :key="index">{{item}}</van-swipe-item>
        </van-swipe>
      </div>
      <div v-else :style="platform =='tingmimi' ? '':{top:'0'}" class="swipe-box" >
        <van-swipe :style="platform =='tingmimi' ? {height: '26px'}:{height: '50px'}" vertical :show-indicators="false" :autoplay="2000">
          <van-swipe-item v-for="(item ,index) in texts[platform].swipeTexts" :key="index">{{item}}</van-swipe-item>
        </van-swipe>
      </div>
      <div class="steps">
        <img class="stepsBg" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/receive-steps.png'" alt="">
        <div class="stepsNumBox">
          <div @click="toReceiveSteps" class="stepsNum">{{todayCanReceiveSteps}}</div>
          <div @click="toExchange" class="stepsNum">{{usableNumber}}</div>
        </div>
      </div>
      <div class="popupIcon">
        <img @click="open('taskShow')" class="popupIconImg" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/popupIconImg1.gif'" alt="">
        <img @click="open('rankingListShow')" class="popupIconImg" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/popupIconImg2.png'" alt="">
        <img @click="open('myStepsShow')" class="popupIconImg" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/popupIconImg3.png'" alt="">
      </div>
      <img v-if="platform=='tingmimi'"  @click="open('rankingListShow')"  class="gift" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/gift1.png'" alt="">
      <img @click="open('rankingListShow')"  class="gift" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/gift2.png'" alt="">
      <div v-if="platform=='tingmimi'" class="baokuanPros">
        <img class="taoZu" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/taoZu.png'" alt="">
        <div class="productList">
          <ul class="proList">
            <li @click="jumpToSku(item.productId)" v-for="(item, index) in productList" :key="index">
              <img :src="item.bannerImg" alt="">
              <p>{{item.name}}</p>
              <span>{{currency(item.referCurrency)}}{{item.price}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="appWord">{{texts[platform].tips1}}</div>
    </div>



    <!--    <div v-if="!activityNotStarted">shifoujinruhuodong</div>-->

    <van-popup class="confirmPopup" v-model="activityNotStarted" :style="{backgroundColor: 'rgba(0,0,0,0)'}" :close-on-click-overlay="false" position="center">
      <img class="confirm" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/confirm.png'" alt="">
      <div class="confirmIcon">
        <div @click="confirmToJoin" class="confirm-icon"></div>
        <div @click="toBack" class="replace-icon"></div>
      </div>

    </van-popup>
    <van-popup v-model="taskShow" :overlay="true" :close-on-click-overlay="false" :style="{backgroundColor: 'rgba(0,0,0,0)'}" position="bottom" >
      <div class="closeIconBox">
        <img @click="close('taskShow')" class="closeIcon" src="https://resource.yuedaoec.com/promotions/signInEleven/close.png" alt="">
      </div>
      <div class="taskShow">
        <img class="taskIcon" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/task-icon.png'" alt="">
        <div class="taskBox">
          <div v-for="(item,index) in texts[platform].task" class="raw">
            <div class="left">
              <div v-if="index==0">{{item.title.replace('{}',signInNum)}}</div>
              <div v-else-if="index==1">{{item.title.replace('{}',lookNum)}}</div>
              <div v-else-if="index==4">{{item.title.replace('{}',challengeSteps)}}</div>
              <div v-else>{{item.title}}</div>
              <span v-html="item.des"></span>
            </div>
            <!--            <div  v-if="index==2||index==3" class="right1"></div>-->
            <!--            <div @click="addSteps(item.gainType)" :class="item.status? 'right':'right1'">{{item.status ? item.toReceive:item.noComplete}}</div>-->
            <!--            去完成任务-->
            <div @click="jumpToDoTask(item.gainType,item.stepsNum)" v-if="!item.toDoStatus&&!item.completeStatus" class="right1">{{item.noComplete}}</div>
            <!--            领步数-->
            <div v-else-if="item.toDoStatus&&!item.completeStatus" @click="addSteps(item.gainType,item.completeStatus,item.stepsNum)" class="right">{{item.toReceive}}</div>
            <!--            已领取（已完成）-->
            <div v-else-if="item.toDoStatus&&item.completeStatus" class="right1">{{item.complete}}</div>
          </div>
        </div>
      </div>

    </van-popup>
    <van-popup v-model="rankingListShow" :close-on-click-overlay="false" :style="{backgroundColor: 'rgba(0,0,0,0)'}" position="bottom" >
      <div class="closeIconBox">
        <img @click="close('rankingListShow')" class="closeIcon" src="https://resource.yuedaoec.com/promotions/signInEleven/close.png" alt="">
      </div>
      <div class="taskShow">
        <img class="taskIcon" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/ranking-list-icon.png'" alt="">
        <div class="disparity">
          {{texts[platform].allSteps}}
          <span>{{allSteps}}</span><br />
          <div v-if="num5000-allSteps>=0">
            {{texts[platform].disparity.replace('{}',num5000-allSteps)}}
          </div>
          <div v-else>
            {{texts[platform].disparity.replace('{}',0)}}
          </div>
        </div>
        <div class="taskBox">
          <van-list
                  v-model="loading1"
                  :finished="finished1"
                  :finished-text="texts[platform].noMore"
                  @load="onLoad1"

          >
            <div v-for="(item,index) in list.slice(0,100)" :key="index" class="raw1" >
              <div class="ranking">{{index+1}}</div>
              <div class="nickname">{{item.nickName}}</div>
              <div class="code">{{item.code}}</div>
              <div class="allSteps">{{item.totalNumber}}</div>
            </div>

          </van-list>
        </div>
        <div class="tips">{{texts[platform].tips2}}</div>
      </div>

    </van-popup>
    <van-popup v-model="myStepsShow" :close-on-click-overlay="false" :style="{backgroundColor: 'rgba(0,0,0,0)'}" position="bottom" >
      <div class="closeIconBox">
        <img @click="close('myStepsShow')" class="closeIcon" src="https://resource.yuedaoec.com/promotions/signInEleven/close.png" alt="">
      </div>
      <div class="taskShow">
        <img class="taskIcon" :src="'https://resource.yuedaoec.com/image/sportsMeeting/'+platform+'/my-steps-icon.png'" alt="">
        <div class="taskBox">
          <div class="myStepsRaw">
            <div class="date">{{texts[platform].date}}</div>
            <div class="receiveSteps">{{texts[platform].receiveSteps}}</div>
            <div class="rewardSteps">{{texts[platform].rewardSteps}}</div>
            <div class="rewardSteps">{{texts[platform].todayAllSteps}}</div>
          </div>
          <van-list
                  v-model="loading"
                  :finished="finished"
                  :finished-text="texts[platform].noMore"
                  @load="onLoad"
          >
            <div class="flow">
              <div v-for="item in allDayNumber" :key="item" :title="item" class="myStepsRaw1">
                <div class="date">{{item.todayStr}}</div>
                <div class="receiveSteps">{{item.getNumber}}</div>
                <div class="rewardSteps">{{item.awardNumber}}</div>
                <div class="allStepsNum">{{item.totalNumber}}</div>
              </div>
            </div>
          </van-list>
        </div>
        <div class="tips">{{texts[platform].tips3}}</div>
      </div>

    </van-popup>
    <van-popup   v-model="shareShow" :close-on-click-overlay="false"  position="bottom" :style="{ height: '25%',backgroundColor:'#ffff'}">

      <div class="share-box">
        <div class="share-weChat">
          <img @click="shareWeChat('wechat')" src="https://public.tingmimi.net/image/poster9/weChat.png" alt="" class="weChat-icon"><br/>微信
        </div>
        <div class="share-weChatCircle">
          <img @click="shareWeChat(('circle'))" src="https://public.tingmimi.net/image/poster9/weChatCircle.png" alt="" class="weChatCircle-icon"><br/>朋友圈
        </div>

      </div>

      <div @click="close('shareShow')" class="close">取消</div>

    </van-popup>
    <van-dialog v-model="dialogShow"  @confirm="confirm" :confirmButtonText="texts[platform].know">
      <div class="dialogWord">{{texts[platform].tips4}}</div>
    </van-dialog>
    <van-dialog v-model="AndroidShow"  @confirm="confirm1" :confirmButtonText="texts[platform].know">
      <div class="dialogWord" v-html="texts[platform].tips5"></div>
    </van-dialog>
  </div>
</template>

<script>
    import {popup,NavBar,Icon,Swipe, SwipeItem,Toast,List,cell,Dialog} from 'vant';
    import hy from 'hybridify-js';
    import axios from 'axios';
    export default {
        name: "sportsMeeting",
        components:{
            [popup.name]: popup,
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [List.name]: List,
            [cell.name]: cell,
            [Dialog.Component.name]: Dialog.Component,

        },
        data(){
            return{
                list: [],
                loading: false,
                dialogShow: false,
                AndroidShow: false,
                finished: false,
                loading1: false,
                finished1: false,
                shareShow: false,
                taskShow: false,
                myStepsShow: false,
                rankingListShow: false,
                uid:'',
                platform:'',
                signInNum:0,
                challengeSteps:0,
                lookNum:0,
                texts:{
                    tingmimi: {
                        task:[
                            {
                                title:'每日签到（{}/1）',
                                des:'签到1次可获得100步数',
                                noComplete:'去签到',
                                toReceive:'领步数',
                                complete:'已完成',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:2,
                                stepsNum:100
                            },{
                                title:'页面浏览（{}/2）',
                                des:'浏览页面得200步数',
                                noComplete:'去浏览',
                                toReceive:'领步数',
                                complete:'已完成',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:3,
                                stepsNum:200
                            },{
                                title:'下单任一商品',
                                des:'下单可获得1000步数<br />注：无需领取，自动添加至【可用步数】中',
                                noComplete:'去下单',
                                toReceive:'领步数',
                                complete:'已完成',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:4,
                                stepsNum:1000


                            },{
                                title:'下单指定健康套组',
                                des:'下单健康套组可获得5000步数<br />注：无需领取，自动添加至【可用步数】中',
                                noComplete:'去下单',
                                toReceive:'领步数',
                                complete:'已完成',
                                toDoStatus:false,
                                completeStatus:false,
                                gainType:4,
                                stepsNum:5000

                            },{
                                title:'挑战每日10000步（{}/1）',
                                des:'当日满10000步可加赠2000步数',
                                noComplete:'未达成',
                                toReceive:'领步数',
                                complete:'已完成',
                                toDoStatus:false,
                                completeStatus:false,
                                gainType:6,
                                stepsNum:2000
                            },
                        ],
                        swipeTexts:['健行10000步，健康每一天','全民健身,你我同行','步行10000步，约消耗330卡路里','步行10000步，相当于环海花岛绕行一圈','连续走10000步，约需要1小时'],
                        daKa:'大卡',
                        date:'日期',
                        receiveSteps:'领取步数',
                        rewardSteps:'奖励步数',
                        todayAllSteps:'当日总步数',
                        allSteps:'个人总步数：',
                        disparity:'你离第5000名还差步数{}',
                        noMore:'没有更多了',
                        tips1:'注：本活动与苹果公司无关',
                        tips2:'注：排行榜仅展示当前排名前100名',
                        tips3:'注：本活动的可领取步数每日封顶50000步（以庭秘密APP）展示数据为准；卡路里消耗数据仅供参考，不能作为科学依据',
                        tips4:'庭秘密需要访问HealthKit“步数”。若不允许，您将无法参与庭秘密运动步数排行榜。请在 设置-隐私-健康-TST庭秘密 中打开步数读取数据权限。',
                        tips5:'致亲爱的安卓用户：<br / >因步数获取权限问题，安卓用户每天第一次进入活动页步数为0，第二次开始进入活动页才可收取步数。<br / >建议：每天8点前先进入一次活动页，22点后再进入一次活动页收取步数。',
                        know:'知道了',
                    },
                    newtingtaiwan: {
                        task:[
                            {
                                title:'每日簽到（{}/1）',
                                des:'簽到1次可獲得100步數',
                                noComplete:'去簽到',
                                toReceive:'領步數',
                                complete:'已完成',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:2,
                                stepsNum:100
                            },{
                                title:'頁面流覽（{}/2）',
                                des:'流覽頁面得200步數',
                                noComplete:'去流覽',
                                toReceive:'領步數',
                                complete:'已完成',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:3,
                                stepsNum:200
                            },{
                                title:'下單任一商品',
                                des:'下單可獲得1000步數<br />注：無需領取，自動添加至【可用步數】中',
                                noComplete:'去下單',
                                toReceive:'領步數',
                                complete:'已完成',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:4,
                                stepsNum:1000


                            },{
                                title:'下單指定健康套組',
                                des:'下單健康套組可獲得5000步數<br />注：無需領取，自動添加至【可用步數】中',
                                noComplete:'去下單',
                                toReceive:'領步數',
                                complete:'已完成',
                                toDoStatus:false,
                                completeStatus:false,
                                gainType:4,
                                stepsNum:5000

                            },{
                                title:'挑戰每日10000步（{}/1）',
                                des:'當日滿10000步可加贈2000步數',
                                noComplete:'未達成',
                                toReceive:'領步數',
                                complete:'已完成',
                                toDoStatus:false,
                                completeStatus:false,
                                gainType:6,
                                stepsNum:2000
                            },
                        ],
                        swipeTexts:['健行10000步，健康每一天','全民健身,你我同行','步行10000步，約消耗330卡路里','步行10000步，相當於環海花島繞行一圈','連續走10000步，約需要1小時'],
                        daKa:'大卡',
                        date:'日期',
                        receiveSteps:'領取步數',
                        rewardSteps:'獎勵步數',
                        todayAllSteps:'當日總步數',
                        allSteps:'个人總步數：',
                        disparity:'你離第5000名還差步數{}',
                        noMore:'沒有更多了',
                        tips1:'注：本活動與蘋果公司無關',
                        tips2:'注：排行榜僅展示當前排名前100名',
                        tips3:'注：本活動的可領取步數每日封頂50000步（以APP）展示數據為准；卡路里消耗數據僅供參考，不能作為科學依據',
                        tips4:'TST庭妹妹需要訪問HealthKit“步數”。若不允許，您將無法參與TST庭妹妹運動步數排行榜。請在 設置-隱私-健康-TST庭妹妹 中打開步數讀取數據許可權。',
                        tips5:'該設備無法自動獲取步數<br / >登錄APP後開始計算運動步數<br / >為保證步數統計準確<br / >建議您在每日運動前登錄APP',
                        know:'知道了',

                    },
                    newtingmalaysia: {
                        task:[
                            {
                                title:'Daily Check-in({}/1)',
                                des:'Check-in 1 Time for 100 Steps',
                                noComplete:'Check-in',
                                toReceive:'Claim Steps',
                                complete:'Completed',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:2,
                                stepsNum:100
                            },{
                                title:'View Page({}/2)',
                                des:'View Page to get 200 Steps',
                                noComplete:'Go to View',
                                toReceive:'Claim Steps',
                                complete:'Completed',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:3,
                                stepsNum:200
                            },{
                                title:'Place ANY order',
                                des:'Place order to get 1000 Steps<br />Note: Do NOT need to claim, it will be automatically added to【Redeemable Steps】',
                                noComplete:'Buy Now',
                                toReceive:'Claim Steps',
                                complete:'Completed',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:4,
                                stepsNum:1000


                            },{
                                title:'Purchase Designated HEALTH Set',
                                des:'Purchase Designated HEALTH Set to get 5000 Steps<br />Note: Do NOT need to claim, it will be automatically added to【Redeemable Steps】',
                                noComplete:'Buy Now',
                                toReceive:'Claim Steps',
                                complete:'Completed',
                                toDoStatus:false,
                                completeStatus:false,
                                gainType:4,
                                stepsNum:5000

                            },{
                                title:'10000 Steps Daily Challenge({}/1)）',
                                des:'Achieved 10000 Steps on the day to get additional 2000 Steps',
                                noComplete:'Unaccomplished',
                                toReceive:'Claim Steps',
                                complete:'Completed',
                                toDoStatus:false,
                                completeStatus:false,
                                gainType:6,
                                stepsNum:2000
                            },
                        ],
                        swipeTexts:['Health Walk 10000 Steps，Stay Healthy Every Day','Let us Stay Fit Together','Walk 10000 Steps, burn approximately 330 calories ','Walk 10000 Steps equivalent to 1 round Haihua Island','It takes about 1 hour to walk 10000 steps continuously'],
                        daKa:'Kcal',
                        date:'Date',
                        receiveSteps:'Claim Steps',
                        rewardSteps:'Reward Steps',
                        todayAllSteps:'Total Steps of the Day',
                        allSteps:'allSteps：',
                        disparity:'You are {} steps away from No.5000',
                        noMore:'No More',
                        tips1:'Note: This Event is unrelated to Apple Company',
                        tips2:'Note: The ranking only displays the current TOP 100',
                        tips3:'Note: The number of steps available to claim for this Event is capped at 50,000 steps per day (Subject to Data Display in TST-Malaysia APP; the calorie burning data is for reference only and cannot be used as a scientific basis)',
                        tips4:'TST-Malaysia needs to visit HealthKit "Steps", otherwise, you will not be able to participate in the TST-Malaysia Workout Steps Ranking Event. Please allow step data reading permission in Settings-Privacy-Health- TST-Malaysia.',
                        tips5:'Dear Android Users: Due to the permission issue of the step count, the step count for Android Users entering the event page for the first time each day is set to ZERO, and the number of steps can only be collected when entering the event page for the second time. Suggestion: Enter the event page before 8 oclock every day, and then enter the event page after 22:00 to collect all the step count.',
                        know:'Understand',
                    },
                    tingsingapore: {
                        task:[
                            {
                                title:'Daily Check-in({}/1)',
                                des:'Check-in 1 Time for 100 Steps',
                                noComplete:'Check-in',
                                toReceive:'Claim Steps',
                                complete:'Completed',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:2,
                                stepsNum:100
                            },{
                                title:'View Page({}/2)',
                                des:'View Page to get 200 Steps',
                                noComplete:'Go to View',
                                toReceive:'Claim Steps',
                                complete:'Completed',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:3,
                                stepsNum:200
                            },{
                                title:'Place ANY order',
                                des:'Place order to get 1000 Steps<br />Note: Do NOT need to claim, it will be automatically added to【Redeemable Steps】',
                                noComplete:'Buy Now',
                                toReceive:'Claim Steps',
                                complete:'Completed',
                                completeStatus:false,
                                toDoStatus:false,
                                gainType:4,
                                stepsNum:1000


                            },{
                                title:'Purchase Designated HEALTH Set',
                                des:'Purchase Designated HEALTH Set to get 5000 Steps<br />Note: Do NOT need to claim, it will be automatically added to【Redeemable Steps】',
                                noComplete:'Buy Now',
                                toReceive:'Claim Steps',
                                complete:'Completed',
                                toDoStatus:false,
                                completeStatus:false,
                                gainType:4,
                                stepsNum:5000

                            },{
                                title:'10000 Steps Daily Challenge({}/1)）',
                                des:'Achieved 10000 Steps on the day to get additional 2000 Steps',
                                noComplete:'Unaccomplished',
                                toReceive:'Claim Steps',
                                complete:'Completed',
                                toDoStatus:false,
                                completeStatus:false,
                                gainType:6,
                                stepsNum:2000
                            },
                        ],
                        swipeTexts:['Health Walk 10000 Steps，Stay Healthy Every Day','Let us Stay Fit Together','Walk 10000 Steps, burn approximately 330 calories ','Walk 10000 Steps equivalent to 1 round Haihua Island','It takes about 1 hour to walk 10000 steps continuously'],
                        daKa:'Kcal',
                        date:'Date',
                        receiveSteps:'Claim Steps',
                        rewardSteps:'Reward Steps',
                        todayAllSteps:'Total Steps of the Day',
                        allSteps:'allSteps：',
                        disparity:'You are {} steps away from No.5000',
                        noMore:'No More',
                        tips1:'Note: This Event is unrelated to Apple Company',
                        tips2:'Note: The ranking only displays the current TOP 100',
                        tips3:'Note: The number of steps available to claim for this Event is capped at 50,000 steps per day (Subject to Data Display in TST-Singapore APP; the calorie burning data is for reference only and cannot be used as a scientific basis)',
                        tips4:'TST-Singapore needs to visit HealthKit "Steps", otherwise, you will not be able to participate in the TST-Singapore Workout Steps Ranking Event. Please allow step data reading permission in Settings-Privacy-Health- TST-Singapore.',
                        tips5:'Dear Android Users: Due to the permission issue of the step count, the step count for Android Users entering the event page for the first time each day is set to ZERO, and the number of steps can only be collected when entering the event page for the second time. Suggestion: Enter the event page before 8 oclock every day, and then enter the event page after 22:00 to collect all the step count.',
                        know:'Understand',
                    }
                },
                toadyDaySteps:0,//今日app获取走路步数
                todayCanReceiveSteps:0,//今日可领取步数=今日app获取走路步数-点击按钮拿到已领取步数
                receivedSteps:0,//点击按钮拿到已领取步数
                currentPage1:1,
                pageSize1:10,
                currentPage:1,
                pageSize:10,
                nowDate:'',
                allDayNumber:[],
                allSteps:0,
                allGainType:[2,3,6],
                deviceId:'',
                activityNotStarted:false,//未开始活动
                challengeStepsNum:0,
                look:0,
                region:86,
                firstSteps:0,
                usableNumber:0,
                baokuanPros:[],
                productList:[],
                num5000:0,
                versionOriginal:''

            }
        },
        created() {
            window.addEventListener( "pageshow", function ( event ) {
                var historyTraversal = event.persisted ||
                    ( typeof window.performance != "undefined" &&
                        window.performance.navigation.type === 2 );
                if ( historyTraversal ) {
                    // Handle page restore.
                    window.location.reload();
                }
            });
            this.setupWebViewJavascriptBridge(function(webViewJavascriptBridge) {
                window.WebViewJavascriptBridge = webViewJavascriptBridge;
            });

            if(this.getSession('look')==='0'){
                this.taskShow=true
                this.checkTaskStatus(3)
                for(let i =0;i<this.allGainType.length;i++){
                    this.checkTaskStatus(this.allGainType[i])
                }
            }
            if(this.taskShow){
                this.checkTaskStatus(3)
            }
            this.getVersionString()

            // this.getDateNum()
            // this.getEveryDaySteps()

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
            if(this.platform=='tingmimi'){
                this.region=86
            }else if(this.platform=='newtingtaiwan'){
                this.region=886
            }else if(this.platform=='newtingmalaysia'){
                this.region=60
            }else if(this.platform=='tingsingapore'){
                this.region=65
            }


            if(this.getSession('look')==='0'){
                this.taskShow=true
                this.checkTaskStatus(3)

                for(let i =0;i<this.allGainType.length;i++){
                    this.checkTaskStatus(this.allGainType[i])
                }
            }
            if(this.taskShow){
                this.checkTaskStatus(3)
            }
            for(let i =0;i<this.allGainType.length;i++){
                this.checkTaskStatus(this.allGainType[i])
            }
            // this.getDeviceId()
            this.getVersionString()

            this.findTotalNumber()
            setTimeout(()=>{
                this.getEveryDaySteps()
            },1000)

            setTimeout(()=>{
                this.findDayNumber()
            },1000)


            this.baoKuanPros()
        },
        methods:{
            getVersionString(){

                const response = hy.app.whereamiSync()
                if(this.platform=='tingmimi'){
                    this.versionOriginal = "2.10.0"
                    console.log(this.versionOriginal)
                }else if(this.platform=='newtingtaiwan'){
                    this.versionOriginal = "2.1.19"
                }else if(this.platform=='newtingmalaysia'){
                    this.versionOriginal = "2.1.15"
                }else if(this.platform=='tingsingapore'){
                    this.versionOriginal = "1.0.15"
                }
                const vesion = this.versionOriginal.split(".");
                const versionNow =this.getUrlParam("versionString").split(".");
                if(parseInt(vesion[0])>parseInt(versionNow[0])){
                    Toast('该版本不支持该功能，请更新APP');
                    setTimeout(()=>{
                        hy.nav.back()
                    },1000)
                }else {
                    if(parseInt(vesion[1])>parseInt(versionNow[1])){
                        Toast('该版本不支持该功能，请更新APP');
                        setTimeout(()=>{
                            hy.nav.back()
                        },1000)
                    }else {
                        if(parseInt(vesion[2])>=parseInt(versionNow[2])){
                            if(this.platform=='tingmimi'){
                                Toast('该版本不支持该功能，请更新APP');
                            }else {
                                Toast('该版本不支持该功能，请更新APP');

                            }
                            setTimeout(()=>{
                                hy.nav.back()
                            },1000)
                        }else {
                            if(response == "App@Android") {
                                this.AndroidShow=true
                            }
                            // setTimeout(()=>{
                            //     this.getEveryDaySteps()
                            // },2000)
                        }
                    }
                }


            },
            //获取app每日步数和设备号
            getEveryDaySteps(){
                const self = this
                window.WebViewJavascriptBridge.callHandler('getStepNumber', {}, function(response) {
                    // this.toadyDaySteps = response.stepNumber
                    // this.deviceId=response.deviceid
                    const response1 = JSON.parse(response)
                    self.toadyDaySteps = response1.stepNumber
                    self.deviceId=response1.deviceid
                    // if(self.uid=='34596570'){
                    //     alert(response1.stepNumber)
                    //     alert(self.toadyDaySteps)
                    // }
                    if(self.toadyDaySteps == -1){
                        self.dialogShow=true
                    }else {
                        self.getDeviceId()
                    }
                    // alert(self.toadyDaySteps,self.deviceId)
                });
            },
            confirm(){
                hy.nav.back();
            },
            confirm1(){
               this.AndroidShow=false
            },
            //查询设备号
            getDeviceId(){
                // axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/marchSign/sendCoupon/userId.distribute?userId=" + this.uid+'&couponId='+couponId).then(res => {
                // axios.get("http://localhost:8988/sendCoupon/activity/sportsMeeting/getDeviceId.distribute?userId=" + this.uid).then(res => {
                axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/sportsMeeting/getDeviceId.distribute?userId=" + this.uid).then(res => {
                    if (res.data.code == "10000") {
                        if(this.checkNull(res.data.res)){
                            this.activityNotStarted=true
                        }
                    } else {
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //确定用此账号和设备参与活动
            confirmToJoin(){
                this.activityNotStarted=false
                this.todayCanReceiveSteps=this.toadyDaySteps

            },
            onLoad(){
                this.currentPage++
                this.findDayNumber()
            },

            //获取每日步数
            findDayNumber(){
                const self = this
                // axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/marchSign/sendCoupon/userId.distribute?userId=" + this.uid+'&couponId='+couponId).then(res => {
                // axios.get("http://localhost:8988/sendCoupon/activity/sportsMeeting/findDayNumber.distribute?userId=" + this.uid+'&pageSize=10&currentPage='+this.currentPage).then(res => {
                axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/sportsMeeting/findDayNumber.distribute?userId=" + self.uid+'&pageSize=10&currentPage='+self.currentPage).then(res => {
                    if (res.data.code == "10000") {

                        if(self.currentPage==1){
                            // alert('currentPage1')
                            axios.get("https://store.yuedaoec.com/getToday.shop").then(resss => {
                                self.nowDate =resss.data.res
                                if(self.nowDate==res.data.res.datas[0].todayStr){
                                    console.log(123123)


                                    let todayArr = res.data.res.datas[0].getNumber
                                    self.challengeStepsNum = res.data.res.datas[0].totalNumber

                                    console.log('todayArr',todayArr,self.toadyDaySteps)
                                    self.todayCanReceiveSteps=self.toadyDaySteps-todayArr
                                    // if(self.uid=='34596570'){
                                    //     alert(self.todayCanReceiveSteps)
                                    //     alert(self.toadyDaySteps)
                                    //     alert(todayArr)
                                    // }

                                    if(self.todayCanReceiveSteps<0){
                                        self.todayCanReceiveSteps=0
                                    }
                                    // alert(self.todayCanReceiveSteps)
                                    // alert(self.toadyDaySteps)
                                    // alert(todayArr)
                                }else {
                                    self.todayCanReceiveSteps=self.toadyDaySteps

                                }
                            }).catch(err => {
                                console.log(err);
                            })


                        }

                        self.allDayNumber= self.allDayNumber.concat(res.data.res.datas)
                        // this.allDayNumber  = a.reverse()
                        // console.log(this.allDayNumber,a,'b')
                        self.loading=false
                        if(self.pageSize * self.currentPage >= res.data.res.count){
                            self.finished = true
                            console.log(123,self.finished)
                        }
                        // for(let i = 0 ; i < this.allDayNumber.length;i++){
                        //     if(this.nowDate == this.allDayNumber[i].todayStr){
                        //         this.todayCanReceiveSteps=this.toadyDaySteps-this.allDayNumber[i].getNumber
                        //         this.challengeStepsNum=this.allDayNumber[i].totalNumber
                        //     }else {
                        //         this.todayCanReceiveSteps=this.toadyDaySteps
                        //     }
                        // }
                    } else {
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            onLoad1(){
                this.currentPage1++
                this.findTop100()
            },
            //查询前100
            findTop100(){
                // axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/marchSign/sendCoupon/userId.distribute?userId=" + this.uid+'&couponId='+couponId).then(res => {
                // axios.get("http://localhost:8988/sendCoupon/activity/sportsMeeting/findTop100.distribute?region=" + this.region+'&pageSize=10&currentPage='+this.currentPage1).then(res => {
                axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/sportsMeeting/findTop100.distribute?region=" + this.region+'&pageSize=10&currentPage='+this.currentPage1).then(res => {
                    if (res.data.code == "10000") {
                        this.list=this.list.concat(res.data.res.datas)
                        if(res.data.res.count==0){
                            this.finished1 = true
                            this.firstSteps = 0
                        }else {
                            this.firstSteps = this.list[0].totalNumber
                            this.loading1 = false;
                            console.log(123,res.data.res.count,this.pageSize)
                            if(this.pageSize1 * this.currentPage1 >= res.data.res.count){
                                this.finished1 = true
                                console.log(123,this.finished)
                            }
                            if(this.pageSize1 * this.currentPage1 == 100){
                                this.finished1 = true
                            }
                        }

                    } else {
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            //查询自己的总步数
            findTotalNumber(){
                // axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/marchSign/sendCoupon/userId.distribute?userId=" + this.uid+'&couponId='+couponId).then(res => {
                // axios.get("http://localhost:8988/sendCoupon/activity/sportsMeeting/findTotalNumber.distribute?userId=" + this.uid).then(res => {
                axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/sportsMeeting/findTotalNumber.distribute?userId=" + this.uid).then(res => {
                    if (res.data.code == "10000") {
                        this.allSteps=res.data.res.totalNumber
                        this.usableNumber=res.data.res.usableNumber
                        if(this.checkNull(this.usableNumber)){
                            this.usableNumber=0
                        }
                    } else {
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //查询第5000名步数
            getTop5000TotalNumber(){
                // axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/marchSign/sendCoupon/userId.distribute?userId=" + this.uid+'&couponId='+couponId).then(res => {
                axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/sportsMeeting/getTop5000TotalNumber.distribute").then(res => {
                // axios.get("http://localhost:8988/sendCoupon/activity/sportsMeeting/getTop5000TotalNumber.distribute").then(res => {
                if (res.data.code == "10000") {
                    this.num5000 = res.data.res
                    } else {
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //存储步数
            addSteps(gainType,completeStatus,stepsNum){

                // axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/marchSign/sendCoupon/userId.distribute?userId=" + this.uid+'&couponId='+couponId).then(res => {
                // axios.post("http://localhost:8988/sendCoupon/activity/sportsMeeting/addSteps.distribute?userId=" + this.uid+'&gainType='+gainType+'&number='+stepsNum+'&deviceId='+this.deviceId).then(res => {
                axios.post("https://appdistapi.yuedaoec.com/sendCoupon/activity/sportsMeeting/addSteps.distribute?userId=" + this.uid+'&gainType='+gainType+'&number='+stepsNum+'&deviceId='+this.deviceId).then(res => {
                    // if(this.uid='31258371'){
                    //     alert('https://appdistapi.yuedaoec.com/sendCoupon/activity/sportsMeeting/addSteps.distribute?userId=' + this.uid+'&gainType='+gainType+'&number='+stepsNum+'&deviceId='+this.deviceId)
                    // }
                    if (res.data.code == "10000") {
                        if(gainType==1){
                            this.todayCanReceiveSteps=0
                            this.findTotalNumber()
                            Toast("领取成功");
                        }else if(gainType==2){
                            completeStatus=true
                            Toast("领取成功");
                        }else if(gainType==3){
                            this.lookPage=1
                            Toast("领取成功");
                        }else if(gainType==6){
                            this.challengeSteps=1
                            completeStatus=true
                            Toast("领取成功");

                        }
                        this.findDayNumber()
                        this.findTotalNumber()
                        this.checkTaskStatus(gainType)


                        // this.todayCanReceiveSteps=0
                        // Toast("领取成功");
                    } else {
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            toReceiveSteps(){
                // this.getEveryDaySteps()
                // alert(this.toadyDaySteps)
                if(this.todayCanReceiveSteps>0&&this.todayCanReceiveSteps<=50000){
                    this.addSteps(1,true,this.toadyDaySteps)
                }else if(this.todayCanReceiveSteps>50000) {
                    this.addSteps(1,true,50000)
                }else {
                    Toast('可领取步数不足')
                }

            },
            //查询任务是否完成
            checkTaskStatus(gainType){
                // axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/marchSign/sendCoupon/userId.distribute?userId=" + this.uid+'&couponId='+couponId).then(res => {
                // axios.get("http://localhost:8988/sendCoupon/activity/sportsMeeting/checkTaskStatus.distribute?userId=" + this.uid+'&gainType='+gainType).then(res => {
                axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/sportsMeeting/checkTaskStatus.distribute?userId=" + this.uid+'&gainType='+gainType).then(res => {
                    if (res.data.code == "10000") {
                        if(gainType==2){
                            if(res.data.res==1){
                                this.texts[this.platform].task[0].completeStatus=true
                                this.texts[this.platform].task[0].toDoStatus=true
                                this.signInNum=1
                            }
                        }else if(gainType==3){
                            if(res.data.res==2){
                                this.lookNum=res.data.res
                                this.texts[this.platform].task[1].completeStatus=true
                                this.texts[this.platform].task[1].toDoStatus=true
                            }else if (res.data.res==1){
                                this.lookNum=res.data.res
                            }else {

                            }
                        }else if(gainType==6){
                            if(res.data.res==1){
                                this.texts[this.platform].task[4].completeStatus=true
                                this.texts[this.platform].task[4].toDoStatus=true
                                this.challengeSteps=1
                            }
                        }

                    } else {
                        Toast(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            baoKuanPros(){
                axios.get("https://appdistapi.yuedaoec.com/sendCoupon/activity/marchSign/queryPresentInfo.distribute").then(res => {
                    const products = res.data.res;
                    console.log(products)
                    for (let i = 0; i < products.length; i++) {
                        this.productList[i] = {};
                        axios.get("https://appdistapi.yuedaoec.com/product/getProductById.shop?id=" + products[i]).then(ress => {
                            const item = {
                                bannerImg: "https://resource.yuedaoec.com/" + ress.data.res.product.bannerImg,
                                productId: ress.data.res.product.productId,
                                name: ress.data.res.product.name,
                                referCurrency: ress.data.res.product.referCurrency,
                                price: ress.data.res.product.saleLowPrice
                            }
                            this.productList[i] = item;
                            this.$forceUpdate();
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            jumpToDoTask(gainType,stepsNum){
                if(gainType==3){
                    this.setSession("look", this.look);
                    if (this.lookNum == 0) {
                      if(this.platform=='tingmimi'){
                        location.href="https://appdist.yuedaoec.com/h5/newProductZone.html?from=sports&deviceId="+this.deviceId+"&uid="+this.uid
                      }else if(this.platform=='newtingmalaysia'){
                        location.href="https://appstore.yuedaoec.com/h5/newApp/newbornZone20190821.html?platform=newtingmalaysia&language=en&from=sports&deviceId="+this.deviceId+"&uid="+this.uid

                      }else if(this.platform=='tingsingapore'){
                        location.href="https://appstore.yuedaoec.com/h5/newApp/newbornZone20190821.html?platform=tingsingapore&language=en&from=sports&deviceId="+this.deviceId+"&uid="+this.uid

                      }else if(this.platform=='newtingtaiwan'){
                        location.href="https://appstore.yuedaoec.com/h5/newApp/newbornZone20190821.html?platform=newtingtaiwan&from=sports&deviceId="+this.deviceId+"&uid="+this.uid
                      }
                    } else if (this.lookNum == 1) {
                      if(this.platform=='tingmimi'){
                        location.href="https://appdist.yuedaoec.com/h5/mainMeeting1.html?from=sports&deviceId="+this.deviceId+"&uid="+this.uid
                      }else if(this.platform=='newtingmalaysia'){
                        location.href="https://appdist.yuedaoec.com/h5/mainMeetingMalay1.html?language=en&from=sports&deviceId="+this.deviceId+"&uid="+this.uid
                      }else if(this.platform=='tingsingapore'){
                        location.href="https://appdist.yuedaoec.com/h5/mainMeetingsingapore1.html?language=en&from=sports&deviceId="+this.deviceId+"&uid="+this.uid
                      }else if(this.platform=='newtingtaiwan'){
                        location.href="https://appdist.yuedaoec.com/h5/mainMeetingTaiwan1.html?from=sports&deviceId="+this.deviceId+"&uid="+this.uid
                      }

                    } else {
                        Toast("没有浏览次数了");
                    }
                }else if(gainType==4){
                    if(stepsNum=='5000'){

                        hy.nav.push('https://appdist.yuedaoec.com/h5/activity/sportsProduct.html?uid='+this.uid+'&platform='+this.platform)

                    }else if(stepsNum=='1000'){
                        let url = 'https://appstore.yuedaoec.com/h5/store_index.html?platform={}'.replace(
                            '{}',
                            this.platform
                        );
                        hy.nav.push(url)
                    }

                }else if(gainType==6){

                }
            },
            toExchange(){
                hy.nav.push('https://appdist.yuedaoec.com/h5/activity/sportsMeetingCollectCoupons.html?uid='+this.uid+'&platform='+this.platform)
            },
            toBack(){
                hy.nav.back()
            },
            showPopup() {
                this.shareShow = true;
            },
            open(show){
                if(show=='taskShow'){
                    this.taskShow=true
                    this.texts[this.platform].task[0].toDoStatus=true
                    this.signInNum=1
                    if(this.challengeStepsNum>=10000){
                        this.texts[this.platform].task[4].toDoStatus=true
                        this.challengeSteps=1
                    }
                    for(let i =0;i<this.allGainType.length;i++){
                        this.checkTaskStatus(this.allGainType[i])
                    }
                }else if(show=='rankingListShow'){
                    this.rankingListShow=true
                    this.findTop100()
                    this.findTotalNumber()
                    this.getTop5000TotalNumber()
                }else if(show=='myStepsShow'){
                    this.myStepsShow = true
                    this.allDayNumber=[]
                    this.currentPage=1
                    this.findDayNumber()
                }
            },
            close(show) {
                if(show=='taskShow'){
                    this.taskShow=false
                    sessionStorage.removeItem('look')
                }else if(show=='rankingListShow'){
                    this.rankingListShow=false
                }else if(show=='myStepsShow'){
                    this.myStepsShow=false
                }else if(show=='shareShow'){
                    this.shareShow=false
                }


            },
            shareWeChat(type) {
                let obj = {
                    "url": 'https://appdist.yuedaoec.com/h5/activity/sportsMeeting.html?platform=tingmimi&uid=' + this.uid,
                    "type": type,
                    "title": '春暖花开 运动一夏',
                    "description": '每天获取步数赢海南4天3夜游',
                    "image": 'https://resource.yuedaoec.com/image/sportsMeeting/sportsMeeting.png'
                }

                hy.app.toShare(obj);
            },
            jumpToSku(productId) {
                hy.nav.push('https://appstore.yuedaoec.com/h5/skuDetail.html?productId=' + productId)
            },
            jumpToRule(){
                hy.nav.push('https://appdist.yuedaoec.com/h5/shareImg.html?name=rule&platform='+this.platform)
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
    vertical-align: bottom;
  }
  .share-box{
    width: 100%;
    top: 0;
    height: 75%;
    /*background-color: #FFFFFF;*/
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    border-bottom: 1px  solid #f1f1f1;
  }
  .share-weChat{
    width: 50%;
    position: relative;
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  .share-weChat img{
    width: 25%;
  }
  .share-weChatCircle{
    width: 50%;
    position: relative;
    font-size: 14px;
    color: #333;
    text-align: center;

  }
  .share-weChatCircle img{
    width: 25%;

  }

  .close{
    font-size: 16px;
    color: #333;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25%;
  }
  .content{
    position: absolute;
    top: 7.3rem;
    left: 0;
    right: 0;
    width: 100%;
  }
  .swipe-box{
    position: relative;
    top: 0.3rem;
    width: 70%;
    background-image: linear-gradient(to right, rgba(255,255,255,0.1) , rgba(255,255,255,1),rgba(255,255,255,1),rgba(255,255,255,0.1));
    left: 0;
    right: 0;
    font-size: 14px;
    line-height: 26px;
    color: #E95F7C;
    text-align: center;
    margin:0 auto 1.2rem;
  }

  .calorie{
    position: absolute;
    width: 45px;
    height: 45px;
    background-image: linear-gradient(to bottom, #FBB2C1,#E75675);
    left: 0.4rem;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    box-shadow: 1px 1px 5px #b24949;
    z-index: 1;
  }
  .steps{
    position: relative;
    margin: 0 auto 1rem;
    width: 90%;
  }
  .stepsBg{
    width: 100%;
  }
  .stepsNumBox{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 0;
    text-align: center;
    color: #E95D7B;
    font-size: 25px;
    line-height: 164px;
  }
  .stepsNum{
    width: 50%;
  }
  .popupIcon{
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto 0.8rem;
  }
  .popupIconImg{
    width: 25%;
  }
  .gift{
    width: 90%;
    margin: 0 auto 0.6rem;
    display: flex;
  }
  .taoZu{
    width: 90%;
    margin: 3.2rem auto 0;
    display: flex;
  }
  .rule{
    position: absolute;
    top: 1.5rem;
    width: 24%;
    right: 0;
    height: 1.1rem;
  }
  .taskIcon{
    width: 95%;
    margin: auto;
    display: flex;
    padding: 0.4rem 0;
  }
  .taskShow {
    bottom: 0;
    left: 0;
    width: 100%;
    /* border: 10px solid #5bc3c3; */
    border-radius: 10px 10px 0 0;
    background: #81CDE6;
    border-bottom: 15px solid #81CDE6;
  }
  .taskBox{
    width: 95%;
    margin: 0 auto;
    display: flex;
    height: 410px;
    background: white;
    box-shadow: 0 0 18px #425a63;
    border-radius: 10px;
    flex-direction: column;
    overflow-y: auto;
  }
  .flow{
    overflow-y: auto;
    height: 8rem;
    text-align: center;
  }
  .closeIcon{
    width: 8%;
    /*position: relative;*/
    /*right: 0.5rem;*/
  }
  .closeIconBox{
    text-align: right;
    width: 90%;
    margin: auto;
  }
  .raw{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 85px;
    border-bottom: 1px solid #EEEEEE;
    width: 90%;
    margin: auto;
  }
  .raw:last-child{
    border-bottom: 0;
  }
  .raw1{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 55px;
    border-bottom: 1px solid #EEEEEE;
    width: 90%;
    margin: auto;
    font-size: 12px;
  }
  .raw1:last-child{
    border-bottom: 0;
  }
  .left{
    width: 80%;
    font-size: 13px;
    color: #753823;
    margin-top: 0.4rem;
  }
  .left span{
    font-size: 10px;
    color: #999999;
  }
  .right{
    width: 30%;
    font-size: 12px;
    border-radius: 15px;
    background-image: linear-gradient(to bottom,#FBB2C1,#E75675);
    box-shadow: 1px 1px 5px #a53131;
    color: white;
    text-align: center;
    line-height: 30px;
  }
  .right1{
    width: 30%;
    font-size: 12px;
    border-radius: 15px;
    border:1px solid #F9412D;
    box-shadow: 1px 1px 5px #F9412D;
    color: #CC4B4B;
    text-align: center;
    line-height: 30px;
  }
  .myStepsRaw{
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #999999;
    margin: 0.7rem auto 0.3rem;

  }
  .myStepsRaw1{
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #753823;
    margin: 0 auto 0.2rem;
    line-height: 23px;
  }

  .date,.receiveSteps, .rewardSteps, .allSteps{
    width: 25%;
    text-align: center;
  }
  .confirm{
    width: 100%;
  }
  .confirmPopup{
    width: 80%!important;
  }
  .confirmIcon{
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0;
    display: flex;
  }
  .confirm-icon{
    width: 50%;
    height: 50%;
    margin: auto;
  }
  .replace-icon{
    width: 50%;
    height: 50%;
    margin: auto;
  }
  .raw{
    font-size:12px;
  }
  .ranking{
    width:11%;
    text-align: center;
    color: #753823;
    font-weight: 500;
  }
  .nickname{
    width: 25%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    color: #753823;
  }
  .code{
    width:30%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    color: #753823;
  }
  .allSteps{
    width:34%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    color: #E95D7B;
  }
  .disparity{
    position: absolute;
    top: 2.7rem;
    left: 2.3rem;
    /*line-height: 34px;*/
    /* right: 0; */
    font-size: 10px;
    color: #333333;
    background: #fff;
    width: 70%;
  }
  .disparity span{
    color: #E95D7B;
  }
  .allStepsNum{
    width: 25%;
  }



  .baokuanPros{
    width: 100%;
    position: relative;
  }
  .productList{
    position: absolute;
    top: 1.5rem;
    width: 80%;
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
    height: 10rem;
  }

  .proList li {
    background-color: #ffffff;
    box-shadow: 4px 4px 15px #ececec;
    width: 48%;
    margin-bottom: 15px;
    font-size: 14px;
    padding-bottom: 10px;
    height: 5.5rem;
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
  .buy{
    width: 80%;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
    background-image: linear-gradient(to right,#EB003B, #FF8787,#FF8787,#EB003B);
    border-radius: 20px;
    margin: 5px auto 0;
    font-size: 10px;
  }


  .appWord{
    position: relative;
    text-align: center;
    font-size: 10px;
    color: #28557A;
    margin: 0.3rem auto;
  }
  .dialogWord{
    line-height: 24px;
    margin: 30px;
    font-size: 14px;
    color: #333333;
    text-align: center;
  }
  .tips{
    font-size: 10px;
    color: #fff;
    text-align: center;
    width: 90%;
    margin: 0.4rem auto 0;
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