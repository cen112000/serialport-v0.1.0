/**
 *
 * @description 启动设备。
 * @param way 0:串口方式。1：TCP Buff类型。
 * @returns
 */
const startCmd = (way: number = 0): any => {
    let cmd: number[] = [];
    for (let i = 0; i < 16; i++) {
        cmd[i] = 0;
    }
    cmd[0] = 0xff;
    cmd[1] = 0x53;
    cmd[2] = 0x01;
    cmd[15] = 0x4e;
    return cmd;
};
//停止。
const stopCmd = (way: number = 0): any => {
    let cmd: number[] = [];
    for (let i = 0; i < 16; i++) {
        cmd[i] = 0;
    }
    cmd[0] = 0xff;
    cmd[1] = 0x53;
    cmd[2] = 0x02;
    cmd[15] = 0x4e;

    return cmd;
};
const standardParaCmd = (way: number = 0, index: number = 0): any => {
    let cmd: number[] = [];
    for (let i = 0; i < 16; i++) {
        cmd[i] = 0;
    }
    cmd[0] = 0xff;
    cmd[1] = 0x53;
    cmd[2] = 0xc1;
    cmd[3] = index;
    cmd[15] = 0x4e;

    return cmd;
};
/**
 * @description 标准机数据命令，来自光学协议。
 * @param way 0:串口，1:TCP。
 * @param index 位号。
 * @returns
 */
const standardDataCmd = (way: number = 0, index: number = 0): any => {
    let cmd: number[] = [];
    for (let i = 0; i < 16; i++) {
        cmd[i] = 0;
    }
    cmd[0] = 0xff;
    cmd[1] = 0x53;
    cmd[2] = 0x91;
    cmd[3] = index;
    cmd[15] = 0x4e;

    return cmd;
};
/**
 * 功能: 设置标准机粒径。
 * @param idx
 * @returns
 */
