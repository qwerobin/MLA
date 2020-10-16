import React, { Component } from 'react';
import "./ml-item-list.scss";
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

import ShippingImg1x from '../../assets/ic_shipping.png';
import ShippingImg2x from '../../assets/ic_shipping@2x.png';

export default class MLItemList extends Component {

    render () {
        return (<div className="ML-item">
            <div className="img-container">
              <img src={this.props.dataItem.picture} alt={this.props.dataItem.title}/>
            </div>
            <div className="mini-detail-container">
              <h3 className="value-title"><NumberFormat value={this.props.dataItem.price.amount} displayType={'text'} thousandSeparator={true} prefix={'$ '} />
                {
                  this.props.dataItem.free_shipping ? <img alt="Shipping_available" src={ShippingImg1x} srcSet={ShippingImg1x + ' 1x,' + ShippingImg2x + ' 2x'}/> : null
                }
              </h3>
              <p className="detail-text"><Link to={`/items/${this.props.dataItem.id}`} params={{ id: this.props.dataItem.id }}>{this.props.dataItem.title}</Link></p>
              <p className="status-text">{this.props.dataItem.condition === 'new'? 'Nuevo' : 'Usado'}!</p>
            </div>
            <div className="location-container">
              {this.props.dataItem.location.state_name}, {this.props.dataItem.location.city_name}
            </div>
        </div>)
    }
}