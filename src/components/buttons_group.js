import React, {Component} from 'react';


class ButtonsGroup extends Component {
	handleOpenAll = () => {

	}

	handleCloseAll = () => {
		
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

export default ButtonsGroup;
