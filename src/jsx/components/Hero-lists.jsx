import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Accordion, Card } from 'react-bootstrap';

// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ButtonColapse from './buttons/ButtonColapse';
import BioDesc from './content/BioDesc';
import PowerDesc from './content/PowerDesc';

const Herolists = inject('HerosStore')(
	observer((props) => {
		const { HerosStore } = props;
		// this.props.open = props.hero.open;
		const iconClass = props.hero.open ? ' rotate' : '';

		return (
			<div className="col-12 py-2 bg-list" role="presentation">
				<Accordion defaultActiveKey="0">
					<Card>
						<Card.Header className="d-flex flex-row justify-content-between align-items-center todo-item-list">
							<div className="w-50 d-flex">
								<h2 className="list-title mb-0">
									<span>{props.index}</span>) <span>{props.hero.name}</span>
								</h2>
							</div>
							<div className="w-50 d-flex flex-nowrap justify-content-end align-items-center">
								{!props.hero.open ? (
									<img
										src={props.hero.image.url}
										onError={(e) => HerosStore.addDefaultSrc(e)}
										className="img-fluid img-hero-list"
										alt={props.hero.name}
									/>
								) : (
									<></>
								)}

								<ButtonColapse
									index={props.index}
									iconClass={iconClass}
									hero={props.hero}
								/>
							</div>
						</Card.Header>
						<Accordion.Collapse
							eventKey={props.index}
							in={props.hero.open}
							timeout={600}
						>
							<Card.Body className="text-white">
								<div className="row mx-0 py-3">
									<BioDesc
										bio={props.hero.biography}
										work={props.hero.work}
										id={parseInt(props.hero.id, 10)}
										img={props.hero.image.url}
										index={parseInt(props.index, 10)}
									/>

									<PowerDesc
										power={props.hero.powerstats}
										id={parseInt(props.hero.id, 10)}
									/>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</div>
		);
	})
);

Herolists.wrappedComponent.propTypes = {
	index: PropTypes.number,
	hero: PropTypes.objectOf(PropTypes.object),
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Herolists;
