module.exports = function(grunt) {
    grunt.initConfig({
        clean: ["www"],
        'http-server': {
            dev: {
                root: "www/" ,
                port: 8080,
                host: "127.0.0.1",
                ext: "html"
            }
        },
        copy: {
            index: {
                expand: true,
                src: ['src/*.html'],
                dest: 'www/',
                filter: 'isFile',
                flatten: true
            },
            js: {
                expand: true,
                src: ['src/js/*.js'],
                dest: 'www/lib/',
                filter: 'isFile',
                flatten: true
            },
            css: {
                expand: true,
                src: ['src/css/*.css'],
                dest: 'www/css/',
                filter: 'isFile',
                flatten: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'copy', 'http-server']);
};
