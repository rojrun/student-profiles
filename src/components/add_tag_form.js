import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {addTag} from '../actions';
import InputText from './helpers/input_text.js';

class AddTagForm extends Component {
    handleAddTag = (index) => {    
        const dom = this.props.parentDom[index].getElementsByTagName("input")[0];
        const value = dom.value;
        this.props.addTag(index, value);
        this.props.reset();
        this.props.untouch(dom);   
    }

	render() {
        const {handleSubmit, liIndex, tagExistsWarning} = this.props;
        
        return (
            <div className="row">
                <form onSubmit={handleSubmit(() => this.handleAddTag(liIndex))}>
                    <Field name={`addTag${liIndex}`} label="Add a tag" size="col s12 m8" component={InputText}
                        id={`addTag${liIndex}`} warning={tagExistsWarning ? tagExistsWarning[1] : ""} />
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
    addTag: addTag,
})(AddTagForm);

export default reduxForm({
    form: "add-tag-form",
})(AddTagForm);
