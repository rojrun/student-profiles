import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {addTagFilterToState, searchByFilters} from '../actions';
import Input from './helpers/input.js';

class SearchByTagForm extends Component {
    handleSearchTag = (value) => {
        this.props.addTagFilterToState(value);
        this.props.searchByFilters();
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
    addTagFilterToState: addTagFilterToState,
    searchByFilters: searchByFilters
})(SearchByTagForm);

export default reduxForm({
    form: "search-by-tag-form",
})(SearchByTagForm);
