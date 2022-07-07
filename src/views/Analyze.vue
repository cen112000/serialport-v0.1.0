<template>
  <div class="home">
    <canvas id="canvas" class="particle"></canvas>
    <div class="row1">
      <!--连接-->
      <div class="row1-item-1 animate__animated animate__fadeInLeft">
        <div class="set-box-container">
          <div class="set-box">
            <span class="set-icon set-space">轮播间隔</span>
            <a-cascader
              class="rt-combox rt-combox-sm"
              :options="Setting.SpaceTime"
              :value="SpaceTimeSelect"
              @change="SpaceTimeChange"
            ></a-cascader>
          </div>
          <div class="set-box">
            <span class="set-icon set-model">轮播模式</span>
            <a-cascader
              class="rt-combox rt-combox-sm"
              :options="Setting.Model"
              :value="ModelSelect"
              @change="ModelChange"
            ></a-cascader>
          </div>
          <div class="set-box">
            <span class="set-icon set-unit">数据单位</span>
            <a-cascader
              class="rt-combox rt-combox-sm"
              :options="Setting.UnitModel"
              :value="UnitModelSelect"
              @change="UnitModelChange"
            ></a-cascader>
          </div>
          <div class="set-box">
            <span class="set-icon set-size">通道粒径</span>
            <a-cascader
              class="rt-combox rt-combox-sm"
              :options="Setting.CHSize"
              :value="CHSizeSelect"
              @change="CHSizeChange"
            ></a-cascader>
          </div>
          <div class="set-box">
            <span class="set-icon set-size-detail">粒径大小</span>
            <a-cascader
              class="rt-combox rt-combox-sm"
              :options="Setting.SizeDetailList"
              :value="SizeDetailSelect"
              @change="SizeDetailChange"
            ></a-cascader>
          </div>
        </div>
        <div class="set-box-container">
          <div class="set-box">
            <span class="set-icon set-chart">图表模式</span>
            <a-cascader
              class="rt-combox rt-combox-sm"
              :options="Setting.ChartModel"
              :value="ChartModelSelect"
              @change="ChartModelChange"
            ></a-cascader>
          </div>
          <div class="set-box">
            <span class="set-icon set-total">样本次数</span>
            <a-cascader
              class="rt-combox rt-combox-sm"
              :options="Setting.CtrlTotalList"
              :value="CtrlTotalSelect"
              @change="CtrlTotalChange"
            ></a-cascader>
          </div>
          <div class="set-box">
            <span class="set-icon set-remove">舍弃位置</span>
            <a-cascader
              class="rt-combox rt-combox-sm"
              :options="Setting.RMLocationList"
              :value="RMLocationSelect"
              @change="RMLocationChange"
            ></a-cascader>
          </div>
          <div class="set-box">
            <span class="set-icon set-channel">通道序号</span>
            <a-cascader
              class="rt-combox rt-combox-sm"
              :options="Setting.ChannelList"
              :value="ChannelSelect"
              @change="ChannelChange"
            ></a-cascader>
          </div>
          <div class="set-box">
            <button
              class="rt-custom-btn rt-btn-16 rt-btn-12"
              style="width: 1.3rem;"
              @click.stop="applySetting"
            >
              应用设置
            </button>
          </div>
        </div>
      </div>
      <div class="row1-item-2 animate__animated animate__fadeInDown">
        <div class="msg-1">
          <span class="value-text"
            >CH1&nbsp;&nbsp;{{ DeviceData.CH1Data }}</span
          >
          <span class="value-text"
            >CH2&nbsp;&nbsp;{{ DeviceData.CH2Data }}</span
          >
          <span class="value-text"
            >CH3&nbsp;&nbsp;{{ DeviceData.CH3Data }}</span
          >
        </div>
        <div class="msg-2">
          <div class="time">序号&nbsp;&nbsp;{{DeviceData.DataIndex}}&nbsp;&nbsp;时间&nbsp;&nbsp;{{ DeviceData.CreateTime }}</div>
          <div class="circle-1">{{ DeviceData.DeviceType }}</div>
          <div class="temp">{{ DeviceData.Temp }}</div>
          <div class="humi">{{ DeviceData.Humi }}</div>
        </div>
        <div class="msg-1">
          <span class="value-text"
            >CH4&nbsp;&nbsp;{{ DeviceData.CH4Data }}</span
          >
          <span class="value-text"
            >CH5&nbsp;&nbsp;{{ DeviceData.CH5Data }}</span
          >
          <span class="value-text"
            >CH6&nbsp;&nbsp;{{ DeviceData.CH6Data }}</span
          >
        </div>
      </div>
      <div class="row1-item-3 animate__animated animate__fadeInRight">
        <button
          class="rt-custom-btn rt-btn-16 rt-btn-2 local-btn"
          @click.stop="btnStartAni"
        >
          开始轮播
        </button>
        <button
          class="rt-custom-btn rt-btn-16 rt-btn-5 local-btn"
          @click.stop="btnStopAni"
        >
          停止轮播
        </button>
        <button
          class="rt-custom-btn rt-btn-16 rt-btn-12 local-btn"
          @click.stop="TestChart"
        >
          生成图表
        </button>
        <button
          class="rt-custom-btn rt-btn-16 rt-btn-11 local-btn"
          @click.stop="TestClearChart"
        >
          释放图表
        </button>
      </div>
    </div>
    <div class="row2">
      <div id="localchart" class="local-chart"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  Ref,
  toRefs,
  shallowRef,
  nextTick,
  markRaw,
  onUnmounted,
  onBeforeUnmount,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import { particlesInit } from "../static/particleInit";
// import { toRaw } from "@vue/reactivity";
//引入RTLocal模块
import { delay } from "../static/RTLocal";
//ant组件。
import {
  Cascader,
  // Input,
  // InputNumber,
  // Radio,
  // Select,
  // Tooltip,
  message,
} from "ant-design-vue";
//引入echarts
import * as echarts from "echarts";
import { isLeaf } from "ant-design-vue/lib/vc-cascader/utils/commonUtil";
// import { toStringJSON } from "xe-utils";
// type EChartsOption = echarts.EChartsOption;

