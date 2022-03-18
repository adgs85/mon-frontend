import React from "react";
import { genericGetFetch } from "../../transport/GenericFetch";
import { NavBar } from "../main/NavBar";
import { marshal } from "../marshalling/StatsMarshalling";
import { ConnectionState } from "./Constants";
import { IMapOfStats } from "../marshalling/StatsModel"
import { StatsController } from "../main/StatsController";


interface LayoutState {
    statsSnapshotUrl: string
    connState: ConnectionState
    activeStat: string
    statsAvailable: string[]
    statsMap: IMapOfStats
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
            connState: ConnectionState.init,
            activeStat: "",
            statsAvailable: [],
            statsMap: {}
        }
    }

    updateStatsSnapshotUrl = (url: string) => {
        this.setState({ statsSnapshotUrl: url })
    }

    renderChildrenPassProps() {
        return React.Children.map<React.ReactNode, React.ReactNode>(this.props.children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, this.props)
            }
        })
    }

    componentDidMount() {
        this.intervalId = window.setInterval(() => {
            if (this.fetchInProgress) {
                console.warn("Stats fetch skipped, previous fetch in flight")
                return
            }
            genericGetFetch(
                {
                    url: this.state.statsSnapshotUrl,
                    successFunction: (json: any) => {
                        this.fetchInProgress = false
                        this.setAvailableStats(marshal(json))
                    },
                    errorFunction: (result: any) => {
                        this.fetchInProgress = false
                        this.setState({
                            connState: ConnectionState.error,
                            activeStat: "",
                            statsAvailable: []
                        })
                    }
                }
            )
        }, 1000)
    }

    setAvailableStats(statsMap: IMapOfStats) {
        let availableStatsNames = Object.keys(statsMap).sort()
        this.setState({
            connState: ConnectionState.sane,
            statsMap: statsMap,
            statsAvailable: availableStatsNames
        })
    }

    componentWillUnmount() {
        if (typeof this.intervalId !== 'undefined') {
            clearInterval(this.intervalId)
        }
    }

    setActiveStatTab = (activeStat: string) => {
        if (this.state.activeStat !== activeStat) {
            this.setState((state, props) => { return { activeStat: activeStat } })
        }
    }

    render() {
        let { activeStat, statsMap } = this.state;
        let activeStatProps = statsMap[activeStat]
        return <div>
            <NavBar setActiveStatTab={this.setActiveStatTab} statsTypes={this.state.statsAvailable} activeStat={this.state.activeStat} />
            <div className="p-5 mx-4 bg-light rounded-3">
                <div className="container-fluid">
                    <StatsController activeStat={activeStat} stat={activeStatProps} />
                </div>
            </div>
        </div>
    }
}