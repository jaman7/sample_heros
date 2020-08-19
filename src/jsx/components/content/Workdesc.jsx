import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const WorkDesc = inject('HerosStore')(
	observer((props) => {
		return (
			<p className="bio-title-item mb-1" key={`work-${props.id}-${props.index}`}>
				<span>Work: </span> {props.work}
			</p>
		);
	})
);

WorkDesc.wrappedComponent.propTypes = {
	index: PropTypes.number.isRequired,
	id: PropTypes.number.isRequired,
	work: PropTypes.objectOf(PropTypes.object).isRequired,
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default WorkDesc;
