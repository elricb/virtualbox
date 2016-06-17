/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	import cons from 'consolidate';
	import express from 'express';
	import http from 'http';
	import path from 'path';
	import camelCase from 'lodash/camelCase';
	import capitalize from 'lodash/capitalize';
	
	import manifest from '../../package.json';
	import routes from 'server/routes.js';
	
	let app = express();
	
	app.set('port', 8888);
	app.set('host', (http://undefined:undefined) || ('http://localhost:' + app.get('port') + '/'));
	app.set('x-powered-by', false);
	app.engine('html', cons.lodash);
	app.set('view engine', 'html');
	app.set('views', path.join(__dirname, './'));
	
	app.use('/', routes);
	
	http.createServer(app).listen(app.get('port'));
	console.log(`${capitalize(camelCase(manifest.name))} up and running on ${app.get('port')}`);
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }
/******/ ]);