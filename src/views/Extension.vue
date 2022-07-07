<template>
  <div class="extension">
    <div class="them-title  animate__animated animate__fadeInLeft">
      主题背景
    </div>
    <div class="them-bgbox  animate__animated animate__fadeInRight">
      <div class="them-bg them-bg1" :class="{'bg-select': BG1Select}" @click.stop="bgChange(1)">蓝色渐变</div>
      <div class="them-bg them-bg2" :class="{'bg-select': BG2Select}" @click.stop="bgChange(2)">耀夜星空</div>
      <div class="them-bg them-bg3" :class="{'bg-select': BG3Select}" @click.stop="bgChange(3)">暗夜降临</div>
      <!-- <div class="them-bg them-bg4" :class="{'bg-select': BG4Select}" @click.stop="bgChange(4)">混沌宇宙</div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from "vuex";
export default defineComponent({
  name: 'Extension',
  components: {
    
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  data() {
    return {
      BG1Select: false,
      BG2Select: false,
      BG3Select: false,
      BG4Select: false,
    }
  },
  methods: {
    
    bgChange(bgcode:number = 1) {
      switch(bgcode) {
        case 1: 
          this.BG1Select = true
          this.BG2Select = false
          this.BG3Select = false
          this.BG4Select = false
          
        break
        case 2: 
          this.BG1Select = false
          this.BG2Select = true
          this.BG3Select = false
          this.BG4Select = false
        break
        case 3: 
          this.BG1Select = false
          this.BG2Select = false
          this.BG3Select = true
          this.BG4Select = false
        break
        case 4: 
          this.BG1Select = false
          this.BG2Select = false
          this.BG3Select = false
          this.BG4Select = true
        break
      }
      this.store.dispatch('actChangeBG',bgcode)
    }
  }
});
</script>
<style lang="less" scoped>
.extension {
  width: 100%;
  height:100%;
  display:flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}
.them-title,.them-bgbox {
  width: 6rem;
  height: 4rem;
  // border:1px solid #ccc;
  border-image-source: radial-gradient(closest-side at 50% 50%, transparent 0%, transparent 100%, cyan 100%);
  border-image-slice: 24% 4%;
  border-width: 1px;
  border-style: solid;
  border-image-outset: 0;
}
.them-title {
  text-align: center;
  line-height: 4rem;
  font-size: 0.3rem;
}
.them-bgbox {
  width: 10rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .them-bg {
    width: 2rem;
    height: 1.5rem;
    margin-left: 1rem;
    text-align: center;
    line-height: 1.5rem;
    font-size: 0.25rem;
  }
  .them-bg1 {
    background: url('../assets/images/bg3.jpg') center center no-repeat;
    background-size: cover;
  }
  .them-bg2 {
    background: url('../assets/images/bg4.jpeg') center center no-repeat;
    background-size: cover;
  }
  .them-bg3 {
    background: url('../assets/images/bg5.jpeg') center center no-repeat;
    background-size: cover;
  }
  .them-bg4 {
    background: url('../assets/images/bg6.jpeg') center center no-repeat;
    background-size: cover;
  }
  .bg-select {
    // border-top: 1px solid orange;
    border-bottom: 1px solid orange;
  }
}
</style>
