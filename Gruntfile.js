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
    grunt.registerTask('default', ['jshint', 'test', 'phonegap_project:create', 'phonegap_project:build']);

    grunt.registerTask('1 create', ['phonegap_project:create']);
    grunt.registerTask('2 build', ['phonegap_project:build']);


};