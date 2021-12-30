import React from 'react';

const Tags = props => {
	const tagElements = props.tags.tags.map((tag, index) => {
		return (
			<li key={index}>
				<p>{tag}</p>
			</li>
		);
	});

	return (
		<ul>
			{tagElements}
		</ul>
	);
};

export default Tags;
