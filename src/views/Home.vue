<template>
  <div class="home">
    <!-- <canvas id="canvas" class="particle"></canvas> -->
    <div class="row1">
      <!--连接-->
      <div class="con-1 animate__animated animate__fadeIn">
        <span class="local-text">串口连接</span>
        <div class="sp-box">
          <span class="sp-icon con-sp">串口号</span>
          <a-cascader
            class="rt-combox rt-combox-smx"
            :options="SerialPortList"
            :value="SerialPortSelect"
            @change="SerialPortChange"
          ></a-cascader>
        </div>
        <div class="sp-box">
          <span class="sp-icon con-bd">波特率</span>
          <a-cascader
            class="rt-combox rt-combox-smx"
            :options="BaudRateList"
            :value="BaudRateSelect"
            @change="BaudRateChange"
          ></a-cascader>
        </div>
        <button
          class="rt-custom-btn rt-btn-16"
          style="width: 1.5rem; margin-top: 0.2rem;"
          @click.stop="searchSerialPort"
        >
          搜索串口
        </button>
        <button
          v-if="!SPConnectStatus"
          class="rt-custom-btn rt-btn-16 rt-btn-3"
          style="width: 1.5rem; margin-top: 0.2rem;"
          @click.stop="openSerialPort"
        >
          打开串口
        </button>
        <button
          v-else
          class="rt-custom-btn rt-btn-16 rt-btn-17"
          style="width: 1.5rem; margin-top: 0.2rem;"
          @click.stop="closeSerialPort"
        >
          关闭串口
        </button>
      </div>
      <div class="con-2 animate__animated animate__fadeInDown">
        <div class="msg-1">
          <span class="value-text">数据&nbsp;&nbsp;{{ DataTotal }}</span>
          <span class="value-text res-text">当前&nbsp;&nbsp;{{ ResponseDataIndex }}</span>
          <!-- <span class="value-text">CH3&nbsp;&nbsp;{{ TestValue }}</span> -->
        </div>
        <div class="msg-2">
          <!-- <div class="total">数据数:&nbsp;&nbsp;{{ DataTotal }}</div> -->
          <div class="circle-1">{{ DeviceType }}</div>
          <!-- <div class="temp"></div>
          <div class="humi"></div> -->
        </div>
        <div class="msg-1">
          <span class="value-text">通道类型&nbsp;&nbsp;{{ ChannelType }}</span>
          <span class="value-text res-text"></span>
          
        </div>
      </div>
      <div class="con-3 animate__animated animate__fadeIn">
        <a-tooltip
          placement="bottom"
          title="读取中勿拔串口"
          color="volcano"
          :get-popup-container="getPopupContainer"
        >
          <button
            class="rt-custom-btn rt-btn-16 rt-btn-2 local-btn"
            :disabled="BTNDisabled"
            @click.stop="btnReadData"
          >
            读取数据
          </button>
        </a-tooltip>
        
        <a-tooltip
          placement="bottom"
          title="数据数>10,无效"
          color="volcano"
          :get-popup-container="getPopupContainer"
        >
          <button
            class="rt-custom-btn rt-btn-16 rt-btn-5 local-btn"
            :disabled="BTNDisabled"
            @click.stop="btnDeleteData"
          >
            删除数据
          </button>
        </a-tooltip>
        <a-tooltip
          placement="bottom"
          title="清空显示-不删除"
          color="volcano"
          
          :get-popup-container="getPopupContainer"
        >
          <button
            class="rt-custom-btn rt-btn-16 rt-btn-7 local-btn"
            @click.stop="btnClearTableData"
          >
            表格清空
          </button>
        </a-tooltip>
        <a-tooltip
          placement="bottom"
          title="显示表格"
          color="volcano"
          
          :get-popup-container="getPopupContainer"
        >
          <button
            class="rt-custom-btn rt-btn-16 rt-btn-17 local-btn"
            @click.stop="btnShowTableData"
          >
            表格显示
          </button>
        </a-tooltip>

        <button
          class="rt-custom-btn rt-btn-16 rt-btn-12 local-btn"
          @click.stop="btnExportData"
        >
          数据导出
        </button>
        <button
            class="rt-custom-btn rt-btn-16 my-btn-10 local-btn"
            @click.stop="btnUploadData"
          >
            数据上传
          </button>        
      </div>
    </div>
    <div class="row2 animate__animated animate__fadeIn">
      <vxe-table
        border
        round
        show-overflow
        ref="xTable1"
        :height="TableHight"
        :column-config="{resizable: true}"
        :row-config="{ isHover: false }"
        :export-config="tableExport"
        :checkbox-config="{
          checkField: 'checked',
          checkMethod: tableCheckMethod
        }"
        :loading="DataIsLoading"
        show-header-overflow="tooltip"
        :scroll-y="{
          enabled: true,
          gt: 10,
          onSize: 30,
        }"

        class="local-table"
      >
        <vxe-column type="checkbox" width="50" fixed="left"></vxe-column>
        <vxe-column type="seq" title="表格序号" align="center" width="80"></vxe-column>
        <vxe-column field="Location" title="位置" align="center" width="50"></vxe-column>
        <vxe-column field="CH1Data" :title="TableConfig.title[0]" min-width="80"></vxe-column>
        <vxe-column field="CH2Data" :title="TableConfig.title[1]" min-width="80"></vxe-column>
        <vxe-column field="CH3Data" :title="TableConfig.title[2]" min-width="80"></vxe-column>
        <vxe-column field="CH4Data" :title="TableConfig.title[3]" min-width="80"></vxe-column>
        <vxe-column field="CH5Data" :title="TableConfig.title[4]" min-width="80"></vxe-column>
        <vxe-column field="CH6Data" :title="TableConfig.title[5]" min-width="80"></vxe-column>
        <vxe-column field="SampTotal" title="次数" align="center"  width="50"></vxe-column>
        <vxe-column field="SampTime" title="采样时间" align="center" min-width="80"></vxe-column>
        <vxe-column field="UnitModel" title="模式" min-width="100"></vxe-column>
        <vxe-column field="Temp" title="温度" align="center" min-width="60"></vxe-column>
        <vxe-column field="Humi" title="湿度" align="center" min-width="60"></vxe-column>
        <vxe-column field="CreateTime" title="时间" min-width="140"></vxe-column>
      </vxe-table>
      <!--遮罩-->

      <div class="to-top" @click.stop="backToTop"></div>
      <div class="to-bottom" @click.stop="backToBottom"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import {useStore} from 'vuex'
