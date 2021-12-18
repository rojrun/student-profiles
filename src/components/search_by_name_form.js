import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {searchByName} from '../actions';
import InputText from './helpers/input_text.js';

class SearchByNameForm extends Component {
    handleSearchName = (value) => {
        this.props.searchByName(value);
    }

    render() {
        return (
            <div className="row">
                <Field name="searchByName" size="s12 m8 offset-m2" component={InputText} id="searchByName" label="Search by name" onChange={this.handleSearchName}/>
            </div>
        );
    }
}

SearchByNameForm = connect(null, {
    searchByName: searchByName,
})(SearchByNameForm);

export default reduxForm({
    form: "search-by-name-form",
})(SearchByNameForm);
