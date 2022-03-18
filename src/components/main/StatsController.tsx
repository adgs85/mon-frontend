import React from "react";
import { CpuStat } from "./CpuStat";
import { DiskStat } from "./DiskStat";
import { IStatsControllerProps } from "./IStatComponent";
import { NoStatsAvailable } from "./NoStats";
import { StatsRowWrapper } from "./StatRowWrapper";


interface ICanRender {
    canRender: (type: string) => boolean
}

const supportedStatComponents: ICanRender[] = [
    CpuStat,
    DiskStat
]

console.info("Supported stats", supportedStatComponents)


export class StatsController extends React.PureComponent<IStatsControllerProps, {}>{

    constructor(props: IStatsControllerProps) {
        super(props)
    }

    renderStatComponent() {
        let statComponentClass = supportedStatComponents.find(it => it.canRender(this.props.activeStat))
        if (statComponentClass) {
            let forceCast = statComponentClass as any
            return React.createElement(forceCast, this.props.stat)
        } else {
            <NoStatsAvailable />
        }
    }

    render() {
        let { activeStat, stat } = this.props

        if (!activeStat || !stat) {
            return <NoStatsAvailable />
        }
        return <table className="table table-striped">
            {this.renderStatComponent()}
        </table>

    }
}