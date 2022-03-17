import React from "react";
import { NavBar } from "./NavBar";



const defaultServerUrl = "http://localhost:8080"

export interface HomePageState {
    serverUrl: string | undefined
}

export interface HomePageProps {

}

export class HomePage extends React.PureComponent<HomePageProps, HomePageState> {

    serverUrlInternal = defaultServerUrl

    serverUrinputRef = React.createRef<HTMLInputElement>()

    constructor(props: HomePageProps) {
        super(props)
        this.state = {
            serverUrl: defaultServerUrl
        }
    }

    applyServerUrlInternal() {
        this.setState({
            serverUrl: this.serverUrinputRef.current?.value
        })
    }


    render() {
        return <div>

            <NavBar/>
            
            <div className="p-5 mlr-4 bg-light rounded-3">
                <div className="container-fluid">
                    <p>
                        <div className="row align-items-start" style={{ borderStyle: 'groove' }}>
                            <div className="col-6">
                                <input defaultValue={defaultServerUrl} ref={this.serverUrinputRef}></input>
                                <button onClick={this.applyServerUrlInternal}>Apply</button>
                                <span className="alert alert-danger">Invalid</span>
                            </div>
                        </div>
                    </p>
                    <p>
                        <div className="row align-items-start" style={{ borderStyle: 'groove' }}>
                            <div className="col-1">
                                One of three columns
                            </div>
                            <div className="col-11" style={{ borderStyle: 'groove' }}> qwdqwd qwdqwd qwdqwd qwdqwd qwdqwd qwdqwd qwdqwd </div>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    }
}
