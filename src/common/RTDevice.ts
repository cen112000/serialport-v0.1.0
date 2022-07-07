import { SerialPort } from "serialport"
import { ByteLengthParser } from "@serialport/parser-byte-length"

// const { ReadlineParser } = require('@serialport/parser-readline')

// const { PacketLengthParser } = require('@serialport/parser-packet-length')

const { InterByteTimeoutParser } = require('@serialport/parser-inter-byte-timeout')

import { delay, parseData, dec2hex } from "../static/RTLocal"
import {
    HDReadIDCmd,
    HDReadDataTotalCmd,
    HDReadDataCmd,
    HDDeleteDataCmd,
} from "../common/RTCommand"
import { resolveHDID,resolveHDDataTotal,resolveHDData } from "./RTResolve"
//TCP net.socket()类。
const net = window.require("net")
// let Socket = net.Socket()

import { toRaw } from "@vue/reactivity"

const searchSerialPort = async (SerialPortList: any[] = []) => {
    let spl: any = await SerialPort.list()
    //
    if (spl.length === 0) {
        return []
    }
    spl.forEach((splItem: any) => {
        if (splItem.serialNumber) {
            let isExit: number = SerialPortList.findIndex((SPItem: any) => {
                return SPItem.value === splItem.path
            })
            //原先串口不存在，则添加。
            if (isExit === -1) {
                let value: string = splItem.path
                let label: string = splItem.path
                let isLeaf: boolean = true
                let item = {
                    value,
                    label,
                    isLeaf,
                }
                SerialPortList.push(item)
            }
        }
    })
    return SerialPortList
}
class RTDevice {
    //对象已经被创建。
    HasBeenCreated = true

    SPParser1 = null as any
    SPParser2 = null as any
    SP = null as any
    SPDataLen = 0
    ConnectSelected = 0 //连接方式。0:串口。1: TCP

    CBReadData: any = null as any
    CBDeleteData: any = null as any

    CBReadID: any = null as any
    CBReadDataTotal: any = null as any

    constructor() { 
        this.SP = null
        this.SPParser1 = null 
        this.SPParser2 = null

        this.CBReadData = null
        this.CBDeleteData = null

        this.CBReadID = null
        this.CBReadDataTotal = null
    }
    selectConnectWay(way: number = 0) {
        this.ConnectSelected = way
    }
    /**
     * @param path 串口号
     * @param bd 波特率 默认 = 115200
     */
    createSerialPort(path: string, bd: number = 115200) {
        console.log("创建串口")
        this.SP = new SerialPort(
            { path: path, baudRate: bd, autoOpen: false },
            (err: any) => {
                if (err) {
                    console.log("串口创建失败")
                    return
                }
                console.log("串口创建成功")
            }
        )
    }
    /**
     * @description 打开串口
     */
    openSerialPort(path: string, baudRate: number = 115200) {
        return new Promise((res, rej) => {
            this.selectConnectWay(0)
            this.createSerialPort(path, baudRate)
            this.SP?.open((err: any) => {
                if (err) {
                    console.log("串口打开失败")
                    rej({
                        msg: "串口打开失败",
                        errCode: 2,
                    })
                    return
                }
                console.log("串口打开成功")
                res({
                    msg: "串口打开成功",
                    errCode: 0,
                })
            })
        })
    }
    serialPortParser1() {

    }
    serialPortParser2() {
        let byteLen = 128

        if (!this.SP) {
            return
        }
        if (this.SPParser2) {
            return
        }

        this.SPParser2 = this.SP.pipe(new InterByteTimeoutParser({ interval: 20 }))

        // this.SPParser2 = this.SP.pipe(new ReadlineParser({ delimiter: Buffer.from([0x4e]) }))
        // this.SPParser2 = this.SP.pipe(new ByteLengthParser({ length: byteLen }))

        this.SPParser2.on("data", async (data: any) => {
           
            this.responseDataHandler(data)
        })
    }
    responseDataHandler(data: any) {
        
        //读取设备ID
        if(data[0] === 0xff && data[1] === 0x53 && data[2] === 0x03 && data[15] === 0x4e) {
            let res = resolveHDID(data)
            this.CBReadID(res)
        }
        //读取数据总数
        if(data[0] === 0xff && data[1] === 0x53 && data[2] === 0x40 && data[15] === 0x4e) {
            let res = resolveHDDataTotal(data)
            this.CBReadDataTotal(res)
        }
        //读取数据。
        if (data[0] === 0xff && data[1] === 0x53 && data[2] === 0x41 && data[63] === 0x4e) {
            // console.log('parse2 数据应答',data?.length)
            let res = resolveHDData(data)
            this.CBReadData(res)
        }
        //删除数据。
        if (data[0] === 0xff && data[1] === 0x53 && data[2] === 0x42 && data[15] === 0x4e) {
            let res = {
                ActionName: '删除',
                DataIndex: data[4] * (0xff + 1) + data[3]
            }
            this.CBDeleteData(res)
        }
        
    }

    //返回串口状态。
    isSPOpen() {
        return this.SP?.isOpen || false
    }
    /**
     * @description 关闭串口
     */
    closeSerialPort() {
        if(this.SP?.isOpen) {
            this.SP?.close()
        }
        this.SP = null
        this.SPParser1 = null
        this.SPParser2 = null
        console.log("关闭串口")
    }
    serialPortWrite(cmd: number[]) {
        if (!this.SP || !this.SP?.isOpen) {
            return
        }
        this.SP.write(cmd)
        // console.log("串口发送", cmd)
    }
    /**
     * @description 发送函数。TCP时，自动将命令转为Uint8Arr类型。
     * @param cmd 串口时: number[],TCP:Uint8Arr[]。
     * @param parserNum 无效。
     */
    async write(cmd: any, parserNum: number = 0) {
        //串口
        if (this.ConnectSelected === 0) {
            this.serialPortParser2()
            this.serialPortWrite(cmd)
        }
        if (this.ConnectSelected === 1) {
            //TCP发送。
        }
        return true
    }
    /**
     * @description 手持设备读取ID
     */
    hdReadID(cb: any) {
        this.CBReadID = cb

        let cmd = HDReadIDCmd()

        this.write(cmd)
    }
    /**
     * @description 手持设备读取数据总数。
     */
    hdReadDataTotal(cb: any) {
        this.CBReadDataTotal = cb
        let cmd = HDReadDataTotalCmd()
        this.write(cmd)
    }
    /**
     * @description 手持设备读取数据。
     */
    hdReadData(cb: any) {
        this.CBReadData = cb
        let cmd = HDReadDataCmd()
        cmd[3] = 0
        this.write(cmd)
    }
   /**
    * @description 手持设备删除数据。
    * @param dt 命令之间，间隔时间。
    * @param dataindexarr 要删除的数据的下标组成的数组。
    * @param cb 回调函数。
    */
    async hdDeleteData(dt:number = 1000,dataindexarr: number[] = [],cb:any) {
        this.CBDeleteData = cb
        let cmd = HDDeleteDataCmd()
        let len = dataindexarr.length 
        for(let i = 0; i < len; i++) {
            let resolation = 0xff + 1
            cmd[4] = parseInt((dataindexarr[i] / resolation).toString())
            cmd[3] = parseInt((dataindexarr[i] % resolation).toString())
            this.write(cmd)
            // console.log("删除命令 = ",cmd)
            let de = await delay(dt)
        }
    }

    test() {
        console.log("对象测试...")
    }
}
export { searchSerialPort, RTDevice }
