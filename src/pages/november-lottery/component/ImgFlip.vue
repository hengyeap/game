<template>
  <div>
    <div class="img-contain">
      <transition class="img-transition" name="flip"
                  mode="out-in">
        <img :key="'prize_' + index"
             v-if="showPrize"
             :src="prizeUrl" />
        <img :key="'img_' + index"
             v-else
             :src="normalUrl" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: ['index', 'normalUrl', 'showPrize', 'prizeUrl'],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
.img-contain {
  width: 100%;
  height: 100%;
}

.img-transition > img {
  width: 100%;
  transform-origin: 50% 50%;
  cursor: pointer;
  transform: scaleY(1) translateZ(0);
  margin: 5px;
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.flip-enter-active {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.flip-leave-active {
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.flip-enter,
.flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
</style>