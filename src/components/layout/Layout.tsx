import React from "react";
import { genericGetFetch } from "../../transport/GenericFetch";
import { ConnectionState } from "./Constants";


interface LayoutState {
    statsSnapshotUrl: string
    connState: ConnectionState
}


const defaultServerUrl = "http://localhost:8080"
export const statsSnapshotUrl = "/stats/snapshot"

export class Layout extends React.PureComponent<{}, LayoutState>{

    fetchInProgress = false

    intervalId: number | undefined

    constructor(props: {}) {
        super(props)
        this.state = {
            statsSnapshotUrl: defaultServerUrl + statsSnapshotUrl,
            connState: ConnectionState.init
        }
    }

    updateStatsSnapshotUrl = (url: string) => {
        this.setState({ statsSnapshotUrl: url })
    }

    componentDidMount() {
        this.intervalId = window.setInterval(() => {
            if (this.fetchInProgress) {
                console.info("Stats fetch skipped, previous fetch in flight")
                return
            }
            genericGetFetch(
                {
                    url: this.state.statsSnapshotUrl,
                    successFunction: (json: any) => {
                        console.log(json)
                        this.setState({ connState: ConnectionState.sane })
                        this.fetchInProgress = false
                    },
                    errorFunction: (result: any) => {
                        this.fetchInProgress = false
                        this.setState({ connState: ConnectionState.error })
                    }
                }
            )
        }, 1000)
    }

    componentWillUnmount(){
        if(typeof this.intervalId !== 'undefined'){
            clearInterval(this.intervalId)
        }
    }

    render() {
        return <>
            {this.props.children}
        </>
    }
}