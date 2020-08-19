'use strict';
require.config({
	baseUrl: 'js/',
	paths: {
		jquery: [
			'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min',
			'jsvendor/jquery.min'
		],
		popper: 'jsvendor/popper',
		bootstrap: 'jsvendor/bootstrap',
		sample_heros: 'heros'
	},
	shim: {
		popper: {
			deps: ['jquery'],
			exports: ['Popper']
		},
		bootstrap: {
			deps: ['jquery', 'popper'],
			exports: ['bootstrap']
		}
	}
});

require(['popper'], function(Popper) {
	window.Popper = Popper;
	require(['bootstrap']);
});

define(['jquery', 'bootstrap', 'sample_heros'], function($) {
	//menu hover
});
