import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {addTag} from '../actions';
import InputText from './helpers/input_text.js';

class AddTagForm extends Component {
	handleAddTag = (value) => {

	}

	render() {
        return (
            <div className="row">
                <Field name="addTag" size="col s12 m8" component={InputText} id="addTag" label="Add a tag" onChange={this.handleAddTag}/>
            </div>
        );
    }
}

AddTagForm = connect(null, {
    addTag: addTag,
})(AddTagForm);

export default reduxForm({
    form: "add-tag-form",
})(AddTagForm);
