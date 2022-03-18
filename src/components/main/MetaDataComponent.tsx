import React from "react";
import { IStat } from "../marshalling/StatsModel";

export class MetaDataComponent extends React.PureComponent<IStat, {}>{

    render() {
        return (
            <>
            <td>{this.props.HostName}</td>
            <td>{this.props.InstanceName}</td>
            <td>{this.props.CollectedTs.toISOString()}</td>
            <td>{this.props.PollingRateMs}</td>
            </>
        )
    }
}