export default defineComponent({
  name: "Home",
  components: {
    ACascader: Cascader,
    // ATooltip: Tooltip,
    // AInputNumber: InputNumber,
  },
  setup() {
    //Tooltip提示框。
    // const getPopupContainer = (trigger: HTMLElement) => {
    //   return trigger.parentElement;
    // };
    const store = useStore();
    let Setting = reactive({
      SpaceTime: [
        {
          value: "1",
          label: "1",
          isLeaf: true,
        },
        {
          value: "3",
          label: "3",
          isLeaf: true,
        },
        {
          value: "5",
          label: "5",
          isLeaf: true,
        },
        {
          value: "10",
          label: "10",
          isLeaf: true,
        },
      ],
      Model: [
        {
          value: "单次",
          label: "单次",
          isLeaf: true,
        },
        {
          value: "循环",
          label: "循环",
          isLeaf: true,
        },
      ],
      UnitModel: [
        {
          value: "忽略",
          label: "忽略",
          isLeaf: true,
        },
        {
          value: "累积",
          label: "累积",
          isLeaf: true,
        },
        {
          value: "差分",
          label: "差分",
          isLeaf: true,
        },
        {
          value: "升",
          label: "升",
          isLeaf: true,
        },
        {
          value: "立方米",
          label: "立方米",
          isLeaf: true,
        },
        {
          value: "立方英尺",
          label: "立方英尺",
          isLeaf: true,
        },
        {
          value: "升.微克/立方米",
          label: "升.微克/立方米",
          isLeaf: true,
        },
        {
          value: "立方米.微克/立方米",
          label: "立方米.微克/立方米",
          isLeaf: true,
        },
        {
          value: "立方英尺.微克/立方米",
          label: "立方英尺.微克/立方米",
          isLeaf: true,
        },
        {
          value: "ppm",
          label: "ppm",
          isLeaf: true,
        },
        {
          value: "ppb",
          label: "ppb",
          isLeaf: true,
        },
        {
          value: "微克/立方米",
          label: "微克/立方米",
          isLeaf: true,
        },
        {
          value: "毫克/立方米",
          label: "毫克/立方米",
          isLeaf: true,
        },
        {
          value: "%",
          label: "%",
          isLeaf: true,
        },
      ],
      CHSize: [
        {
          value: "忽略",
          label: "忽略",
          isLeaf: true,
        },
        {
          value: "PM2.5",
          label: "PM2.5",
          isLeaf: true,
        },
        {
          value: "PM10",
          label: "PM10",
          isLeaf: true,
        },
        {
          value: "TSP",
          label: "TSP",
          isLeaf: true,
        },
        {
          value: "HCHO",
          label: "HCHO",
          isLeaf: true,
        },
        {
          value: "CO2",
          label: "CO2",
          isLeaf: true,
        },
        {
          value: "CH3NO",
          label: "CH3NO",
          isLeaf: true,
        },
        {
          value: "VOC",
          label: "VOC",
          isLeaf: true,
        },
      ],
      SizeDetailList: [
        {
          value: "忽略",
          label: "忽略",
          isLeaf: true,
        }
      ],
      ChartModel: [
        {
          value: "常规",
          label: "常规",
          isLeaf: true,
        },
        {
          value: "均值控制图",
          label: "均值控制图",
          isLeaf: true,
        },
      ],
      CtrlTotalList: [
        {
          label: "4",
          value: "4",
          isLeaf: true,
        },
        {
          label: "5",
          value: "5",
          isLeaf: true,
        },
        {
          label: "6",
          value: "6",
          isLeaf: true,
        },
      ],
      RMLocationList: [
        {
          label: "前",
          value: "前",
          isLeaf: true,
        },
        {
          label: "后",
          value: "后",
          isLeaf: true,
        },
      ],
      ChannelList: [
        {
          label: "1",
          value: "1",
          isLeaf: true,
        },
        {
          label: "2",
          value: "2",
          isLeaf: true,
        },
        {
          label: "3",
          value: "3",
          isLeaf: true,
        },
        {
          label: "4",
          value: "4",
          isLeaf: true,
        },
        {
          label: "5",
          value: "5",
          isLeaf: true,
        },
        {
          label: "6",
          value: "6",
          isLeaf: true,
        },
      ]
    });
    let SpaceTimeSelect: Ref<string[]> = ref(["1"]);
    let ModelSelect: Ref<string[]> = ref(["单次"]);
    let UnitModelSelect: Ref<string[]> = ref(["忽略"]);
    let CHSizeSelect: Ref<string[]> = ref(["忽略"]);
    let SizeDetailSelect: Ref<string[]> = ref(["忽略"]);
    let ChartModelSelect: Ref<string[]> = ref(["常规"]);
    let ChannelSelect: Ref<string[]> = ref(['1']);
    let SpaceTimeChange = (e: any) => {
      if (!e) {
        SpaceTimeSelect.value = ["1"];
        return;
      }
      SpaceTimeSelect.value = e;
    };
    let ModelChange = (e: any) => {
      if (!e) {
        ModelSelect.value = ["单次"];
        return;
      }
      ModelSelect.value = e;
    };
    let UnitModelChange = (e: any) => {
      if (!e) {
        UnitModelSelect.value = ["忽略"];
        return;
      }
      UnitModelSelect.value = e;
    };
    let CHSizeChange = (e: any) => {
      if (!e) {
        CHSizeSelect.value = ["忽略"];
        return;
      }
      CHSizeSelect.value = e;
    };
    let SizeDetailChange = (e: any) => {
      if (!e) {
        SizeDetailSelect.value = ["忽略"];
        return;
      }
      SizeDetailSelect.value = e;
    };
    let ChartModelChange = (e: any) => {
      if (!e) {
        ChartModelSelect.value = ["常规"];
        return;
      }
      ChartModelSelect.value = e;
    };
    let DeviceData = reactive({
      DataIndex: '',
      CH1Data: "",
      CH2Data: "",
      CH3Data: "",
      CH4Data: "",
      CH5Data: "",
      CH6Data: "",
      Temp: "--",
      Humi: "--",
      CreateTime: "",
      ChannelType: "通道类型",
      DeviceType: '设备类型'
    });

    //控制图参数。
    let CtrlTotalSelect: Ref<string[]> = ref(["6"]);
    let CtrlTotalChange = (e: any) => {
      if (!e) {
        CtrlTotalSelect.value = ["6"];
        return;
      }
      CtrlTotalSelect.value = e;
    };
    let RMLocationSelect: Ref<string[]> = ref(["前"]);
    let RMLocationChange = (e: any) => {
      if (!e) {
        RMLocationSelect.value = ["前"];
        return;
      }
      RMLocationSelect.value = e;
    };
    let ChannelChange = (e: any) => {
      if (!e) {
        ChannelSelect.value = ["1"];
        return;
      }
      ChannelSelect.value = e;
    };

    //轮播数组下标
    let AniDataIndex = ref(0);
    let Echarts = {} as any;
    let TestOption = {
      title: {
        z:2,
        text: "通道数据",
        textStyle: {
          color: "#fff",
          fontSize: 15,
          lineHeight: 15,
        },
        left: "center",
      },
      grid: {
        z:2,
        left: 300,
        top: 60,
        right: 150,
        bottom: 60,
      },
      tooltip: {
        trigger: "axis",
        enterable: true, // 鼠标是否可进入提示框浮层中
        hideDelay: 100, // 浮层隐藏的延迟
        confine: true,
        axisPointer: {
          type: "cross",
        },
        // extraCssText: "box-shadow: 0 0 3px rgba(150,150,150, 0.7);",
        position: function (
          point: any,
          params: any,
          dom: any,
          rect: any,
          size: any
        ) {
          var obj = { top: 10 } as any;
          obj[["left", "right"][+(point[0] < size.viewSize[0] / 2)]] = 8;
          return obj;
          // // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
          // // 提示框位置
          // let x = 0; // x坐标位置
          // let y = 0; // y坐标位置

          // // 当前鼠标位置
          // let pointX = point[0];
          // let pointY = point[1];

          // // 外层div大小
          // // var viewWidth = size.viewSize[0];
          // // var viewHeight = size.viewSize[1];

          // // 提示框大小
          // let boxWidth = size.contentSize[0];
          // let boxHeight = size.contentSize[1];

          // // boxWidth > pointX 说明鼠标左边放不下提示框
          // if (boxWidth > pointX) {
          //   x = 80;
          // } else {
          //   // 左边放的下
          //   x = pointX - boxWidth;
          // }

          // // boxHeight > pointY 说明鼠标上边放不下提示框
          // if (boxHeight > pointY) {
          //   y = 50;
          // } else {
          //   // 上边放得下
          //   y = pointY - boxHeight;
          // }
          // return [x, y];
        },
      },
      dataZoom: [
        {
          id: "dataZoomX",
          type: "slider",
          backgroundColor: "none",
          fillerColor: "rgba(18,53,116,1)",
          showDataShadow: false, //展示数据走势
          showDetail: true,
          height: 10,
          // handleSize: 40,
          right: 160,
          left: 290,
          bottom: 15,
          handleSize: "150%", // 手柄大小
          borderColor: "#fff",
          // "M0,0 v9.7h5 v-9.7h-5 Z", // 画一个长方形
          handleIcon:
            "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5M36.9,35.8h-1.3z M27.8,35.8 h-1.3H27L27.8,35.8L27.8,35.8z", // 画一个圆形
          handleStyle: {
            color: "#fff",
            global: true, // 缺省为 false
            shadowBlur: 6,
            shadowColor: "rgba(123, 154, 204, 1)",
            shadowOffsetX: 0, // 阴影偏移x轴多少
            shadowOffsetY: 0, // 阴影偏移y轴多少
          },
          brushStyle: {
            borderColor: "rgba(237, 32, 32, 1)",
            color: "rgba(234, 28, 28, 1)",
          },
          emphasis: {
            color: "#000",
          },
        },
      ],
      legend: {
        z: 2,
        type: "plain", // 设置图例翻页
        data: ["CH1", "CH2", "CH3", "CH4", "CH5", "CH6"],
        right: "center",
        top: 20,
        itemWidth: 12,
        itemHeight: 10,
        icon: "path://M78.625,93.094L66.494,72.081l12.132-21.013h24.264l12.132,21.013l-12.132,21.013H78.625z M95.547,80.377l4.79-8.296  l-4.79-8.296h-9.579l-4.79,8.296l4.79,8.296H95.547z",
        textStyle: {
          color: "#fff",
          fontSize: "0.18rem",
        },
        pageTextStyle: {
          color: "#fff",
        },
      },
      xAxis: {
        type: "category",
        // type: "value",
        // splitNumber: 10,
        // interval:10,
        //坐标轴线
        z:2,
        axisLine: {
          show: true,
          symbol: ["none", "arrow"],
        },
        axisLabel: {
          show: true,
          //5.3.3
          color: "#ccc",
          margin: 15,
          overflow: "truncate",
          ellipsis: "...",
        },
        data: ["1", "2", "3"],
      },
      yAxis: {
        type: "value",
        // type: 'category',
        z: 2,
        axisLabel: {
          show: true,
          color: "#ccc",
          margin: 25,
          overflow: "truncate",
          rotate: 0,
          padding: [0, 0, 0, 0],
        },
        //坐标轴线
        axisLine: {
          show: true,
          symbol: ["none", "none"],
        },
        //网格线
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: "CH1",
          type: "line",
          z: 2,
          smooth: true,
          animation: false,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            color: "red",
            width: 2,
          },
          areaStyle: {
            color: "rgba(0, 0, 0, 0)",
            shadowColor: "rgba(0, 0, 0, 0)",
          },
          itemStyle: {
            color: "red",
            borderColor: "rgba(0, 0, 126, 0)",
            borderWidth: 12,
          },
          data: [123456789, 156369123, 189258369],
        },
        {
          name: "CH2",
          type: "line",
          z: 2,
          smooth: true,
          animation: false,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            color: "#e476d0",
            width: 2,
          },
          areaStyle: {
            color: "rgba(0, 0, 0, 0)",
            shadowColor: "rgba(0, 0, 0, 0)",
          },
          itemStyle: {
            color: "#e476d0",
            borderColor: "rgba(0, 0, 126, 0)",
            borderWidth: 12,
          },
          data: [223, 256, 289],
        },
        {
          name: "CH3",
          type: "line",
          z: 2,
          smooth: true,
          animation: false,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            color: "yellow",
            width: 2,
          },
          areaStyle: {
            color: "rgba(0, 0, 0, 0)",
            shadowColor: "rgba(0, 0, 0, 0)",
          },
          itemStyle: {
            color: "yellow",
            borderColor: "rgba(0, 0, 126, 0)",
            borderWidth: 12,
          },
          data: [323, 356, 389],
        },
        {
          name: "CH4",
          type: "line",
          z: 2,
          smooth: true,
          animation: false,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            color: "#2edfa3",
            width: 2,
          },
          areaStyle: {
            color: "rgba(0, 0, 0, 0)",
            shadowColor: "rgba(0, 0, 0, 0)",
          },
          itemStyle: {
            color: "#2edfa3",
            borderColor: "rgba(0, 0, 126, 0)",
            borderWidth: 12,
          },
          data: [423, 456, 489],
        },
        {
          name: "CH5",
          type: "line",
          z: 2,
          smooth: true,
          animation: false,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            color: "blue",
            width: 2,
          },
          areaStyle: {
            color: "rgba(0, 0, 0, 0)",
            shadowColor: "rgba(0, 0, 0, 0)",
          },
          itemStyle: {
            color: "blue",
            borderColor: "rgba(0, 0, 126, 0)",
            borderWidth: 12,
          },
          data: [523, 556, 589],
        },
        {
          name: "CH6",
          type: "line",
          z: 2,
          smooth: true,
          animation: false,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            color: "#ffb61e",
            width: 2,
          },
          areaStyle: {
            color: "rgba(0, 0, 0, 0)",
            shadowColor: "rgba(0, 0, 0, 0)",
          },
          itemStyle: {
            color: "#ffb61e",
            borderColor: "rgba(0, 0, 126, 0)",
            borderWidth: 12,
          },
          data: [623, 896, ""],
        },
      ],
    };
    /**
     * @descriptor 筛选数据。
     * @params UnitModelSelect: 数据单位，立方米/升等。
     * @params CHSizeSelect: 通道类型，HCHO/TSP等。
     * @params Chartdata: 上传的数据。
     */
    let filterDataFirst = (UnitModelSelect:string = '忽略',CHSizeSelect:string = '忽略',Chartdata:any[] = []) => {
      let fromselect = Chartdata.filter((item: any, index: number) => {
        if (UnitModelSelect === "忽略" && CHSizeSelect === "忽略") {
          return item;
        } else if (UnitModelSelect !== "忽略" && CHSizeSelect === "忽略") {
          return item.UnitModel === UnitModelSelect;
        } else if (UnitModelSelect === "忽略" && CHSizeSelect !== "忽略") {
          return item.ChannelType === CHSizeSelect;
        } else {
          return (
            item.UnitModel === UnitModelSelect &&
            item.ChannelType === CHSizeSelect
          );
        }
      });
      return fromselect
    }
    /**
     * @descriptor 筛选数据。
     * @params ChannelSize: 通道的粒径大小。
     * @params ChannelSelect: 选中的通道序号。
     * @params Chartdata: 上传的数据。
     */
    let filterDataSecond = (ChannelSize:string = '忽略', ChannelSelect = '1' , Chartdata: any[] = []) => {
      // console.log('二次筛选条件 = ',ChannelSize,ChannelSelect)
      let fromselect = Chartdata.filter((item: any, index: number) => {
        if (ChannelSize === "忽略") {
          if(ChannelSelect === '1') {
            return item.CH1Data
          }
          if(ChannelSelect === '2') {
            return item.CH2Data
          }
          if(ChannelSelect === '3') {
            return item.CH3Data
          }
          if(ChannelSelect === '4') {
            return item.CH4Data
          }
          if(ChannelSelect === '5') {
            return item.CH5Data
          }
          if(ChannelSelect === '6') {
            return item.CH6Data
          }
        }else {
          let condition = null
          
          if(ChannelSelect === '1') {
            return item.CH1BelongWho === ChannelSize
          }
          if(ChannelSelect === '2') {
            return item.CH2BelongWho === ChannelSize
          }
          if(ChannelSelect === '3') {
            return item.CH3BelongWho === ChannelSize
          }
          if(ChannelSelect === '4') {
            return item.CH4BelongWho === ChannelSize
          }
          if(ChannelSelect === '5') {
            return item.CH5BelongWho === ChannelSize
          }
          if(ChannelSelect === '6') {
            return item.CH6BelongWho === ChannelSize
          }

        }
      });
      // console.log('二次筛选结果 = ',fromselect[0].CH3Data,fromselect.length)
      return fromselect
    }
    let TestChart = async () => {
      //1:从本地加载参数。
      let storage = localStorage.getItem("Setting");
      let set = storage && JSON.parse(storage);
      let UnitModelSelect = set.UnitModelSelect; //忽略 - 单位 ums = unit model select
      let CHSizeSelect = set.CHSizeSelect; //忽略 - 粒径 css =
      let ChartModelSelect = set.ChartModelSelect; //图表模式。ChartModelSelect
      let CtrlTotalSelect = set.CtrlTotalSelect; //2,3,4
      let RMLocationSelect = set.RMLocationSelect; // 前 后
      //2:从store获取数据。
      let chartdata = store.state.TableUploadData || [];
      //经过2级筛选。1：筛选单位，2: 筛选粒径。
      let fromselect = filterDataFirst( UnitModelSelect, CHSizeSelect,chartdata )
      //第二次筛选。筛选通道序号 和 通道粒径。
      
      if (ChartModelSelect === "常规") {
        if (fromselect.length === 0) {
          message.error(`${ChartModelSelect}，数据不足，无法生成图表`);
          return;
        }
      } else {
        fromselect = filterDataSecond(SizeDetailSelect.value[0],ChannelSelect.value[0],fromselect)
        if (fromselect.length < 12) {
          message.error(
            `${ChartModelSelect}，单位：${UnitModelSelect} - 粒径：${CHSizeSelect}，数据数 < 12，无法生成图表`
          );
          return;
        }
      }
      let chartdom = document.getElementById("localchart") as HTMLElement;
      let instance = echarts.getInstanceByDom(chartdom);
      //实例已经被创建。则销毁。
      if (instance) {
        echarts.dispose(chartdom);
        Echarts = null;
      }
      //常规
      switch (ChartModelSelect) {
        case "常规":
          Echarts = echarts.init(chartdom, undefined, { renderer: "svg" });
          let localtp = TestOption;
          localtp.legend.data = []
          localtp.legend.data = ['CH1','CH2','CH3','CH4','CH5','CH6']
          //x轴
          localtp.xAxis.data = []
          localtp.series = []
          localtp.series = [
            {
              name: "CH1",
              type: "line",
              z: 2,
              smooth: true,
              animation: false,
              symbol: "circle",
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                color: "red",
                width: 2,
              },
              areaStyle: {
                color: "rgba(0, 0, 0, 0)",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
              itemStyle: {
                color: "red",
                borderColor: "rgba(0, 0, 126, 0)",
                borderWidth: 12,
              },
              data: [],
            },
            {
              name: "CH2",
              type: "line",
              z: 2,
              smooth: true,
              animation: false,
              symbol: "circle",
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                color: "#e476d0",
                width: 2,
              },
              areaStyle: {
                color: "rgba(0, 0, 0, 0)",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
              itemStyle: {
                color: "#e476d0",
                borderColor: "rgba(0, 0, 126, 0)",
                borderWidth: 12,
              },
              data: [],
            },
            {
              name: "CH3",
              type: "line",
              z: 2,
              smooth: true,
              animation: false,
              symbol: "circle",
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                color: "yellow",
                width: 2,
              },
              areaStyle: {
                color: "rgba(0, 0, 0, 0)",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
              itemStyle: {
                color: "yellow",
                borderColor: "rgba(0, 0, 126, 0)",
                borderWidth: 12,
              },
              data: [],
            },
            {
              name: "CH4",
              type: "line",
              z: 2,
              smooth: true,
              animation: false,
              symbol: "circle",
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                color: "#2edfa3",
                width: 2,
              },
              areaStyle: {
                color: "rgba(0, 0, 0, 0)",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
              itemStyle: {
                color: "#2edfa3",
                borderColor: "rgba(0, 0, 126, 0)",
                borderWidth: 12,
              },
              data: [],
            },
            {
              name: "CH5",
              type: "line",
              z: 2,
              smooth: true,
              animation: false,
              symbol: "circle",
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                color: "blue",
                width: 2,
              },
              areaStyle: {
                color: "rgba(0, 0, 0, 0)",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
              itemStyle: {
                color: "blue",
                borderColor: "rgba(0, 0, 126, 0)",
                borderWidth: 12,
              },
              data: [],
            },
            {
              name: "CH6",
              type: "line",
              z: 2,
              smooth: true,
              animation: false,
              symbol: "circle",
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                color: "#ffb61e",
                width: 2,
              },
              areaStyle: {
                color: "rgba(0, 0, 0, 0)",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
              itemStyle: {
                color: "#ffb61e",
                borderColor: "rgba(0, 0, 126, 0)",
                borderWidth: 12,
              },
              data: [],
            },
          ];
          //
          let fslen = fromselect.length

          for(let i = 0; i < fslen; i++) {
            //x轴创建。
            localtp.xAxis.data.push((i + 1).toString())
            let s1,s2,s3,s4,s5,s6
            let ch,zs,xs,sj
            s1 = fromselect[i].CH1Data !== '' ? fromselect[i].CH1Data : ''
            s2 = fromselect[i].CH2Data !== '' ? fromselect[i].CH2Data : ''
            s3 = fromselect[i].CH3Data !== '' ? fromselect[i].CH3Data : ''
            s4 = fromselect[i].CH4Data !== '' ? fromselect[i].CH4Data : ''
            s5 = fromselect[i].CH5Data !== '' ? fromselect[i].CH5Data : ''
            s6 = fromselect[i].CH6Data !== '' ? fromselect[i].CH6Data : ''
            //CH1里添加数据。
            if(s1 === '') {
              localtp.series[0].data.push('')
            }else {
              ch = s1.split('.')
              zs = ch[0]?.replace(/,/g,'')
              xs = ch[1] ? `.${ch[1]}` : ''
              sj = parseFloat((zs + xs))
              localtp.series[0].data.push(sj)
            }
            //CH2
            if(s2 === '') {
              localtp.series[1].data.push('')
            }else {
              ch = s2.split('.')
              zs = ch[0]?.replace(/,/g,'')
              xs = ch[1] ? `.${ch[1]}` : ''
              sj = parseFloat((zs + xs))
              localtp.series[1].data.push(sj)
            }
            //CH3
            if(s3 === '') {
              localtp.series[2].data.push('')
            }else {
              ch = s3.split('.')
              zs = ch[0]?.replace(/,/g,'')
              xs = ch[1] ? `.${ch[1]}` : ''
              sj = parseFloat((zs + xs))
              localtp.series[2].data.push(sj)
            }
            //CH4
            if(s4 === '') {
              localtp.series[3].data.push('')
            }else {
              ch = s4.split('.')
              zs = ch[0]?.replace(/,/g,'')
              xs = ch[1] ? `.${ch[1]}` : ''
              sj = parseFloat((zs + xs))
              localtp.series[3].data.push(sj)
            }
            //CH5
            if(s5 === '') {
              localtp.series[4].data.push('')
            }else {
              ch = s5.split('.')
              zs = ch[0]?.replace(/,/g,'')
              xs = ch[1] ? `.${ch[1]}` : ''
              sj = parseFloat((zs + xs))
              localtp.series[4].data.push(sj)
            }
            //CH6
            if(s6 === '') {
              localtp.series[5].data.push('')
            }else {
              ch = s6.split('.')
              zs = ch[0]?.replace(/,/g,'')
              xs = ch[1] ? `.${ch[1]}` : ''
              sj = parseFloat((zs + xs))
              localtp.series[5].data.push(sj)
            }
          }

          await delay(200);
          Echarts.setOption(localtp);
          break;
        case "均值控制图":
          //获取小数点支持。
          let SupportFloat = store.state.SupportFloat

          let divider = parseInt(CtrlTotalSelect);
          let locallen = fromselect.length;
          //1: 计算余数。
          let remainer = locallen % divider;
          //2：数据删除 ，删除 前 / 后。
          let remaindata = fromselect;
          if (RMLocationSelect === "前") {
            if(remainer !== 0) {
              remaindata.splice(0, remainer);
            }
          } else {
            if(remainer !== 0) {
              remaindata.splice(-1, remainer);
            }
          }
          //3：数据装载入数组。
          let calcarr1: any[] = [];
          let calcarr2: any[] = [];
          let calcarr3: any[] = [];
          let calcarr4: any[] = [];
          let calcarr5: any[] = [];
          let calcarr6: any[] = [];
          //要分割的数据。
          let splicearr = remaindata;
          
          //控制图A2
          let A2 = 0;
          let splicetotal = parseInt((splicearr.length / divider).toString());
          if (divider === 4) {
            calcarr1 = splicearr.splice(0, splicetotal);
            calcarr2 = splicearr.splice(0, splicetotal);
            calcarr3 = splicearr.splice(0, splicetotal);
            calcarr4 = splicearr.splice(0, splicetotal);
            calcarr5 = [];
            calcarr6 = [];

            A2 = 0.729;
          } else if (divider === 5) {
            calcarr1 = splicearr.splice(0, splicetotal);
            calcarr2 = splicearr.splice(0, splicetotal);
            calcarr3 = splicearr.splice(0, splicetotal);
            calcarr4 = splicearr.splice(0, splicetotal);
            calcarr5 = splicearr.splice(0, splicetotal);
            calcarr6 = [];

            A2 = 0.577;
          } else if (divider === 6) {
            calcarr1 = splicearr.splice(0, splicetotal);
            calcarr2 = splicearr.splice(0, splicetotal);
            calcarr3 = splicearr.splice(0, splicetotal);
            calcarr4 = splicearr.splice(0, splicetotal);
            calcarr5 = splicearr.splice(0, splicetotal);
            calcarr6 = splicearr.splice(0, splicetotal);

            A2 = 0.483;
          }
          //将数据从proxy转换出来。
          let coverarr1: any[] = [];
          let coverarr2: any[] = [];
          let coverarr3: any[] = [];
          let coverarr4: any[] = [];
          let coverarr5: any[] = [];
          let coverarr6: any[] = [];
          //平均数
          let sum1 = 0;
          let sum2 = 0;
          let sum3 = 0;
          let sum4 = 0;
          let sum5 = 0;
          let sum6 = 0;

          let average1 = 0.0;
          let average2 = 0.0;
          let average3 = 0.0;
          let average4 = 0.0;
          let average5 = 0.0;
          let average6 = 0.0;

          calcarr1.forEach((item1, index1) => {
            let ch = SelectDataFromChannel(item1,ChannelSelect.value[0])
            let shuju = ch?.split('.')
            let zs = shuju[0]?.replace(/,/g,'')
            let xs = shuju[1] ? `.${shuju[1]}` : ''
            let sj = parseFloat((zs + xs))
            coverarr1.push(sj);
            sum1 += sj;
          });
          calcarr2.forEach((item2, index2) => {
            let ch = SelectDataFromChannel(item2,ChannelSelect.value[0])
            let shuju = ch?.split('.')
            let zs = shuju[0]?.replace(/,/g,'')
            let xs = shuju[1] ? `.${shuju[1]}` : ''
            let sj = parseFloat((zs + xs))
            coverarr2.push(sj);
            sum2 += sj
          });
          calcarr3.forEach((item3, index3) => {
            let ch = SelectDataFromChannel(item3,ChannelSelect.value[0])
            let shuju = ch?.split('.')
            let zs = shuju[0]?.replace(/,/g,'')
            let xs = shuju[1] ? `.${shuju[1]}` : ''
            let sj = parseFloat((zs + xs))
            coverarr3.push(sj);
            sum3 += sj;
          });
          calcarr4.forEach((item4, index4) => {
            let ch = SelectDataFromChannel(item4,ChannelSelect.value[0])
            let shuju = ch?.split('.')
            let zs = shuju[0]?.replace(/,/g,'')
            let xs = shuju[1] ? `.${shuju[1]}` : ''
            let sj = parseFloat((zs + xs))
            coverarr4.push(sj);
            sum4 += sj;
          });
          calcarr5.forEach((item5, index5) => {
            let ch = SelectDataFromChannel(item5,ChannelSelect.value[0])
            let shuju = ch?.split('.')
            let zs = shuju[0]?.replace(/,/g,'')
            let xs = shuju[1] ? `.${shuju[1]}` : ''
            let sj = parseFloat((zs + xs))
            coverarr5.push(sj);
            sum5 += sj;
          });
          calcarr6.forEach((item6, index6) => {
            let ch = SelectDataFromChannel(item6,ChannelSelect.value[0])
            let shuju = ch?.split('.')
            let zs = shuju[0]?.replace(/,/g,'')
            let xs = shuju[1] ? `.${shuju[1]}` : ''
            let sj = parseFloat((zs + xs))
            coverarr6.push(sj);
            sum6 += sj;
          });
          //平均数。
          average1 = sum1 / splicetotal;
          average2 = sum2 / splicetotal;
          average3 = sum3 / splicetotal;
          average4 = sum4 / splicetotal;
          average5 = sum5 / splicetotal;
          average6 = sum6 / splicetotal;
          // console.log('数据总数 = ',sum1,sum2,sum3,sum4,sum5,sum6)
          sum1 = sum2 = sum3 = sum4 = sum5 = sum6 = 0;
          //求以上平均数的平均数。
          let lastsum =
            average1 + average2 + average3 + average4 + average5 + average6;
          // console.log('数据平均数 = ',average1,average2,average3,average4,average5,average6,'divider = ',divider,splicetotal)
          //均值中心
          let CLx = parseFloat(
            parseFloat((lastsum / divider).toString()).toFixed(SupportFloat)
          );

          let RSum = 0;
          if (divider === 4) {
            for (let j = 0; j < splicetotal; j++) {
              let Rarr = [];
              Rarr.push(coverarr1[j]);
              Rarr.push(coverarr2[j]);
              Rarr.push(coverarr3[j]);
              Rarr.push(coverarr4[j]);
              Rarr.sort((a: number, b: number) => {
                return b - a;
              });
              let max_min = Rarr[0] - Rarr[Rarr.length - 1];
              RSum += max_min;
            }
          } else if (divider === 5) {
            for (let j = 0; j < splicetotal; j++) {
              let Rarr = [];
              Rarr.push(coverarr1[j]);
              Rarr.push(coverarr2[j]);
              Rarr.push(coverarr3[j]);
              Rarr.push(coverarr4[j]);
              Rarr.push(coverarr5[j]);
              Rarr.sort((a: number, b: number) => {
                return b - a;
              });
              let max_min = Rarr[0] - Rarr[Rarr.length - 1];
              RSum += max_min;
            }
          } else if (divider === 6) {
            for (let j = 0; j < splicetotal; j++) {
              let Rarr = [];
              Rarr.push(coverarr1[j]);
              Rarr.push(coverarr2[j]);
              Rarr.push(coverarr3[j]);
              Rarr.push(coverarr4[j]);
              Rarr.push(coverarr5[j]);
              Rarr.push(coverarr6[j]);
              Rarr.sort((a: number, b: number) => {
                return b - a;
              });
              let max_min = Rarr[0] - Rarr[Rarr.length - 1];
              RSum += max_min;
              // console.log('**** = ',Rarr[0],Rarr[Rarr.length - 1],Rarr.length,max_min)
            }
          }
          //得到R值得平均值。
          let RSumAverage: number = parseFloat(
            parseFloat((RSum / splicetotal).toString()).toFixed(2)
          );
          // console.log('RSUM === ',RSum)
          RSum = 0;
          //均值上限。
          let myucl = CLx + A2 * RSumAverage
          // let ucl = myucl.toString().split('.')
          // let myzs = ucl[0]
          // let myxs = ucl[1] && SupportFloat !== 0 ? `.${ucl[1].substr(0,SupportFloat)}` : ''
          // let mysj = myzs + myxs
          // let UCLx = SupportFloat === 0 ?  parseInt(mysj) : parseFloat(mysj);
          // console.log('A2 = ',A2,RSumAverage,UCLx,CLx)
          let UCLx = parseFloat(
            parseFloat(myucl.toString()).toFixed(SupportFloat)
          );
          //
          let tp = TestOption;

          //生成图表参数。
          tp.legend.data = []
          //x轴
          tp.xAxis.data = []
          //生成的Legend名字。默认通道：CH1。
          tp.legend.data[0] = "均值上限(UCLx)";
          tp.legend.data[1] = "均值中心(LCx)";
          tp.legend.data[2] = LegendNameFromChannel(ChannelSelect.value[0]);

          tp.series = [
            {
              name: tp.legend.data[0],
              type: "line",
              z: 2,
              smooth: true,
              animation: false,
              symbol: "circle",
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                color: "red",
                width: 2,
              },
              areaStyle: {
                color: "rgba(0, 0, 0, 0)",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
              itemStyle: {
                color: "red",
                borderColor: "rgba(0, 0, 126, 0)",
                borderWidth: 12,
              },
              data: [],
            },
            {
              name: tp.legend.data[1],
              type: "line",
              z: 2,
              smooth: true,
              animation: false,
              symbol: "circle",
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                color: "#e476d0",
                width: 2,
              },
              areaStyle: {
                color: "rgba(0, 0, 0, 0)",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
              itemStyle: {
                color: "#e476d0",
                borderColor: "rgba(0, 0, 126, 0)",
                borderWidth: 12,
              },
              data: [],
            },
            {
              name: tp.legend.data[2],
              type: "line",
              z: 2,
              smooth: true,
              animation: false,
              symbol: "circle",
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                color: "yellow",
                width: 2,
              },
              areaStyle: {
                color: "rgba(0, 0, 0, 0)",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
              itemStyle: {
                color: "yellow",
                borderColor: "rgba(0, 0, 126, 0)",
                borderWidth: 12,
              },
              data: [],
            },
          ];
          //数据重新选中
          let lastfromselect = filterDataFirst(UnitModelSelect,CHSizeSelect,chartdata)
          //数据重新二次选中。
          lastfromselect = filterDataSecond(SizeDetailSelect.value[0],ChannelSelect.value[0],lastfromselect)
          
          if (RMLocationSelect === "前") {
            lastfromselect.splice(0, remainer);
          } else {
            lastfromselect.splice(-1, remainer);
          }
          let chart_len = lastfromselect.length
          //数据放到表格参数中
          for(let i = 0 ;i < chart_len; i++) {
            tp.series[0].data.push(UCLx)
            tp.series[1].data.push(CLx)
            //数据去掉逗号.
            // let shuju = lastfromselect[i]?.CH6Data?.split('.')
            let shuju = SelectDataFromChannel(lastfromselect[i],ChannelSelect.value[0]).split('.')
            // let shuju = '1,996.85'.split('.')
            
            let zs = shuju[0]?.replace(/,/g,'')
            let xs = shuju[1] ? `.${shuju[1]}` : ''
            let sj = parseFloat((zs + xs))
            // console.log('shuju = ',shuju,'zs = ',zs,'xs =',xs,'sf =',SupportFloat)
            tp.series[2].data.push(sj)

            //X轴
            tp.xAxis.data.push((i + 1).toString())
          }
          // console.log('控制图参数 = ',tp)
          Echarts = echarts.init(chartdom, undefined, { renderer: "svg" });
          await delay(200);
          Echarts.setOption(tp);

          break;
      }
    };
    /**
     * @descriptor 根据选择的通道，筛选数据
     */
    let SelectDataFromChannel = (data:any,channel = '1') => {
      let selectdata = ''
      switch(channel) {
        case '1':
          selectdata = data.CH1Data
        break
        case '2':
          selectdata = data.CH2Data
        break
        case '3':
          selectdata = data.CH3Data
        break
        case '4':
          selectdata = data.CH4Data
        break
        case '5':
          selectdata = data.CH5Data
        break
        case '6':
          selectdata = data.CH6Data
        break
      }
      return selectdata 
    }
    /**
     * @descriptor 根据选择的通道，生成Legendname,Series name。
     */
    let LegendNameFromChannel = (channel = '1') => {
      let legendname = ''
      switch(channel) {
        case '1':
          legendname = 'CH1'
        break
        case '2':
          legendname = 'CH2'
        break
        case '3':
          legendname = 'CH3'
        break
        case '4':
          legendname = 'CH4'
        break
        case '5':
          legendname = 'CH5'
        break
        case '6':
          legendname = 'CH6'
        break
      }
      return legendname 
    }
    let TestClearChart = async () => {
      let chartdom = document.getElementById("localchart") as HTMLElement;
      let instance = echarts.getInstanceByDom(chartdom);
      if (!instance) {
        message.error("图表未生成");
        return;
      }
      await delay(200);
      echarts.dispose(chartdom);
    };

    onMounted(() => {
      window.addEventListener('resize',() =>{
        let chartdom = document.getElementById("localchart") as HTMLElement;
        let instance = echarts.getInstanceByDom(chartdom)
        if(instance) {
          instance.resize()
        }
      })
    });
    onBeforeUnmount(() => {
      let chartdom = document.getElementById("localchart") as HTMLElement;
      let instance = echarts.getInstanceByDom(chartdom);
      if (instance) {
        echarts.dispose(chartdom);
        console.log("生命周期 unmounted,图表实例销毁");
      }
    });

    return {
      store,
      Setting,
      // getPopupContainer,
      SpaceTimeSelect,
      ModelSelect,
      UnitModelSelect,
      CHSizeSelect,
      SizeDetailSelect,
      ChartModelSelect,
      SpaceTimeChange,
      ModelChange,
      UnitModelChange,
      CHSizeChange,
      SizeDetailChange,
      ChartModelChange,
      //控制图参数。
      CtrlTotalSelect,
      CtrlTotalChange,
      RMLocationSelect,
      RMLocationChange,
      ChannelChange,

      //设备数据
      DeviceData,
      AniDataIndex,

      Echarts,
      TestChart,
      TestOption,
      TestClearChart,
      //
      ChannelSelect,
    };
  },
  data() {
    return {
      Temp: "--",
      Humi: "--",
      SPConnectStatus: true,
      BTNDisabled: false,
      TestValue: "123,456,789",
      Time: "2022-05-25 17:30:45",
      ActionBTNLock: false,
      //轮播定时器。
      AniTimer: null as any,
      //echarts表格.
    };
  },
  mounted() {
    particlesInit();
    //参数自动加载。
    this.autoLoadSetting();
    //初始化创建图表。
    this.createEchart();
  },
  beforeUnmount() {
    window.removeEventListener("resize", () => {});
  },
  activated() {
    this.getDeviceInfo()
  },
  methods: {
    //自动加载参数。
    async autoLoadSetting() {
      let storage = localStorage.getItem("Setting");
      if (!storage) {
        //设置默认参数。
        let defsetting = {
          SpaceTimeSelect: "1",
          ModelSelect: "单次",
          UnitModelSelect: "忽略",
          CHSizeSelect: "忽略",
          SizeDetailSelect: "忽略",
          ChartModelSelect: "常规",
          CtrlTotalSelect: "6",
          RMLocationSelect: "前",
          ChannelSelect: "1"
        };
        localStorage.setItem("Setting", JSON.stringify(defsetting));
        this.SpaceTimeSelect = [defsetting.SpaceTimeSelect];
        this.ModelSelect = [defsetting.ModelSelect];
        this.UnitModelSelect = [defsetting.UnitModelSelect];
        this.CHSizeSelect = [defsetting.CHSizeSelect];
        this.SizeDetailSelect = [defsetting.SizeDetailSelect];
        this.ChartModelSelect = [defsetting.ChartModelSelect];
        this.CtrlTotalSelect = [defsetting.CtrlTotalSelect];
        this.RMLocationSelect = [defsetting.RMLocationSelect];
        this.ChannelSelect = [defsetting.ChannelSelect];
        return;
      }
      let setting = JSON.parse(storage);
      this.SpaceTimeSelect = [setting.SpaceTimeSelect];
      this.ModelSelect = [setting.ModelSelect];
      this.UnitModelSelect = [setting.UnitModelSelect];
      this.CHSizeSelect = [setting.CHSizeSelect];
      this.SizeDetailSelect = [setting.SizeDetailSelect];
      this.ChartModelSelect = [setting.ChartModelSelect];
      this.CtrlTotalSelect = [setting.CtrlTotalSelect];
      this.RMLocationSelect = [setting.RMLocationSelect];
      this.ChannelSelect = [setting.ChannelSelect];
    },
    //参数空提示。
    applyTip() {},
    //应用设置。
    async applySetting() {
      // let data = '123,456,789.052'
      // let s = data.replace(/,/g,'')
      // console.log(data,s)
      // return
      if (this.ActionBTNLock) {
        return;
      }
      this.ActionBTNLock = true;
      let applyset = {
        SpaceTimeSelect: this.SpaceTimeSelect[0],
        ModelSelect: this.ModelSelect[0],
        UnitModelSelect: this.UnitModelSelect[0],
        CHSizeSelect: this.CHSizeSelect[0],
        SizeDetailSelect: this.SizeDetailSelect[0],
        ChartModelSelect: this.ChartModelSelect[0],
        CtrlTotalSelect: this.CtrlTotalSelect[0],
        RMLocationSelect: this.RMLocationSelect[0],
        ChannelSelect: this.ChannelSelect[0]
      };
      //根据设备类型校验通道。
      
      localStorage.setItem("Setting", JSON.stringify(applyset));
      message.success("应用设置", 1);
      await delay(1000);
      this.ActionBTNLock = false;
    },
    channelCheckFromDeviceType(devicetype: string = 'HPC100',channelselect:string = '1') {
      switch(devicetype) {
        case 'HPC100':
          
        break
        case 'HPC200':
        break
        case 'HPC300':
        break
        case 'HPC400':
        break
        case 'HPC500':
        break
        case 'HPC600':
        break
      }
    },
    //开始轮播
    btnStartAni() {
      //1:从本地加载参数。
      let storage = localStorage.getItem("Setting");
      let set = storage && JSON.parse(storage);
      let sts = set.SpaceTimeSelect; //时间间隔
      let ms = set.ModelSelect; //单次 - 循环
      let ums = set.UnitModelSelect; //忽略 - 单位
      let css = set.CHSizeSelect; //忽略 - 粒径
      console.log("本地set参数", sts, ms, ums, css);
      //2:从store获取数据。
      let anidata = this.store.state.TableUploadData || [];

      //经过2级筛选。1：筛选单位，2: 筛选粒径。
      let fromselect = anidata.filter((item: any, index: number) => {
        if (ums === "忽略" && css === "忽略") {
          return item;
        } else if (ums !== "忽略" && css === "忽略") {
          return item.UnitModel === ums;
        } else if (ums === "忽略" && css !== "忽略") {
          return item.ChannelType === css;
        } else {
          return item.UnitModel === ums && item.ChannelType === css;
        }
      });
      if (fromselect.length === 0) {
        message.error("数据不足，无法轮播");
        return;
      }
      //3:进行播放
      if (this.AniTimer) {
        clearInterval(this.AniTimer);
        console.log("清空轮播定时器", this.AniTimer);
        this.AniTimer = null;
      }
      let time = parseInt(sts) * 1000;
      let datalen = fromselect.length;
      //下标置0
      this.AniDataIndex = 0;
      //获取设备类型。
      this.DeviceData.DeviceType = this.store.state.DeviceType 
      this.AniTimer = setInterval(() => {
        let fs = fromselect[this.AniDataIndex];
        this.DeviceData.DataIndex = fs.DataIndex;

        this.DeviceData.CH1Data = fs.CH1Data;
        this.DeviceData.CH2Data = fs.CH2Data;
        this.DeviceData.CH3Data = fs.CH3Data;
        this.DeviceData.CH4Data = fs.CH4Data;
        this.DeviceData.CH5Data = fs.CH5Data;
        this.DeviceData.CH6Data = fs.CH6Data;

        this.DeviceData.Temp = fs.Temp;
        this.DeviceData.Humi = fs.Humi;
        this.DeviceData.CreateTime = fs.CreateTime;
        this.DeviceData.ChannelType = fs.ChannelType;
        this.AniDataIndex++;
        if (this.AniDataIndex === datalen) {
          this.AniDataIndex = 0;
          if (ms === "单次") {
            clearInterval(this.AniTimer);
            this.AniTimer = null;
          }
        }
      }, time);
    },
    //停止轮播
    btnStopAni() {
      if (this.AniTimer) {
        clearInterval(this.AniTimer);
        this.AniTimer = null;
      }
    },
    //初始化创建图表。
    createEchart() {},
    //创建图表
    async btnCreateChart() {},
    //清空图表
    async btnClearChart() {},
    /**
     * @descriptor 获取设备类型，粒径数组。
     */
    getDeviceInfo() {
      this.DeviceData.DeviceType = this.store.state.DeviceType || '设备类型'
      this.Setting.SizeDetailList = [
        {
          label: "忽略",
          value: '忽略',
          isLeaf: true,
        }
      ]
      let sizearr = this.store.state.LocalDeviceSizeArr 
      sizearr.forEach((v:string = '',i:number) => {
        this.Setting.SizeDetailList.push({
          label: v,
          value: v,
          isLeaf: true,
        })
      })
      
      
    },
  },
});
</script>
<style lang="less" scoped>
.analyze {
  width: 100%;
  height: 100%;
}
.particle {
  position: absolute;
  z-index: 0;
}
.row1 {
  width: 100%;
  height: auto;
  padding-top: 0.05rem;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .row1-item-1,
  .row1-item-3 {
    width: 6rem;
    height: 3rem;
    border-image-source: radial-gradient(
      closest-side at 50% 50%,
      transparent 0%,
      transparent 100%,
      cyan 100%
    );
    border-image-slice: 24% 4%;
    border-width: 1px;
    border-style: solid;
    border-image-outset: 0;
  }
  .row1-item-1 {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .set-box-container {
    width: 47%;
    height: 95%;
  }
  .set-box {
    width: 100%;
    margin-top: 0.1rem;
    display: flex;
    justify-content: flex-end;
    .set-icon {
      width: 1.4rem;
      height: 0.4rem;
      margin-left: 0rem;
      line-height: 0.4rem;
      font-size: 0.2rem;
      text-align: center;
    }
    .set-space {
      background: url(../assets/icon/set-sptime.png) left center no-repeat;
      background-size: 0.25rem 0.25rem;
    }
    .set-model {
      background: url(../assets/icon/set-model.png) left center no-repeat;
      background-size: 0.25rem 0.25rem;
    }
    .set-unit {
      background: url(../assets/icon/set-unit.png) left center no-repeat;
      background-size: 0.25rem 0.25rem;
    }
    .set-size {
      background: url(../assets/icon/set-size.png) left center no-repeat;
      background-size: 0.25rem 0.25rem;
    }
    .set-size-detail {
      background: url(../assets/icon/set-size-detail.png) left center no-repeat;
      background-size: 0.25rem 0.25rem;
    }
    .set-chart {
      background: url(../assets/icon/set-chart.png) left center no-repeat;
      background-size: 0.25rem 0.25rem;
    }

    .set-total {
      background: url(../assets/icon/set-total.png) left center no-repeat;
      background-size: 0.25rem 0.25rem;
    }
    .set-number {
      background: url(../assets/icon/set-number.png) left center no-repeat;
      background-size: 0.25rem 0.25rem;
    }
    .set-remove {
      background: url(../assets/icon/set-remove.png) left center no-repeat;
      background-size: 0.25rem 0.25rem;
    }
    .set-channel {
      background: url(../assets/icon/set-channel.png) left center no-repeat;
      background-size: 0.25rem 0.25rem;
    }
  }
  .row1-item-2 {
    width: 10rem;
    height: 3.5rem;
    padding-left: 0.08rem;
    // border: 1px solid #ccc;
    background: url("../assets/images/border2.png") center center no-repeat;
    background-size: 250% 110%;

    display: flex;
    justify-content: space-around;
    align-items: center;

    .value-text {
      display: inline-block;
      width: 2.5rem;
      height: 0.6rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      font-size: 0.25rem;
      line-height: 0.6rem;
    }
    .msg-1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .msg-2 {
      width: 4rem;
      height: 100%;
      position: relative;
      overflow: hidden;
      .circle-1 {
        width: 2.5rem;
        height: 2.5rem;
        background: url("../assets/images/round01.png") center center no-repeat;
        background-size: cover;

        text-align: center;
        line-height: 2.5rem;
        font-size: 0.25rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -1.25rem;
        margin-top: -1.25rem;
      }
      .time {
        width: 4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        font-size: 0.2rem;

        position: absolute;
        left: 50%;
        top: 12%;
        margin-left: -2rem;
      }
      .temp {
        width: 1.25rem;
        height: 0.5rem;
        // border: 1px solid #ccc;
        position: absolute;
        left: 0;
        bottom: 10%;
        font-size: 0.25rem;
        text-align: right;
        line-height: 0.5rem;
        background: url(../assets/icon/temp.png) left center no-repeat;
        background-size: 0.3rem 0.3rem;
      }
      .humi {
        width: 1.25rem;
        height: 0.5rem;
        // border: 1px solid #ccc;
        position: absolute;
        right: 0;
        bottom: 10%;
        font-size: 0.25rem;
        text-align: right;
        line-height: 0.5rem;
        background: url(../assets/icon/humi.png) left center no-repeat;
        background-size: 0.3rem 0.3rem;
      }
    }
  }
  //3
  .row1-item-3 {
    padding-left: 1.1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    .local-btn {
      height: 0.6rem;
      margin-left: 0.3rem;
    }
  }
  .row1-item-3::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.2);
  }
}
.row2 {
  width: 100%;
  height: 60vh;
  margin-top: 0.05rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .local-chart {
    width: 100%;
    height: 100%;
    // border: 1px solid #ccc;
  }
}
</style>
