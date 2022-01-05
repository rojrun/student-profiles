import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addIdToIsOpen, removeIdFromIsOpen} from '../actions';

class ButtonsGroup extends Component {
	handleOpenAll = () => {
		const {results, domRef, isOpen} = this.props;
		results.map((student, index) => {
			if (!isOpen.includes(student.id)) {
				const collapsibleElement = domRef[index].getElementsByClassName("collapsible-body")[0];
				collapsibleElement.style.display = "block";
            	this.props.addIdToIsOpen(student.id); 
		
			}
		});
	}

	handleCloseAll = () => {
		const {results, domRef, isOpen} = this.props;
		results.map((student, index) => {
			if (isOpen.includes(student.id)) {
				const collapsibleElement = domRef[index].getElementsByClassName("collapsible-body")[0];
				collapsibleElement.style.display = "none";
            	this.props.removeIdFromIsOpen(student.id);
			}
		});
	}

	render() {
		return (
			<div className="row right-align">
				<button className="waves-effect waves-light btn" onClick={this.handleOpenAll}>Open All</button>
				<button className="waves-effect waves-light btn" onClick={this.handleCloseAll}>Close All</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		results: state.list.results,
		domRef: state.list.ref,
		isOpen: state.list.isOpen
	}
}

export default connect(mapStateToProps, {
	addIdToIsOpen: addIdToIsOpen,
	removeIdFromIsOpen: removeIdFromIsOpen
})(ButtonsGroup);
