/*
 * grunt-phonegap-project
 * https://github.com/CoHyper/grunt-phonegap-project
 *
 * Copyright (c) 2014 SvenLang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({

		// Configuration to be run (and then tested).
		phonegap_project: {
			travis_only_platforms: {
				options: {
					path: "build_travis_only_platforms",
					platforms: [
						"browser",
						"android",
						"ios"
					]
				}
			},
			travis_only_plugins: {
				options: {
					path: "build_travis_only_plugins",
					plugins: [
						"cordova-plugin-battery-status",
						"cordova-plugin-camera"
					]
				}
			},
			travis_all: {
				options: {
					path: "build_travis_all",
					platforms: [
						"browser",
						"android",
						"ios"
					],
					plugins: [
						"cordova-plugin-camera",
						"cordova-plugin-console",
						"cordova-plugin-contacts",
						"cordova-plugin-device"
					]
				}
			}
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');


	// By default run all tests.
	grunt.registerTask('default', ['phonegap_project']);

};
