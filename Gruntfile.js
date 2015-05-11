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
                            'src/main/core/class-definition.js',
                            'src/main/core/superb-class.js',
                            'src/main/node/exports.js'
                        ],
                        dest: 'lib/superb-class.js'
                    }
                ]
            },

            client: {
                files: [
                    {
                        src: [
                            'src/main/client/wrap-before.js',
                            'src/main/core/class-definition.js',
                            'src/main/core/superb-class.js',
                            'src/main/client/exports.js',
                            'src/main/client/wrap-after.js'
                        ],
                        dest: "client/superb-class.js"
                    }
                ]
            },

            node_mocha_test: {
                files: [
                    {
                        src: [
                            'src/test/node_mocha/requires.js',
                            'src/test/js/*test.js'
                        ],
                        dest: "test/node_mocha_test.js"
                    }
                ]
            },

            client_mocha_test: {
                files: [
                    {
                        src: [
                            "src/test/js/*test.js"
                        ],
                        dest: "target/client_mocha_tests.js"
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
    grunt.registerTask('build-node', ['clean:dist', 'concat:dist', 'concat:node_mocha_test', 'mochaTest']);

    grunt.registerTask('clean-client', ['clean:client']);
    grunt.registerTask('build-client', ['concat:client', 'concat:client_mocha_test']);

    grunt.registerTask('default', ['clean-client', 'build-client', 'build-node']);
};

