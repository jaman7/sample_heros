import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './components/App';
import HerosStore from './stores/HerosStore';

const rootID = document.getElementById('root');

const Root = (
	<Provider HerosStore={HerosStore}>
		<App />
	</Provider>
);

if (typeof rootID !== 'undefined' && rootID != null) {
	ReactDOM.render(Root, rootID);
}
