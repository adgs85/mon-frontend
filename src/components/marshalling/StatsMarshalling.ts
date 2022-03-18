import { newCpuStatProcessor } from "./CpuStatCompute"
import { newDiskStatProcessor } from "./DiskStatCompute"
import { IStatCompute, IStatProcessorMap } from "./IStatCompute"
import { IDisplayableStat, IStat, IMapOfStats } from "./StatsModel"


let statComputeMap: IStatProcessorMap = {}
//init
{
    registerStatProcessor(newCpuStatProcessor())
    registerStatProcessor(newDiskStatProcessor())
}

export function marshal(statJson: any[]): IMapOfStats {
    let fullStat: IMapOfStats = {}

    statJson = statJson.map((it, _) => {
        it.Payload = JSON.parse(it.Payload)
        fillMapOfStats(fullStat, it)
        refineStats(it as IStat)
        return it
    })
    calculateAggregatedMetrics(fullStat)
    //console.log(fullStat)
    return fullStat
}

function refineStats(stat: IStat) {
    parseDates(stat)
    preprocessStat(stat)
}


function fillMapOfStats(map: IMapOfStats, stat: IStat) {
    let istat: IDisplayableStat = map[stat.StatType]
    if (!istat) {
        istat = { stats: [], mainMetricNumber: undefined }
        map[stat.StatType] = istat
    }
    istat.stats.push(stat)
}

function preprocessStat(stat: IStat) {
    let processor = statComputeMap[stat.StatType]
    if (processor) {
        processor.preprocess(stat)
    } else {
        console.error("No processor for stat type", stat)
    }
}

function parseDates(statsObj: IStat) {
    statsObj.CollectedTs = new Date(statsObj.CollectedTs)
    statsObj.LastUpdated = new Date(statsObj.LastUpdated)
}


function calculateAggregatedMetrics(statMap: IMapOfStats) {
    for (let key in statMap) {
        let processor = statComputeMap[key]
        if (processor) {
            processor.computeMainStat(statMap)
        }
    }
}





function registerStatProcessor(statProcessor: IStatCompute) {
    statComputeMap[statProcessor.getStatType()] = statProcessor;
}