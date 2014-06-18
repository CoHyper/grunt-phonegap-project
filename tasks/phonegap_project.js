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

        var done = this.async(),
            UNDEFINED_ANDROID_MIN_SDK = -1,
            UNDEFINED_ANDROID_TARGET_SDK = -1,
            DEFAULT_DELETE_OPTION_PATH = false,
            isAndroidPlatformAdded = false,
            fileAndroidManifest = '/platforms/android/AndroidManifest.xml',
            options = this.options({
                // require global options
                title: 'MyyApp',
                bundleId: 'de.myylinks.myyapp',
                path: 'phoneGapProject',
                androidMinSdk: UNDEFINED_ANDROID_MIN_SDK,
                androidTargetSdk: UNDEFINED_ANDROID_TARGET_SDK,
                version: false
            });


        /**
         * Gets a specific string message
         *
         * @method getMessage
         * @param name {String} The key of the message to get
         * @returns {String} The message if exist or empty String
         * @example
         *      getMessage("buildPlatform");
         */
        function getMessage(name) {
            name = _.isString(name) ? name : false;
            if (name) {
                var message = {
                    buildPlatform: 'Please wait, we build App Platform: ',
                    pathNoExists: 'The path no exists: ',
                    fileNoExists: 'The file no exists: ',
                    valueDeleteOptionsPathError: 'Check Variable "deleteOptionsPath".'
                };
                return message[name];
            }
            return '';
        }


        /**
         * Edit the config.xml with user settings
         *
         * @method editConfigXml
         * @param data {Object} The Object to config the xml file
         */
        function editConfigXml(data) {
            data = _.isObject(data) ? data : done(false);
            var dataVersion = _.isString(options.version) ? options.version : false,
                dataAccess = _.isArray(data.access) ? data.access : false,
                file = options.path + '/config.xml',
                fileSource,
                versionExp = /version\=\"[0-9\.]+"/,
                defaultAccessExp = /<access\ origin\=\"\*\"\ \/\>/,
                lastTagExp = /<\/widget\>/;

            if (grunt.file.isFile(file)) {

                if (dataVersion) {
                    fileSource = grunt.file.read(file);
                    grunt.file.write(file, fileSource.replace(versionExp, 'version="' + dataVersion + '"'));
                }

                if (dataAccess) {
                    dataAccess.forEach(function(url, index) {

                        // delete default access
                        if (index === 0) {
                            fileSource = grunt.file.read(file);
                            grunt.file.write(file, fileSource.replace(defaultAccessExp, ''));
                        }

                        // create access
                        fileSource = grunt.file.read(file);
                        grunt.file.write(file, fileSource.replace(lastTagExp, '\t<access origin="' + url + '" />\n<\/widget>'));
                    });
                }
            } else {
                grunt.log.warn(getMessage('fileNoExists') + file);
            }
        }


        /**
         * This replace "androidMinsSdk" and "androidTargetSdk", when installed Android and exists "AndroidManifest.xml"
         *
         * @method replaceAndroidSdk
         */
        function replaceAndroidSdk() {
            var filePath = options.path + fileAndroidManifest,
                fileSource = grunt.file.read(filePath),
                fileReplace = '',
                isFileChanged = false,
                minSdkExp = /minSdkVersion\=\"[0-9]+\"/,
                targetSdkExp = /targetSdkVersion\=\"[0-9]+\"/;

            // check filePath is exists, already check in addPlatforms(), but check again
            if (grunt.file.isFile(options.path + '/' + fileAndroidManifest)) {

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
        }


        /**
         * Running "cordova build <platform>" for each platform
         *
         * @method build
         * @param data {Object}
         */
        function build(data) {
            data = _.isObject(data) ? data : done(false);

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


        /**
         * Running "cordova create <path> <bundleid> <title"
         *
         * @method create
         * @param data {Object} The Object to create a new App
         */
        function create(data) {
            data = _.isObject(data) ? data : done(false);

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

                    editConfigXml(data);
                }
            });
        }


        /**
         * Running "cordova platform add <platform>"
         *
         * @method addPlatforms
         * @param data {Array}
         */
        function addPlatforms(data) {
            data = _.isArray(data) ? data : done(false);

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


        /**
         * @method addPlugins
         * @param data {Array}
         */
        function addPlugins(data) {
            data = _.isArray(data) ? data : done(false);

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