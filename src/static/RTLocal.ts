// const {internalIpV6, internalIpV4} = window.require('internal-ip');

/**
 * @description: 获取当前电脑IP
 * @param none
 */
const getCurrentAddress = async () => {
    // let address: string | undefined = await internalIpV4()
    // return address
};
const getNetStatus = (): number => {
    let netIsOk: number = window.navigator.onLine ? 0 : 1;
    return netIsOk;
};
let parseData = (data: any): any => {
    // console.log('ddddddd = ',typeof data,data)
    if (!data) {
        return undefined;
    }
    return JSON.parse(JSON.stringify(data));
};
/**
 *
 * @param time 单位ms
 * @returns
 */
let delay = (time: number = 1000) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(true);
        }, time);
    });
};
const localTime = () => {
    let today = new Date();
    //年 月 日 星期 时 分 秒
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let second = today.getSeconds();
    let hs: string = "";
    let ms: string = "";
    let ss: string = "";

    hs = hour < 10 ? "0" + hour.toString() : hour.toString();
    ms = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    ss = second < 10 ? "0" + second.toString() : second.toString();

    return hs + ":" + ms + ":" + ss;
};
const isIPCorrect = (input: string): Boolean => {
    let reg =
        /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
    let isRight = reg.test(input);

    return isRight || false;
};

/**
 * @description 数字添加逗号。
 * @param num 输入数字。
 * @returns 
 */
let toThousands = (num:number = 0): string => {
    return num.toString().replace(/\d+/,  (n) => {
        return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    });
}
/**
 * @description 10进制数转为10进制。
 * @param dec 输入的10进制数。
 * @returns 
 */
let dec2hex = (dec:number):string => {
    var result = "0000";
    if      (dec >= 0    && dec <= 15)    { result = "000" + dec.toString(16); }
    else if (dec >= 16   && dec <= 255)   { result = "00"  + dec.toString(16); }
    else if (dec >= 256  && dec <= 4095)  { result = "0"   + dec.toString(16); }
    else if (dec >= 4096 && dec <= 65535) { result =         dec.toString(16); }
    return result
}

class RTNet {
    RTNetStatus = 0
    CBNetListen: any = null as any
    constructor() {
        
    }
    /**
     * @description 网络监听
     */
    netListen(cb: any) {
        this.CBNetListen = cb

        this.addNetEventListener(cb)
        
    }
    addNetEventListener(cb: any) {
        //预加载网络状态。
        this.RTNetStatus = getNetStatus();
        window.addEventListener("online", cb);
        window.addEventListener("offline", cb);
    }
    /**
     * 移除网络监听状态
     */
    removeNetEventListener() {
        window.removeEventListener("online", this.updateNetStatus);
        window.removeEventListener("offline", this.updateNetStatus);
    }
    //网络监听。
    updateNetStatus(e: any) {
    // 网络由异常到正常时触发
        const { type } = e;
        this.RTNetStatus = type === "online" ? 0 : 1;
        let Message = this.RTNetStatus === 0 ? '网络正常' : '网络错误' 
        console.log(Message)
    }
}

export {
    getCurrentAddress,
    getNetStatus,
    parseData,
    delay,
    localTime,
    isIPCorrect,
    toThousands,
    dec2hex,
    RTNet,
};
// 
// xxx.replace(/^\s+|\s+$/g,"") 去掉首尾空格。/\s*/去掉所有空格。