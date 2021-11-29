<template>
  <!-- <div class="mui-content" style="padding: 0px;margin-bottom: 45px;">
    <div class="mui-card detail-medias" style="margin: 0px;">
      <div v-for="media in this.medias" class="mui-card-content">
        <img :src="getImgUrl(media)"
             alt="" width="100%"></div>
      <div v-if="!checkNull(videoMedia)">
        <div v-if="judgeSystem() != 'Android'"
             class="mui-card-content">
          <div v-show="play">
            <video id="Ovideo" controls="controls"
                   width="100%" height="auto" :poster='imgPath'>
              <source :src="getImgUrl(videoMedia)"
                      type='video/mp4'></source>
            </video>
          </div>
        </div>
        <div v-else>
          <div class="android_video_parent" v-show="play">
            <div>
              <video id="video" controls="controls" width="100%" height="auto" x5-playsinline="" playsinline=""
                     webkit-playsinline>
                <source :src="getImgUrl(videoMedia)" type='video/mp4'></source>
              </video>
              <div class="android_video_end" @tap.stop="quitVideo">退出
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div>
    <div v-show="play">
      <div v-if="currentSystem == 'ANDROID'">
        <video
          id="Ovideo"
          controls="controls"
          width="100%"
          height="auto"
          :poster="poster"
        >
          <source
            :src="src"
            type='video/mp4'
          >
        </video>
      </div>
      <div v-else>
        <div class="android_video_parent" @click="quitVideo">
          <div>
            <video
              id="video"
              controls="controls"
              width="100%"
              height="auto"
              x5-playsinline=""
              playsinline=""
              webkit-playsinline
              :poster="poster"
            >
              <source
                :src="src"
                type='video/mp4'
              >
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hybrid from 'hybridify-js';
export default {
  name: 'TViedio',
  props: {
    play: {
      type: Boolean,
      default: false
    },
    src: String,
    poster: String
  },
  data() {
    return {
      currentSystem: null
    };
  },
  created() {},
  mounted() {
    this.currentSystem = hybrid.app.whereamiSync();
  },
  methods: {
    quitVideo() {
      this.$emit('stopVedio');
    },
    menuDefaultControl(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
};
</script>
<style>
.android_video_parent {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20000;
  align-items: center;
  display: flex;
  background: #000000 !important;
  opacity: 1 !important;
}

.android_video_end {
  right: 10px;
  top: 12px;
  color: white;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  font-weight: 400;
}
</style>