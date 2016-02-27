# requirejs-plugin-modernizr
A RequireJS loader to load specific Modernizr modules.

This plugin is based on / inspired by [lodash-requirejs-loader-plugin](https://github.com/mokkabonna/lodash-requirejs-loader-plugin).

## Dependencies
The method and feature-detect maps are based on **Modernizr 3.3.1**. The Modernizr files need to be modified for this loader to work! All module dependencies need to be prefixed (relative) which breaks Modernizr's builder.

I have created a [fork](https://github.com/fkm/Modernizr) until I figure out a way to co-exist with the Modernizr builder.

## Configuration

```js
requirejs.config({
	paths: {
		mdzr: 'path/to/bower_components/requirejs-plugin-modernizr/main',
	},

	packages: [
		{
			name: 'modernizr',
			location : 'path/to/bower_components/modernizr',
			main: 'src/Modernizr'
		},
	],
});
```

## Usage
```js
require(['mdzr!prefixed,prefixedCSS,dataset,createelementattrs+'], function (Modernizr) {
	console.log(
		Modernizr.prefixed('requestAnimationFrame'),
		Modernizr.prefixedCSS('transition'),
		Modernizr.dataset,
		Modernizr.createelementattrs
	);
});
```

The plus (+) at the end of a test name will add the corresponding class to the DOM.

## Optimization
There is currently no special routine for the RequireJS optimizer.
