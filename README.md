# grunt-phonegap-project
> Create a [Cordova](http://cordova.apache.org) Application with config folder, bundleId, platforms, plugins, androidMinSdk, androidTargetSdk, version and domains accesses.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Build Status](https://api.travis-ci.org/CoHyper/grunt-phonegap-project.svg?branch=master)](https://travis-ci.org/CoHyper/grunt-phonegap-project) [![GitHub version](https://badge.fury.io/gh/CoHyper%2Fgrunt-phonegap-project.svg)](http://badge.fury.io/gh/CoHyper%2Fgrunt-phonegap-project) [![Dependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project.png)](https://david-dm.org/CoHyper/grunt-phonegap-project)
[![devDependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project/dev-status.png)](https://david-dm.org/CoHyper/grunt-phonegap-project#info=devDependencies) [![Gittip](http://img.shields.io/gittip/CoHyper.png)](https://www.gittip.com/CoHyper/)

[![NPM](https://nodei.co/npm/grunt-phonegap-project.png?downloads=true)](https://nodei.co/npm/grunt-phonegap-project/)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command.

```
$ npm install grunt-phonegap-project --save-dev
```

It may be enabled inside your Gruntfile with this line of JavaScript:

```
grunt.loadNpmTasks('grunt-phonegap-project');
```

## The "phonegap_project" Require

#### Platform SDK
To add support or rebuild a project for any platform, you need from the same machine that [supports the platform's SDK](http://docs.phonegap.com/en/edge/guide_cli_index.md.html).

#### Cordova
```
$ npm install cordova -g
```

## The "phonegap_project" Options
All options are optional.

#### path
Type: `String`, Default: `phoneGapProject`<br />
Path to install the phonegap app.

#### androidMinSdk
Type: `Number`<br />
Changed in `./platforms/android/AndroidManifest.xml` after `task.create`.

#### androidTargetSdk
Type: `Number`<br />
Changed in `./platforms/android/AndroidManifest.xml` after `task.create`.

#### version
Type: `String`, Default no edit file and used cordova normaly version `0.0.1`<br />
Change the version in the config.xml

#### copyConfigXml
Type `Boolean`, Default: `false`<br />
Copy the file `./config.xml` to folder `.www/`. On test with a webserver need this file.

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

* `access`<br />
Type `Array`, Default `["*"]`<br />
Define the set of external domains the app is allowed to communicate with. The default value shown above allows it to access any server.

```
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
```

#### build
* platforms<br />
Type: `Array`, Default: `[]`

```
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
```

## Full Examples
```
grunt.initConfig({
  phonegap_project: {
    options: {
      path: 'myyApp',
      androidMinSdk: 10,
      androidTargetSdk: 19,
      copyConfigXml: true,
      version: "1.0.0"
    },
    create: {
      deleteOptionsPath: true,
      title: 'MyyApp',
      bundleId: 'de.myylinks.myyapp',
      access: [
        'http://myylinks.de/',
        'http://gruntjs.com/',
        'http://github.com/'
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
```

## Release History

##### 2014-08-14 v0.1.3
* update grunt to 0.4.5
* add lodash
* add new variable deleteOptionsPath
* add debug comments
* add new variable version
* add new variable access
* add new variable copyConfigXml
* little bugfixes
* update readme.md

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