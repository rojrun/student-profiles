import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {addNameFilterToState, searchByFilters} from '../actions';
import Input from './helpers/input.js';

class SearchByNameForm extends Component {
    handleSearchName = (value) => {
        this.props.addNameFilterToState(value);
        this.props.searchByFilters();
    }

    render() {
        return (
            <div className="row">
                <Field name="searchByName" size="col s12 m6 offset-m3" component={Input} id="searchByName" type="text" label="Search by name" onChange={this.handleSearchName}/>
            </div>
        );
    }
}

SearchByNameForm = connect(null, {
    addNameFilterToState: addNameFilterToState,
    searchByFilters: searchByFilters
})(SearchByNameForm);

export default reduxForm({
    form: "search-by-name-form",
})(SearchByNameForm);
