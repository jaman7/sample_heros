/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Herolists from './Hero-lists';

@inject('HerosStore')
@observer
class App extends Component {
	async componentDidMount() {
		const { HerosStore } = this.props;
		HerosStore.Retrieve('Batgirl');
		// console.log(`err: ${HerosStore.errors}`);
	}

	render() {
		const { HerosStore } = this.props;
		console.log(toJS(HerosStore.heros));
		const all = HerosStore.ListsRemaining;
		console.log(`err: ${HerosStore.message.length}`);

		return (
			<>
				<div className="container" role="presentation">
					<div className="row">
						<div className="col-12">
							<h2 className="heading">Live Search: React Application</h2>
							<div className="d-flex align-items-center py-5">
								<div className="form-group mb-0" role="presentation">
									<label className="search-label mb-0" htmlFor="search-input">
										<input
											className="form-control"
											type="text"
											id="search-input"
											name="search-input"
											maxLength={100}
											aria-required="true"
											placeholder="Search..."
											ref={HerosStore.herosInputSearch}
											onChange={(event) =>
												HerosStore.handleOnInputChange(event)
											}
										/>
									</label>
								</div>
								<p className="mb-0 ml-5">item: {all}</p>
							</div>
						</div>

						<TransitionGroup component={null}>
							{!HerosStore.isloading && !HerosStore.errors ? (
								HerosStore.heros &&
								HerosStore.heros.map((hero, index) => (
									<CSSTransition
										timeout={500}
										classNames="fade"
										key={`fadeLists-${hero.id}`}
									>
										<Herolists
											key={`listitem-${hero.id}`}
											hero={hero}
											index={parseInt(index, 10) + 1}
										/>
									</CSSTransition>
								))
							) : (
								// <p key="error">{HerosStore.message}</p>
								<></>
							)}
							{HerosStore.errors && !HerosStore.heros.length ? (
								<p>{HerosStore.message}</p>
							) : (
								<></>
							)}
						</TransitionGroup>

						{HerosStore.isloading && !HerosStore.errors ? (
							<div className="col-12 d-flex justify-content-center">
								<img
									src="img/ajax_loader_blue_300.gif"
									alt="loader"
									className="img-fluid"
								/>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</>
		);
	}
}

App.wrappedComponent.propTypes = {
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default App;
