/*
 * grunt-phonegap-project
 * https://github.com/CoHyper/grunt-phonegap-project
 *
 * Copyright (c) 2014 svenlang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                "curly": true,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "sub": true,
                "undef": true,
                "boss": true,
                "eqnull": true,
                "node": true
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp', 'myyapp']
        },

        // Configuration to be run (and then tested).
        phonegap_project: {
            options: {
                path: 'myyapp',
                androidMinSdk: 10,
                androidTargetSdk: 19
            },
            create: {
                title: 'MyyApp',
                bundleId: 'de.myylinks.myyapp',
                platforms: [
                    /** comment for travis test
                     * cant install with javascript Android SDK and/or iOS
                     */
                    // 'ios'
                    // 'android'
                ],
                plugins: [
                    // add all cordova plugins, for testing with travis
                    "org.apache.cordova.battery-status",
                    "org.apache.cordova.camera",
                    "org.apache.cordova.console",
                    "org.apache.cordova.contacts",
                    "org.apache.cordova.device",
                    "org.apache.cordova.device-motion",
                    "org.apache.cordova.device-orientation",
                    "org.apache.cordova.dialogs",
                    "org.apache.cordova.file",
                    "org.apache.cordova.file-transfer",
                    "org.apache.cordova.geolocation",
                    "org.apache.cordova.globalization",
                    "org.apache.cordova.inappbrowser",
                    "org.apache.cordova.media",
                    "org.apache.cordova.media-capture",
                    "org.apache.cordova.network-information",
                    "org.apache.cordova.splashscreen",
                    "org.apache.cordova.vibration"
                ]
            },
            build: {
                platforms: [
                    'ios',
                    'android'
                ]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'phonegap_project', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

    // All "phonegap_project" tasks
    grunt.registerTask('project', ['phonegap_project']);
    grunt.registerTask('create', ['phonegap_project:create']);
    grunt.registerTask('build', ['phonegap_project:build']);

};