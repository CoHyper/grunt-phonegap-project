/*
 * grunt-phonegap-project
 * https://github.com/CoHyper/grunt-phonegap-project
 *
 * Copyright (c) 2014 svenlang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // local and travis testing without any changed
    function getTaskValues() {
        // TODO : perhaps other solution
        // check if file local exists
        var jsonFile;
        if (grunt.file.isFile('../grunt_dummy.js')) {
            grunt.log.ok('########################');
            grunt.log.ok('# STATUS "DEVELOPMENT" #');
            grunt.log.ok('########################');
            jsonFile = 'tasks/options/options_development.json';
        } else {
            jsonFile = 'tasks/options/options_production.json';
        }
        return grunt.file.readJSON(jsonFile);
    }

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
            tests: [
                // default folder
                'phoneGapProject',
                // settings folder
                'myyApp'
            ]
        },

        // Configuration to be run (and then tested).
        phonegap_project: {
            options: {
                //path: 'newapp',
                androidMinSdk: 20,
                androidTargetSdk: 30
            },
            create: {
                title: 'NewApp',
                bundleId: 'de.myylinks.newapp',
                platforms: getTaskValues().platforms,
                plugins: getTaskValues().plugins,
                deleteOptionsPath: true
            },
            build: {
                platforms: getTaskValues().platforms
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
    grunt.registerTask('1 create new App', ['phonegap_project:create']);
    grunt.registerTask('2 build App', ['phonegap_project:build']);

};