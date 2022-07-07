import {toThousands} from '../static/RTLocal'

let resovleStandardPara = (data: any[]) => {
    let Index = data[126];
    let h1 = 0xff + 1;
    let h2 = 0xffff + 1;
    //地址
    let Address = data[3]
    let strArr = []
    for (let si = 0; si < 12; si++) {
        strArr[si] = data[si + 4]
    }
    //ID
    let ID = String.fromCharCode(...strArr);
    //通道
    let CH = data[32].toString();
    //
    let MeasureTotal = data[23] * h1 + data[22];
    let MeasureTime = data[25] * h1 + data[24];
    let RestTime = data[27] * h1 + data[26];
    //粒径
    let SizeArr: string[] = [];
    for (let i: number = 0; i < 12; i += 2) {
        //高位
        let hs = data[37 + i];
        let h = hs;
        //低位
        let ls = data[36 + i].toString(16);
        let l = ls === "0" ? "00" : ls;

        let sizeItem = parseFloat((parseInt(h + l) / 100).toString())
            .toFixed(1)
            .toString();
        SizeArr.push(sizeItem);
    }
    //电压
    let VoltageArr: string[] = []
    for (let i: number = 0; i < 12; i += 2) {
        let volItem: string = ((data[53 + i] * h1) + data[52 + i]).toString()
        VoltageArr.push(volItem)
    }
    //系数
    let RateArr: number[] = []

    for (let i: number = 0; i < 12; i += 2) {
        let rateItem = data[69 + i] * h1 + data[68 + i]
        RateArr.push(rateItem)
    }
    let res = {
        Index,
        CH,
        SizeArr,
        VoltageArr,
        RateArr,
        MeasureTotal,
        MeasureTime,
        RestTime,
        Address,
        ID,
    };
    return res
};
let resovleStandardData = (data: any) => {

    let h1 = 0xff + 1;
    let h2 = 0xffff + 1;
    let h3 = 0xffffff + 1

    let Index = data[123]

    let SizeArr: string[] = []
    //粒径数组。
    for (let i: number = 0; i < 95; i += 18) {
        //高位
        let hs = data[4 + i]
        let h = hs
        //低位
        let ls = data[3 + i].toString(16)
        let l = ls === '0' ? '00' : ls

        let sizeItem = parseFloat((parseInt(h + l) / 100).toString()).toFixed(1).toString()
        SizeArr.push(sizeItem)
    }
    //粒子数。CUMU:累积。Liter:升。Meter: 立方米。CFM:立方英尺。
    let ValueArr: any = []
    let SizeIndex = 0
    for (let i = 5; i < 111; i += 18) {
        let vItem = {
            Size: SizeArr[SizeIndex++],
            CUMU: data[i + 3] * h3 + data[i + 2] * h2 + data[i + 1] * h1 + data[i],
            Liter: data[i + 7] * h3 + data[i + 6] * h2 + data[i + 5] * h1 + data[i + 4],
            Meter: data[i + 11] * h3 + data[i + 10] * h2 + data[i + 9] * h1 + data[i + 8],
            CFM: data[i + 15] * h3 + data[i + 14] * h2 + data[i + 13] * h1 + data[i + 12]
        }
        ValueArr.push(vItem)
    }
    // //温湿度。
    // //温度 d[111]:温度低位 d[112]:温度高位
    // let tl = data[111], th = data[112]
    // let temp: number = 0
    // if (th < 0x80) {
    //     let tInts: string = th.toString() + '.' + tl.toString()
    //     temp = 0 + + parseFloat(tInts).toFixed(1)
    //     // temp  = 0
    // }
    // if (th === 0x80) {
    //     temp = 996
    // }
    // //温度为负 待修正。
    // if (th > 0x80) {
    //     let tints1: string = ((256 - th).toString() + '.' + tl.toString()).toString()
    //     temp = 0 - +parseFloat(tints1).toFixed(1)
    //     // temp = 0
    // }
    // //湿度
    // let hl = data[113], hh = data[114]
    // // console.log(`温湿度 ${tl} ${th} ${hl} ${hh}`)
    // let humi: number = 0
    // if (hh < 0x80) {
    //     humi = hl
    // }
    // if (hh === 0x80) {
    //     humi = 996
    // }
    //117 118 1V电压。
    let VoltageOne: number = data[118] * h1 + data[117]
    // console.log(`${index} 号，1V电压 = `,data[117],data[118])
    //CH
    // let CH: number = data[122]
    //status
    let DeviceStatus: number = data[124]
    // console.log(`${index} 号，设备状态 = `,data[124],'CH = ',data[122])
    //
    let SensorStatus: number = data[125]
    return {
        Index,
        SizeArr,
        ValueArr,
        DeviceStatus,
        SensorStatus,
        VoltageOne,
    }
}
let resolveTestPara = (data: any) => {

}
let resolveTestData = (data: any) => {

    let h1 = 0xff + 1;
    let h2 = 0xffff + 1;
    let h3 = 0xffffff + 1

    let Sort = data[121]
    let CH = data[122]
    let XX = data[123]

    let Status = data[124]
    let SensorStatus = data[125]

    let UnitModel = data[126] // 0:累加。1：升。2：立方米。3：立方英尺。

    //1V电压。3个传感器电压，根据不同的CH表示第1~3 / 2~6个传感器。
    let VoltageOne_CH_1: number = data[112] * h1 + data[111]
    let VoltageOne_CH_2: number = data[114] * h1 + data[113]
    let VoltageOne_CH_3: number = data[116] * h1 + data[115]

    //粒径
    let SizeArr1: string[] = []
    let SizeArr2: string[] = []
    let SizeArr3: string[] = []
    //第一个粒径。
    for (let i: number = 3; i < 95; i += 18) {
        //高位
        let hs = data[i + 1];
        let h = hs;
        //低位
        let ls = data[i].toString(16);
        let l = ls === "0" ? "00" : ls;

        let sizeItem = parseFloat((parseInt(h + l) / 100).toString())
            .toFixed(1)
            .toString();
        SizeArr1.push(sizeItem);
    }
    //第二个粒径。
    for (let i: number = 9; i < 101; i += 18) {
        //高位
        let hs = data[i + 1];
        let h = hs;
        //低位
        let ls = data[i].toString(16);
        let l = ls === "0" ? "00" : ls;

        let sizeItem = parseFloat((parseInt(h + l) / 100).toString())
            .toFixed(1)
            .toString();
        SizeArr2.push(sizeItem);
    }
    //第三个粒径。
    for (let i: number = 15; i < 107; i += 18) {
        //高位
        let hs = data[i + 1];
        let h = hs;
        //低位
        let ls = data[i].toString(16);
        let l = ls === "0" ? "00" : ls;

        let sizeItem = parseFloat((parseInt(h + l) / 100).toString())
            .toFixed(1)
            .toString();
        SizeArr3.push(sizeItem);
    }
    //数据。
    let ValueArr1: number[] = []
    let ValueArr2: number[] = []
    let ValueArr3: number[] = []

    //第1个传感器数据。
    for (let i: number = 5; i < 99; i += 18) {
        let v = data[i] + data[i + 1] * h1 + data[i + 2] * h2 + data[i + 3] * h3
        ValueArr1.push(v)
    }
    //第2个传感器数据。
    for (let i: number = 11; i < 105; i += 18) {
        let v = data[i] + data[i + 1] * h1 + data[i + 2] * h2 + data[i + 3] * h3
        ValueArr2.push(v)
    }
    //第3个传感器数据。
    for (let i: number = 17; i < 111; i += 18) {
        let v = data[i] + data[i + 1] * h1 + data[i + 2] * h2 + data[i + 3] * h3
        ValueArr3.push(v)
    }
    
    switch(CH) {
        case 1 :

        break
    }

    return {
        Sort,
        CH,
        XX,
        Status,
        SensorStatus,
        UnitModel,
        VoltageOne_CH_1,
        VoltageOne_CH_2,
        VoltageOne_CH_3,
        SizeArr1,
        SizeArr2,
        SizeArr3,
        ValueArr1,
        ValueArr2,
        ValueArr3,
    }
}
/**
 * @description 设置
 * @param data 数据
 */
