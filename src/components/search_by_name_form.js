import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {searchByName} from '../actions';
import {InputText} from './helpers/input_text.js';

class SearchByNameForm extends Component {
    handleSearchName =  (event) => {
        console.log("event: ", event.currentTarget.value);
    }

    render() {
        console.log("Props: ",this.props);
        const {handleSubmit, reset} = this.props;

        return (
            // <form onSubmit={handleSubmit(this.handleSearchName)}>
            <form>
                {/* <div className="row">
                    <Field name="name" size="s12" component={this.renderInput} id="name" onChange={this.handleSearchName}/>
                </div> */}
                <div className="row">
                    <Field name="searchByName" size="s12 m8 offset-m2" component={InputText} id="searchByName" label="Search by name" onChange={this.handleSearchName}/>
                </div>
            </form> 
        );
    }
}

function mapStateToProps(state) {
    return {}
}

SearchByNameForm = connect(mapStateToProps, {
    searchByName: searchByName
})(SearchByNameForm);

export default reduxForm({
    form: "search-by-name-form",
})(SearchByNameForm);
