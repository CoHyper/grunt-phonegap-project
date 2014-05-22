# grunt-phonegap-project
> Build a [Phonegap](http://www.phonegap.com) application.

[![Dependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project.png)](https://david-dm.org/CoHyper/grunt-phonegap-project) 
[![devDependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project/dev-status.png)](https://david-dm.org/CoHyper/grunt-phonegap-project#info=devDependencies)
[![Gittip](http://img.shields.io/gittip/CoHyper.png)](https://www.gittip.com/CoHyper/)

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

#### cordova
<pre>
$ npm install cordova -g
</pre>

#### need SDK for install platform(s)
* [Android](http://developer.android.com/sdk/index.html)
* iOS

## The "phonegap_project" Options
All options are optional.

#### path
Type: `String`, Default: `phoneGapProject`<br />
Path to install the phonegap app.

#### androidMinSdk
Type: `Integer`<br />
Changed in `./platforms/android/AndroidManifest.xml` after create new app.

#### androidTargetSdk
Type: `Integer`<br />
Changed in `./platforms/android/AndroidManifest.xml` after create new app.

## The "phonegap_project" task

#### create
WARNING: This function delete folder of `options.path`.

* `title`<br />
Type: `String`, Default: `MyyApp`

* `bundleId`<br />
Type: `String`, Default: `de.myylinks.myyapp`

* `platforms`<br />
Type: `Array`<br />
install directly with cordova command

* `plugins`<br />
Type: `Array`<br />
install directly with cordova command

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

grunt.registerTask('phonegap: 1 create new app', ['phonegap_project:create']);
</pre>

#### build
* platforms<br />
Type: `Array`

<pre>
grunt.registerTask('phonegap: 2 build app', ['phonegap_project:build']);
</pre>

## Full Examples
<pre>
grunt.initConfig({
  phonegap_project: {
    options: {
      path: 'phoneGapProject',
      androidMinSdk: 10
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

grunt.registerTask('phonegap: 1 create new app', ['phonegap_project:create']);
grunt.registerTask('phonegap: 2 build app', ['phonegap_project:build']);
</pre>

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

##### 2014-05-22 v0.1.1
* clean project for public

##### 2014-04-24 v0.1.0
* add some defaults cordova commands
  * cordova create -folder- -bundleid- -apptitle-
  * cordova platform add -platform-
  * cordova plugin add -plugin-
  * cordova build -platform-
