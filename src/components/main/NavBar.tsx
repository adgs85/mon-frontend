import React, { memo, useState } from "react";
import { deepEqual } from 'fast-equals';


export interface INavBarProps {
    statsTypes: string[]
    activeStat: string
    setActiveStatTab: (activeStat: string) => void
}



const NavBarFunc = ({ statsTypes, setActiveStatTab, activeStat }: INavBarProps) => {
    console.info("render navbar")
    let renderAvailableStats = (statsTypes: string[]) => {
        return statsTypes.map((type, _) => {
            let active = activeStat === type;
            if (active) {
                setActiveStatTab(type)
            }

            return <span key={type} className={"nav-item nav-link" + (active ? " active" : "")} onClick={() => setActiveStatTab(type)}>{type}</span>
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a href="/" className="navbar-brand">Agents Monitor</a>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav">
                        {statsTypes.length > 0 &&
                            <>
                                {renderAvailableStats(statsTypes)}
                            </>
                        }

                        {statsTypes.length == 0 &&
                            <span className="nav-item nav-link">No stats available...</span>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export const NavBar = memo(NavBarFunc, deepEqual)