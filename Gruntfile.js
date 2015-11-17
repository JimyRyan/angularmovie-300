module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        express: {
            options: {
                port: 8080,
                hostname: '*',
                server: 'server/server-dev.js'
            },
            livereload: {
                options: {
                    livereload:     false,
                    serverreload:   false,
                    bases:          []
                }
            }
        },
        watch: {
            js: {
                files: ['**/*.js'],
                tasks: ['express']
            }
        }
    });

    grunt.registerTask('default', ['express', 'watch']);

};