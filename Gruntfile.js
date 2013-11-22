module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-karma');

	var userConfig = {
        src_dir: 'src',
        vendor_dir: 'vendor',
        build_dir: 'build',
        compile_dir: 'compile'
    };

	var taskConfig = {
		
		/**
         * The Karma configurations.
         */
        karma: {
            options: {
                configFile: 'karma-unit.js'
            },
            unit: {
                port: 9019,
                background: true
            },
            continuous: {
                singleRun: true
            }
        }

	};

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

};