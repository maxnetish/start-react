module.exports = function (grunt) {

    var publicJs = 'public/js';
    var publicCss = 'public/css';
    var publicFonts = 'public/fonts';
    var nodeModules = 'node_modules';

    var gruntReact = require('grunt-react');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [
            publicJs,
            publicCss,
            publicFonts
        ],
        browserify: {
            options: {
                transform: [[gruntReact.browserify, {extension: 'jsx'}]],
                browserifyOptions: {
                    debug: true
                }
            },
            'public/js/app-react.js': ['webapp/js/app-react.js'],
            'public/js/app-ko.js': ['webapp/js/app-ko.js']
        },
        uglify: {
            buildAll: {
                files: {
                    'public/js/app-react.min.js': ['public/js/app-react.js'],
                    'public/js/app-ko.min.js': ['public/js/app-ko.js']
                }
            },
            options: {
                compress: {
                    drop_console: true
                }
            }
        },
        less: {
            build: {
                files: [
                    {
                        src: 'webapp/less/style.less',
                        dest: publicCss + '/app.css'
                    }
                ]
            },
            options: {
                // sourceMap: true
                cleancss: true
            }
        },
        copy: {
            buildAll: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: 'webapp/fonts/*',
                        dest: publicFonts + '/'
                    }
                ]
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['clean', 'browserify', 'uglify', 'less', 'copy']);
};