let resolveReadTestRate = (data: any) => {
    let CH = data[126]
    let RateArr1: number[] = []
    let RateArr2: number[] = []
    let RateArr3: number[] = []
    let RateArr4: number[] = []
    let RateArr5: number[] = []
    let RateArr6: number[] = []

    let i = 0
    //第1个传感器。
    let h1 = 0xff + 1;
    let h2 = 0xffff + 1;
   
    for(i = 4; i < 16; i+=2) {
        let d = data[ i + 1 ] * h2 + data[i] * h1
        RateArr1.push(d)
    }
    //第2个传感器
    for(i = 20; i < 32; i+=2) {
        let d = data[ i + 1 ] * h2 + data[i] * h1
        RateArr2.push(d)
    }
    //第3个传感器
    for(i = 36; i < 48; i+=2) {
        let d = data[ i + 1 ] * h2 + data[i] * h1
        RateArr3.push(d)
    }
    //第4个传感器
    for(i = 52; i < 64; i+=2) {
        let d = data[ i + 1 ] * h2 + data[i] * h1
        RateArr4.push(d)
    }
    //第5个传感器
    for(i = 68; i < 80; i+=2) {
        let d = data[ i + 1 ] * h2 + data[i] * h1
        RateArr5.push(d)
    }
    //第6个传感器
    for(i = 84; i < 96; i+=2) {
        let d = data[ i + 1 ] * h2 + data[i] * h1
        RateArr6.push(d)
    }
    return {
        CH,
        RateArr1,
        RateArr2,
        RateArr3,
        RateArr4,
        RateArr5,
        RateArr6,
    }
}
/**
 * @description 解析手持设备ID。
 * @param data 串口数据。
 */
