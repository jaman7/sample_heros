import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Accordion, Button } from 'react-bootstrap';

const ButtonColapse = inject('HerosStore')(
	observer((props) => {
		const { HerosStore } = props;

		return (
			<>
				<Accordion.Toggle
					as={Button}
					eventKey={props.index}
					onClick={(event) => HerosStore.ColapseOpen(props.hero, event)}
				>
					<i
						className={`fa fa-angle-right icon-rotate${props.iconClass}`}
						title="Expand tasks"
					/>
				</Accordion.Toggle>
			</>
		);
	})
);

ButtonColapse.wrappedComponent.propTypes = {
	iconClass: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	hero: PropTypes.objectOf(PropTypes.object).isRequired,
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ButtonColapse;
