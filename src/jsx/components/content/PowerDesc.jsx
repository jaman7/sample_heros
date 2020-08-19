import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import ProgressBarLine from './ProgressBarLine';

const PowerDesc = inject('HerosStore')(
	observer((props) => {
		console.log(parseInt(props.id, 10));
		return (
			<div className="col-12 col-md-6">
				<h3>Powerstats:</h3>
				<>
					{Object.keys(props.power).map((item, i) => (
						<div
							key={`power-desc-${props.id}-${item}`}
							className="d-flex flex-row align-items-center"
							role="presentation"
						>
							<div className="col-3 px-0 py-1 d-flex flex-row justify-content-between align-items-center">
								<span className="title-power mr-1" role="presentation">
									{item}
								</span>
								<img
									className="img-fluid img-power mr-1"
									src={`img/${props.HerosStore.powersvg[i]}`}
									alt={item}
								/>
							</div>
							<div className="col-9 px-0">
								<ProgressBarLine
									index={parseInt(props.id, 10)}
									item_index={parseInt(i, 10)}
									power={props.power[item]}
								/>
							</div>
						</div>
					))}
				</>
			</div>
		);
	})
);

PowerDesc.wrappedComponent.propTypes = {
	// index: PropTypes.number.isRequired,
	id: PropTypes.number.isRequired,
	power: PropTypes.objectOf(PropTypes.object).isRequired,
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default PowerDesc;