let resolveHDID = (data: any) => {
    let strArr = []
    for (let si = 3; si < 15; si++) {
        strArr[si-3] = data[si]
    }
    //ID
    let ID = String.fromCharCode(...strArr);
    return {
        ID
    }
}
/**
 * @description 解析数据总数。
 * @param data 串口数据。
 */
let resolveHDDataTotal = (data: any) => {
    let Total:number = data[4] * (0xff + 1) + data[3] 
    return {
        Total
    }
}
let dateCover = (Year:string,Mouth: string,Day:string,Hour:string,Minutes:string,Second:string) => {
    let y = '20' + Year
    let m = parseInt(Mouth) < 10 ? `0${Mouth}` : Mouth
    let d = parseInt(Day) < 10 ? `0${Day}` : Day
    let h = parseInt(Hour) < 10 ? `0${Hour}` : Hour
    let min = parseInt(Minutes) < 10 ? `0${Minutes}` : Minutes
    let sec = parseInt(Second) < 10 ? `0${Second}` : Second

    return y + '.' + m + '.' + d + '-' + h + ":" + min + ":" + sec
    return 'root'
}
let unitCover = (unit:number) => {
    let UnitModel = ''
    switch (unit) {
        case 1:
            UnitModel = "累积";
        break;
        case 2:
            UnitModel = "差分";
        break;
        case 3:
            UnitModel = "升";
        break;
        case 4:
            UnitModel = "立方米";
        break;
        case 5:
            UnitModel = "立方英尺";
        break;
        case 6:
            UnitModel = "升.微克/立方米";
        break;
        case 7:
            UnitModel = "立方米.微克/立方米";
        break;
        case 8:
            UnitModel = "立方英尺.微克/立方米";
        break;
        case 9:
            UnitModel = "ppm";
        break;
        case 10:
            UnitModel = "ppb";
        break;
        case 11:
            UnitModel = "微克/立方米";
        break;
        case 12:
            UnitModel = "毫克/立方米";
        break;
        case 13:
            UnitModel = "%";
        break;
        default:
            UnitModel = "";
        break;
    }
    return UnitModel
}
let secondToHMS = (second:number = 0) => {
    let h = parseInt((second / (60*60)).toString());
    let m = parseInt(((second- (h * 60 * 60)) / 60).toString());
    let s = (second - (h * 60 * 60)) - m * 60;
    
    let hs = h < 10 ? `0${h}` : `${h}`
    let ms = m < 10 ? `0${m}` : `${m}`
    let ss = s < 10 ? `0${s}` : `${s}`

    return ms + ':' + ss
}
let tempCover = (tempint:number = 0,tempfloat:number):string => {
    let t = ''
    if(tempint === 0x80) {
        t = '--'
    }
    if(tempint < 0x80) {
        t = tempint.toString() + '.' + tempfloat.toString()
    }
    if(tempint > 0x80) {
        t  = (256 - tempint).toString() + '.' + tempfloat.toString()
    }
    
    return t.substring(0,4)
}
let humiCover = (humi: number = 0):string => {
    let h = ''
    if(humi === 0x80) {
        h = '--'
    }else if( humi < 0x80) {
        h = humi.toString()
    }
    return h
}
let sizeCover = (sr: number[] = []):string[] => {
    if(sr.length < 12) {
        return []
    }

    let SizeArr: string[] = []
    
    for(let i = 0; i < 12; i += 2) {
        //高位
        let hs = sr[i + 1]
        let ls = sr[i]

        let rs = hs * (0xff + 1) + ls
        
        let realsize = parseFloat((rs / 10).toString()).toFixed(1)


        SizeArr.push(realsize)
    }
    return SizeArr
}
let channelTypeCover = (data: number = 0) => {
    
    let dt = data 
    let devicetype = ''
    for (let i = 0; i< 8; i++ ) {
        let d = dt & 0x01;
        dt >>= 1
        if(i == 0) {
            if(d == 0x01) {
                devicetype =  "PM2.5";
            }
        }
        if(i == 1) {
            if(d == 0x01) {
                devicetype = "PM10";
            }
        }
        if(i == 2) {
            if(d == 0x01) {
                devicetype = "TSP";
            }
        }
        if(i == 3) {
            if(d == 0x01) {
                devicetype = "HCHO";
            }
        }
        if(i == 4) {
            if(d == 0x01) {
                devicetype = "CO2";
            }
        }

        if(i == 5) {
            if(d == 0x01) {
                devicetype = "CH3NO";
            }
        }
        if(i == 6) {
            if(d == 0x01) {
                devicetype = "VOC";
            }
        }
        if(i == 7) {
            if(d == 0x01) {
                devicetype = "";
            }
        }
    }
    return devicetype
}
/**
 * @description 粒子数解析。
 * @param data 粒子数。
 * @param supportfloat 小数点位数支持。
 */
