import React from "react";
import { IDisplayableStat } from "../marshalling/StatsModel";

export class StatsRowWrapper extends React.PureComponent<{},{}>{
    render(){
        return <tr>
            {this.props.children}
        </tr>
    }
}