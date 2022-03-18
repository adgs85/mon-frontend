import { IDisk, IStat, IMapOfStats } from "./StatsModel"

export const statType = "disk"

export function newDiskStatProcessor() {
    return {
        computeMainStat(map: IMapOfStats) {
            let fullStats = map[statType]

            let minUsage = Number.MAX_VALUE
            let minUsagePayload: IStat | undefined;

            fullStats.stats.forEach((it) => {

                let diskUsageMeanPercent = 0;
                let castPayload = it.Payload as IDisk[]
                castPayload.forEach((disk) => {
                    let usage = disk.UsagePerCent || 0;
                    diskUsageMeanPercent += usage
                })

                castPayload.sort((a, b) => { return a.StoragePath > b.StoragePath ? 1 : 0 })

                diskUsageMeanPercent = diskUsageMeanPercent / it.Payload.length
                if (minUsage > diskUsageMeanPercent) {
                    minUsage = diskUsageMeanPercent
                    minUsagePayload = it
                }
            })
            fullStats.mainMetricNumber = minUsage
            fullStats.mainMetricStat = minUsagePayload
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