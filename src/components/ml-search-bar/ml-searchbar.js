import React, { Component } from 'react';
import "./ml-searchbar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import LogoImg1x from '../../assets/Logo_ML.png';
import LogoImg2x from '../../assets/Logo_ML@2x.png';

export default class MLSearchBar extends Component {
    state = {
        inputSearch: ''
    }

    _handleChange = (e) => {
        this.setState({
            inputSearch: e.target.value
        })
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const {inputSearch} = this.state;
        console.log(inputSearch)
        if (inputSearch !== '') {
            window.location.href = "/items?search="+inputSearch;
        } else {
            alert('Debes colocar algo en la caja de busqueda')
        }
    }

    render () {
        return (<div className="ML-searchbar-container">
            <div className="content-component">
                <div className="logo">
                    <img alt="Logo_MercadoLibre" src={LogoImg1x} srcSet={LogoImg1x + ' 1x,' + LogoImg2x + ' 2x'}/>
                </div>
                <div className="container-input">
                    <form onSubmit={this._handleSubmit} action="/items?search=">
                        <input type="text" onChange={this._handleChange} placeholder="Nunca dejes de buscar..." />
                        <button><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                </div>
            </div>
        </div>)
    }
}