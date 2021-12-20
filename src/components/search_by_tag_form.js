import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {searchByTag} from '../actions';
import InputText from './helpers/input_text.js';

class SearchByTagForm extends Component {


    render() {
        return (
            <div className="row">
                <Field name="searchByTag" size="col s12 m8 offset-m2" component={InputText} id="searchByTag" label="Search by tag" onChange={this.handleSearchTag}/>
            </div>
        );
    }
}

SearchByTagForm = connect(null, {
    searchByTag: searchByTag,
})(SearchByTagForm);

export default reduxForm({
    form: "search-by-tag-form",
})(SearchByTagForm);
