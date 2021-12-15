import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {getAllStudents} from '../actions';

class SearchByNameForm extends Component {
    renderInput(props) {
        console.log("props: ", props);
        return (
            <div className="input-field">
                <input {...props.input} id={props.id} type="text" placeholder="Search by name" autoComplete="off"/>
            </div>
        );
    }

    handleSearchName = async (values) => {
        
    }

    render() {
        const {handleSubmit, reset} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSearchName)}>
                <div className="row">
                    <Field name="name" size="s12" component={this.renderInput} id="name"/>
                </div>
            </form> 
        );
    }
}

function mapStateToProps(state) {
    return {
        students: state.list.all
    }
}

SearchByNameForm = connect(mapStateToProps, {

})(withRouter(SearchByNameForm));

export default reduxForm({
    form: "search-by-name-form",
    getAllStudents: getAllStudents
})(SearchByNameForm);
