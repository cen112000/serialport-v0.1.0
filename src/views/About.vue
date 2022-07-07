<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,

} from "vue";

export default defineComponent({
  setup() {
    //echarts配置项。
    // let LocalOption = {
    //   show: true,
    //   title: {
    //     text: "通道数据",
    //     textStyle: {
    //       color: "#fff",
    //       fontSize: 15,
    //       lineHeight: 15,
    //     },
    //     left: "center",
    //   },
    //   tooltip: {
    //     trigger: "axis",
    //     enterable: true, // 鼠标是否可进入提示框浮层中
    //     hideDelay: 200, // 浮层隐藏的延迟
    //     confine: true,
    //     formatter: function (params: any) {
    //       var htmlStr =
    //         '<div style="width: 5rem;height: 6rem; overflow-y: auto;"><p>' +
    //         params[0].axisValue +
    //         "</p>";
    //       let value = "";
    //       // //////console.log('debug00000000',params,typeof params)
    //       for (var i = 0; i < params.length; i++) {
    //         if (params[i].value !== 0.1) {
    //           if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(params[i].value)) {
    //             value = params[i].value;
    //           }
    //           let a = RegExp.$1,
    //             b = RegExp.$2,
    //             c = RegExp.$3;
    //           let re = new RegExp("(\\d)(\\d{3})(,|$)").compile();
    //           while (re.test(b)) b = b.replace(re, "$1,$2$3");
    //           value = "\n" + a + "" + b + "" + c;
    //           htmlStr +=
    //             '<p style="color: #666;font-size: 0.18rem;">' +
    //             params[i].marker +
    //             params[i].seriesName +
    //             ":" +
    //             value +
    //             "</p>";
    //         } else {
    //           htmlStr +=
    //             '<p style="color: #666;font-size: 0.18rem;">' +
    //             params[i].marker +
    //             params[i].seriesName +
    //             ":" +
    //             0 +
    //             "</p>";
    //         }
    //       }
    //       htmlStr += "</div>";
    //       return htmlStr;
    //     },
    //     extraCssText: "box-shadow: 0 0 3px rgba(150,150,150, 0.7);",
    //     position: function (
    //       point: any,
    //       params: any,
    //       dom: any,
    //       rect: any,
    //       size: any
    //     ) {
    //       // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
    //       // 提示框位置
    //       let x = 0; // x坐标位置
    //       let y = 0; // y坐标位置

    //       // 当前鼠标位置
    //       let pointX = point[0];
    //       let pointY = point[1];

    //       // 外层div大小
    //       // var viewWidth = size.viewSize[0];
    //       // var viewHeight = size.viewSize[1];

    //       // 提示框大小
    //       let boxWidth = size.contentSize[0];
    //       let boxHeight = size.contentSize[1];

    //       // boxWidth > pointX 说明鼠标左边放不下提示框
    //       if (boxWidth > pointX) {
    //         x = 80;
    //       } else {
    //         // 左边放的下
    //         x = pointX - boxWidth;
    //       }

    //       // boxHeight > pointY 说明鼠标上边放不下提示框
    //       if (boxHeight > pointY) {
    //         y = 50;
    //       } else {
    //         // 上边放得下
    //         y = pointY - boxHeight;
    //       }
    //       return [x, y];
    //     },
    //   },
    //   grid: {
    //     left: 110,
    //     top: 60,
    //     right: 50,
    //     bottom: 60,
    //   },
    //   legend: {
    //     type: "plain", // 设置图例翻页
    //     data: ["CH1", "CH2", "CH3", "CH4", "CH5", "CH6"],
    //     right: "center",
    //     top: 20,
    //     itemWidth: 12,
    //     itemHeight: 10,
    //     icon: "path://M78.625,93.094L66.494,72.081l12.132-21.013h24.264l12.132,21.013l-12.132,21.013H78.625z M95.547,80.377l4.79-8.296  l-4.79-8.296h-9.579l-4.79,8.296l4.79,8.296H95.547z",
    //     textStyle: {
    //       color: "#fff",
    //       fontSize: "0.18rem",
    //     },
    //     pageTextStyle: {
    //       color: "#fff",
    //     },
    //     //全选 反选
    //     // selector: ['all', 'inverse'],
    //     // selectorLabel: {
    //     //   color: "#fff",
    //     //   borderColor: '#409EFF'
    //     // },
    //     //翻页时使用动画
    //     animation: false,
    //     animationDurationUpdate: 1000,
    //   },

    //   xAxis: {
    //     type: "category",
    //     //坐标轴线
    //     axisLine: {
    //       show: true,
    //       symbol: ["none", "none"],
    //     },
    //     axisLabel: {
    //       show: true,
    //       color: "#ccc",
    //       margin: 15,
    //       overflow: "truncate",
    //       ellipsis: "...",
    //     },
    //     data: ["2022.05.06 17:35:02", "2", "3"],
    //   },
    //   yAxis: {
    //     type: "log",
    //     splitNumber: 10,
    //     // interval: 10,
    //     axisLabel: {
    //       show: true,
    //       color: "#ccc",
    //       margin: 25,
    //       overflow: "truncate",
    //       rotate: 0,
    //       padding: [0, 0, 0, 0],
    //       formatter: function (value: any) {
    //         let v = value === "" ? undefined : value;
    //         return v;
    //       },
    //     },
    //     //坐标轴线
    //     axisLine: {
    //       show: true,
    //       symbol: ["none", "none"],
    //     },
    //     //网格线
    //     splitLine: {
    //       show: true,
    //     },
    //   },
    //   dataZoom: [
    //     {
    //       id: "dataZoomX",
    //       type: "slider",
    //       backgroundColor: "none",
    //       fillerColor: "rgba(18,53,116,1)",
    //       showDataShadow: false, //展示数据走势
    //       showDetail: true,
    //       height: 13,
    //       // handleSize: 40,
    //       right: 80,
    //       left: 160,
    //       bottom: 15,
    //       handleSize: "150%", // 手柄大小
    //       borderColor: "#fff",
    //       // "M0,0 v9.7h5 v-9.7h-5 Z", // 画一个长方形
    //       handleIcon:
    //         "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5M36.9,35.8h-1.3z M27.8,35.8 h-1.3H27L27.8,35.8L27.8,35.8z", // 画一个圆形
    //       handleStyle: {
    //         color: "#fff",
    //         global: true, // 缺省为 false
    //         shadowBlur: 6,
    //         shadowColor: "rgba(123, 154, 204, 1)",
    //         shadowOffsetX: 0, // 阴影偏移x轴多少
    //         shadowOffsetY: 0, // 阴影偏移y轴多少
    //       },
    //       brushStyle: {
    //         borderColor: "rgba(237, 32, 32, 1)",
    //         color: "rgba(234, 28, 28, 1)",
    //       },
    //       emphasis: {
    //         color: "#000",
    //       },
    //     },
    //   ],
    //   series: [
    //     {
    //       name: "CH1",
    //       type: "line",
    //       smooth: true,
    //       animation: false,
    //       symbol: "circle",
    //       symbolSize: 5,
    //       showSymbol: false,
    //       lineStyle: {
    //         color: "#ff461f",
    //         width: 2,
    //       },
    //       areaStyle: {
    //         color: "rgba(0, 0, 0, 0)",
    //         shadowColor: "rgba(0, 0, 0, 0)",
    //       },
    //       itemStyle: {
    //         color: "#ff461f",
    //         borderColor: "rgba(0, 0, 126, 0)",
    //         borderWidth: 20,
    //       },
    //       data: [123, 456, 789],
    //     },
    //     {
    //       name: "CH2",
    //       type: "line",
    //       smooth: true,
    //       animation: false,
    //       symbol: "circle",
    //       symbolSize: 5,
    //       showSymbol: false,
    //       lineStyle: {
    //         color: "#5470C6",
    //         width: 2,
    //       },
    //       areaStyle: {
    //         color: "rgba(0, 0, 0, 0)",
    //         shadowColor: "rgba(0, 0, 0, 0)",
    //       },
    //       itemStyle: {
    //         color: "#5470C6",
    //         borderColor: "rgba(0, 0, 126, 0)",
    //         borderWidth: 12,
    //       },
    //       data: [223, 256, 289],
    //     },
    //     {
    //       name: "CH3",
    //       type: "line",
    //       smooth: true,
    //       animation: false,
    //       symbol: "circle",
    //       symbolSize: 5,
    //       showSymbol: false,
    //       lineStyle: {
    //         color: "#fff",
    //         width: 2,
    //       },
    //       areaStyle: {
    //         color: "rgba(0, 0, 0, 0)",
    //         shadowColor: "rgba(0, 0, 0, 0)",
    //       },
    //       itemStyle: {
    //         color: "red",
    //         borderColor: "rgba(0, 0, 126, 0)",
    //         borderWidth: 12,
    //       },
    //       data: [323, 356, 389],
    //     },
    //     {
    //       name: "CH4",
    //       type: "line",
    //       smooth: true,
    //       animation: false,
    //       symbol: "circle",
    //       symbolSize: 5,
    //       showSymbol: false,
    //       lineStyle: {
    //         color: "#fff",
    //         width: 2,
    //       },
    //       areaStyle: {
    //         color: "rgba(0, 0, 0, 0)",
    //         shadowColor: "rgba(0, 0, 0, 0)",
    //       },
    //       itemStyle: {
    //         color: "red",
    //         borderColor: "rgba(0, 0, 126, 0)",
    //         borderWidth: 12,
    //       },
    //       data: [423, 456, 489],
    //     },
    //     {
    //       name: "CH5",
    //       type: "line",
    //       smooth: true,
    //       animation: false,
    //       symbol: "circle",
    //       symbolSize: 5,
    //       showSymbol: false,
    //       lineStyle: {
    //         color: "#fff",
    //         width: 2,
    //       },
    //       areaStyle: {
    //         color: "rgba(0, 0, 0, 0)",
    //         shadowColor: "rgba(0, 0, 0, 0)",
    //       },
    //       itemStyle: {
    //         color: "red",
    //         borderColor: "rgba(0, 0, 126, 0)",
    //         borderWidth: 12,
    //       },
    //       data: [523, 556, 589],
    //     },
    //     {
    //       name: "CH6",
    //       type: "line",
    //       smooth: true,
    //       animation: false,
    //       symbol: "circle",
    //       symbolSize: 5,
    //       showSymbol: false,
    //       lineStyle: {
    //         color: "#fff",
    //         width: 2,
    //       },
    //       areaStyle: {
    //         color: "rgba(0, 0, 0, 0)",
    //         shadowColor: "rgba(0, 0, 0, 0)",
    //       },
    //       itemStyle: {
    //         color: "red",
    //         borderColor: "rgba(0, 0, 126, 0)",
    //         borderWidth: 12,
    //       },
    //       data: [623, 656, 689],
    //     },
    //   ],
    // };
  },
})
</script>
