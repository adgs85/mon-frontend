import React from "react";
import { statsSnapshotUrl } from "../layout/Layout";
import { NavBar } from "./NavBar";


export interface HomePageState {
    serverUrl: string | undefined
}


export class HomePage extends React.PureComponent<{}, HomePageState> {


    serverUrinputRef = React.createRef<HTMLInputElement>()

    applyServerUrlInternal() {
        this.setState({
            serverUrl: this.serverUrinputRef.current?.value
        })
    }


    render() {
        return <div>

            <NavBar />

            <div className="p-5 mx-4 bg-light rounded-3">
                <div className="container-fluid">

                    <div className="row align-items-start" style={{ borderStyle: 'groove' }}>
                        <div className="col-6">
                            <input defaultValue="TODO://" ref={this.serverUrinputRef}></input>
                            <span>{statsSnapshotUrl}</span>
                            <button onClick={this.applyServerUrlInternal}>Apply</button>
                            <span className="alert alert-danger">Invalid</span>
                        </div>
                    </div>

                    <div className="row align-items-start my-4" style={{ borderStyle: 'groove' }}>
                        <div className="col-1">
                            One of three columns
                        </div>
                        <div className="col-11" style={{ borderStyle: 'groove' }}> qwdqwd qwdqwd qwdqwd qwdqwd qwdqwd qwdqwd qwdqwd </div>
                    </div>

                </div>
            </div>
        </div>
    }
}
