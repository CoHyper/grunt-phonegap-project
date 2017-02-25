'use strict';

/*
 * grunt-phonegap-project
 * https://github.com/CoHyper/grunt-phonegap-project
 *
 * Copyright (c) 2014 SvenLang
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

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
		var developmentFolder = 'build';

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			isDevelopment: false,
			deleteOptionsPath: false,
			path: 'build',
			title: 'MyyApp',
			bundleId: 'de.myylinks.myyapp',
			platforms: [],
			plugins: []
		});


		// debugging
		if (options.isDevelopment) {
			console.log(this.target, this.data);
		}

		// let start
		createNewApp();


		/**
		 * The Main function
		 */
		function createNewApp() {

			cleanFolder();

			// only if the folder of options.path not exists create new app
			if (grunt.file.isDir(options.path) === false) {

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
				}, function (error, result, code) {
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
								if (options.isDevelopment) {
									grunt.log.ok('### Done');
								}
								done(true);
							}

						}, timer);
					}
				});
			}
			// else {grunt.log.warn('The folder already exits');done(false);}
		}


		/**
		 * "cordova platform add <platform> --save"
		 */
		function addPlatforms() {

			var platformsLength = options.platforms.length;

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
				}, function (error, result, code) {
					if (code) {
						grunt.log.warn(code);
						grunt.log.warn(result);
						grunt.log.warn(error);
						grunt.log.warn(result.stderr);
						done(false);
					} else {
						grunt.log.ok(result.stdout);

						if (platformsLength - 1 === index) {
							if (options.isDevelopment) {
								grunt.log.ok('### Adding all platforms');
							}
							setTimeout(function () {
								addPlugins();
							}, timer)

						}
					}
				});
			});
		}

		/**
		 * "cordova plugin add <plugin> --save"
		 */
		function addPlugins() {

			var pluginsLength = options.plugins.length;

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
				}, function (error, result, code) {
					if (code) {
						grunt.log.warn(code);
						grunt.log.warn(result);
						grunt.log.warn(error);
						grunt.log.warn(result.stderr);
						done(false);
					} else {
						grunt.log.ok(result.stdout);
						if (pluginsLength - 1 === index) {
							if (options.isDevelopment) {
								grunt.log.ok('### Adding all plugins');
								grunt.log.ok('### Done');
							}
							done(true);
						}
					}
				});
			});
		}

		/**
		 * Require empty app folder.
		 */
		function cleanFolder() {
			// for testing and travis
			if (options.isDevelopment) {
				options.path = developmentFolder + '/' + options.path;
				grunt.file.mkdir(developmentFolder);
			}

			// require empty folder
			if (options.deleteOptionsPath) {
				grunt.file.delete(options.path, { force: true });
			}
		}

	});


};
