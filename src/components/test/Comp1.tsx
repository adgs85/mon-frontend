import React, {useCallback, useState, useReducer} from 'react'
import { TestProps } from '../../model/test/test';
import { setInterval } from 'timers';

export class Comp1 extends React.PureComponent<TestProps, {date: Date}> {

    interval: number | undefined;

    constructor(props:TestProps){
        super(props)
        this.state = {date: new Date()}
    }

    static getDerivedStateFromProps(props: TestProps, state: {date: Date}){
        return state;
    }

    componentDidMount(){
        this.interval = window.setInterval(()=>{
            this.setState({date: new Date()})
        }
        ,500
        )
    }

    componentWillUnmount(){
        if(this.interval){
            clearTimeout(this.interval)
        }
    }

    render(){
        return <div>
                <div>Test succ {this.props.name}</div>
                <div>time {this.state.date.toISOString()}</div>
            </div>
    }
}
