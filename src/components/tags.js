import React, {Component} from 'react';
import {connect} from 'react-redux';

class Tags extends Component {
	// constructor(props) {
	// 	super(props);
	// 	console.log("props: ", this.props.tagsList);
	// 	this.state = {
	// 		tagsList: props.tagsList
	// 	};
	// }

	// componentDidUpdate(prevProps) {
	// 	console.log("prevProps: ", prevProps.tagsList);
	// 	if (this.props.tagsList !== prevProps.tagsList) {
	// 		this.setState({
	// 			tagsList: this.props.tagsList
	// 		});
	// 	}
	// }

	renderList() {
		const {parentDom, id, data, tagsList} = this.props;
		console.log("tagsList: ", tagsList);
		// console.log("data: ", data);
		// console.log("parentDom: ", parentDom);
		if (tagsList) {
			const tagsIndex = data.findIndex(element => element.id === id);
			console.log("tagsIndex: ", tagsIndex);
			if (tagsIndex > -1) {
				// console.log("parentDom: ", parentDom);
				const tagElements = tagsList.map((tag, id) => {
					console.log("tag: ",tag);
					return (
						<li key={id}>
							<p>{tag}</p>
						</li>
					);
				});

				return (
					<ul>
						{tagElements}
					</ul>
				);
			}
		}
	}

	render() {
		return (
			<div id="tagsList">
				{this.renderList()}
			</div>
		);	
	}
}

function mapStateToProps(state) {
	return {
		tagsList: state.list.tagsList
	}
}

export default connect(mapStateToProps, null)(Tags);
