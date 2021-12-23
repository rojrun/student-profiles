import React, {Component} from 'react';
import {connect} from 'react-redux';

class Tags extends Component {
	renderList() {
		const {tagsList, liIndex} = this.props;
		console.log("tagsList", tagsList);
		if (tagsList) {
			const tagsIndex = tagsList.findIndex(element => element.index === liIndex);
			console.log('tagsIndex: ', tagsIndex);
			if (tagsIndex > -1) {
				tagsList[tagsIndex].tags.map(tag => {
					return (
						<div>
							{tag}
						</div>
					);
				});
			}
		} else {
			return null;
		}
	}

	render() {
		return (
			<div>
				{this.renderList()}
			</div>
		);
		
	}
}

function mapStateToProps(state) {
	return {
		tagsList: state.list.tags
	}
}

export default connect(mapStateToProps, null)(Tags);
