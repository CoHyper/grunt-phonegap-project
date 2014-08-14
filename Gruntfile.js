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

        // testing with Travis - add all cordova plugins, but no supported multilanguage (cant install iOS and/or Android SDK)
        var jsonFile = 'tasks/options/options_production.json',
            obj;

        // check if file local exists
        if (grunt.file.isFile('../grunt_dummy.js')) {
            grunt.log.ok('########################');
            grunt.log.ok('# STATUS "DEVELOPMENT" #');
            grunt.log.ok('########################');

            // local test with own file
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
                'tasks/*.js'
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
                'tmp',
                // default folder
                'phoneGapProject',
                // settings folder
                'newapp',
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
                androidMinSdk: 20,
                androidTargetSdk: 30,
                version: "2.3.4",
                copyConfigXml: true
            },
            create: {
                title: 'NewApp',
                bundleId: 'de.myylinks.newapp',
                platforms: getTaskValues().platforms,
                plugins: getTaskValues().plugins,
                deleteOptionsPath: true,
                access: [
                    "http://myylinks.de",
                    "http://www.myylinks.de"
                ]
            },
            build: {
                platforms: getTaskValues().platforms
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // By default, jshint and create new project.
    grunt.registerTask('default', ['clean', 'jshint', 'phonegap_project']);
    grunt.registerTask('clean files', ['clean']);

    // All "phonegap_project" tasks
    grunt.registerTask('1 create new App', ['phonegap_project:create']);
    grunt.registerTask('2 build App', ['phonegap_project:build']);

};