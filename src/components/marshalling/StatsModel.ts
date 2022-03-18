
export interface IMapOfStats {
    [key: string]: IDisplayableStat
}

export interface IDisplayableStat {
    stats: IStat[]
    mainMetricNumber: number | undefined
}

export interface IStat {
    CollectedTs: Date,
    HostName: string,
    InstanceName: string,
    LastUpdated: Date,
    Payload: ICpu[] | IDisk[]
    PollingRateMs: number
    StatType: string
}

export interface ICpu {
    CpuName: string,
    CpuUsagePercent: number
}

export interface IDisk {
    StoragePath: string,
    Size: number
    Available: number
    UsagePerCent: number | undefined
}