let dataArrCover = (data:number[] = [],supportfloat: number = 0) => {
    let DataArr = []
    //通道粒子数
    if(data.length < 24) {
        return []
    }
    let h1 = 0xff + 1
    let h2 = 0xffff + 1
    let h3 = 0xffffff + 1

    let fenmu = 1
    switch(supportfloat) {
        case 0:
            fenmu = 1 
        break
        case 1:
            fenmu = 10 
        break
        case 2:
            fenmu = 100 
        break
        case 3:
            fenmu = 1000 
        break
        case 4:
            fenmu = 10000 
        break
    }
    for(let i = 0; i < 24; i+= 4) {
       let chv = data[i + 3] * h3 + data[i + 2] * h2 + data[ i + 1] * h1 + data[i]
       let v = parseFloat((chv / fenmu).toString()).toFixed(supportfloat) 
        // let v = parseFloat('1112.25').toFixed(supportfloat) 
       //整数位添加逗号，小数位忽略。
       let sj = v.split('.')
       let zs = sj[0] 
       let xs = sj[1] ? `.${sj[1]}` : ''
       //整数位加逗号
       let dh = toThousands(parseInt(zs))

       let lastv = dh + xs
       DataArr.push(lastv)
    }
    return DataArr

}
let resolveHDData = (data: any) => {
    let h1 = 0xff + 1
    let h2 = 0xffff + 1
    let h3 = 0xffffff + 1
    let Year,Mouth,Day,Hour,Minutes,Second
    Year = data[3]?.toString(16)
    Mouth = data[4]?.toString(16)
    Day = data[5]?.toString(16)
    Hour = data[6]?.toString(16)
    Minutes = data[7]?.toString(16)
    Second = data[8]?.toString(16)
    //时间
    let CreateTime = dateCover(Year,Mouth,Day,Hour,Minutes,Second) 
    //单位
    let unit = data[9]
    let UnitModel = unitCover(unit)
    //温度单位
    let TempUnit = data[10] === 1 ? "°C": "F";
    //采样时间
    let st = data[13] * h1 + data[12]
    let SampTime = secondToHMS(st)
    //采样次数
    let SampTotal = data[15] * h1 + data[14]
    //温度
    let tempfloat = data[16]
    let tempint = data[17]
    // let tempint = 258
    let Temp = tempCover(tempint,tempfloat)
    let TempLast = Temp === '--' ? '--' : Temp + TempUnit
    //湿度。data[19] data[18]
    let Humi = humiCover(data[18])
    let HumiLast = Humi === '--' ? '--' : Humi + '%'
    //粒径。
    let sa = []
    for (let i = 20; i < 32; i++) {
        sa.push(data[i])
    }
    let SizeArr:string[] = sizeCover(sa)
    //小数点支持。
    let SupportFloat = data[59] > 4 ? 0 : data[59]
    //通道类型。
    let ChannelType = channelTypeCover(data[60])
    //粒子数。32 ~ 56
    let da:number[] = []
    for (let i = 32; i < 56; i++) {
        da.push(data[i])
    }
    let DataArr = dataArrCover(da,SupportFloat)
    //数据序号。
    let DataIndex = data[57] * h1 + data[56]
    //测试部分代码。
    // if(DataIndex === 95) {
    //     let d = []
    //     for(let i = 32 ; i < 44; i++) {
    //         d.push(data[i])
    //     }
    //     console.log('原始数据 = ',data)
    // }
    //位置
    let Location = data[58] === 0 ? '--' : String.fromCharCode(data[58])
    return {
        CreateTime,
        UnitModel,
        TempUnit,
        SampTime,
        SampTotal,
        Temp: TempLast,
        Humi: HumiLast,
        SizeArr,
        SupportFloat,
        ChannelType,
        DataArr,
        DataIndex,
        Location,
    }
}
export { resolveHDID,resolveHDDataTotal,resolveHDData};
