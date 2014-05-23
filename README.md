# grunt-phonegap-project
> Create a [Phonegap](http://www.phonegap.com) Application with config folder, bundleId, platforms, plugins, androidMinSdk and androidTargetSdk.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![GitHub version](https://badge.fury.io/gh/CoHyper%2Fgrunt-phonegap-project.svg)](http://badge.fury.io/gh/CoHyper%2Fgrunt-phonegap-project) [![Dependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project.png)](https://david-dm.org/CoHyper/grunt-phonegap-project) 
[![devDependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project/dev-status.png)](https://david-dm.org/CoHyper/grunt-phonegap-project#info=devDependencies) [![Gittip](http://img.shields.io/gittip/CoHyper.png)](https://www.gittip.com/CoHyper/)

[![NPM](https://nodei.co/npm/grunt-phonegap-project.png?downloads=true)](https://nodei.co/npm/grunt-phonegap-project/)

## License
Copyright (c) 2014 svenlang<br />
Licensed under the MIT license.

## Getting Started
This plugin requires Grunt `~0.4.4`

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

#### cordova
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
WARNING: This task delete folder of `options.path`.

* `title`<br />
Type: `String`, Default: `MyyApp`

* `bundleId`<br />
Type: `String`, Default: `de.myylinks.myyapp`

* `platforms`<br />
Type: `Array`<br />
install directly with cordova command.

* `plugins`<br />
Type: `Array`<br />
install directly with cordova command.

<pre>
grunt.initConfig({
  phonegap_project: {
  options: {},
    create: {
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
Type: `Array`

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
      path: 'phoneGapProject',
      androidMinSdk: 10,
      androidTargetSdk: 19
    },
    create: {
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

##### 2014-05-23 v0.1.2
* update readme.md
* add some tests
* bugfix grunt 

##### 2014-05-22 v0.1.1
* clean project for public

##### 2014-04-24 v0.1.0
* add some defaults cordova commands
* cordova create -folder- -bundleid- -apptitle-
* cordova platform add -platform-
* cordova plugin add -plugin-
* cordova build -platform-