// import { particlesInit } from "../static/particleInit";
//ant组件。
import {
  Cascader,
  // Input,
  // InputNumber,
  // Radio,
  // Select,
  message,
  Tooltip,
} from "ant-design-vue";

import { searchSerialPort as findSP, RTDevice } from "../common/RTDevice";
import { parseData,delay } from "../static/RTLocal";
//VXE表格。1111
import { VxeTableInstance, VxeTablePropTypes } from 'vxe-table'
import XEUtils from "xe-utils";
export default defineComponent({
  name: "Home",
  components: {
    ACascader: Cascader,
    ATooltip: Tooltip,
  },
  setup() {
    //
    const store = useStore()

    let SerialPortList: Ref<any[]> = ref([]);
    let SerialPortSelect: Ref<string[]> = ref([]);
    let SerialPortChange = (e: any) => {
      if (!e) {
        SerialPortSelect.value = [];
        return;
      }
      SerialPortSelect.value = e;
    };
    let BaudRateList = [
      {
        label: "115200",
        value: "115200",
        isLeaf: true,
      },
      // {
      //   label: "9600",
      //   value: "9600",
      //   isLeaf: true,
      // },
    ];
    let BaudRateSelect: Ref<string[]> = ref(["115200"]);
    let SPConnectStatus = ref(false)
    //设备对象。
    let RTD = ref({} as RTDevice);
    //Tooltip提示框。
    const getPopupContainer = (trigger: HTMLElement) => {
      return trigger.parentElement;
    };

    const xTable1 = ref({} as VxeTableInstance);
    let DataList = ref([{
      DataIndex: 0,
      Location: '',
      CH1Data: '',
      CH2Data: '',
      CH3Data: '',
      CH4Data: '',
      CH5Data: '',
      CH6Data: '',
      SampTotal: 1,
      SampTime: '',
      UnitModel: '',
      Temp: '',
      Humi: '',
      CreateTime: '',
      BeenRemove: false,
    }])
    //
    let tableExport =  {
      // // 默认选中类型
      // type: 'xlsx',
      // // 自定义类型
      // types: ['xlsx', 'csv', 'html', 'xml', 'txt']
    } as VxeTablePropTypes.ExpandConfig

    //表格标题。
    let TableConfig = ref({
      title: ['CH1','CH2','CH3','CH4','CH5','CH6']
    })
    let FirstSizeArr = ref(['','','','','',''])
    return {
      //
      store,
      SerialPortList,
      SerialPortSelect,
      BaudRateList,
      BaudRateSelect,
      SerialPortChange,
      SPConnectStatus,
      RTD,
      getPopupContainer,
      //表格数据。
      xTable1,
      tableExport,
      //表格数据列表。
      DataList,
      //表格
      TableConfig,
      FirstSizeArr,
    };
  },
  data() {
    return {
      
      DeviceID: "",
      Temp: "--",
      Humi: "--",
      TestValue: "123,456,789",
      
      TableHight: 500,
      ShowDataLoadingMask: false,

      //通道类型。
      ChannelType: '',
      //数据条数。
      DataTotal: 0,
      //数据加载中
      DataIsLoading: false,
      //数据最大总数。
      DataMaxLen: 2000,
      //要删除的数据总数。
      DataDeleteTotal: 0,
      //最后需要删除的数据的下标。
      LastDeleteIndex: 0,
      //
      ActionBTNLock: false,
      ClearText: '清空图表',//清空图表，显示图表
      //读数据应答
      ResponseFlag: false,
      ResponseDataIndex: 0,
    };
  },
  computed:{
    BTNDisabled() {
      if(this.SPConnectStatus) {
        return false
      }
      return true
    },
    DeviceType() {
      let t:string = this.DeviceID.substring(0,4)
      let devicetype = '设备类型'
      switch(t) {
        case "CW1D":
          devicetype = 'HPC100'
        break
        case "CW2D":
          devicetype = 'HPC200'
        break
        case "CW3D":
          devicetype = 'HPC300'
        break
        case "CW4D":
          devicetype = 'HPC400'
        break
        case "CW5D":
          devicetype = 'HPC500'
        break
        case "CW6D":
          devicetype = 'HPC600'
        break
      }
      return devicetype
    },
  },
  mounted() {
    // particlesInit();
    //表格数据初始化。
    this.tableDataInit()
    //搜索串口。
    this.searchSerialPort()
    
    //监听窗口。
    this.watchResize()
  },
  methods: {
    //表格初始化.
    tableDataInit() {
      this.DataList = []
    },
    //搜索串口。
    async searchSerialPort() {
      this.SerialPortList = await findSP(this.SerialPortList);
      if (this.SerialPortList.length === 0) {
        return;
      }
      let spl = parseData(this.SerialPortList);
      this.SerialPortSelect = [spl[0]?.value];
    },
    //波特率改动。
    BaudRateChange(e: any = []) {
      if (e.length === 0) {
        this.BaudRateSelect = ['115200'];
        return;
      }
      this.BaudRateSelect = e;
    },
    //ID转换为设备类型。
    idToDeviceType() {
      let t:string = this.DeviceID.substring(0,4)
      let devicetype = '设备类型'
      switch(t) {
        case "CW1D":
          devicetype = 'HPC100'
        break
        case "CW2D":
          devicetype = 'HPC200'
        break
        case "CW3D":
          devicetype = 'HPC300'
        break
        case "CW4D":
          devicetype = 'HPC400'
        break
        case "CW5D":
          devicetype = 'HPC500'
        break
        case "CW6D":
          devicetype = 'HPC600'
        break
      }
      return devicetype
    },
    //打开串口。
    async openSerialPort() {
      let sp = parseData(this.SerialPortSelect);
      let bd = parseData(this.BaudRateSelect);
      if (sp.length === 0 || bd.length === 0) {
        message.error("输入正确的串口号/波特率",1);
        return;
      }
      let com = sp[0];
      let baudrate = parseInt(bd[0]);
      
      this.SPConnectStatus = false

      this.RTD = new RTDevice()
      this.RTD.openSerialPort(
        com,
        baudrate
      ).then(async ()=>{
        message.success('串口打开成功',1)
        this.SPConnectStatus = true;

        //延时
        await delay(200)
        //读设备信息。
        this.RTD?.hdReadID((response: any) => {
          this.DeviceID = response?.ID
          this.store.dispatch('actDeviceType',this.idToDeviceType())
        })
        //读数据总数。
        await delay(200)
        // this.readDeviceDataLen()
        this.RTD?.hdReadDataTotal((response:any) => {
          this.DataTotal = response?.Total || 0
        })
      }).catch(()=>{
        message.error("串口打开失败",1);
      })
    },
    readDeviceDataLen() {
      
    },
    //关闭串口。
    async closeSerialPort() {
      if(this.SPConnectStatus) {
        this.SPConnectStatus = false;
        await delay(200)
        this.RTD?.closeSerialPort()
        this.RTD = null as any
        message.info('关闭串口',1)
      }
      this.DataTotal = 0
      this.ResponseDataIndex = 0
      this.DataIsLoading = false
    },
    dataCover(devicetype: string = 'HPC100',data:string[] = []) {
      let local:string[] = []
      for(let i = 0;i < 6;i++) {
        local.push('')
      }
      switch(devicetype) {
        case 'HPC100':
          local[0] = data[0]
        break
        case 'HPC200':
          local[0] = data[0]
          local[1] = data[1]
        break
        case 'HPC300':
          local[0] = data[0]
          local[1] = data[1]
          local[2] = data[2]
        break
        case 'HPC400':
          local[0] = data[0]
          local[1] = data[1]
          local[2] = data[2]
          local[3] = data[3]
        break
        case 'HPC500':
          local[0] = data[0]
          local[1] = data[1]
          local[2] = data[2]
          local[3] = data[3]
          local[4] = data[4]
        break
        case 'HPC600':
          local[0] = data[0]
          local[1] = data[1]
          local[2] = data[2]
          local[3] = data[3]
          local[4] = data[4]
          local[5] = data[5]
        break
      }
      return local
    },
    //读数据但是无应答
    readDataNoResPonse() {
      setTimeout(() => {
        //设备里数据数不为0
        if(this.DataTotal !== 0) {
          if(this.ResponseFlag) {
            return
          }
          this.DataIsLoading = false
        }
      },2000)
    },
    //串口读取数据
    async btnReadData() {
      if(this.DataIsLoading ) {
        message.error("正在读取/重加载数据中",1)
        return
      }
      await delay(200)
      //先读取设备数据
      this.RTD?.hdReadDataTotal((response:any) => {
          this.DataTotal = response?.Total || 0
      })
      await delay(500)
      if(this.DataTotal === 0) {
        message.success('当前设备数据总数为0',1)
        return
      }
      this.DataList =  []
      this.xTable1.loadData(XEUtils.clone(this.DataList, false));
      this.DataIsLoading = true
      this.ResponseFlag = false
      this.ResponseDataIndex = 0
      message.info('读取数据属于耗时操作，请耐心等待',1)
      await delay(500)
      this.readDataNoResPonse()
      let UploadSizeArr: string[] = []
      this.FirstSizeArr = []
      this.RTD?.hdReadData((response: any) => {
        this.ResponseFlag = true
        let {
          CreateTime,
          UnitModel,
          TempUnit,
          SampTime,
          SampTotal,
          Temp,
          Humi,
          SizeArr,//string[]
          SupportFloat,
          ChannelType,
          DataArr,//string[]
          DataIndex,
          Location
        } = response
        //
        this.ChannelType = ChannelType
        this.ResponseDataIndex = DataIndex
        this.ResponseDataIndex === 1 && this.store.dispatch('actSupportFloat',SupportFloat)

        //记录当前粒径。
        if(this.ResponseDataIndex === 1) {
          
          for(let i = 0; i < 6; i++) {
            this.FirstSizeArr[i] = SizeArr[i]
          }
          // console.log('粒径渲染 = ',this.FirstSizeArr)
          UploadSizeArr = this.FirstSizeArr
          switch(this.DeviceType) {
            case "HPC100": 
              this.TableConfig.title[0] = this.DeviceType
              this.TableConfig.title[1] = ''
              this.TableConfig.title[2] = ''
              this.TableConfig.title[3] = ''
              this.TableConfig.title[4] = ''
              this.TableConfig.title[5] = ''
            break
            case "HPC200": 
              this.TableConfig.title[0] = SizeArr[0]
              this.TableConfig.title[1] = SizeArr[1]
              this.TableConfig.title[2] = ''
              this.TableConfig.title[3] = ''
              this.TableConfig.title[4] = ''
              this.TableConfig.title[5] = ''
            break
            case "HPC300": 
              this.TableConfig.title[0] = SizeArr[0]
              this.TableConfig.title[1] = SizeArr[1]
              this.TableConfig.title[2] = SizeArr[2]
              this.TableConfig.title[3] = ''
              this.TableConfig.title[4] = ''
              this.TableConfig.title[5] = ''
            break
            case "HPC400": 
              this.TableConfig.title[0] = SizeArr[0]
              this.TableConfig.title[1] = SizeArr[1]
              this.TableConfig.title[2] = SizeArr[2]
              this.TableConfig.title[3] = SizeArr[3]
              this.TableConfig.title[4] = ''
              this.TableConfig.title[5] = ''
            break
            case "HPC500": 
              this.TableConfig.title[0] = SizeArr[0]
              this.TableConfig.title[1] = SizeArr[1]
              this.TableConfig.title[2] = SizeArr[2]
              this.TableConfig.title[3] = SizeArr[3]
              this.TableConfig.title[4] = SizeArr[4]
              this.TableConfig.title[5] = ''
            break
            case "HPC600": 
              this.TableConfig.title[0] = SizeArr[0]
              this.TableConfig.title[1] = SizeArr[1]
              this.TableConfig.title[2] = SizeArr[2]
              this.TableConfig.title[3] = SizeArr[3]
              this.TableConfig.title[4] = SizeArr[4]
              this.TableConfig.title[5] = SizeArr[5]
            break
          }
        }else {
          let firstsa: string[] = []
          let currentSizeArr: string[] = SizeArr

          for(let i = 0; i < 6; i++) { 
            firstsa[i] = this.FirstSizeArr[i]
          }
          //找出粒径中不同。
          let diffArr =  this.getArrDiff(firstsa,currentSizeArr)

          if(diffArr.length !== 0) {
            //当前第一个粒径，更新。
            for(let i = 0; i < 6; i++) { 
              this.FirstSizeArr[i] = currentSizeArr[i]
            }  
            UploadSizeArr.concat(this.FirstSizeArr)
            let newline = {
              DataIndex,
              Location,
              CH1Data: '',
              CH2Data: '',
              CH3Data: '',
              CH4Data: '',
              CH5Data: '',
              CH6Data: '',
              SampTotal,
              SampTime,
              UnitModel,
              Temp: Temp,
              Humi: Humi,
              CreateTime,
              ChannelType,
              BeenRemove: false,
            }
            newline.DataIndex = 9999
            newline.Location = '--'
            newline.CH1Data = currentSizeArr[0]
            newline.CH2Data = currentSizeArr[1]
            newline.CH3Data = currentSizeArr[2]
            newline.CH4Data = currentSizeArr[3]
            newline.CH5Data = currentSizeArr[4]
            newline.CH6Data = currentSizeArr[5]
            newline.SampTotal = ''
            newline.SampTime = ''
            newline.UnitModel = ''
            newline.Temp = ''
            newline.Humi = ''
            newline.CreateTime = ''
            newline.ChannelType = ''

            //根据设备类型，选择设置剩余通道 = ''。
            switch(this.DeviceType) {
              case "HPC100": 
                //数据位设置。
                newline.CH2Data = ''
                newline.CH3Data = ''
                newline.CH4Data = ''
                newline.CH5Data = ''
                newline.CH6Data = ''
              break
              case "HPC200": 
                newline.CH3Data = ''
                newline.CH4Data = ''
                newline.CH5Data = ''
                newline.CH6Data = ''
              break
              case "HPC300": 
                newline.CH4Data = ''
                newline.CH5Data = ''
                newline.CH6Data = ''
              break
              case "HPC400": 
                newline.CH5Data = ''
                newline.CH6Data = ''
              break
              case "HPC500": 
                newline.CH6Data = ''
              break
              case "HPC600": 

              break
            }

            //
            this.DataList.push(newline)
          }

        }

        let da = this.dataCover(this.DeviceType,DataArr)
        let CH1Data = da[0]
        let CH2Data = da[1]
        let CH3Data = da[2]
        let CH4Data = da[3]
        let CH5Data = da[4]
        let CH6Data = da[5]

        //根据设备类型，选择设置剩余通道 = ''。
      //  console.log('first size = ',this.FirstSizeArr,this.ResponseDataIndex)
        let ditem = {
          DataIndex,
          Location,
          CH1Data,
          CH2Data,
          CH3Data,
          CH4Data,
          CH5Data,
          CH6Data,
          SampTotal,
          SampTime,
          UnitModel,
          Temp: Temp,
          Humi: Humi,
          CreateTime,
          ChannelType,
          BeenRemove: false,
          CH1BelongWho: this.FirstSizeArr[0],//通道1的数据属于什么粒径。
          CH2BelongWho: this.FirstSizeArr[1],
          CH3BelongWho: this.FirstSizeArr[2],
          CH4BelongWho: this.FirstSizeArr[3],
          CH5BelongWho: this.FirstSizeArr[4],
          CH6BelongWho: this.FirstSizeArr[5],
        }
        // console.log('ditem = ',ditem)
        this.DataList.push(ditem)
        if(DataIndex === this.DataTotal) {
          //粒径去重。
          // let usa = UploadSizeArr.filter((v, i) => {
          //   return v !== '0.0'
          // })
          let localsizearr = [...new Set(UploadSizeArr)]
          this.store.dispatch('ActLocalDeviceSizeArr',localsizearr)
          this.xTable1.loadData(XEUtils.clone(this.DataList, false)).then(() => {
            this.DataIsLoading = false
            //滑动到最低。
            this.backToBottom()
          });
        }
      })
    },
    //删除数据。
    async btnDeleteData() {
      if(this.ActionBTNLock) {
        message.error("操作过快",1)
        return
      }
      if(this.DataIsLoading) {
        message.error("读取/重加载数据中，操作无效",1)
        return
      }
      this.ActionBTNLock = true
      //获取选中的数据。超过10条提示。
      const $table = this.xTable1
      //选中的数据。
      let selectRecords = $table.getCheckboxRecords()

      //筛选DataIndex !== 9999
      selectRecords = selectRecords.filter((v,i) => {
        return v.DataIndex !== 9999
      })
      // console.log('数据选中2 = ',selectRecords)
      // return
      let selectlen = selectRecords.length
      if(selectlen > 10) {
        message.error("选中数量超过10条时,不建议用上位机删除功能")
        this.ActionBTNLock = false
        return
      }
      if(selectlen === 0) {
        message.error("未选中数据",1)
        this.ActionBTNLock = false
        return
      }
      //
      let DataIndexArr:number[] = []
      selectRecords.forEach(item => {
        DataIndexArr.push(item.DataIndex)
      })
      this.DataDeleteTotal = DataIndexArr.length
   
      //将数组排序。降序，从后往前删除。
      DataIndexArr.sort((a:number,b:number) => {
        return b - a //降序
      })
      this.LastDeleteIndex = DataIndexArr[DataIndexArr.length - 1]
      // console.log('要删除的数量 = ',this.DataDeleteTotal,this.LastDeleteIndex,DataIndexArr)
      let spt = this.BaudRateSelect[0] === '115200'  ? 1000 : 2000
      message.success('开始删除数据',1)
      //表格重新加载数据。
      this.DataIsLoading = true
      await delay(1000)
      this.RTD?.hdDeleteData(spt,DataIndexArr,(response: any) => {
        //标记为移除
        this.DataList.findIndex((item,index) => {
          if(item?.DataIndex === response.DataIndex) {
              item.BeenRemove = true
          }
        })
        if(response?.DataIndex === this.LastDeleteIndex) {
          this.handleDeleteFinish(0,this.DataDeleteTotal)
        }
      })
      await delay(2000)
      this.ActionBTNLock = false
    },
    //表格数据删除完成。
    async handleDeleteFinish( DataIndex: number = 0, DataDeleteTotal:number = 0 ) {
      //信息提示。
      message.success('删除数据完成',1)
      //剩余数量
      let remaintotal = this.DataTotal - DataDeleteTotal
      this.DataTotal = remaintotal <= 0 ? 0 : remaintotal
      this.ResponseDataIndex = this.DataTotal
      //将被标记为移除的数据删除。
      this.DataList = this.DataList.filter((v, i) =>{
        return v.BeenRemove === false
      })

      await delay(500)
      let newDataIndex = 0
      this.DataList.forEach((item,index) => {
         if(item.DataIndex !== 9999) {
          item.DataIndex = newDataIndex++
         }
      })
 
      if(this.DataTotal === 0 ) {
        this.DataList = []
      }
      this.xTable1.loadData(XEUtils.clone(this.DataList, false)).then(() => {
        this.DataIsLoading = false
        //将记录的删除记录数置0
      });
    },
    //清空图表。
    async btnClearTableData() {
      if(this.DataIsLoading) {
        message.error("读取/重加载数据中，操作无效",1)
        return
      }
      if(this.ActionBTNLock) {
        message.error("操作过快",1)
        return
      }
      this.ActionBTNLock = true

      await delay(100)

      this.xTable1.loadData(XEUtils.clone([], false)).then(() => {
          this.ActionBTNLock = false
      });
    },
    async btnShowTableData() {
      if(this.DataIsLoading) {
        message.error("读取/重加载数据中，操作无效",1)
        return
      }
      if(this.ActionBTNLock) {
        message.error("操作过快",1)
        return
      }
      this.ActionBTNLock = true

      await delay(100)

      this.xTable1.loadData(XEUtils.clone(this.DataList, false)).then(() => {
        this.ActionBTNLock = false
      });
    },
    //数据导出。
    async btnExportData() {
      if(this.DataIsLoading) {
        message.error("表格正在加载数据,无法导出",1)
        return
      }
      if(this.DataList.length === 0) {
        message.error("表格数据为空，无法导出")
        return
      } 
      if(this.ClearText === '图表显示') {
        message.error(`请点击${this.ClearText}按钮切换显示`)
        return
      }
      this.xTable1.openExport({ 
        type: 'csv',
        columnFilterMethod ({ column,$columnIndex }) {
          return !($columnIndex === 0 )
          // return ['Location','CH1Data','CH2Data','CH3Data','CH4Data','CH5Data','CH6Data','SampTotal','SampTime','UnitModel','Temp','Humi','CreateTime'].includes(column.field)
        },
        message: false,
        afterExportMethod({options}) {
          message.success('数据装载完毕',1)
        },
      })
      await delay(50)
      let checklabelarr = document.getElementsByClassName('vxe-checkbox--label')
      let item = checklabelarr.item(1) as Element
      item.innerHTML = '#'
    },
    getArrDiff(arr1:any[] = [],arr2: any[] = []) {
      return arr1.concat(arr2).filter((v, i, arr) => {
       return arr.indexOf(v) === arr.lastIndexOf(v);
      });
    },
    //数据上传。
    async btnUploadData() {

      if(this.DataIsLoading) {
        message.error("加载数据中,操作无效",1)
        return
      }
      if(this.DataList.length === 0) {
        message.error('表格数据为空，无法上传',1)
        return
      }
      if(this.ActionBTNLock) {
        message.error('操作过快',1)
        return
      }
      this.ActionBTNLock = true
      //选中的数据。
      let selectRecords = this.xTable1.getCheckboxRecords()
      selectRecords = selectRecords.filter((v, i) =>{
        return v.DataIndex !== 9999
      })
      let selectlen = selectRecords.length
      if(selectlen === 0) {
        message.error("未选中数据",1)
        this.ActionBTNLock = false
        return
      }
      this.store.dispatch('actUploadData',selectRecords)
      message.success('数据上传',1)
      await delay(2500)
      this.ActionBTNLock = false
    },
    //返回顶部。
    backToTop() {
      this.xTable1.scrollTo(0,0)
    },
    //返回底部。
    backToBottom() {
      this.xTable1.scrollTo(0,this.DataMaxLen * 50)
    },
    setTableSize() {
      let app = document.getElementById('app')
        let h = app?.clientHeight || 768
        if(h <= 768) {
          this.TableHight = 400
        }else if(h > 768 && h <= 800) {
          this.TableHight = 420
        }else if(h >= 800 && h < 900) {
          this.TableHight = 450
        }else {
          this.TableHight = 550
        }
    },
    //监听窗口变化。
    watchResize() {
      //vxe-table初始化。
      this.setTableSize()
      window.addEventListener('resize',() => {
        this.setTableSize()
      })
    },
    //
    mouseEnterHandle(e:any) {
     
    },
    tableCheckMethod({row = null as any}) {
      if(row.DataIndex === 9999) {
        return false
      }
      return true
    }
  },
});
</script>
<style lang="less" scoped>
.home {
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
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .con-1,
  .con-3 {
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
  .con-3 {
    width: 6rem;
  }
  .con-1 {
    display: flex;

    padding-right: 1.8rem;
    flex-direction: column;
    align-items: flex-end;
  }
  .local-text {
    display: inline-block;
    width: 60%;
    height: 0.4rem;
    margin-left: 0.8rem;
    padding-bottom: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  .sp-box {
    margin-top: 0.1rem;
    width: 6rem;
    display: flex;
    justify-content: flex-end;
    .sp-icon {
      width: 1.5rem;
      height: 0.4rem;
      margin-left: 0.1rem;
      line-height: 0.4rem;
      font-size: 0.2rem;
      text-align: center;
    }
    .con-sp {
      background: url(../assets/icon/serialport2.png) left center no-repeat;
      background-size: 0.3rem 0.3rem;
    }
    .con-bd {
      background: url(../assets/icon/thunder.png) left center no-repeat;
      background-size: 0.3rem 0.3rem;
    }
  }
  .con-2 {
    width: 10rem;
    height: 3.5rem;
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
      position: relative;
    }
    .res-text {
      border: none;
    }
    .msg-2 {
      width: 3rem;
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
      .total {
        width: 2.5rem;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.2rem;
        text-align: center;
        position: absolute;
        left: 50%;
        margin-left: -1.25rem;
        top: 12%;
      }
      .temp {
        width: 1rem;
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
        width: 1rem;
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
    .msg-3 {
    }
  }
  //3
  .con-3 {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .local-btn {
      height: 0.6rem;
      margin-left: 0.38rem;
    }
  }
}
.row2 {
  width: 100%;
  padding-top: 0.1rem;
  padding-left: 0.1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  position:relative;

  :deep(.vxe-table--header-wrapper) {
    background-color: transparent !important;
  }
  :deep(.vxe-table--body-wrapper ,.body--wrapper) {
    background-color: transparent !important;
  }
  :deep(.row--hover) {
    background-color: transparent !important;
  }
  :deep(.vxe-modal--title) {
    color: #222;
  }
  :deep(.vxe-export--panel-column-option) {
    background-color: rgba(0, 0, 0, 0.2);
  }
  :deep(.vxe-export--panel-column-body) {
    background-color: rgba(0, 0, 0, 0.2);
  }

  :deep(.vxe-checkbox--label) {
    color: #000;
  }
  :deep(.vxe-button) {
    background-color: #409EFF;
  }
  :deep(.vxe-select-option) {
    color: #222;
  }
  .local-table {
    width: 92%;
  }
  .to-top {
    width: 0.8rem;
    height: 0.8rem;
    background: url('../assets/icon/act-back.png') center center no-repeat;
    background-size: cover;

    position: absolute;
    right: 1%;
    top:10%;

  }
  .to-bottom {
    width: 0.8rem;
    height: 0.8rem;
    background: url('../assets/icon/act-back.png') center center no-repeat;
    background-size: cover;
    transform: rotateZ(180deg);
    position: absolute;
    right: 1%;
    bottom: 10%;
  }
  .to-top:hover,.to-bottom:hover {
    opacity: 0.8;
  }
  .to-top:active {
    transform: scale(1.1);
  }
  .to-bottom:active {
    transform: scale(1.1) rotateZ(180deg);
  }
  //遮罩。
  .row2-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
  }
}


</style>
