# grunt-phonegap-project
> Create a [Cordova](http://cordova.apache.org) Application with config folder, bundleId, platforms, plugins, androidMinSdk, androidTargetSdk and Version.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Build Status](https://travis-ci.org/CoHyper/grunt-phonegap-project.svg?branch=master)](https://travis-ci.org/CoHyper/grunt-phonegap-project) [![GitHub version](https://badge.fury.io/gh/CoHyper%2Fgrunt-phonegap-project.svg)](http://badge.fury.io/gh/CoHyper%2Fgrunt-phonegap-project) [![Dependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project.png)](https://david-dm.org/CoHyper/grunt-phonegap-project) 
[![devDependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project/dev-status.png)](https://david-dm.org/CoHyper/grunt-phonegap-project#info=devDependencies) [![Gittip](http://img.shields.io/gittip/CoHyper.png)](https://www.gittip.com/CoHyper/)

[![NPM](https://nodei.co/npm/grunt-phonegap-project.png?downloads=true)](https://nodei.co/npm/grunt-phonegap-project/)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command.

<pre>
$ npm install grunt-phonegap-project --save-dev
</pre>

It may be enabled inside your Gruntfile with this line of JavaScript:

<pre>
grunt.loadNpmTasks('grunt-phonegap-project');
</pre>

## The "phonegap_project" Require
To add support or rebuild a project for any platform, you need from the same machine that [supports the platform's SDK](http://docs.phonegap.com/en/edge/guide_cli_index.md.html).

#### Cordova
<pre>
$ npm install cordova -g
</pre>

## The "phonegap_project" Options
All options are optional.

#### path
Type: `String`, Default: `phoneGapProject`<br />
Path to install the phonegap app.

#### androidMinSdk
Type: `Integer`<br />
Changed in `./platforms/android/AndroidManifest.xml` after `task.create`.

#### androidTargetSdk
Type: `Integer`<br />
Changed in `./platforms/android/AndroidManifest.xml` after `task.create`.

## The "phonegap_project" Task

#### create
* `title`<br />
Type: `String`, Default: `MyyApp`

* `bundleId`<br />
Type: `String`, Default: `de.myylinks.myyapp`<br />
Unique identifier Package name for all Android Apps.

* `platforms`<br />
Type: `Array`, Default: `[]`<br />
Install directly with cordova command.

* `plugins`<br />
Type: `Array`, Default: `[]`
Install directly with cordova command.

* `deleteOptionsPath`<br />
Type: `Boolean`, Default: `false`<br />
<b>Info:</b> For create a new app need a empty folder.<br />
<b>WARNING:</b> If `true` they are delete folder of `options.path`.

* `version`<br />
Type: `String`<br />

* `access`<br />
Type `Array`<br />
// TODO :elements define the set of external domains the app is allowed to communicate with. The default value shown above allows it to access any server. See the Domain Whitelist Guide for details.


<pre>
grunt.initConfig({
  phonegap_project: {
    options: {
      path:'MyyApp'
    },
    create: {
      deleteOptionsPath: true,
      title: 'MyyApp',
      bundleId: 'de.myylinks.myyapp',
      platforms: [
        'ios',
        'android'
      ],
      plugins: [
        'org.apache.cordova.camera',
        'org.apache.cordova.battery-status'
      ]
    }
  }
});

grunt.registerTask('phonegap: create new app', ['phonegap_project:create']);
</pre>

#### build
* platforms<br />
Type: `Array`, Default: `[]`

<pre>
grunt.initConfig({
  phonegap_project: {
    options: {},
    build: {
      platforms: [
        'ios',
        'android'
      ]
    }
  }
});

grunt.registerTask('phonegap: build app', ['phonegap_project:build']);
</pre>

## Full Examples
<pre>
grunt.initConfig({
  phonegap_project: {
    options: {
      path: 'myyApp',
      androidMinSdk: 10,
      androidTargetSdk: 19
    },
    create: {
      deleteOptionsPath: true,
      title: 'MyyApp',
      bundleId: 'de.myylinks.myyapp',
      version: "0.1.3",
      access: [
        'http://myylinks.de',
        'http://github.com'
      ],
      platforms: [
        'ios',
        'android'
      ],
      plugins: [
        'org.apache.cordova.camera',
        'org.apache.cordova.battery-status'
      ]
    },
    build: {
      platforms: [
        'ios',
        'android'
      ]
    }
  }
});

grunt.registerTask('phonegap: create new app', ['phonegap_project:create']);
grunt.registerTask('phonegap: build app', ['phonegap_project:build']);
</pre>

## Release History

##### 2014-06-13 v0.1.3
* update readme.md
* add lodash
* update function create()
* add new variable deleteOptionsPath in create()
* add debug comments
* update grunt to 0.4.5
* add new variable version in create()
* add new variable access in create()

##### 2014-05-23 v0.1.2
* update readme.md
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
Copyright (c) 2014 svenlang<br />
Licensed under the MIT license.