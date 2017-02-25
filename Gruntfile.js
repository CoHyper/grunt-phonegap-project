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
					isDevelopment: true,
					deleteOptionsPath: true,
					path: "travis_only_platforms",
					platforms: [
						"browser",
						"android"
					]
				}
			},
			travis_only_plugins: {
				options: {
					isDevelopment: true,
					deleteOptionsPath: true,
					path: "travis_only_plugins",
					plugins: [
						"cordova-plugin-battery-status",
						"cordova-plugin-camera"
					]
				}
			},
			travis_all: {
				options: {
					isDevelopment: true,
					deleteOptionsPath: true,
					path: "travis_all",
					platforms: [
						"browser",
						"android"
					],
					plugins: [
						"cordova-plugin-device",
						"cordova-plugin-dialogs"
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
