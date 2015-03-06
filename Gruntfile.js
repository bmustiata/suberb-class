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
                "target/"
            ]
        }
    });

    // load NPM tasks:
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // register our tasks:
    grunt.registerTask('default', ['clean', 'mochaTest']);
};
