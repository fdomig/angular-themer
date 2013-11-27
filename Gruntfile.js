module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-push-release');

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
        },

        push: {
            options: {
                files: ['package.json'],
                add: true,
                addFiles: ['.'], // '.' for all files except ingored files in .gitignore
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'], // '-a' for all files
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                npm: false,
                npmTag: 'Release v%VERSION%',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        }

	};

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

};