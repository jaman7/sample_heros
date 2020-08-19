import React from 'react';
import { toJS, observable, action, computed, configure, runInAction } from 'mobx';
import axios from 'axios';

axios.defaults.baseURL =
	'https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/2987607971258652/search/';
axios.defaults.responseType = 'json';

configure({
	enforceActions: 'observed',
});

class HerosStore {
	@observable herosInputSearch = React.createRef();

	@observable beforeopen = false;

	@observable heros = [];

	@observable powersvg = [
		'intelligence.svg',
		'strength.svg',
		'speed.svg',
		'durable.svg',
		'fist.svg',
		'boxing.svg',
	];

	@observable query = '';

	@observable isloading = true;

	@observable message = '';

	@observable errors = false;

	@action addDefaultSrc = (e) => {
		e.preventDefault();
		e.target.src = 'img/404.png';
	};

	@action findIndex = (currentid) => {
		return this.heros.findIndex((item) => item.id === currentid);
	};

	@action checkErrAndTextLen = (err, text) => {
		if ((text && text.trim().length) || err) {
			return true;
		}
		return false;
	};

	@action checkIfNull = (text) => {
		if (text === 'null') {
			return true;
		}
		return false;
	};

	@action async Retrieve(query = '') {
		// console.log(`queryreal: ${query}`);

		try {
			this.heros = [];
			this.isloading = true;
			const response = await axios.get(query);
			const getHeros = response.data;
			if (getHeros.response === 'success' && getHeros.response !== 'error') {
				getHeros.results.forEach((hero) => {
					hero.open = false;
				});
			}
			console.log(toJS(getHeros));
			runInAction(() => {
				if (getHeros.response === 'success') {
					this.message = '';
					this.errors = false;
					this.heros = getHeros.results;
				} else if (getHeros.response === 'error') {
					this.errors = true;
					this.message = getHeros.error;
					this.heros = [];
				}

				this.isloading = false;
			});
		} catch (error) {
			runInAction(() => {
				this.isloading = false;
				this.message = 'Error loading heros';
				this.errors = true;
			});

			// console.log(this.message);
		}
	}

	@action handleOnInputChange = (event) => {
		event.preventDefault();
		// const query = event.target.value;
		const query = this.herosInputSearch.current.value;
		if (query.trim().length < 2) {
			return null;
		}
		this.Retrieve(query);
		return null;
	};

	@action ColapseOpen = (hero, event) => {
		if (hero.open) {
			hero.open = false;
		} else {
			hero.open = true;
		}
		console.log(hero.open);
		this.beforeopen = hero.open;
		const index = this.findIndex(hero.id);
		this.heros.splice(index, 1, hero);
		event.preventDefault();
	};

	@computed get ListsRemaining() {
		return this.heros.filter((hero) => !hero.completed).length;
	}
}

const store = new HerosStore();

export default store;
