define(['module', 'domready!'], function (module, doc) {
	'use strict';

	var config = module.config();

	var packageName = config.modernizrPackageName || 'modernizr';

	function loadModules(moduleNames, req, onload, config) {
		var methodList = [], testList = [], requireList = [], cssList = [];

		var moduleList = moduleNames.split(',').map(function (moduleName) {
			moduleName = moduleName.trim();

			if (moduleName.substring(moduleName.length - 1) === '+') {
				moduleName = moduleName.substring(0, moduleName.length - 1);
				cssList.push(moduleName);
			}

			return moduleName;
		});

		moduleList.forEach(function (moduleName) {
			if (moduleName.length > 0) {
				if (methodMap.hasOwnProperty(moduleName)) {
					methodList.push(packageName + '/' + methodMap[moduleName]);
				} else if (testMap.hasOwnProperty(moduleName)) {
					testList.push(packageName + '/' + testMap[moduleName]);
				}
			}
		});

		if (methodList.length > 0 || testList.length > 0) {
			requireList.push(packageName + '/' + methodMap['Modernizr']);

			if (testList.length > 0) {
				requireList.push(packageName + '/' + methodMap['tests']);
				requireList.push(packageName + '/' + methodMap['addTest']);
			}

			requireList = requireList.concat(methodList).concat(testList);

			req(requireList, function (Modernizr, tests, addTest) {
				if (testList.length > 0) {
					tests.forEach(function (test) {
						if (cssList.indexOf(test.name) !== -1) {
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
	var methodMap = {
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
	var testMap = {
		classlist: 'feature-detects/dom/classlist',
		createelementattrs: 'feature-detects/dom/createElement-attrs',
		'createelement-attrs': 'feature-detects/dom/createElement-attrs',
		dataset: 'feature-detects/dom/dataset',
		documentfragment: 'feature-detects/dom/documentfragment',
		hidden: 'feature-detects/dom/hidden',
		microdata: 'feature-detects/dom/microdata',
		mutationobserver: 'feature-detects/dom/mutationObserver',
	};

	return {
		load: loadModules
	};
});
