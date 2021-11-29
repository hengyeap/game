<template>
  <div class="wrap" ref="wrap">
    <img  src="./img/bezi1.png" alt="" class="bei" />
     <van-nav-bar class="nav-bar" left-arrow  @click-left='navBarClickLeft'/>
    <div class="play-page">
      <!-- <img  src="./img/bezi1.png" alt="" class="bei" /> -->

     <!-- <van-nav-bar class="nav-bar" left-arrow  @click-left='navBarClickLeft'/> -->
     <div class="play-page">
      <img src="./img/Untitled.png" alt="" class="bei" />

      <div class="banshen">
        <!-- <div class="dack">
          <van-icon name="arrow-left" @click="back()" />
          class="back-icon">
        </div> -->
        <div class="textbei">
          <!-- <img class="textbei1" src="./img/images12.jpg" alt=""/> -->

          <div class="delo1">
            限时：<span>{{ dealtime }}</span>
          </div>
          <div class="delo">
            还有<span>{{ zie }}次机会</span>
          </div>
        </div>

        <div class="play-area" id="playArea">
          <div
            v-for="item in boxArr"
            :index="item"
            :key="item"
            :class="[
              'piece',
              'piece-' + item,
              item == boxArractivelass ? 'active' : '',
            ]"
            :style="{ backgroundImage: 'url(' + selectedImg + ')' }"
            @click="changePositon($event, item)"
            :ref="'piece' + item"
          ></div>
          <!-- </div> -->
        </div>

        <div class="album-list">
          <div
            class="img-wrap"
            v-for="(item, index) in imgArr"
            :class="activeClass == index ? 'active' : ''"
            :key="index"
            @click="getItem(index)"
          ></div>
          <!-- </div> -->
          <div class="btn-con">
          <van-button type="primary" color="#06c" round block @click="startGame(activeClass)">开始游戏</van-button>

          </div>
          <!-- <div class="btn1" @click="startGame(activeClass)">
            {{ $t("game.startgame") }}
          </div> -->
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div v-if="this.language == `en`">
        <div class="malaysia1">
          <div v-show="beizi">
            <van-icon name="close" class="close" />
            <img class="test1" src="./img/test7(1).png" alt="" />
          </div>
          <div v-show="beizi1">
            <p class="h6">Congratulations</p>
            <van-icon name="close" class="close" />

            <!-- <p  class="h6">Congratulations</p> -->
            <img class="malaysia" src="./img/prizesbeizi.png" alt="" />

            <!-- </div> -->
            <!-- 恭喜获得 -->
            <!-- <div  class="prizes"> <img  src="./img/background.png" alt=""/></div>  -->
            <div class="prizes1">
              <div v-if="this.pri == 1">
                <img class="img1" src="./img/prizes(1).png" alt="" /><P
                  class="lan1"
                  >Shoulder Bag
                </P>
              </div>
              <div v-else-if="this.pri == 2">
                <img class="img2" src="./img/prizes(2).png" alt="" /><P
                  class="lan1"
                  >Complexion-Brilliant Gift Set
                </P>
              </div>
              <div v-else-if="this.pri == 3">
                <img class="img3" src="./img/prizes(3).png" alt="" /><P
                  class="lan1"
                  >Steam Eye Mask*2
                </P>
              </div>
              <div v-else-if="this.pri == 4">
                <img class="img4" src="./img/prizes(4).png" alt="" /><P
                  class="lan1"
                  >Tin'Charm Manicure Set
                </P>
              </div>
              <div v-else-if="this.pri == 5">
                <img class="img5" src="./img/prizes(5).png" alt="" /><P
                  class="lan2"
                  >Malus Domestica Skin-icy Firming Mask Single Piece*1 +Gold
                  Apple Illuminating Hydra Facial Mask Single Piece*1 +Yeast
                  Revitalizing Facial Mask 3 Sachets*1
                </P>
              </div>
              <div v-else-if="this.pri == 6">
                <img class="img6" src="./img/prizes(6).png" alt="" /><P
                  class="lan3"
                  >Relieve Repair Gelly 3 Sachets*1+3-Step Basic Skincare
                  Sachets*1+Gold Series 4 Sachets*1
                </P>
              </div>
              <div v-else-if="this.pri == 7">
                <img class="img7" src="./img/prizes(7).png" alt="" /><P
                  class="lan1"
                  >Hand Care Gift Set
                </P>
              </div>
              <div v-else-if="this.pri == 8">
                <img class="img8" src="./img/prizes(8).png" alt="" /><P
                  class="lan1"
                  >Night Repairing Masque 15g*2
                </P>
              </div>
              <div v-else-if="this.pri == 9">
                <img class="img9" src="./img/prizes(9).png" alt="" /><P
                  class="lan3"
                  >Peptide Active Eye Cream Trial Pack 2g*2+Ageless Peptide
                  Essence Trial Pack 2ml*2
                </P>
              </div>
              <div v-else-if="this.pri == 10">
                <img class="img10" src="./img/prizesen(10).png" alt="" /><P
                  class="lan1"
                  >Voucher RM3
                </P>
              </div>
              <div v-else-if="this.pri == 11">
                <img class="img10" src="./img/prizesen(11).png" alt="" /><P
                  class="lan1"
                  >Voucher RM5
                </P>
              </div>
              <div v-else-if="this.pri == 12">
                <img class="img10" src="./img/prizesen(12).png" alt="" /><P
                  class="lan1"
                  >Voucher RM8
                </P>
              </div>
              <div v-else-if="this.pri == 13">
                <img class="img10" src="./img/prizesen(13).png" alt="" /><P
                  class="lan1"
                  >Voucher RM10
                </P>
              </div>
              <div v-else-if="this.pri == 14">
                <img class="img10" src="./img/prizesen(14).png" alt="" /><P
                  class="lan1"
                  >National Day Special Prize!Voucher RM64
                </P>
              </div>
            </div>
          </div>
        </div>
      </div>

     
        <div class="malaysia1">
       
          <div v-show="beizi1">
            <h4 class="h6cn">恭喜获得</h4>
            <van-icon name="close" class="close" />
            <img class="malaysia" src="./img/prizesbeizi.png" alt="" />
          </div>
          <!-- <img  class="test1"  v-show="test1" src="./img/test6.png" alt=""/> -->

          <div class="prizes1">
            <div v-if="this.pri == 1">

                <img class="img5" src="./img/prizes(5).png" alt="" /><P
                  class="lan3"
                  >苹果冰肌紧致面膜单片装*1+金苹果焕靓透润面膜单片装*1+活酵母三联包*1
                </P>
                 </div>
            <div v-else-if="this.pri == 2">
              <img class="img2cn" src="./img/prizes(2).png" alt="" /><P
                class="lan"
                >焕颜菁致套盒
              </P>
            </div>
            <div v-else-if="this.pri == 3">
              <img class="img3cn" src="./img/prizes(3).png" alt="" /><P
                class="lan"
                >蒸汽眼罩*2
              </P>
            </div>
            <div v-else-if="this.pri == 4">
              <img class="img4cn" src="./img/prizes(4).png" alt="" /><P
                class="lan"
                >庭魅美甲工具套装
              </P>
            </div>
            <div v-else-if="this.pri == 5">
              <img class="img5cn" src="./img/prizes(5).png" alt="" /><P
                class="lan4"
                >苹果冰肌紧致面膜单片装*1+金苹果焕靓透润面膜单片装*1+活酵母三联包
              </P>
            </div>
            <div v-else-if="this.pri == 6">
              <img class="img6cn" src="./img/prizes(6).png" alt="" /><P
                class="lan"
                >冰肌如玉修复冻膜三联包*1+冰肌如玉三联包*1+黄金系列试用装四联包*1
              </P>
            </div>
            <div v-else-if="this.pri == 7">
              <img class="img7cn" src="./img/prizes(7).png" alt="" /><P
                class="lan"
                >手护礼盒
              </P>
            </div>
            <div v-else-if="this.pri == 8">
              <img class="img8cn" src="./img/prizes(8).png" alt="" /><P
                class="lan"
                >晚安舒缓水嫩面膜15g*2
              </P>
            </div>
            <div v-else-if="this.pri == 9">
              <img class="img9cn" src="./img/prizes(9).png" alt="" /><P
                class="lan"
                >御龄胜肽赋活眼霜试用包2g*2+御龄胜肽精华液试用包2ml*2
              </P>
            </div>
            <div v-else-if="this.pri == 10">
              <img class="img10cn" src="./img/prizes(10).png" alt="" /><P
                class="lan"
                >代金券RM3
              </P>
            </div>
            <div v-else-if="this.pri == 11">
              <img class="img10cn" src="./img/prizes(11).png" alt="" /><P
                class="lan"
                >代金券RM5
              </P>
            </div>
            <div v-else-if="this.pri == 12">
              <img class="img10cn" src="./img/prizes(12).png" alt="" /><P
                class="lan"
                >代金券RM8
              </P>
            </div>
            <div v-else-if="this.pri == 13">
              <img class="img10cn" src="./img/prizes(13).png" alt="" /><P
                class="lan"
                >代金券RM10
              </P>
            </div>
            <div v-else-if="this.pri == 14">
              <img class="img11cn" src="./img/prizes(14).png" alt="" /><P
                class="lan"
                >国庆特殊大奖！！代金券RM64
              </P>
            </div>

          </div>
        </div>
      <!-- </div> -->
    </van-overlay>
    </div>
    </div>
