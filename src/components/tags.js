import React, {Component} from 'react';
import {connect} from 'react-redux';

class Tags extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		commonIndex: null
	// 	};
	// }

	// componentDidUpdate(prevState) {
	// 	if (this.state.commonIndex !== prevState.commonIndex) {
	// 		this.setState({
	// 			commonIndex: this.state.commonIndex
	// 		});
	// 	}
	// }

	renderList() {
		const {parentDom, data, tagsList} = this.props;
		if (tagsList) {
			const commonIndex = tagsList.map((tagObj) => {
				return data.findIndex((dataObj) => {
					return dataObj.id === tagObj.id;
				});
			});
			commonIndex.map((index) => {
				const tags = tagsList.find(tagObj => tagObj.id === data[index].id).tags;
				const liElement = tags.map((tag, ind) => {
					return (
						<li key={ind}>
							<p>{tag}</p>
						</li>
					);
				});
				const ulElement = <ul key={index}>{liElement}</ul>;
				const node = parentDom[index].getElementsByTagName("section")[0].getElementsByTagName("div")[10];
				node.innerHTML = ulElement;
			});



			// data.map(((item, index) => {	
			// 	// console.log("item: ", item);
			// 	// console.log("index: ", index);

			// 	const list = tagsList.map((tag) => {
			// 		if (item.id === tag.id) {
			// 			return tag.tags.map((tg, i) => {
			// 				return (
			// 					<li key={i}>
			// 						<p>{tg}</p>
			// 					</li>
			// 				);
			// 			});
			// 		}
			// 	});
			// 	const ulElement = (<ul key={item.id}>{list}</ul>);
			// 	const node = parentDom[index].getElementsByTagName("section")[0].getElementsByTagName("div")[10];
			// 	// console.log("node: ", node);
			// 	node.append(ulElement);
			// }));




			

			// commonIndex.map((ind) => {
			// 	const node = parentDom[ind].getElementsByTagName("section")[0].getElementsByTagName("div")[10];
			// 	console.log('Node: ', node);
			// });

			// const result = data.filter((dataObj) => {
			// 	return tagsList.some((tagObj) => {
			// 		return dataObj.id === tagObj.id;
			// 	});
			// });
			// console.log("result: ", result);
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
