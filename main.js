define(['module'], function (module) {
	'use strict';

	var config = module.config();

	var packageName = config.modernizrPackageName || 'modernizr';

	function loadModules(moduleNames, req, onload, config) {
		var moduleList = moduleNames.split(',').map(function (moduleName) {
			return moduleName.trim();
		});

		var pathList = moduleList.map(function (moduleName) {
			if (moduleName.length > 0 && moduleMap.hasOwnProperty(moduleName)) {
				return packageName + '/' + moduleMap[moduleName];
			}
		});

		if (pathList.length > 0) {
			pathList.unshift(packageName + '/' + moduleMap['Modernizr']);

			req(pathList, function (Modernizr) {
				onload(Modernizr);
			}, onload.error);
		} else {
			onload();
		}
	}

	var moduleMap = {
		// Methods
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

		// Tests
		classlist: 'feature-detects/dom/classlist',
	};

	return {
		load: loadModules
	};
});
