module.exports = function(grunt) {
  'use strict';

  // configuração do projeto
  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        src: ['resource/js/index.js'],
        dest: 'www/js/index.min.js'
      }
    },
    cssmin: {
      dist: {
        src: ['resource/css/index.css','resource/css/FontAwesome.css'],
        dest: 'www/css/index.min.css'
      }
    },
    copy: {
      bower: {
         expand: true,
         cwd: 'resource/bower_components',
         src: '**',
         dest: 'www/bower_components/'
      },
      fonts:{
        expand: true,
        cwd: 'resource/fonts',
        src: '**',
        dest: 'www/fonts/'
     },
     res:{
      expand: true,
      cwd: 'resource/res',
      src: '**',
      dest: 'www/res/'
   }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'www/index.html': 'resource/index.html',     // 'destination': 'source'
        }
      },
    }
  };

  grunt.initConfig(gruntConfig);

  // carregando plugins
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  
  // tarefas
  grunt.registerTask('default',['cssmin','uglify','copy:bower','copy:fonts','copy:res','htmlmin']);
};
