<template>
  <div v-if="Loading" class="loading">
    <div class="svg-box">
      <svg height="128px" version="1.1" viewBox="0 0 32 32" width="128px">
        <g
          id="Page-S"
          fill="none"
          fill-rule="evenodd"
          stroke="none"
          stroke-width="1"
          transform="translate(5.000000, 2.000000)"
        >
          <path
            d="M22.0172,19.9116 C22.0172,21.5496 21.5952,23.0206 20.7522,24.3256 C19.9082,25.6306 18.6742,26.6526 17.0492,27.3916 C15.4232,28.1306 13.4962,28.4996 11.2682,28.4996 C8.5962,28.4996 6.3922,27.9956 4.6562,26.9856 C3.4242,26.2586 2.4242,25.2896 1.6542,24.0766 C0.8852,22.8636 0.5002,21.6846 0.5002,20.5396 C0.5002,19.8746 0.7312,19.3056 1.1922,18.8316 C1.6542,18.3566 2.2422,18.1196 2.9562,18.1196 C3.5352,18.1196 4.0242,18.3046 4.4252,18.6746 C4.8252,19.0436 5.1672,19.5916 5.4502,20.3176 C5.7942,21.1796 6.1672,21.9006 6.5672,22.4786 C6.9672,23.0576 7.5312,23.5346 8.2572,23.9106 C8.9842,24.2856 9.9382,24.4736 11.1202,24.4736 C12.7452,24.4736 14.0662,24.0946 15.0822,23.3376 C16.0972,22.5806 16.6052,21.6356 16.6052,20.5026 C16.6052,19.6036 16.3312,18.8746 15.7832,18.3136 C15.2362,17.7536 14.5282,17.3256 13.6592,17.0306 C12.7912,16.7346 11.6312,16.4206 10.1782,16.0886 C8.2322,15.6326 6.6042,15.1006 5.2932,14.4906 C3.9812,13.8816 2.9412,13.0506 2.1712,11.9976 C1.4022,10.9446 1.0172,9.6366 1.0172,8.0726 C1.0172,6.5826 1.4232,5.2586 2.2362,4.1016 C3.0492,2.9446 4.2252,2.0546 5.7642,1.4326 C7.3032,0.8106 9.1132,0.4996 11.1942,0.4996 C12.8562,0.4996 14.2942,0.7066 15.5062,1.1186 C16.7192,1.5316 17.7262,2.0796 18.5262,2.7626 C19.3272,3.4456 19.9112,4.1636 20.2812,4.9146 C20.6502,5.6656 20.8352,6.3976 20.8352,7.1126 C20.8352,7.7646 20.6042,8.3526 20.1422,8.8756 C19.6812,9.3996 19.1052,9.6606 18.4152,9.6606 C17.7872,9.6606 17.3102,9.5036 16.9842,9.1896 C16.6582,8.8756 16.3042,8.3616 15.9222,7.6476 C15.4292,6.6256 14.8382,5.8286 14.1492,5.2556 C13.4592,4.6836 12.3512,4.3966 10.8242,4.3966 C9.4082,4.3966 8.2662,4.7076 7.3982,5.3296 C6.5302,5.9516 6.0962,6.6996 6.0962,7.5736 C6.0962,8.1156 6.2442,8.5836 6.5392,8.9776 C6.8352,9.3716 7.2412,9.7106 7.7582,9.9936 C8.2762,10.2766 8.7992,10.4986 9.3282,10.6586 C9.8582,10.8186 10.7322,11.0526 11.9512,11.3606 C13.4782,11.7176 14.8602,12.1116 16.0972,12.5426 C17.3352,12.9736 18.3882,13.4966 19.2562,14.1126 C20.1242,14.7276 20.8012,15.5066 21.2872,16.4486 C21.7742,17.3906 22.0172,18.5446 22.0172,19.9116 L22.0172,19.9116 Z"
            id="Stroke-3"
            stroke="#1296DB"
          />
        </g>
      </svg>
      <svg height="128px" version="1.1" viewBox="0 0 32 32" width="128px">
        <g
          id="Page-P"
          fill="none"
          fill-rule="evenodd"
          stroke="none"
          stroke-width="1"
          transform="translate(5.000000, 2.000000)"
        >
          <path
            d="M9.8333,4.6878 L6.0773,4.6878 L6.0773,13.1008 L9.8333,13.1008 C11.1483,13.1008 12.2463,12.9628 13.1293,12.6878 C14.0113,12.4128 14.6843,11.9618 15.1483,11.3358 C15.6113,10.7098 15.8423,9.8898 15.8423,8.8758 C15.8423,7.6608 15.4863,6.6718 14.7723,5.9088 C13.9713,5.0948 12.3243,4.6878 9.8333,4.6878 L9.8333,4.6878 Z M11.1853,17.3078 L6.0773,17.3078 L6.0773,25.1008 C6.0773,26.2148 5.8143,27.0598 5.2883,27.6358 C4.7633,28.2118 4.0993,28.4998 3.2983,28.4998 C2.4593,28.4998 1.7833,28.2148 1.2703,27.6458 C0.7563,27.0758 0.5003,26.2398 0.5003,25.1388 L0.5003,3.9178 C0.5003,2.6908 0.7813,1.8148 1.3453,1.2888 C1.9083,0.7628 2.8033,0.4998 4.0303,0.4998 L11.1853,0.4998 C13.3013,0.4998 14.9283,0.6628 16.0683,0.9878 C17.1953,1.3008 18.1683,1.8208 18.9883,2.5468 C19.8083,3.2728 20.4313,4.1618 20.8563,5.2138 C21.2823,6.2648 21.4953,7.4488 21.4953,8.7628 C21.4953,11.5678 20.6313,13.6928 18.9033,15.1388 C17.1763,16.5848 14.6033,17.3078 11.1853,17.3078 L11.1853,17.3078 Z"
            id="Stroke-3"
            stroke="#1296db"
          />
        </g>
      </svg>
      <svg height="128px" version="1.1" viewBox="0 0 32 32" width="128px">
        <g
          id="Page-T"
          fill="none"
          fill-rule="evenodd"
          stroke="none"
          stroke-width="1"
          transform="translate(4.000000, 2.000000)"
        >
          <path
            d="M21.0446,5.1009 L14.9596,5.1009 L14.9596,25.1009 C14.9596,26.2529 14.7036,27.1069 14.1906,27.6639 C13.6766,28.2209 13.0136,28.4999 12.1996,28.4999 C11.3736,28.4999 10.7006,28.2179 10.1806,27.6549 C9.6616,27.0919 9.4016,26.2399 9.4016,25.1009 L9.4016,5.1009 L3.3166,5.1009 C2.3656,5.1009 1.6576,4.8909 1.1946,4.4719 C0.7316,4.0519 0.4996,3.4979 0.4996,2.8099 C0.4996,2.0959 0.7406,1.5329 1.2226,1.1199 C1.7046,0.7069 2.4026,0.4999 3.3166,0.4999 L21.0446,0.4999 C22.0086,0.4999 22.7256,0.7129 23.1946,1.1389 C23.6646,1.5639 23.8986,2.1209 23.8986,2.8099 C23.8986,3.4979 23.6616,4.0519 23.1856,4.4719 C22.7096,4.8909 21.9956,5.1009 21.0446,5.1009 L21.0446,5.1009 Z"
            id="Stroke-3"
            stroke="#1296db"
          />
        </g>
      </svg>
      <svg height="128px" version="1.1" viewBox="0 0 32 32" width="128px">
        <g
          id="Page-O1"
          fill="none"
          fill-rule="evenodd"
          stroke="none"
          stroke-width="1"
          transform="translate(2.000000, 2.000000)"
        >
          <path
            d="M21.4631,14.4261 C21.4631,12.4441 21.1431,10.7261 20.5031,9.2731 C19.8621,7.8201 18.9481,6.7211 17.7601,5.9761 C16.5721,5.2311 15.2081,4.8591 13.6691,4.8591 C12.5731,4.8591 11.5601,5.0651 10.6311,5.4771 C9.7011,5.8901 8.9011,6.4901 8.2291,7.2781 C7.5581,8.0661 7.0291,9.0731 6.6411,10.2981 C6.2531,11.5231 6.0591,12.8991 6.0591,14.4261 C6.0591,15.9651 6.2531,17.3571 6.6411,18.6001 C7.0291,19.8441 7.5771,20.8751 8.2851,21.6941 C8.9931,22.5131 9.8061,23.1251 10.7231,23.5321 C11.6401,23.9381 12.6471,24.1411 13.7431,24.1411 C15.1461,24.1411 16.4361,23.7901 17.6121,23.0881 C18.7881,22.3861 19.7241,21.3031 20.4191,19.8381 C21.1151,18.3721 21.4631,16.5681 21.4631,14.4261 L21.4631,14.4261 Z M13.6691,0.5001 C16.4761,0.5001 18.8861,1.0691 20.9001,2.2081 C22.9131,3.3471 24.4371,4.9661 25.4711,7.0661 C26.5051,9.1651 27.0221,11.6311 27.0221,14.4631 C27.0221,16.5561 26.7391,18.4591 26.1731,20.1701 C25.6061,21.8821 24.7571,23.3651 23.6241,24.6211 C22.4911,25.8771 21.1001,26.8381 19.4501,27.5031 C17.8001,28.1671 15.9101,28.5001 13.7801,28.5001 C11.6621,28.5001 9.7661,28.1581 8.0911,27.4751 C6.4161,26.7911 5.0191,25.8281 3.8981,24.5841 C2.7781,23.3411 1.9311,21.8451 1.3591,20.0961 C0.7861,18.3481 0.5001,16.4581 0.5001,14.4261 C0.5001,12.3451 0.7991,10.4371 1.3961,8.7001 C1.9931,6.9641 2.8581,5.4871 3.9911,4.2681 C5.1241,3.0491 6.5031,2.1161 8.1281,1.4701 C9.7531,0.8231 11.6001,0.5001 13.6691,0.5001 L13.6691,0.5001 Z"
            id="Stroke-3"
            stroke="#1296db"
          />
        </g>
      </svg>
      <svg height="128px" version="1.1" viewBox="0 0 32 32" width="128px">
        <g
          fill="none"
          fill-rule="evenodd"
          id="Page-1"
          stroke="none"
          stroke-width="1"
        >
          <g id="Page-O2" transform="translate(2.000000, 2.000000)">
            <path
              d="M21.4631,14.4261 C21.4631,12.4441 21.1431,10.7261 20.5031,9.2731 C19.8621,7.8201 18.9481,6.7211 17.7601,5.9761 C16.5721,5.2311 15.2081,4.8591 13.6691,4.8591 C12.5731,4.8591 11.5601,5.0651 10.6311,5.4771 C9.7011,5.8901 8.9011,6.4901 8.2291,7.2781 C7.5581,8.0661 7.0291,9.0731 6.6411,10.2981 C6.2531,11.5231 6.0591,12.8991 6.0591,14.4261 C6.0591,15.9651 6.2531,17.3571 6.6411,18.6001 C7.0291,19.8441 7.5771,20.8751 8.2851,21.6941 C8.9931,22.5131 9.8061,23.1251 10.7231,23.5321 C11.6401,23.9381 12.6471,24.1411 13.7431,24.1411 C15.1461,24.1411 16.4361,23.7901 17.6121,23.0881 C18.7881,22.3861 19.7241,21.3031 20.4191,19.8381 C21.1151,18.3721 21.4631,16.5681 21.4631,14.4261 L21.4631,14.4261 Z M13.6691,0.5001 C16.4761,0.5001 18.8861,1.0691 20.9001,2.2081 C22.9131,3.3471 24.4371,4.9661 25.4711,7.0661 C26.5051,9.1651 27.0221,11.6311 27.0221,14.4631 C27.0221,16.5561 26.7391,18.4591 26.1731,20.1701 C25.6061,21.8821 24.7571,23.3651 23.6241,24.6211 C22.4911,25.8771 21.1001,26.8381 19.4501,27.5031 C17.8001,28.1671 15.9101,28.5001 13.7801,28.5001 C11.6621,28.5001 9.7661,28.1581 8.0911,27.4751 C6.4161,26.7911 5.0191,25.8281 3.8981,24.5841 C2.7781,23.3411 1.9311,21.8451 1.3591,20.0961 C0.7861,18.3481 0.5001,16.4581 0.5001,14.4261 C0.5001,12.3451 0.7991,10.4371 1.3961,8.7001 C1.9931,6.9641 2.8581,5.4871 3.9911,4.2681 C5.1241,3.0491 6.5031,2.1161 8.1281,1.4701 C9.7531,0.8231 11.6001,0.5001 13.6691,0.5001 L13.6691,0.5001 Z"
              id="Stroke-3"
              stroke="#1296db"
            />
          </g>
        </g>
      </svg>
      <svg
        height="128px"
        version="1.1"
        viewBox="0 0 32 32"
        width="128px"
        id="Page-L"
      >
        <g
          fill="none"
          fill-rule="evenodd"
          id="Page-1"
          stroke="none"
          stroke-width="1"
        >
          <path
            d="M6.0775,3.8803 L6.0775,23.9183 L17.3825,23.9183 C18.2845,23.9183 18.9755,24.1373 19.4575,24.5753 C19.9395,25.0133 20.1805,25.5643 20.1805,26.2273 C20.1805,26.9033 19.9425,27.4513 19.4675,27.8713 C18.9915,28.2903 18.2965,28.5003 17.3825,28.5003 L3.9175,28.5003 C2.7035,28.5003 1.8305,28.2313 1.2985,27.6923 C0.7665,27.1543 0.5005,26.2843 0.5005,25.0823 L0.5005,3.8803 C0.5005,2.7533 0.7535,1.9083 1.2605,1.3453 C1.7675,0.7813 2.4345,0.5003 3.2605,0.5003 C4.0995,0.5003 4.7785,0.7783 5.2985,1.3353 C5.8175,1.8933 6.0775,2.7413 6.0775,3.8803 L6.0775,3.8803 Z"
            id="Stroke-3"
            stroke="#1296db"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>
    <div class="app-title">{{ Title }}</div>
  </div>
  <template v-else>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component 
          :is="Component" 
          :key="$route.name"
          v-if="$route.meta.keepAlive"
        />
      </keep-alive>
      <component 
        :is="Component" 
        :key="$route.name"
        v-if="!$route.meta.keepAlive"
      />
    </router-view>
    <div class="tab-bar">
      <button class="app-custom-btn app-btn-5" @click="tabItemClick(1)">
        <div class="app-btn-icon app-btn-icon-1"></div>
        <span class="app-btn-text">连接</span>
        <span
          v-if="TabItemSelected1"
          :class="{ 'tab-item-selected': TabItemSelected1 }"
        ></span>
      </button>
      <button class="app-custom-btn app-btn-5" @click="tabItemClick(2)">
        <div class="app-btn-icon app-btn-icon-2"></div>
        <span class="app-btn-text">图表</span>
        <span
          v-if="TabItemSelected2"
          :class="{ 'tab-item-selected': TabItemSelected2 }"
        ></span>
      </button>
      <button class="app-custom-btn app-btn-5" @click="tabItemClick(3)">
        <div class="app-btn-icon app-btn-icon-3"></div>
        <span class="app-btn-text">扩展</span>
        <span
          v-if="TabItemSelected3"
          :class="{ 'tab-item-selected': TabItemSelected3 }"
        ></span>
      </button>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref} from "vue";
