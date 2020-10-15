import React, { Component } from 'react';
import "./ml-detail-page.scss";
import {BASIC_URL, Detail_URL} from "../../../helpers/const/services";
import MLDetail from '../../ml-detail/ml-detail';
import MLBreadCrum from '../../ml-breadcrum/ml-breadcrum';

export default class MLDetailPage extends Component {
    state = {
        q: '',
        dataReturned: [],
        pictures: [],
        categories: [],
        author: '',
    }

    componentDidMount() {
        let q = this.props.match.params.id;
        this.setState({q});

        fetch(BASIC_URL+Detail_URL+q)
            .then(res => res.json())
            .then(results => {
                this.setState({dataReturned: results.item, pictures: results.item.picture, categories: results.categories, author: results.author});
            });
    }

    render () {
        return (<div className="ML_Detail_page ML-section">
            <MLBreadCrum dataBread={this.state.categories} keyData={this.state.q}></MLBreadCrum>
            <MLDetail dataItem={this.state}></MLDetail>
            <p className="author">Autor: <strong>{this.state.author.name} {this.state.author.lastname}</strong></p>
        </div>)
    }
}