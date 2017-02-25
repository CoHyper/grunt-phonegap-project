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
			test_local: {
				options: {
					path: "build_test_only_platforms",
					platforms: [
						"browser",
						"android",
						"ios"
					],
					plugins: [
						"cordova-plugin-battery-status",
						"cordova-plugin-camera"
					]
				}
			},
			travis_nothing: {
				options: {
					path: "build_travis_nothing"
				}
			},
			travis_only_platforms: {
				options: {
					path: "build_travis_only_platforms",
					platforms: [
						"browser",
						"android"
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
						"browser"
					],
					plugins: [
						"cordova-plugin-battery-status",
						"cordova-plugin-camera",
						"cordova-plugin-console",
						"cordova-plugin-contacts",
						"cordova-plugin-device",
						"cordova-plugin-device-motion",
						"cordova-plugin-device-orientation",
						"cordova-plugin-dialogs",
						"cordova-plugin-file",
						"cordova-plugin-file-transfer",
						"cordova-plugin-geolocation",
						"cordova-plugin-globalization",
						"cordova-plugin-inappbrowser",
						"cordova-plugin-media",
						"cordova-plugin-media-capture",
						"cordova-plugin-network-information",
						"cordova-plugin-splashscreen",
						"cordova-plugin-statusbar",
						"cordova-plugin-vibration",
						"cordova-plugin-whitelist"
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
