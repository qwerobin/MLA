import React, { Component } from 'react';
import "./ml-not-found-page.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

export default class MLNotFoundPage extends Component {
    render () {
        return (<div className="ML_Not_Found_Page ML-section">
            <div className="section-container">
            <FontAwesomeIcon icon={faAngleDoubleUp} />
            La pagina que buscas no se encuentra</div>
        </div>)
    }
}