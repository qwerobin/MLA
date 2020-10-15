import React, { Component } from 'react';
import MLItemList from '../ml-item-list/ml-item-list';
import "./ml-table-products.scss";

export default class MLTableProducts extends Component {
    render () {
        return (<div className="ML-table-products-container">
            <div className="content-component">
                <ul>
                {
                    this.props.data.map(el => <li className="item"><MLItemList dataItem={el} key={el}></MLItemList></li>)
                }
                </ul>
            </div>
        </div>)
    }
}