import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {searchByFilter} from '../actions';
import Input from './helpers/input.js';

class SearchByNameForm extends Component {
    handleSearchName = (value) => {
        const nameFilter = new Array("name", value);
        this.props.searchByFilter(nameFilter);
    }

    render() {
        return (
            <div className="row">
                <Field name="searchByName" size="col s12 m8 offset-m2" component={Input} id="searchByName" type="text" label="Search by name" onChange={this.handleSearchName}/>
            </div>
        );
    }
}

SearchByNameForm = connect(null, {
    searchByFilter: searchByFilter,
})(SearchByNameForm);

export default reduxForm({
    form: "search-by-name-form",
})(SearchByNameForm);
