# grunt-phonegap-project
> The best Grunt plugin ever.

> Create a [Cordova](http://cordova.apache.org) Application with config folder, bundleId, platforms and plugins.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Build Status](https://api.travis-ci.org/CoHyper/grunt-phonegap-project.svg?branch=master)](https://travis-ci.org/CoHyper/grunt-phonegap-project)[![GitHub version](https://badge.fury.io/gh/CoHyper%2Fgrunt-phonegap-project.svg)](http://badge.fury.io/gh/CoHyper%2Fgrunt-phonegap-project) 

[![NPM](https://nodei.co/npm/grunt-phonegap-project.png?downloads=true)](https://nodei.co/npm/grunt-phonegap-project/)


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install grunt-phonegap-project --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-phonegap-project');
```

## The "phonegap_project" Require

#### Platform SDK
To add support or rebuild a project for any platform, you need from the same machine that [supports the platform's SDK](http://cordova.apache.org/docs/en/latest/guide/cli/index.html).

#### Cordova
```shell
$ npm install cordova -g
```

## The "phonegap_project" Options
All options are optional.

#### options.path
Type: `String`, Default: `build`

Path to install the new app.


#### options.title
Type: `String`, Default: `MyyApp`

#### options.bundleId
Type: `String`, Default: `de.myylinks.myyapp`

Unique identifier Package name for all Android Apps.

#### options.platforms
Type: `Array`, Default: `[]`

#### options.plugins
Type: `Array`, Default: `[]`

#### options.deleteOptionsPath
Type: `Boolean`, Default: `false`

<b>Info:</b> For create a new app need an empty folder.

<b>WARNING:</b> If `true` they are delete folder of `options.path`.


## The "phonegap_project" task

### Overview
In your project's Gruntfile, add a section named `phonegap_project` to the data object passed into `grunt.initConfig()`.


## Full Examples
```js
grunt.initConfig({
	phonegap_project: {
		app_1: {
			options: {
				deleteOptionsPath: true,
				path: "app_1",
				platforms: [
					"browser",
					"android"
				],
				plugins: [
					"cordova-plugin-battery-status",
					"cordova-plugin-camera"
				]
			}
		}
	}
});
	
grunt.registerTask('phonegap: create new app', ['phonegap_project:app_1']);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

##### 2017-02-22 v0.1.5
* update grunt to 1.0.1
* add multitasking

##### 2017-02-22 v0.1.4
* update

##### 2014-08-14 v0.1.3
* update grunt to 0.4.5
* add lodash
* add new variable deleteOptionsPath
* bugfixes

##### 2014-05-23 v0.1.2
* bugfix some grunt functions
* add travis

##### 2014-05-22 v0.1.1
* clean project for public

##### 2014-04-24 v0.1.0
* add some defaults cordova commands
* cordova create -folder- -bundleid- -apptitle-
* cordova platform add -platform-
* cordova plugin add -plugin-
* cordova build -platform-

## License
Copyright (c) 2014 SvenLang<br />
Licensed under the MIT license.
