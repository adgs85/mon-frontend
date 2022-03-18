import { ICpu, IStat, IMapOfStats } from "./StatsModel"

export const statType = "cpu"

export function newCpuStatProcessor() {
    return {
        computeMainStat(map: IMapOfStats) {
            let cpuStats = map[statType]

            let sum = 0
            let cpuCount = 0
            cpuStats.stats.forEach((it) => {
                let castPayload = it.Payload as ICpu[]
                castPayload.forEach((cpu) => {
                    sum += cpu.CpuUsagePercent
                    cpuCount++
                })
            })
            cpuStats.mainMetricNumber = sum / cpuCount
        },

        preprocess(stat: IStat) {
            //nothing to do
        },
        getStatType() {
            return statType
        }

    }
}
