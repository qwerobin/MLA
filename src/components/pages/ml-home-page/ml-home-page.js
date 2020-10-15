import React, { Component } from 'react';
import "./ml-home-page.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

export default class MLHomePage extends Component {
    render () {
        return (<div className="ML_Home_Page ML-section">
            <div className="section-container">
            <FontAwesomeIcon icon={faAngleDoubleUp} />
            Por favor ingrese la palabra que desea buscar en la caja de arriba</div>
        </div>)
    }
}