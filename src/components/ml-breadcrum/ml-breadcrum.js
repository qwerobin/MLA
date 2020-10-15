import React, { Component } from 'react';
import "./ml-breadcrum.scss";

export default class MLBreadCrum extends Component {
    render () {
        return (<div className="ML-breadcrum-container">
            <div className="content-component">
                {
                   this.props.dataBread.map((el) => <span>{el.name}</span> )
                }
                <strong>{this.props.keyData} </strong></div>
        </div>)
    }
}