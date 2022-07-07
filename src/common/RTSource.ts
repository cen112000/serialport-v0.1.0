const IconNet = {
    Path0: require('../assets/icon/net_ok.png'),
    Path1: require('../assets/icon/net_err.png'),
}
  //连接方式。
const IconConnectWay ={
    Path0: require('../assets/icon/unknow.png'),
    Path1: require('../assets/icon/serialport.png'),
    Path2: require('../assets/icon/net.png'),
}
  //连接状态。0:未知。1: ok。2：err。
const  IconConnectStatus = {
    Path0: require('../assets/icon/unknow.png'),
    Path1: require('../assets/icon/ok.png'),
    Path2: require('../assets/icon/err.png'),
}
const  IconAutoRead = {
  Path0: require('../assets/icon/auto.png'),
  Path1: require('../assets/icon/auto.png'),

}
  //标准机状态。
const IconDeviceStatus = {
    Path0: require('../assets/icon/unknow.png'),
    Path1: require('../assets/icon/run.png'),
    Path2: require('../assets/icon/stop.png'),
}
  //标准机状态。
const IconSensorStatus = {
    Path0: require('../assets/icon/unknow.png'),
    Path1: require('../assets/icon/ok1.png'),
    Path2: require('../assets/icon/data_err.png'),
    Path3: require('../assets/icon/sensor_err5.png'),
}
  //测试机1状态。
const IconTest1Status = {
    Path0: require('../assets/icon/unknow.png'),
    Path1: require('../assets/icon/run.png'),
    Path2: require('../assets/icon/stop.png'),

}
  //测试机1状态。
const IconTest1SensorStatus = {
    Path0: require('../assets/icon/unknow.png'),
    Path1: require('../assets/icon/ok1.png'),
    Path2: require('../assets/icon/data_err.png'),
    Path3: require('../assets/icon/sensor_err5.png'),
   
}
  //测试机2状态。
const IconTest2Status = {
    Path0: require('../assets/icon/unknow.png'),
    Path1: require('../assets/icon/run.png'),
    Path2: require('../assets/icon/stop.png'),

}
const IconTest2SensorStatus = {
    Path0: require('../assets/icon/unknow.png'),
    Path1: require('../assets/icon/ok1.png'),
    Path2: require('../assets/icon/data_err.png'),
    Path3: require('../assets/icon/sensor_err5.png'),
}
const IconSerialPort2  = require('../assets/icon/serialport2.png')
const IconNet2  = require('../assets/icon/net2.png') 
const IconBaudrate = require('../assets/icon/thunder.png')
const IconUnit  = require('../assets/icon/unit.png') 
const IconTime = require('../assets/icon/time.png')

//读取方式：自动，手动。
const ListBTNReadWay =[
  {
    title: '自动',
    select: true,
  },
  {
    title: '手动',
    select: false,
  },
]
const ListConnectContentBTN =  [
  {
    title: '串口',
    select: false,
  },
  {
    title: 'TCP',
    select: false,
  },
]
const TableList =  [
    {
      text: '标准机',
      tNone: false,
      tLeft: false,
      active: false
    },
    {
      text: '2号板',
      tNone: false,
      tLeft: false,
      active: false
    },
    {
      text: '3号板',
      tNone: false,
      tLeft: false,
      active: false
    },
    {
      text: '4号板',
      tNone: true,
      tLeft: false,
      active: false
    },
    {
      text: '5号板',
      tNone: true,
      tLeft: true,
      active: false
    },
    {
      text: '6号板',
      tNone: true,
      tLeft: true,
      active: false
    },
    {
      text: '扩展',
      tNone: true,
      tLeft: true,
      active: false
    }
]
let ColumnSpace:boolean = true
export { 
    IconNet, 
    IconConnectWay,
    IconConnectStatus, 
    IconAutoRead,
    IconDeviceStatus,
    IconSensorStatus,
    ListBTNReadWay,
    ListConnectContentBTN,
    TableList,
    ColumnSpace,
    IconSerialPort2,
    IconNet2,
    IconBaudrate,
    IconUnit,
    IconTime,
}