//窗口自适应。
import "@/static/flexible.js";
//本地库。
import {delay} from './static/RTLocal'
//动画库。
import anime from "animejs/lib/anime.js";
export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    let Loading = ref(true);
    let Title = "串口读取工具 RC-V3.1.0";
    return {
      Loading,
      Title,
    };
  },
  data() {
    return {
      TabItemSelected1: true,
      TabItemSelected2: false,
      TabItemSelected3: false,
    };
  },
  watch: {
    "$store.state.BGChangeCode"(nv) {
      let app = document.getElementById("app");
      app?.classList.remove("app-bg1");
      app?.classList.remove("app-bg2");
      app?.classList.remove("app-bg3");
      app?.classList.remove("app-bg4");

      switch (nv) {
        case 1:
          app?.classList.add("app-bg1");
          break;
        case 2:
          app?.classList.add("app-bg2");
          break;
        case 3:
          app?.classList.add("app-bg3");
          break;
        case 4:
          app?.classList.add("app-bg4");
          break;
      }
      localStorage.setItem("CurrentBGCode", JSON.stringify(nv));
    },
  },
  mounted() {
    this.animeRun();
    this.LoadPage();
    this.loadBG();
  },

  methods: {
    LoadPage() {
      setTimeout(() => {
        this.Loading = false;
      }, 3500);
    },
    //动画运行
    async animeRun() {
      //配合background.ts里的setOpacity
      await delay(500)
      anime({
        targets:
          "#Page-S path,#Page-P path,#Page-T path,#Page-O1 path,#Page-O2 path,#Page-L path",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 2500,
        delay: (el: any, i: number) => {
          return i * 100;
        },
        direction: "normal",
        loop: false,
      });
    },
    //tab item 点击。
    tabItemClick(itemnumber: number = 1) {
      switch (itemnumber) {
        case 1:
          this.TabItemSelected1 = true;
          this.TabItemSelected2 = false;
          this.TabItemSelected3 = false;
          this.$router.push("/");
          break;
        case 2:
          this.TabItemSelected1 = false;
          this.TabItemSelected2 = true;
          this.TabItemSelected3 = false;
          this.$router.push("/analyze");
          break;
        case 3:
          this.TabItemSelected1 = false;
          this.TabItemSelected2 = false;
          this.TabItemSelected3 = true;
          this.$router.push("/extension");
          break;
      }
    },
    //背景图加载
    loadBG() {
      let cbgc = localStorage.getItem("CurrentBGCode");
      if (!cbgc) {
        return;
      }
      let bgcode = JSON.parse(cbgc);
      let app = document.getElementById("app");
      switch (bgcode) {
        case 1:
          app?.classList.add("app-bg1");
          break;
        case 2:
          app?.classList.add("app-bg2");
          break;
        case 3:
          app?.classList.add("app-bg3");
          break;
        case 4:
          app?.classList.add("app-bg4");
          break;
      }
    },
  },
});
</script>

