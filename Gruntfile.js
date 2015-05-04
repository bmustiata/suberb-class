/**
 * Grunt project configuration.
 */
module.exports = function(grunt) {
    // configuration for the plugins.
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'target/tests_results.txt'
                },
                src: ['test/**/*.js']
            }
        },

        clean: {
            dist : [
                "lib/",
                "target/"
            ],

            client : [
                "client/"
            ]
        },

        concat: {
            options: {
                sourceMap: true
            },

            dist: {
                files : [
                    {
                        src: [
                            'src/core/class-definition.js',
                            'src/core/superb-class.js',
                            'src/node/exports.js'
                        ],
                        dest: 'lib/superb-class.js'
                    }
                ]
            },

            client: {
                files: [
                    {
                        src: [
                            'src/client/wrap-before.js',
                            'src/core/class-definition.js',
                            'src/core/superb-class.js',
                            'src/client/exports.js',
                            'src/client/wrap-after.js'
                        ],
                        dest: "client/superb-class.js"
                    }
                ]
            }
        }
    });

    // load NPM tasks:
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // register our tasks:
    grunt.registerTask('build-node', ['clean:dist', 'concat:dist', 'mochaTest']);
    grunt.registerTask('build-client', ['clean:client', 'concat:client']);

    grunt.registerTask('default', ['build-node', 'build-client']);
};

