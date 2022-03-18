import React, { useState } from "react";


export function NavBar(props: {}) {

    const [activeTabIdx, setActiveTabIdx] = useState(0);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a href="/" className="navbar-brand">Agents Monitor</a>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav">

                        <span
                            className={"nav-item nav-link" + (activeTabIdx === 0 ? " active" : "")}
                            onClick={() => setActiveTabIdx(0)}>Home</span>

                        <span
                            className={"nav-item nav-link" + (activeTabIdx === 1 ? " active" : "")}
                            onClick={() => setActiveTabIdx(1)}>Settings (todo)</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}