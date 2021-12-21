import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {addTag} from '../actions';
import InputText from './helpers/input_text.js';

class AddTagForm extends Component {
	handleAddTag = (value) => {
        // this.props.tag.value = value;
        // console.log("this.props.tag.value: ", this.props.tag.value);
        // this.props.addTag(this.props.tag.value);
    }

	render() {
        console.log("add tag form: ", this.props);
        const {handleSubmit} = this.props;
        return (
            <div className="row">
                <form onSubmit={handleSubmit(this.handleAddTag)} >
                    <Field name="addTag" size="col s12 m8" component={InputText} id="addTag" label="Add a tag"/>
                    <button type="submit">Submit</button>
                </form>
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