const setStandardSizeCmd = (idx: number = 0): number[] => {
    let cmdArr: any = [];
    for (let i = 0; i < 128; i++) {
        cmdArr[i] = 0;
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0xc4;
    cmdArr[127] = 0x4e;
    return cmdArr;
};
/**
 * 描述: 设置标准机电压。
 * @param: idx:第几块的数据，范围0x00 ~  0x05
 */
const setStandardVoltageCmd = (idx: number = 0): number[] => {
    let cmdArr: any = [];
    for (let i = 0; i < 128; i++) {
        cmdArr[i] = 0;
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0xc3;
    cmdArr[127] = 0x4e;
    return cmdArr;
};
/**
 * 描述: 设置标准机系数。
 * @param: idx:第几块的数据，范围0x00 ~  0x05
 */
const setStandardRateCmd = (idx: number = 0): number[] => {
    let cmdArr: any = [];
    for (let i = 0; i < 128; i++) {
        cmdArr[i] = 0;
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0xc2;
    cmdArr[127] = 0x4e;
    return cmdArr;
};
/**
 * @description 设置标准机测量参数。
 * @param idx 
 * @returns 
 */
const setStandardMeasureCmd = (idx: number = 0) => {
    let cmdArr = []
    for(let i = 0; i < 16; i++) {
        cmdArr[i] = 0
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0x0d
    cmdArr[15] = 0x4e

    return cmdArr
}
const setStandardAddress = (idx: number = 0) => {
    let cmdArr = []
    for(let i = 0; i < 16; i++) {
        cmdArr[i] = 0
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0xa3
    cmdArr[15] = 0x4e

    return cmdArr
}
const setStandardID = (idx: number = 0) => {
    let cmdArr = []
    for(let i = 0; i < 16; i++) {
        cmdArr[i] = 0
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0x04
    cmdArr[15] = 0x4e

    return cmdArr
}
const getTestDataCmd = () => {
    let cmdArr = []
    for(let i = 0; i < 16; i++) {
        cmdArr[i] = 0
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0x93
    cmdArr[15] = 0x4e
    return cmdArr
}
/**
 * @description 统一设置测试板粒径。
 * @param testnumber 哪一块板子。
 * @returns 
 */
const setTestPSCmd = (testnumber: number = 0) => {
    //FF 53 CA 30 00 50 00 70 00 00 01 00 02 00 05 4E
    let cmdArr = []
    for(let i = 0; i < 16; i++) {
        cmdArr[i] = 0
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0xC9 + testnumber
    cmdArr[15] = 0x4e
    return cmdArr
}
/**
 * @description 测试机测量参数。
 * @returns 
 */
const setTestMPCmd = () => {
    let cmdArr = []
    for(let i = 0; i < 16; i++) {
        cmdArr[i] = 0
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0xcf
    cmdArr[15] = 0x4e
    return cmdArr
}
/**
 * @description 测试机相同地址。
 */
const setTestSameAddCmd = () => {
    let cmdArr = []
    for(let i = 0; i < 16; i++) {
        cmdArr[i] = 0
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0xc7
    cmdArr[15] = 0x4e
    return cmdArr
}
/**
 * @description 测试机累加地址
 */
const setTestACCAddCmd = () => {
    let cmdArr = []
    for(let i = 0; i < 16; i++) {
        cmdArr[i] = 0
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0xc8
    cmdArr[15] = 0x4e
    return cmdArr
}
/**
 * @description 测试机ID
 */
const setTestIDCmd = () => {
    let cmdArr = []
    for(let i = 0; i < 16; i++) {
        cmdArr[i] = 0
    }
    cmdArr[0] = 0xff;
    cmdArr[1] = 0x53;
    cmdArr[2] = 0xc9
    cmdArr[15] = 0x4e
    return cmdArr
}
/**
 * @description 读取测试机系数。
 * @param ch 哪一块板子
 * @returns 
 */
const readTestRateCmd = (ch: number = 0) => {
    let cmdArr = []
    for(let i = 0; i < 16; i++) {
        cmdArr[i] = 0
    }
    cmdArr[0] = 0xff
    cmdArr[1] = 0x53
    cmdArr[2] = 0xc6
    cmdArr[3] = ch
    cmdArr[15] = 0x4e
    return cmdArr
}
/**
 * @description 设置测试机系数。
 * @param ch 哪一块板子。
 * @returns 
 */
const setTestRateCmd = (ch:number = 0) => {
    let cmdArr = []
    for(let i = 0; i < 128; i++) {
        cmdArr[i] = 0
    }
    cmdArr[0] = 0xff
    cmdArr[1] = 0x53
    cmdArr[2] = 0xc5

    cmdArr[126] = ch
    cmdArr[127] = 0x4e
    return cmdArr
}
/**
 * @description 手持设备读取序列号(ID)。
 */
const HDReadIDCmd = () => {
    let cmd = []
    for(let i = 0; i < 16; i++) {
        cmd[i] = 0
    }
    cmd[0] = 0xff
    cmd[1] = 0x53
    cmd[2] = 0x03
    cmd[15] = 0x4e
    return cmd
}
/**
 * @description 手持设备读取数据总数。
 */
const HDReadDataTotalCmd = () => {
    let cmd = []
    for(let i = 0; i < 16; i++) {
        cmd[i] = 0
    }
    cmd[0] = 0xff
    cmd[1] = 0x53
    cmd[2] = 0x40
    cmd[15] = 0x4e
    return cmd
}
/**
 * @description 手持式设备读取数据命令。
 * @param index 0: 读取全部。index：读取某一条。
 */
const HDReadDataCmd = (index: number = 0) => {
    let cmd = []
    for(let i = 0; i < 16; i++) {
        cmd[i] = 0
    }
    cmd[0] = 0xff
    cmd[1] = 0x53
    cmd[2] = 0x41
    cmd[15] = 0x4e
    return cmd
}
/**
 * @description 手持设备删除数据
 * @param index 删除哪一条
 */
const HDDeleteDataCmd = (index: number = 0) => {
    let cmd = []
    for(let i = 0; i < 16; i++) {
        cmd[i] = 0
    }
    cmd[0] = 0xff
    cmd[1] = 0x53
    cmd[2] = 0x42
    cmd[15] = 0x4e
    return cmd
}
export {
    // startCmd,
    // stopCmd,
    // standardParaCmd,
    // standardDataCmd,
    // setStandardSizeCmd,
    // setStandardVoltageCmd,
    // setStandardRateCmd,
    // setStandardMeasureCmd,
    // setStandardAddress,
    // setStandardID,
    // getTestDataCmd,
    // setTestPSCmd,
    // setTestMPCmd,
    // setTestSameAddCmd,
    // setTestACCAddCmd,
    // setTestIDCmd,
    // //标准机系数
    // readTestRateCmd,
    // setTestRateCmd,
    HDReadIDCmd,
    HDReadDataTotalCmd,
    HDReadDataCmd,
    HDDeleteDataCmd,
};
