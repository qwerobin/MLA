import React, { Component } from 'react';
import "./ml-detail.scss";
import NumberFormat from 'react-number-format';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default class MLDetail extends Component {
  render () {
    console.log(this.props.pictures)
    return (<div className="ML-detail-container">
        <div className="content-component">
        <div className="detail-top-container">
          <div className="img-container">
            <Carousel>
              {
                this.props.dataItem.pictures.map((el) => <div><img src={el} alt={this.props.dataItem.dataReturned.title}/></div>)
              }
            </Carousel>
          </div>
          <div className="mini-detail-container">
            <p className="detail-condition">{this.props.dataItem.dataReturned.condition === 'new'? 'Nuevo' : 'Usado'} - {this.props.dataItem.dataReturned.sold_quantity} vendidos</p>
            <h1 className="detail-text">{this.props.dataItem.dataReturned.title}</h1>
            <h3 className="value-title"><NumberFormat decimalScale={1} value={this.props.dataItem.dataReturned.amount} displayType={'text'} thousandSeparator={true} prefix={'$ '} /></h3>
            <p className="button-container">
              <button>Comprar</button>
            </p>
          </div>
        </div>
        <div className="detail-bottom-container">
          <h4>Descripción del producto</h4>
          <p className="default-text">{this.props.dataItem.dataReturned.description}</p>
        </div>
        </div>
    </div>)
}
}