<style lang="less">
@import url("./assets/css/default.less");
@import url("./assets/css/antreset.less");
@import url("./assets/css/common.less");
@import url("./assets/css/rtbutton.less");

#app {
  width: 100%;
  height: 100%;
  background: url(./assets/images/bg3.jpg) center center no-repeat;
  background-size: cover;
  overflow: hidden;
}
.app-bg1 {
  background: url("./assets/images/bg3.jpg") center center no-repeat !important;
  background-size: cover;
}
.app-bg2 {
  background: url("./assets/images/bg4.jpeg") center center no-repeat !important;
  background-size: cover;
}
.app-bg3 {
  background: url("./assets/images/bg5.jpeg") center center no-repeat !important;
  background-size: cover;
}
.app-bg4 {
  background: url("./assets/images/bg6.jpeg") center center no-repeat !important;
  background-size: cover;
}
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .app-title {
    font-size: 2em;
  }
}
.tab-bar {
  position: fixed;

  bottom: 0;
  width: 100%;
  height: 1rem;
  // background-color: red;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 0.1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}
.app-custom-btn {
  box-sizing: border-box;
  color: #fff;
  border-radius: 5px;
  padding: 0;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}
.app-btn-5 {
  width: 2.3rem;
  height: 90%;
  line-height: 0.4rem;
  padding: 0;
  border: none;
  color: #f0094a;
  background: transparent;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}

.app-btn-5:before,
.app-btn-5:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #f0094a;
  box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003,
    4px 4px 5px 0px #0002;
  transition: 400ms ease all;
}
.app-btn-5:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
  width: 100%;
  transition: 800ms ease all;
}
.app-btn-5:hover:before,
.app-btn-5:hover:after {
  width: 100%;
  transition: 500ms ease all;
}

