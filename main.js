define(['module', 'domready!'], function (module) {
	'use strict';

	var config = module.config();

	var package_name = config.modernizrPackageName || 'modernizr';

	function loadModules(module_names, req, onload, config) {
		var method_list = [], test_list = [], require_list = [], css_list = [];

		var module_list = module_names.split(',').map(function (module_name) {
			module_name = module_name.trim();

			if (module_name.substring(module_name.length - 1) === '+') {
				module_name = module_name.substring(0, module_name.length - 1);
				css_list.push(module_name);
			}

			return module_name;
		});

		module_list.forEach(function (module_name) {
			if (module_name.length > 0) {
				if (method_map.hasOwnProperty(module_name)) {
					method_list.push(package_name + '/' + method_map[module_name]);
				} else if (test_map.hasOwnProperty(module_name)) {
					test_list.push(package_name + '/' + test_map[module_name]);
				}
			}
		});

		if (method_list.length > 0 || test_list.length > 0) {
			require_list.push(package_name + '/' + method_map['Modernizr']);

			if (test_list.length > 0) {
				require_list.push(package_name + '/' + method_map['tests']);
			}

			if (css_list.length > 0) {
				require_list.push(package_name + '/' + method_map['addTest']);
			}

			require_list = require_list.concat(method_list).concat(test_list);

			req(require_list, function (Modernizr, tests, addTest) {
				if (test_list.length > 0) {
					tests.forEach(function (test) {
						if (css_list.indexOf(test.name) !== -1) {
							addTest(test.name, test.fn);
						} else {
							Modernizr[test.name] = typeof test.fn === 'function' ? test.fn() : test.fn;
						}
					});
				}

				onload(Modernizr);
			}, onload.error);
		} else {
			onload();
		}
	}

	// Modernizr Methods
	var method_map = {
		Modernizr: 'src/Modernizr',
		ModernizrProto: 'src/ModernizrProto',

		addTest: 'src/addTest',
		atRule: 'src/atRule',
		classes: 'src/classes',
		contains: 'src/contains',
		createElement: 'src/createElement',
		cssToDOM: 'src/cssToDOM',
		cssomPrefixes: 'src/cssomPrefixes',
		docElement: 'src/docElement',
		domPrefixes: 'src/domPrefixes',
		domToCSS: 'src/domToCSS',
		fnBind: 'src/fnBind',
		generate: 'src/generate',
		getBody: 'src/getBody',
		hasEvent: 'src/hasEvent',
		hasOwnProp: 'src/hasOwnProp',
		html5printshiv: 'src/html5printshiv',
		html5shiv: 'src/html5shiv',
		injectElementWithStyles: 'src/injectElementWithStyles',
		inputElem: 'src/inputElem',
		is: 'src/is',
		isSVG: 'src/isSVG',
		load: 'src/load',
		mStyle: 'src/mStyle',
		modElem: 'src/modElem',
		mq: 'src/mq',
		nativeTestProps: 'src/nativeTestProps',
		omPrefixes: 'src/omPrefixes',
		prefixed: 'src/prefixed',
		prefixedCSS: 'src/prefixedCSS',
		prefixedCSSValue: 'src/prefixedCSSValue',
		prefixes: 'src/prefixes',
		roundedEquals: 'src/roundedEquals',
		setClasses: 'src/setClasses',
		slice: 'src/slice',
		testAllProps: 'src/testAllProps',
		testDOMProps: 'src/testDOMProps',
		testProp: 'src/testProp',
		testProps: 'src/testProps',
		testPropsAll: 'src/testPropsAll',
		testRunner: 'src/testRunner',
		testStyles: 'src/testStyles',
		testXhrType: 'src/testXhrType',
		tests: 'src/tests',
		toStringFn: 'src/toStringFn',
	};

	// Modernizr Tests
	// This list is incomplete. Before a test can be added here, its module dependencies have to be prefixed.
	var test_map = {
		// DOM
		classlist: 'feature-detects/dom/classlist',
		createelementattrs: 'feature-detects/dom/createElement-attrs',
		'createelement-attrs': 'feature-detects/dom/createElement-attrs',
		dataset: 'feature-detects/dom/dataset',
		documentfragment: 'feature-detects/dom/documentfragment',
		hidden: 'feature-detects/dom/hidden',
		microdata: 'feature-detects/dom/microdata',
		mutationobserver: 'feature-detects/dom/mutationObserver',

		// Element
		bdi: 'feature-detects/elem/bdi',
		datalistelem: 'feature-detects/elem/datalist',
		details: 'feature-detects/elem/details',
		outputelem: 'feature-detects/elem/output',
		picture: 'feature-detects/elem/picture',
		progressbar: 'feature-detects/elem/progress-meter',
		meter: 'feature-detects/elem/progress-meter',
		ruby: 'feature-detects/elem/ruby',
		template: 'feature-detects/elem/template',
		time: 'feature-detects/elem/time',
		texttrackapi: 'feature-detects/elem/track',
		track: 'feature-detects/elem/track',
		unknownelements: 'feature-detects/elem/unknown',

		// ES5
		es5array: 'feature-detects/elem/array',
		es5date: 'feature-detects/elem/date',
		es5function: 'feature-detects/elem/function',
		es5object: 'feature-detects/elem/object',
		es5: 'feature-detects/elem/specification',
		strictmode: 'feature-detects/elem/strictmode',
		es5string: 'feature-detects/elem/string',
		es5syntax: 'feature-detects/elem/syntax',
		es5undefined: 'feature-detects/elem/undefined',

		// ES 6
		es6array: 'feature-detects/elem/array',
//		NotInDocs: 'feature-detects/elem/arrow',
		es6collections: 'feature-detects/elem/collections',
		contains: 'feature-detects/elem/contains',
		generators: 'feature-detects/elem/generators',
		es6math: 'feature-detects/elem/math',
		es6number: 'feature-detects/elem/number',
		es6object: 'feature-detects/elem/object',
		promises: 'feature-detects/elem/promises',
		es6string: 'feature-detects/elem/string',

		// Event
		devicemotion: 'feature-detects/elem/deviceorientation-motion',
		deviceorientation: 'feature-detects/elem/deviceorientation-motion',
		oninput: 'feature-detects/elem/oninput',

		// File
		filereader: 'feature-detects/elem/api',
		filesystem: 'feature-detects/elem/filesystem',

		// Forms
		capture: 'feature-detects/elem/capture',
		fileinput: 'feature-detects/elem/fileinput',
		directory: 'feature-detects/elem/fileinputdirectory',
		formattribute: 'feature-detects/elem/formattribute',
		localizednumber: 'feature-detects/elem/inputnumber-i10n',
		placeholder: 'feature-detects/elem/placeholder',
		requestautocomplete: 'feature-detects/elem/requestautocomplete',
		formvalidation: 'feature-detects/elem/validation',
	};

	return {
		load: loadModules
	};
});