</template>
<script>
import { Icon, Popup, Overlay,NavBar ,Button} from "vant";
import axios from "axios";
let qs = require("qs");
export default {
  components: {
    [Popup.name]: Popup,
    [Overlay.name]: Overlay,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
  },
  data() {
    return {
      show: false,
      test1: false,
      beizi: false,
      beizi1: false,
      pri: 0,
      pri1: "",
      code: "",
      language: "",

      // row:拼图的总行数，column:拼图的总列数
      row: 2,
      column: 2,
      s: false,
      // 随机打乱的次数
      num: 100,
      zie: 1,
      // pic:拼图的所有子集和；
      // 元素：index：子图片的位置编号
      // row/column:对原图分割后的横纵编号
      // x/y:在canvas中的坐标位置（不会改变）
      gift: "",
      gift1: false,
      pic: [{ x: 0, y: 0, row: 0, column: 0, index: 0 }],

      timer: null,
      uid: "",
      accessJwt: "",
      bargainId: "",
      activeClass: -1,
      boxArractivelass: -1,
      prevIndex: null,
      curIndex: 0,
      curposArr: [],
      clickStartBtn: false,
      uploadimg: "",
      selectedImg: "",
      res: "",
      boxArr: new Array(9).fill(1).map((item, index) => {
        return index;
      }),
      pieces: document.querySelectorAll(".piece"),
      pool: this.generateMatrix(3, 28, 20),
      matrixArr: this.upsetArr(this.generateMatrix(3, 28, 20)),
      imgArr: [
        // acticity-pages-2\src\pages\jigsaw\img\1.jpg
        { url1: require("./img/8.jpg") },
        { url1: require("./img/9.jpg") },
        { url1: require("./img/10.jpg") },
        { url1: require("./img/11.jpg") },
        { url1: require("./img/13.jpg") },
        { url1: require("./img/14.jpg") },
        { url1: require("./img/15.jpg") },
        { url1: require("./img/17.jpg") },
      ],

      wall: 0,
      wall1: 0,
      dealtime: 30,
      timer: null,
      timeRun1: {
        hour: "00",
        minutes: "00",
        seconds: "00",
      },
    };
  },

  created() {
    //  console.log(this.language)
    this.uid = this.getUrlParam("uid");
    this.accessJwt = this.getUrlParam("accessJwt");
    this.userKey = this.getUrlParam("userKey");
    this.language = this.getUrlParam("language");
    this.res = request.values.get("code");
    console.log(this.getUrlParam("language"));
    //  this.init()
  },
  props: {
    success: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // this.timeRun();
    this.init();
  },

  methods: {

      navBarClickLeft() {
        const result = hybrid.app.whereamiSync();
        if (
          result.indexOf('miniprogram') >= 0 ||
          result.indexOf('Browser') >= 0
        ) {
          window.history.go(-1);
        } else {
          hybrid.nav.back();
        }
      },
    upLoad() {
      var this_ = this;
      let data = `activity_id=1&uid=${this.uid}&userKey=${encodeURIComponent(
        this.userKey
      )}&accessJwt=${encodeURIComponent(this.accessJwt)}`;

      axios
        .post("https://store.yuedaoec.com/api/draw/start.draw", data)
        .then(function (res) {
          this_.code = res.data.code;
          if (this_.code == 1) {
            this_.pri = res.data.awardInfo.prize_id;
          } else if (this_.code == 0) {
            this_.lose();
          }
          console.log(this_.pri);
        })
        .catch(function (err) {
          console.log(err);
        });
      console.log(res.data.awardInfo);
    },
    lose() {
      var this_ = this;
      let data = `uid=${this.uid}&userKey=${encodeURIComponent(
        this.userKey
      )}&accessJwt=${encodeURIComponent(this.accessJwt)}`;
      axios
        .post("https://store.yuedaoec.com/api/draw/start.draw", data)
        .then(function (res) {
          this_.pri = res.data.awardInfo.prize_id;
          this_.code = res.data.code;

          console.log(this_.pri);
          if ((this_.code = 1)) {
            this_.init();
          } else if ((this_.code = 0)) {
          }
        })
        .catch(function (err) {
          console.log(err);
        });

      // console.log(res.data.awardInfo);
    },
    init() {
      var this_ = this;
      this_.language = this_.getUrlParam("language");
      const params = {
        type: "get",
        url: `https://store.yuedaoec.com/api/draw/times.draw?uid=${this.uid}`,
      };

      console.log(params);
      this.reqwest(params).then((response) => {
        this_.zie = response.result.value;
        console.log(this_.zie);
        console.log(this_.language);
        this_.timeRun();
      });
    },
    timeRun() {
      let date = new Date();
      this.nowDate = date.Format("yyyy/MM/dd hh:mm:ss");
      if (this.nowDate >= "2021/08/30 09:00:00") {
        let end = new Date("2021/08/30 23:59:00").getTime();
        let now = new Date(this.nowDate).getTime();
        let time = end - now;
        console.log(end);
        console.log(now);
        console.log(time);
        console.log(this.wall1);
        this.wall1 = 1;

        this.timeComputed(time);
        console.log(this.wall1);
      } else {
        if (this.language == `zh-Hans`) {
          alert("时间未到,游戏时间是8月30号的12：00到23：59");
        } else if (this.language == `en`) {
          alert(
            "The time is not up, game time is from 12:00 to 23:59 on August 30"
          );
        }
      }
      console.log(this.timeComputed(time));
    },
    timeComputed(time) {
      var hours = time / 1000 / 60 / 60;
      var hoursRound = Math.floor(hours);
      if (hoursRound < 10) {
        hoursRound = "0" + hoursRound;
      }
      var minutes = time / 1000 / 60 - 60 * hoursRound;
      var minutesRound = Math.floor(minutes);
      if (minutesRound < 10) {
        minutesRound = "0" + minutesRound;
      }
      var seconds = time / 1000 - 60 * 60 * hoursRound - 60 * minutesRound;
      var secondsRound = Math.floor(seconds);
      if (secondsRound < 10) {
        secondsRound = "0" + secondsRound;
      }
      if (time < 0) {
        this.wall1 = 2;
        this.zie--;
        // console.lag(this.wall1)
        if (this.language == `zh-Hans`) {
          alert("时间已过,游戏时间是8月30号的12：00到23：59");
        } else if (this.language == `en`) {
          alert(
            "Time has passed, game time is from 12:00 to 23:59 on August 30"
          );
        }
      }

      console.log(hoursRound);
      console.log(minutesRound);
      console.log(secondsRound);
      console.log(this.wall1);
      this.startGame(picIndex);
      return (this.timeRun1 = {
        hour: hoursRound,
        minutes: minutesRound,
        seconds: secondsRound,
      });
    },

    back() {
      hybrid.nav.back();
    },
    startGame(picIndex) {
      console.log(this.timeRun1);
      console.log(this.wall1);
      if ( this.zie >= 0) {
        // this.zie--;
        var index1 = Math.floor(Math.random() * 8);
        picIndex = index1;
        console.log(this.activeClass);
        console.log(picIndex);
        this.timer = setInterval(this.timeStart, 1000);
        this.transformX(this.$refs.wrap, this.startDx + "vw");
        this.selectedImg = this.imgArr[picIndex].url1;
        this.shuffle(document.querySelectorAll(".piece"), this.pool);
        console.log(this.transformX);
      } else if (this.wall1 == 2) {
        console.log("out time");
      }
      console.log(this.url);
      console.log(this.nowDate);
      console.log(this.timeRun1);
    },
    changePositon(e, item) {
      //点击小图片切换位置方法
      if (this.wall1 == 1) {
        let reg = /active/g;
        // console.log(e, item);
        this.boxArractivelass = item;
        let pieces = document.querySelectorAll(".piece");
        if (!this.wall) {
          this.wall = 1;
          this.prevEl = e.target;
          for (var i = 0, len = pieces.length; i < len; i++) {
            // 使用replace为了避免元素后期加入其他类名
            pieces[i].className = pieces[i].className.replace(" active", "");
          }
          !reg.test(this.className) && (this.className += " active");
        } else {
          this.wall = 0;
          var prevIndex = +this.prevEl.getAttribute("index"),
            curIndex = +e.target.getAttribute("index");
          // 置换数组
          this.swap(this.pool, prevIndex, curIndex);
          this.prevEl.style.transform =
            "translate(" +
            this.pool[prevIndex].x +
            "vw," +
            this.pool[prevIndex].y +
            "vh" +
            ")";
          e.target.style.transform =
            "translate(" +
            this.pool[curIndex].x +
            "vw," +
            this.pool[curIndex].y +
            "vh" +
            ")";
          // 清除样式
          this.boxArractivelass = -1;
          // 校验是否成功
          if (this.isTestSuccess(this.pool)) {
            clearInterval(this.timer);
            this.wall1 = 0;
            this.show = true;
            this.beizi1 = true;
            this.upLoad();
          }
        }
      }
    },
    timeStart() {
      this.dealtime--;
      if (this.dealtime < 1) {
        // alert("挑战失败，请返回重新开始");
        clearInterval(this.timer);
        // this.prevEl.className= this.prevEl.className.replace(' active', '');
        this.wall1 = 0;
        // alert("挑战失败");
        this.beizi = true;
        this.show = true;
        this.lose();
      }
    },
    // 滑动元素
    transformX(el, dx) {
      el.style.transform = "translateX(" + dx + ")";
    },
    // 生成n维矩阵
    generateMatrix(n, dx, dy) {
      var arr = [],
        index = 0;
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          arr.push({ x: j * dx, y: i * dy, index: index });
          index++;
        }
      }
      return arr;
    },
    shuffle(els, arr) {
      this.upsetArr(arr);
      for (var i = 0, len = els.length; i < len; i++) {
        var el = els[i];
        el.setAttribute("index", i); // 将打乱后的数组索引缓存到元素中
        el.style.transform =
          "translate(" + arr[i].x + "vw," + arr[i].y + "vh" + ")";
      }
    },
    upsetArr(arr) {
      // 方法1:
      return arr.sort(function () {
        return Math.random() > 0.5 ? -1 : 1;
      });
    },
    // 置换数组(对应索引的x,y值进行交换)
    swap(arr, indexA, indexB) {
      [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
    },
    // // 校验是否成功方法
    isTestSuccess(arr) {
      return arr.every(function (item, i) {
        return item.index === i;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.wrap{
  width: 100vw;
  overflow: hidden;
}
.dack {
  height: 40px;
  min-width: 100%;
  background-color: rgb(241, 241, 241);
}
.delo1 {
  // margin-top: 40px;
  color: rgb(0, 0, 0);
}
.delo {
  // margin-top: 40px;
  color: rgb(0, 0, 0);
}
.banshen {
  // margin-top: 20px;
}
div {
  box-sizing: border-box;
}
.btn-con{
  padding:0 30px ;
  margin-top: 40px;
}
.btn1 {
  display: inline-block;
  padding: 10px 20px;
  width: 310px;
  margin-top: 50px;
  border-radius: 50px;
  background-color: #06c;
  color: #fff;
  cursor: pointer;
  margin-left: 10%;
  font-size:20px;
  text-align: center;
  // font-family:  Cursive,Cursive;
  // margin: 40px auto -10px;
}
.btn {
  display: inline-block;
  padding: 10px 60px;
  width: 300px;
  background-color: #06c;
  color: #fff;
  cursor: pointer;
  margin: 40px auto -10px;
  border-radius: 50px;
}
.play-page,
.preview-page,
.result-page {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.play-page {
  // background-color: #961b1b;
  min-height: 100%;
  padding-top: 20px;
  // margin-top: -400px;
  // left: -100px;
}

.play-page .play-area {
  position: relative;
  background-color: #f5f5f5;
  width: 84vw;
  height: 60vh;
  display: flex;
  flex-wrap: wrap;
  margin: 2px auto;
  border: #ccc solid 2px;
  border-radius:4px;
  box-sizing: content-box;
}
.play-page .play-area.active {
  outline-color: #1f8b40;
}
.bak {
  width: 100%;
  height: 100%;
}
.share-icon {
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  right: 0.2rem;
  top: 0.3rem;
  z-index: 999;
}
.back-icon {
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  left: 0.2rem;
  top: 0.3rem;
  z-index: 999;
}
.play-page .play-area .piece {
  position: absolute;
  // background-color: rgb(255, 255, 255);
  left: 0;
  top: 0;
  width: 28vw;
  height: 20vh;
  border: 1px solid transparent;
  /* background-image: url(../assets/images/caixushen.jpg); */
  background-repeat: no-repeat;
  background-size: 84vw 60vh;
  transition: transform 0.6s ease-in-out;
}
.play-page .play-area .piece.active {
  border: 3px solid red;
}
.play-page .play-area .piece-0 {
  background-position: 0 0;
}
.play-page .play-area .piece-1 {
  background-position: -28vw 0;
}
.play-page .play-area .piece-2 {
  background-position: -56vw 0;
}
.play-page .play-area .piece-3 {
  background-position: 0 -20vh;
}
.play-page .play-area .piece-4 {
  background-position: -28vw -20vh;
}
.play-page .play-area .piece-5 {
  background-position: -56vw -20vh;
}
.play-page .play-area .piece-6 {
  background-position: 0 -40vh;
}
.play-page .play-area .piece-7 {
  background-position: -28vw -40vh;
}
.play-page .play-area .piece-8 {
  background-position: -56vw -40vh;
}

.play-again {
  position: absolute;
  bottom: 10px;
  left: 5px;
  z-index: 10;
  width: 48%;
}

.mask {
  width: 200px;
  height: 200px;
  background-color: rosybrown;
  position: absolute;
  left: 510px;
  top: 0;
}
/* 按钮样式 */
.btns > span {
  display: inline-block;
  width: 80px;
  font-size: 12px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  margin-bottom: 5px;
  background-color: thistle;
  cursor: pointer;
}
/* 右侧按钮区 */
.btns {
  width: 80px;
  height: 400px;
  border: 1px solid tan;
  border-radius: 5px;
  background-origin: border-box;
  padding: 5px;
  position: absolute;
  left: 412px;
  top: 0;
}
/* 完成拼图的状态 */
.win {
  width: 402px;
  height: 402px;
  line-height: 402px;
  text-align: center;
  font: 24px;
  opacity: 0.5;
  background-color: paleturquoise;
  position: absolute;
  top: 0;
  left: 0;
}
.ee {
  position: relative;
  top: 0rem;
  width: 10%;
  left: 87%;
}
.prize-registered1 {
  position: absolute;
  top: 5rem;
  left: 25%;
  width: 50%;
}
.van-popup {
  width: 100%;
  background: none;
  // top: 8rem;
  // right: 0.42667rem;
}
.img {
  display: inline-block;
}
/* canvas */
.can {
  border: 1px solid teal;
}
/* canvas容器 */
.contain {
  position: relative;
  background-color: rgb(255, 255, 255);
}
.open1 {
  position: absolute;
  top: 12.2rem;
  left: 20%;
  width: 60%;
}
.download1 {
  position: absolute;
  top: 11rem;
  left: 20%;
  width: 60%;
}
.bei {
  // top"
  height: 100%;
  width: auto;
  z-index: -1;
  max-width: inherit;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  filter:blur(5px);
}
.nav-bar{
  /deep/ .van-icon-arrow-left{
    color:#333;
    font-size:20px;
  }
}
.textbei {
  background: rgba(255, 255, 255,0.8);
  //  position: absolute;
  //  font-size: 150px;
  border-radius: 5px;
  //  margin-top: 0px;
  z-index: -1;
    font-size:16px;
    color:#fff;
  padding: 10px 10px;
  margin:0 30px;
  margin-bottom: 40px;
  
  .delo1{
    font-size:18px;
    color:#333;

  }
  .delo{
    color:#333;

  }
}
.textbei1 {
  //  background:   rgb(255, 255, 255);
  width: 220px;
  height: 100px;
  //  font-weight: 400;
  //  font-size: 150px;?
  border-radius: 25px;
  position: absolute;
  //  height: 490px;
  //  margin-top: 0px;
  //  left: 30px;
  z-index: -1;
  font-size:20px;
}
.prizes {
  width: 300px;
  margin-left: 40px;
  margin-top: 100px;
  //  z-index: 5;
}

.prizes1 {
  width: 350px;
  // height: 30px;
  margin-left: 20px;
  border-radius: 40px;
  margin-top: 290px;
  // z-index: -2;
  opacity: 0.9;
}
.h1 {
  color: linear-gradient(to right, red, rgb(255, 255, 255));
  text-shadow: 8px 8px rgb(0, 0, 0);
  margin-left: 50px;
  // background-image: linear-gradient(to bottom right, red, yellow);
  margin-top: 20px;
  position: absolute;
  z-index: 1;
}

.malaysia {
  border-radius: 30%;
  position: absolute;
  font-style: oblique;
  text-align: center;
  // font-family:  Cursive;
  width: 365px;
  margin-left: 5px;
  height: 370px;
  //  margin-left: 30px;

  z-index: -1;
}
.malaysia1 {
  margin-top: 40%;
}
.lan {
  color: rgb(255, 255, 255);
  // margin-left: 10%;
  width: 300px;
  margin-left: 10px;
  font-size: 20px;
  // font-style: oblique;
  text-align: center;
  font-family: Cursive, Cursive;
  margin-top: 0px;
}
.lan2 {
  color: rgb(255, 255, 255);
  // margin-left: 10%;
  font-weight: bold;
  width: 300px;
  margin-left: 10px;
  font-size: 15px;
  // font-style: oblique;
  text-align: center;
  font-family: Cursive, Cursive;
  margin-top: -23px;
}
.lan3 {
  color: rgb(255, 255, 255);
  // margin-left: 10%;
  font-weight: bold;
  width: 300px;
  margin-left: 10px;
  font-size: 18px;
  // font-style: oblique;
  text-align: center;
  font-family: Cursive, Cursive;
  margin-top: 5px;
}
.lan4 {
  color: rgb(255, 255, 255);
  // margin-left: 10%;
  width: 300px;
  margin-left: 10px;
  font-size: 20px;
  // font-style: oblique;
  text-align: center;
  font-family: Cursive, Cursive;
  margin-top: -20px;
}
.lan1 {
  color: rgb(255, 255, 255);
  // margin-left: 10%;
  font-weight: bold;
  width: 300px;
  margin-left: 10px;
  font-size: 25px;
  // font-style: oblique;
  text-align: center;
  font-family: Cursive, Cursive;
  margin-top: 0px;
}
.h6cn {
  color: rgb(255, 255, 255);
  // width: 350;
  // font-size:20px;
  position: absolute;
  font-style: oblique;
  // text-align: center;
  margin-left: 110px;
  margin-top: 80px;
  font-family: Cursive, Cursive;
  z-index: 1;
}
.h6 {
  color: rgb(255, 255, 255);
  // width: 350;
  // font-size:20px;
  position: absolute;
  font-style: oblique;
  font-weight: bold;
  // text-align: center;
  margin-left: 80px;
  margin-top: 50px;
  font-family: Cursive, Cursive;
  z-index: 1;
}
.img1 {
  width: 170px;
  // height: ;
  text-align: center;
  margin-left: 80px;
  margin-top: -200px;
}
.img2 {
  width: 190px;
  margin-left: 80px;
  text-align: center;
  margin-top: -190px;
}
.img3 {
  width: 300px;
  margin-left: 20px;
  text-align: center;
  margin-top: -200px;
}
.img4 {
  width: 80px;
  margin-left: 130px;
  text-align: center;
  margin-top: -190px;
}
.img5 {
  width: 250px;
  margin-left: 40px;
  text-align: center;
  margin-top: -200px;
}
.img6 {
  width: 320px;
  margin-left: 20px;
  text-align: center;
  margin-top: -160px;
}
.img7 {
  width: 200px;
  margin-left: 75px;
  text-align: center;
  margin-top: -210px;
}
.img8 {
  width: 250px;
  margin-left: 40px;
  text-align: center;
  margin-top: -110px;
}
.img9 {
  width: 240px;
  margin-left: 50px;
  text-align: center;
  margin-top: -200px;
}
.img10 {
  width: 350px;
  margin-left: 5px;
  // text-align: center;
  margin-top: -150px;
}

.close {
  color: rgb(255, 255, 255);
  margin-left: 90%;
}
.img1cn {
  width: 160px;
  // height: ;
  text-align: center;
  margin-left: 80px;
  margin-top: -190px;
}
.img2cn {
  width: 160px;
  margin-left: 70px;
  text-align: center;
  margin-top: -170px;
}
.img3cn {
  width: 300px;
  margin-left: 20px;
  // height: 200px;
  text-align: center;
  margin-top: -195px;
}
.img4cn {
  width: 85px;
  margin-left: 130px;
  text-align: center;
  margin-top: -210px;
}
.img5cn {
  width: 270px;
  margin-left: 40px;
  text-align: center;
  margin-top: -200px;
}
.img6cn {
  width: 270px;
  margin-left: 35px;
  text-align: center;
  margin-top: -150px;
}
.img7cn {
  width: 190px;
  margin-left: 75px;
  text-align: center;
  margin-top: -210px;
}
.img8cn {
  width: 270px;
  margin-left: 40px;
  text-align: center;
  margin-top: -120px;
}
.img9cn {
  width: 200px;
  margin-left: 70px;
  text-align: center;
  margin-top: -190px;
}
.img10cn {
  width: 340px;
  margin-left: 10px;
  // text-align: center;
  margin-top: -150px;
}
.img11cn {
  width: 340px;
  margin-left: 10px;
  // text-align: center;
  margin-top: -170px;
}
.test1 {
  width: 100%;
}
</style>
<style scoped>
@import "../../assets/css/fonts.css";
body,
html {
  font-size: 13px;
  color: #333333;
}
img {
  display: block;
  max-width: 100%;
}
</style>