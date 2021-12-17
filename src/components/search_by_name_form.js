import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {searchByName} from '../actions';
import InputText from './helpers/input_text.js';

class SearchByNameForm extends Component {
    handleSearchName = (value) => {
        const {students} = this.props;
        this.props.searchByName(value, students);
    }

    render() {
        return (
            <div className="row">
                <Field name="searchByName" size="s12 m8 offset-m2" component={InputText} id="searchByName" label="Search by name" onChange={this.handleSearchName}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        students: state.list.all
    }
}

SearchByNameForm = connect(mapStateToProps, {
    searchByName: searchByName,
})(SearchByNameForm);

export default reduxForm({
    form: "search-by-name-form",
})(SearchByNameForm);
