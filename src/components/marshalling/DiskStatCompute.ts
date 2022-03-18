import { IDisk, IStat, IMapOfStats } from "./StatsModel"

export const statType = "disk"

export function newDiskStatProcessor() {
    return {
        computeMainStat(map: IMapOfStats) {
            let fullStats = map[statType]

            let minUsage = Number.MAX_VALUE

            fullStats.stats.forEach((it) => {
                it.Payload.forEach((payload) => {
                    let cpu = payload as IDisk
                    let usage = cpu.UsagePerCent || 0;
                    if(minUsage > usage){
                        minUsage = usage
                    }
                })
            })
            fullStats.mainMetricNumber = minUsage
        },

        preprocess(stat: IStat) {
            let payload = stat.Payload as IDisk[]
            payload.forEach((it) => {
                it.UsagePerCent = 100 - it.Available * 100 / it.Size
            })
        },
        getStatType() {
            return statType
        }

    }
}