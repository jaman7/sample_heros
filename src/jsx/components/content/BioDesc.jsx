import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import WorkDesc from './Workdesc';

const BioDesc = inject('HerosStore')(
	observer((props) => {
		const { HerosStore } = props;
		const aliasesLen = props.bio.aliases.length - 1;

		return (
			<div className="col-12 col-md-6">
				<div className="d-flex justify-content-between">
					<div className="col pl-0">
						<h3>Biography:</h3>

						<p className="bio-title-name mb-1">{props.bio['full-name']}</p>

						<p className="bio-title-item mb-1">
							<span>Aliases: </span>
							{props.bio.aliases &&
								props.bio.aliases.map((item, i) => (
									<span className="list" key={`bio-alter-aliases-${i + 1}`}>
										{item}
										{i >= aliasesLen ? ';' : ','}
									</span>
								))}
						</p>

						<p className="bio-title-item mb-1">
							<span>Alter egos: </span>
							{props.bio['alter-egos']}
						</p>

						<p className="bio-title-item mb-1">
							<span>First appearance: </span>
							{props.bio['first-appearance']}
						</p>

						<p className="bio-title-item mb-1">
							<span>Place of birth: </span>
							{props.bio['place-of-birth']}
						</p>

						<p className="bio-title-item mb-1">
							<span>Publisher: </span> {props.bio.publisher}
						</p>

						<WorkDesc work={props.work.base} index={props.index} id={props.id} />
					</div>

					<div className="col pr-0">
						<img
							src={props.img}
							onError={(e) => HerosStore.addDefaultSrc(e)}
							className="img-fluid"
							alt={props.bio['full-name']}
						/>
					</div>
				</div>
			</div>
		);
	})
);

BioDesc.wrappedComponent.propTypes = {
	index: PropTypes.number.isRequired,
	id: PropTypes.number.isRequired,
	img: PropTypes.string.isRequired,
	bio: PropTypes.objectOf(PropTypes.object).isRequired,
	work: PropTypes.objectOf(PropTypes.object).isRequired,
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default BioDesc;
