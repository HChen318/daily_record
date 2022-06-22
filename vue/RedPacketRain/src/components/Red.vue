<template>
  <div class="red">
    <div v-if="timeLeftVisible">
      <div class="start-num count-down-img" @animationend="stopAnimation"></div>
    </div>

    <ul v-if="rainVisible" class="star-energy-section" id="star-energy-section">
      <template v-for="(item, index) in rainParams">
        <li
          class="move_1"
          :style="{ 
            left: item.left, 
            animationDuration: item.durTime, 
            webkitAnimationDuration: item.durTime
            }"
          :data-index="index"
          @webkitAnimationEnd="removeDom"
          :key="index"
        >
          <a @touchstart="kickEnergyRain(item, index)" :style="{ transform: item.transforms}">
            <img
              class="star-stone-rain-img"
              :class="[item.isHide ?
                      'hide-star-stone' : '' ]"
              src="./imgs/4.png"
            />
          </a>
        </li>
      </template>
    </ul>
    <span>{{continueTime}}</span>
  </div>
</template>

<script>
export default {
  name: "red",
  data() {
    return {
      timeLeftVisible: true,
      rainVisible: true,
      rainParams: [],
      timer: null,
      timeInterval: null,
      continueTime: 0
    };
  },
  async created() {
    // 这里的数据this.settingData应该是后端调接口返回的哈,这里我写死,同时也可以返回对应的奖励单位等
    this.settingData = {
      continueTime: 10, // 下雨时长
      dropWealthNum: 20 // 在对应的时长里面,应该下落多少个红包
    };
    this.duration = this.settingData.continueTime * 1000;
    console.log(this.duration,'===this.duration')
    this.continueTime = this.settingData.continueTime;
    console.log(this.duration,'==this.duration')
  },
  methods: {
    // 倒计时动画结束时开始红包雨动画
    // animation有一个动画结束的事件,animationend,已删除其他显示弹框什么的相关代码
    stopAnimation() {
      this.timeLeftVisible = false;
      this.rainParams = []; // 清空
      clearInterval(this.timeInterval); // 设置红包雨进行多少秒得倒计时
      this.startRedPacket(); // 开始进行红包雨动画
      this.beginCountdown(); // 开始进行红包雨倒计时
    },

    // 开始倒计时
    beginCountdown() {
      this.timeInterval = setInterval(() => {
        if (this.continueTime === 0) {
          clearInterval(this.timeInterval);
          this.continueTime = 0;
          return;
        }
        console.log(this.continueTime,'====')
        this.continueTime--;
      }, 1000);
    },
    // 开启红包雨动画
    startRedPacket() {
      const win =
        document.documentElement.clientWidth || document.body.clientWidth;
      const left = parseInt(Math.random() * (win - 50) + 0);
      const rotate = parseInt(Math.random() * (45 - -45) - 45) + "deg"; // 旋转角度
      const durTime = Math.random() * (2.5 - 1.2 + 1) + 1.2 + "s"; // 时间
      //1.2和1.2这个数值保持一样
      this.rainParams.push({
        left: left + "px",
        transforms: "rotate(" + rotate + ")",
        durTime: durTime,
        isHide: false
      });
      setTimeout(() => {
        clearTimeout(this.timer);
        return false;
      }, this.duration);
      this.timer = setTimeout(() => {
        // console.log('start', '=startRedPacket===')
        this.startRedPacket();
      }, Math.round(this.duration / this.settingData.dropWealthNum));
    },
    // 点击星石雨让雨消失
    kickEnergyRain(item, index) {
      this.touchNum++;
      this.rainParams[index].isHide = true;
    },
    // 回收dom节点
    removeDom(e) {
      const target = e.currentTarget;
      document.querySelector("#star-energy-section").removeChild(target);
    }
  },
  watch: {
    // 检测时间,当时间为0秒得时候,一秒之后开始提示时间结束,并且将击落的星石传给后端
    continueTime(val) {
      if (+val === 0) {
        setTimeout(async () => {
          // 当倒计时已经停止的时候,将点击中的数量,已经后端之前返回的token传过去
          // await xxxx接口(this.token, {
          //   token: this.reportToken,
          //   wealthRainNum: +this.touchNum
          // });
          console.log("=======111");
          this.gameOverVisible = true;
          this.rainVisible = false;
        }, 1000);
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style >
.red {
  position: relative;
  height: 100%;
}
.start-num {
  /* @include backgroundImage(212px, 104px, $imgBaseUrl + '/3.png'); // 倒计时3 */
  background: url("./imgs/3.png") top left no-repeat;
  background-size: 212px 104px;
  position: absolute;
  top: 200px;
  left: 70px;
  z-index: 2;
}
.count-down-img {
  width: 212px;
  height: 104px;
  animation: count-down-img 4s alternate;
}

@keyframes count-down-img {
  0%,
  26%,
  51%,
  76% {
    transform: scale(2);
  }
  15%,
  24%,
  40%,
  49%,
  65%,
  74%,
  90%,
  100% {
    transform: scale(1);
  }
  0%,
  15%,
  24% {
    background: url("./imgs/3.png") top left no-repeat;
    /* background-image: url($imgBaseUrl + '/3.png'); */
  }
  26%,
  40%,
  49% {
    background: url("./imgs/2.png") top left no-repeat;
    /* background-image: url($imgBaseUrl + '/2.png'); */
  }
  51%,
  65%,
  74% {
    background: url("./imgs/2.png") top left no-repeat;
    /* background-image: url($imgBaseUrl + '/2.png'); */
  }
  76%,
  90%,
  100% {
    background: url("./imgs/start.png") top left no-repeat;
    /* background-image: url($imgBaseUrl + '/start.png'); */
  }
}

.star-energy-section {
  display: block;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  /* // @include position(absolute, 100%, 100%); */
}
.star-stone-rain-img {
  width: 92px;
  height: 92px;
  display: block;
}

a {
  display: block;
}
li {
  position: absolute;
  animation: all 3s linear;
  top: -100px;
  z-index: 0;
}
li.move_1 {
  animation: aim_move 5s linear 1 forwards;
}
@keyframes aim_move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(120vh);
  }
}
.hide-star-stone {
  animation: hide-star-stone 0.3s alternate;
}
@keyframes hide-star-stone {
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
</style>

