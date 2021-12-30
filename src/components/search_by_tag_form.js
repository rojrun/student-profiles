import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {searchByFilter} from '../actions';
import Input from './helpers/input.js';

class SearchByTagForm extends Component {
    handleSearchTag = (value) => {
        const tagFilter = new Array("tag", value);
        this.props.searchByFilter(tagFilter);
    }

    render() {
        return (
            <div className="row">
                <Field name="searchByTag" size="col s12 m8 offset-m2" component={Input} id="searchByTag" label="Search by tag" type="text" onChange={this.handleSearchTag}/>
            </div>
        );
    }
}

SearchByTagForm = connect(null, {
    searchByFilter: searchByFilter,
})(SearchByTagForm);

export default reduxForm({
    form: "search-by-tag-form",
})(SearchByTagForm);
