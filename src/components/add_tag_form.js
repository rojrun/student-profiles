import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {addTag} from '../actions';
import Input from './helpers/input.js';

class AddTagForm extends Component {
    handleAddTag = (id, data) => {    
        const node = this.props.parentDom[(data.findIndex(element => element.id === id))].getElementsByTagName("input")[0];
        const value = node.value;
        this.props.addTag(id, value);
        this.props.reset();
    }

	render() {
        const {handleSubmit, id, data, tagExistsWarning, parentDom} = this.props;
        return (
            <div className="row">
                <form onSubmit={handleSubmit(() => this.handleAddTag(id, data))}>
                    <Field name={`addTag${id}`} label="Add a tag" size="col s10 m8" type="text" component={Input} liRefs={parentDom}
                        id={`addTag${id}`} data={data} warning={tagExistsWarning}/>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tagExistsWarning: state.list.tagExistsWarning
    }
}

AddTagForm = connect(mapStateToProps, {
    addTag: addTag
})(AddTagForm);

export default reduxForm({
    form: "add-tag-form"
})(AddTagForm);
