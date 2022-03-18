import React from "react";
import { ICpu, IDisk, IDisplayableStat } from "../marshalling/StatsModel";
import { MetaDataComponent } from "./MetaDataComponent";
import { StatsRowWrapper } from "./StatRowWrapper";

const statType = "cpu"

export class CpuStat extends React.Component<IDisplayableStat, {}>{

    static readonly canRender = (type: string) => statType === type


    displayStats = () => {
        
        let stats = this.props.stats;
        let comps = stats.map(it => {
            let cpuPayload = it.Payload as ICpu[];

            return <StatsRowWrapper key={it.InstanceName}>
                <td>{cpuPayload[0].CpuUsagePercent.toFixed(2)}</td>
                <MetaDataComponent {...it} />
            </StatsRowWrapper>
        })
        return comps
    }

    render() {

        return <tbody>
            <tr>
                <td scope="row">Average Cpu Usage</td>
                <td>{this.props.mainMetricNumber?.toFixed(2)}%</td>
            </tr>
            {this.displayStats()}
        </tbody>

    }
}
