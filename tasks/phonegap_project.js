/* jshint strict: false */
/* jslint node: true */
'use strict';

/*
 * grunt-phonegap-project
 * https://github.com/CoHyper/grunt-phonegap-project
 *
 * Copyright (c) 2014 svenlang
 * Licensed under the MIT license.
 */


var _ = require('lodash');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    // require('./lib/set').init(grunt);

    grunt.registerMultiTask('phonegap_project', 'Build a Phonegap application.', function() {

        var UNDEFINED_ANDROID_MIN_SDK = -1,
            UNDEFINED_ANDROID_TARGET_SDK = -1,
            DEFAULT_DELETE_OPTION_PATH = true,
            done = this.async(),
            isAndroidPlatformAdded = false,
            fileAndroidManifest = '/platforms/android/AndroidManifest.xml',
            options = this.options({
                // require global options
                title: 'MyyApp',
                bundleId: 'de.myylinks.myyapp',
                path: 'phoneGapProject',
                androidMinSdk: UNDEFINED_ANDROID_MIN_SDK,
                androidTargetSdk: UNDEFINED_ANDROID_TARGET_SDK
            });


        function getMessage(name) {
            var message = {
                buildPlatform: 'Please Wait, we build App Platform: ',
                pathNoExists: 'The path no exists: ',
                valueDeleteOptionsPathError: 'Check Variable "deleteOptionsPath".'
            };
            return '# ' + message[name] || name;
        }


        function replaceAndroidSdk() {
            var filePath = options.path + fileAndroidManifest,
                fileSource = grunt.file.read(filePath),
                fileReplace = '',
                isFileChanged = false,
                minSdkExp = /minSdkVersion\=\"[0-9]+\"/,
                targetSdkExp = /targetSdkVersion\=\"[0-9]+\"/;

            // check filePath is exists already in addPlatforms()

            // search 'android:minSdkVersion="xx"'
            if (fileSource.match(minSdkExp) && options.androidMinSdk !== UNDEFINED_ANDROID_MIN_SDK) {
                fileReplace = 'minSdkVersion="' + options.androidMinSdk + '"';
                grunt.file.write(filePath, fileSource.replace(minSdkExp, fileReplace));
                isFileChanged = true;
            }

            // search 'android:targetSdkVersion="xx"'
            if (fileSource.match(targetSdkExp) && options.androidTargetSdk !== UNDEFINED_ANDROID_TARGET_SDK) {
                fileReplace = 'targetSdkVersion="' + options.androidTargetSdk + '"';

                // read fileSource again
                if (isFileChanged) {
                    fileSource = grunt.file.read(filePath);
                }
                grunt.file.write(filePath, fileSource.replace(targetSdkExp, fileReplace));
            }
        }


        function build(data) {
            data = data ? data : done(false);

            var items = data.platforms;

            // check if app exists
            if (grunt.file.exists(options.path)) {

                items.forEach(function(platform) {

                    // check is platforms installed
                    if (grunt.file.exists(options.path + '/platforms/' + platform)) {
                        grunt.log.ok(getMessage('buildPlatform') + platform.toUpperCase());

                        // cordova build <platform>
                        grunt.util.spawn({
                            cmd: 'cordova',
                            args: [
                                'build',
                                platform
                            ],
                            opts: {
                                cwd: options.path
                            }
                        }, onCompleted);
                    }
                });
            } else {
                grunt.log.warn(getMessage('pathNoExists') + options.path);
            }
        }


        function create(data) {
            data = data ? data : done(false);

            var isUserRmDir = data.deleteOptionsPath || DEFAULT_DELETE_OPTION_PATH;

            if (!_.isBoolean(isUserRmDir)) {
                grunt.log.warn(getMessage('valueDeleteOptionsPathError'));
                done(false);
            }

            // delete old app
            if (grunt.file.exists(options.path) && isUserRmDir) {
                grunt.file.delete(options.path, {force: true});
            }

            // create new folder
            // BUGFIX: "cordova platform" need an exist folder
            grunt.file.mkdir(options.path);

            // cordova create <folder> <bundleid> <title>
            grunt.util.spawn({
                cmd: 'cordova',
                args: [
                    'create',
                    options.path,
                    (data.bundleId || options.bundleId),
                    (data.title || options.title)
                ]
            }, function(error, result, code) {
                if (code) {
                    grunt.log.warn(code);
                    grunt.log.warn(result);
                    grunt.log.warn(error);
                    grunt.log.warn(result.stderr);
                } else {
                    grunt.log.ok(result.stdout);

                    addPlatforms(data.platforms);

                    addPlugins(data.plugins);
                }
            });
        }


        function addPlatforms(data) {
            data = data ? data : done(false);

            data.forEach(function(platform) {

                // check for android SDK
                if (platform === 'android') {
                    isAndroidPlatformAdded = true;
                }

                // cordova platform add <platform>
                grunt.util.spawn({
                    cmd: 'cordova',
                    args: [
                        'platform',
                        'add',
                        platform
                    ],
                    opts: {
                        cwd: options.path
                    }
                }, function (error, result, code) {
                    if (code) {
                        grunt.log.warn(code);
                        grunt.log.warn(result);
                        grunt.log.warn(error);
                        grunt.log.warn(result.stderr);
                        done(false);
                    } else {
                        grunt.log.ok(result.stdout);

                        if (isAndroidPlatformAdded && grunt.file.isFile(options.path + '/' + fileAndroidManifest)) {
                            replaceAndroidSdk();
                        }
                    }
                });
            });
        }


        function addPlugins(data) {
            data = data ? data : done(false);

            data.forEach(function(plugin) {

                // cordova plugin add <plugin>
                grunt.util.spawn({
                    cmd: 'cordova',
                    args: [
                        'plugin',
                        'add',
                        plugin
                    ],
                    opts: {
                        cwd: options.path
                    }
                }, onCompleted);
            });
        }


        function onCompleted(error, result, code) {
            if (code) {
                grunt.log.warn(code);
                grunt.log.warn(result);
                grunt.log.warn(error);
                grunt.log.warn(result.stderr);
                done(false);
            } else {
                grunt.log.ok(result.stdout);
            }
        }


        // console.log(this.target);
        // console.log(this.data);
        switch(this.target) {
            case 'create':
                create(this.data);
                break;
            case 'build':
                build(this.data);
                break;
            default:
                done(false);
                break;
        }

    });
};