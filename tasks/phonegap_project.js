'use strict';

/*
 * grunt-phonegap-project
 * https://github.com/CoHyper/grunt-phonegap-project
 *
 * Copyright (c) 2014 SvenLang
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

	// BUGFIX: "cordova platform" need an exist folder
	// grunt.file.mkdir(options.path);

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	/**
	 * 1. create
	 * 2. platforms and/or plugins
	 * done
	 */

	grunt.registerMultiTask('phonegap_project', 'The best Grunt plugin ever.', function () {
		var done = this.async();
		var timer = 2000;

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			path: 'build_3',
			title: 'any',
			bundleId: 'com.any.more',
			platforms: [
				'browser'
				// todo need solution for travis -> , 'android'
			],
			plugins: [
				'cordova-plugin-device',
				'cordova-plugin-dialogs'
			]
		});



		/**
		 * Require delete old app before new install.
		 */
		//if (!grunt.file.exists(options.path)) {
			if (grunt.file.isDir(options.path) === false) {

			//grunt.file.delete(options.path, {force: true});
			//grunt.log.warn('Please delete existing folder \"' + options.path + '\"');
			// done(false);


			if (options.path && options.bundleId && options.title) {
				/**
				 * "cordova create <path> <bundleId> <title>"
				 */
				grunt.util.spawn({
					cmd: 'cordova',
					args: [
						'create',
						options.path,
						options.bundleId,
						options.title
					]
				},
					/**
					 *
					 * @param error
					 * @param result
					 * @param code
					 */
					function (error, result, code) {
					if (code) {
						grunt.log.warn(code);
						grunt.log.warn(result);
						grunt.log.warn(error);
						grunt.log.warn(result.stderr);
						done(false);
					} else {

						grunt.log.ok(result.stdout);

						setTimeout(function () {

							// first add platforms
							if (options.platforms.length) {
								addPlatforms();
							} else if (options.plugins.length) {
								addPlugins();
							} else {
								// grunt.log.ok('fertig');
								done(true);
							}

						}, timer);
					}
				});

			}
		}
		// else {grunt.log.warn('todo error - folder exits');done(false);}


		/**
		 * "cordova platform add <platform> --save"
		 */
		function addPlatforms() {

			var length = options.platforms.length;
			// check for android SDK
			// if (platform === 'android') {isAndroidPlatformAdded = true;}

			// cordova platform add <platform> --save

			options.platforms.forEach(function (item, index) {
				grunt.util.spawn({
					cmd: 'cordova',
					args: [
						'platform',
						'add',
						item,
						'--save'
					],
					opts: {
						cwd: options.path
					}
				},

					/**
					 *
					 * @param error
					 * @param result
					 * @param code
					 */
					function (error, result, code) {
					if (code) {
						grunt.log.warn(code);
						grunt.log.warn(result);
						grunt.log.warn(error);
						grunt.log.warn(result.stderr);
						done(false);
					} else {
						grunt.log.ok(result.stdout);

						if (length -1 === index) {
							setTimeout(function () {
								addPlugins();
							}, timer)

						}

						// if (isAndroidPlatformAdded && grunt.file.isFile(options.path + '/' + fileAndroidManifest)) {replaceAndroidSdk();}
					}
				});
			});
		}

		/**
		 * "cordova plugin add <plugin> --save"
		 */
		function addPlugins() {

			var length = options.plugins.length;

			options.plugins.forEach(function (item, index) {
				grunt.util.spawn({
					cmd: 'cordova',
					args: [
						'plugin',
						'add',
						item,
						'--save'
					],
					opts: {
						cwd: options.path
					}
				},
					/**
					 *
					 * @param error
					 * @param result
					 * @param code
					 */
					function (error, result, code) {
					if (code) {
						grunt.log.warn(code);
						grunt.log.warn(result);
						grunt.log.warn(error);
						grunt.log.warn(result.stderr);
						done(false);
					} else {
						grunt.log.ok(result.stdout);
						if (length - 1 === index) {
							// grunt.log.ok('2 fertig plugins');
							done(true);
						}
					}
				});
			});

		}


		console.log(this.target);
		console.log(this.data);


	});


};
