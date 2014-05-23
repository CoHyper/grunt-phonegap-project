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



module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    // require('./lib/set').init(grunt);

    grunt.registerMultiTask('phonegap_project', 'Build a Phonegap application.', function() {

        var UNDEFINED_ANDROID_MIN_SDK = -1,
            UNDEFINED_ANDROID_TARGET_SDK = -1,
            done = this.async(),
            isAndroidPlatformAdded = false,
            options = this.options({
                // require global options
                title: 'MyyApp',
                bundleId: 'de.myylinks.myyapp',
                path: 'phoneGapProject',
                fileAndroidManifest: '/platforms/android/AndroidManifest.xml',
                androidMinSdk: UNDEFINED_ANDROID_MIN_SDK,
                androidTargetSdk: UNDEFINED_ANDROID_TARGET_SDK
            });


        function getMessages(name) {
            var message = {
                // alphabetic order
                buildAllPlatforms: 'we build all app platform(s), please wait ...',
                fileNotExists: 'file not exists: ',
                firstCreateAnApp: 'please first create an app',
                noAndroidInstalled: 'Platform Android is not installed',
                noDataFound: 'no data found',
                waitOnCordova: 'wait till cordova have create all files'
            };
            return message[name] || name;
        }


        function replaceAndroidSdk() {

            var filePath = options.path + options.fileAndroidManifest,
                fileSource = '',
                isFileChanged = false,
                minSdkExp = /minSdkVersion\=\"[0-9]+\"/,
                targetSdkExp = /targetSdkVersion\=\"[0-9]+\"/;

            if (grunt.file.exists(filePath) && grunt.file.isFile(filePath)) {
                // search 'android:minSdkVersion="10"' && 'android:targetSdkVersion="19"'
                fileSource = grunt.file.read(filePath);

                if (fileSource.match(minSdkExp) && options.androidMinSdk !== UNDEFINED_ANDROID_MIN_SDK) {
                    grunt.file.write(filePath, fileSource.replace(minSdkExp, 'minSdkVersion="' + options.androidMinSdk + '"'));
                    isFileChanged = true;
                }

                if (fileSource.match(targetSdkExp) && options.androidTargetSdk !== UNDEFINED_ANDROID_TARGET_SDK) {
                    if (isFileChanged) {
                        // read fileSource again
                        fileSource = grunt.file.read(filePath);
                    }
                    grunt.file.write(filePath, fileSource.replace(targetSdkExp, 'targetSdkVersion="' + options.androidTargetSdk + '"'));
                }

            } else {
                // normally never goes here
                grunt.log.warn(getMessages('noAndroidInstalled'));
                done(false);
            }
        }


        function build(data) {
            data = data ? data : done(false);

            // check if app exists
            if (grunt.file.exists(options.path)) {

                var items = data.platforms;

                grunt.log.ok(getMessages('buildAllPlatforms'));

                items.forEach(function(platform) {
                    grunt.util.spawn({
                        // cordova build <platform>
                        cmd: 'cordova',
                        args: [
                            'build',
                            platform
                        ],
                        opts: {
                            cwd: options.path
                        }
                    }, onCompleted);
                });
            } else {
                grunt.log.warn(getMessages('firstCreateAnApp'));
                done(false);
            }
        }


        function create(data) {
            data = data ? data : done(false);

            // clean old app
            if (grunt.file.isDir(options.path)) {
                grunt.file.delete(options.path, {force: true});
                grunt.file.mkdir(options.path);
            }

            // create new app
            grunt.util.spawn({
                // cordova create <folder> <bundleid> <title>
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
                if (platform === 'android') {
                    // check for android SDK
                    isAndroidPlatformAdded = true;
                }

                grunt.util.spawn({
                    // cordova platform add <platform>
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

                        if (isAndroidPlatformAdded && grunt.file.exists(options.path + '/' + options.fileAndroidManifest)) {
                            replaceAndroidSdk();
                        }
                    }
                });
            });
        }


        function addPlugins(data) {
            data = data ? data : done(false);

            data.forEach(function(plugin) {
                grunt.util.spawn({
                    // cordova plugin add <plugin>
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