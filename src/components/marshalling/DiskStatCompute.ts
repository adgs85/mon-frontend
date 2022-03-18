import { IDisk, IStat, IMapOfStats } from "./StatsModel"

export const statType = "disk"

export function newDiskStatProcessor() {
    return {
        computeMainStat(map: IMapOfStats) {
            let fullStats = map[statType]

            let minUsage = Number.MAX_VALUE
            let minUsagePayload:IDisk|undefined;

            fullStats.stats.forEach((it) => {
                it.Payload.forEach((payload) => {
                    let disk = payload as IDisk
                    let usage = disk.UsagePerCent || 0;
                    if(minUsage > usage){
                        minUsage = usage
                        minUsagePayload=disk
                    }
                })
            })
            fullStats.mainMetricNumber = minUsage
            fullStats.mainMetricPayload = minUsagePayload
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