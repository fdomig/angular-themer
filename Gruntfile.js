module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-push-release');
    grunt.loadNpmTasks('grunt-contrib-uglify');

	var userConfig = {
        src_dir: 'src',
        build_dir: 'build',
        compile_dir: 'dist'
    };

	var taskConfig = {

        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON("package.json"),
		
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
        },

        /**
         * Uglify the JS sources
         */
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>',
                    exportAll: true,
                    mangle: false,
                    report: 'min'
                },
                files: {
                    '<%= compile_dir %>/themer.min.js': '<%= src_dir %>/themer.js'
                }
            }
        },

        meta: {
            banner: '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                ' */\n'
        }

	};

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    /**
     * Compile lib for deployment.
     */
    grunt.registerTask('compile', [
        'uglify'
    ]);

};