interface SDeviceDataType {
    SizeArr?: string[],
    PSValueArr?: string[],

    LocalRateCH1?: undefined | number,
    LocalRateCH2?: undefined | number,
    LocalRateCH3?: undefined | number,
    LocalRateCH4?: undefined | number,
    LocalRateCH5?: undefined | number,
    LocalRateCH6?: undefined | number,

    RealRateCH1?: undefined | number,
    RealRateCH2?: undefined | number,
    RealRateCH3?: undefined | number,
    RealRateCH4?: undefined | number,
    RealRateCH5?: undefined | number,
    RealRateCH6?: undefined | number,

    SensorStatus?: number,
    VoltageOne?: number,
}
interface StandardParaType {
    Index?: number,
    CH?: string[],
    SizeArr?: string[],
    VoltageArr?: string[],
    RateArr?: number[],
    MeasureTotal?: undefined | number,
    MeasureTime?: undefined | number,
    RestTime?: undefined | number,
    Address?: undefined | number,
    ID?: undefined | string,
}
export { SDeviceDataType , StandardParaType}