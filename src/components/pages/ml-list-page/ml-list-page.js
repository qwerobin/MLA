import React, { Component } from 'react';
import MLBreadCrum from '../../ml-breadcrum/ml-breadcrum';
import "./ml-list-page.scss";
import {BASIC_URL, Search_URL} from "../../../helpers/const/services";
import MLTableProducts from '../../ml-table-products/ml-table-products';

export default class MLListPage extends Component {
    state = {
        q: '',
        dataReturned: [],
        categories: [],
        author: '',
    }

    componentDidMount() {
        let q = this.props.location.search.replace('?search=', '');
        this.setState({q});
        fetch(BASIC_URL+Search_URL+q).then(res => res.json()).then(results => this.setState({dataReturned: results.items, categories: results.categories, author: results.author}));
    }

    render () {
        return (<div className="ML_List_Page ML-section">
            <MLBreadCrum dataBread={this.state.categories} keyData={this.state.q}></MLBreadCrum>
            <MLTableProducts data={this.state.dataReturned}></MLTableProducts>
            <p className="author">Autor: <strong>{this.state.author.name} {this.state.author.lastname}</strong></p>
        </div>)
    }
}