.tab-item-selected {
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background: #f0094a;
  box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003,
    4px 4px 5px 0px #0002;
  transition: 500ms ease all;
}
.app-btn-icon {
  width: 0.5rem;
  height: 0.5rem;
}
.app-btn-text {
  width: 1.8rem;
  height: auto;
  font-size: 0.2rem;
}
.app-btn-icon-1 {
  background: url("./assets/icon/tab-con4.png") center center no-repeat;
  background-size: cover;
}
.app-btn-icon-2 {
  background: url("./assets/icon/tab-box.png") center center no-repeat;
  background-size: cover;
}
.app-btn-icon-3 {
  background: url("./assets/icon/tab-menu2.png") center center no-repeat;
  background-size: cover;
}
.app-btn-icon-4 {
  background: url("./assets/icon/tab-s1.png") center center no-repeat;
  background-size: cover;
}
.app-btn-icon-5 {
  background: url("./assets/icon/tab-s2.png") center center no-repeat;
  background-size: cover;
}

.app-btn-icon-6 {
  background: url("./assets/icon/tab-s3.png") center center no-repeat;
  background-size: cover;
}

.app-btn-icon-7 {
  background: url("./assets/icon/tab-s4.png") center center no-repeat;
  background-size: cover;
}

.app-btn-icon-8 {
  background: url("./assets/icon/tab-s5.png") center center no-repeat;
  background-size: cover;
}
.app-btn-icon-9 {
  background: url("./assets/icon/tab-ex2.png") center center no-repeat;
  background-size: cover;
}
</style>
