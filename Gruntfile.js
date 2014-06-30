module.exports = function (grunt) {

    // Configuration
    grunt.initConfig({
        "connect": {
            "server": {
                "options": {
                    "port": 9001,
                    "keepalive": false,
                    "open": true
                }
            }
        },

        "watch": {
            "sass": {
                "files": ['sass/*.scss'],
                "tasks": ['sass'],
                "options": {
                    'livereload': true,
                    'spawn': false,
                }
            },

            "jade" : {
                "files": ['*.jade', 'src/*.jade'],
                "tasks": ['jade'],
                "options" : {
                    "livereload": true
                }
            }
        },

        "sass": {
            dist: {
                "files": [
                    {
                        'expand': true,
                        'flatten': true,
                        'cwd': 'sass',
                        'src': ['*.scss'],
                        'dest': 'stylesheets',
                        'ext': '.css'
                    }
                ]
            }
        },

        "jade": {
          "compile": {
            
            "options": {
              "data": {
                debug: false
              },
              "pretty": true
            },

            "files": [
                {
                    'expand': true,
                    'flatten': true,
                    'src': ['src/*.jade'],
                    'dest': 'build',
                    'ext': '.html'
                }
            ]
          }
        },

        "premailer": {
            'simple': {
                "options": {},
                "files": [
                    {
                        'expand': true,
                        'flatten': true,
                        'src': ['build/*.html'],
                        'dest': 'dist'
                    }
                ]
            }
        },

        "contributors": {
          master: {
            path: './CONTRIBUTORS.md',
            branch: 'master',
            chronologically: false
          }
        }

    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-git-contributors');

    // Custom Tasks
    grunt.registerTask('default', ["connect", "watch"]);
    grunt.registerTask('inline', ["premailer"]);
    grunt.registerTask('buildContributors', ["contributors:master"]);
};