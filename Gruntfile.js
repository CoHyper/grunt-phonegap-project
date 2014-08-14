/*
 * grunt-phonegap-project
 * https://github.com/CoHyper/grunt-phonegap-project
 *
 * Copyright (c) 2014 svenlang
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');


module.exports = function(grunt) {
    grunt = _.isObject(grunt) ? grunt : {};

    /**
     * Testing local and with Travis without any changes
     * TODO : perhaps other solution
     *
     * @method getTaskValues
     * @returns {Object}
     */
    function getTaskValues() {
        // Travis no supported multilanguage, (cant install iOS and/or Android SDK)
        // add all cordova plugins, for testing with Travis
        var jsonFile = 'tasks/options/options_production.json',
            obj;

        // check if file local exists
        if (grunt.file.isFile('../grunt_dummy.js')) {
            grunt.log.ok('########################');
            grunt.log.ok('# STATUS "DEVELOPMENT" #');
            grunt.log.ok('########################');
            jsonFile = 'tasks/options/options_development.json';
        }
        obj = grunt.file.readJSON(jsonFile);
        return _.isObject(obj) ? obj : {};
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

        // Configuration to be run
        phonegap_project: {
            options: {
                //path: 'newapp',
                androidMinSdk: 9,
                androidTargetSdk: 10,
                version: "1.2.4" // TODO : add new variables
            },
            create: {
                title: 'NewApp',
                bundleId: 'de.myylinks.newapp',
                platforms: getTaskValues().platforms,
                plugins: getTaskValues().plugins,
                deleteOptionsPath: true,
                // TODO : add new variables
                access: [
                    "http://myylinks.de",
                    "http://www.myylinks.de"
                ]
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