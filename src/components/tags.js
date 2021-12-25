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
		const {parentDom, tagsList, liIndex} = this.props;
		// console.log("tagsList: ", tagsList);
		// console.log("parentDom: ", parentDom[liIndex]);
		// console.log("tagsList", this.state.tagsList);
		if (tagsList) {
			const tagsIndex = tagsList.findIndex(element => element.index === liIndex);
			// console.log("tagsIndex: ", tagsIndex);
			if (tagsIndex > -1) {
				const tagElements = tagsList[tagsIndex].tags.map((tag, ind) => {
					// console.log("tag: ",tag);
					return (
						<li key={ind}>
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
