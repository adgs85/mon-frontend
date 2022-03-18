import React from "react"
import { IDisk, IDisplayableStat, IStat } from "../marshalling/StatsModel"
import { MetaDataComponent } from "./MetaDataComponent"
import { StatsRowWrapper } from "./StatRowWrapper"

const statType = "disk"

export class DiskStat extends React.PureComponent<IDisplayableStat, {}>{

    static readonly canRender = (type: string) => statType === type


    displayStats = () => {

        let stats = this.props.stats;
        let comps = stats.flatMap(it => {
            return (it.Payload as IDisk[]).map(payload => {
                return <StatsRowWrapper key={it.InstanceName + payload.StoragePath}>
                    <td>{payload.UsagePerCent?.toFixed(2)}%</td>
                    <td>{payload.StoragePath}</td>
                    <MetaDataComponent {...it} />
                </StatsRowWrapper>
            })
        })
        return comps
    }

    render() {
        let {mainMetricNumber, mainMetricStat} = this.props
        return <tbody>
            <tr>
                <td scope="row">Lowest disk usage percentage</td>
                <td>{(mainMetricStat as IStat).HostName}</td>
                <td>{mainMetricNumber?.toFixed(2)}%</td>
            </tr>
            {this.displayStats()}
        </tbody>
    }
}
