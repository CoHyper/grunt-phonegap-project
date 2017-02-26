/*
 * grunt-phonegap-project
 * https://github.com/CoHyper/grunt-phonegap-project
 *
 * Copyright (c) 2014 Sven Hedström-Lang
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
					_isDevelopment: true,
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
					_isDevelopment: true,
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
					_isDevelopment: true,
					deleteOptionsPath: true,
					path: "travis_all",
					title: "MyApp",
					bundleId: "com.apuerto.myyapp",
					platforms: [
						"android",
						"browser"
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


	// By default run all tasks.
	grunt.registerTask('default', ['phonegap_project']);

};
