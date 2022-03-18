import { IStat, IMapOfStats } from "./StatsModel"

export interface IStatProcessorMap {
    [key: string]: IStatCompute
}

export interface IStatCompute {
    computeMainStat: (map: IMapOfStats) => void
    preprocess: (stat: IStat) => void
    getStatType: () => string
}