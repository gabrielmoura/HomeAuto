module.exports = function(grunt) {
  'use strict';

  // configuração do projeto
  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        src: ['resource/js/index.js'],
        dest: 'src/assets/js/index.min.js'
      }
    },
    cssmin: {
      dist: {
        src: ['resource/css/index.css'],
        dest: 'www/css/index.min.css'
      }
    }
  };

  grunt.initConfig(gruntConfig);

  // carregando plugins
 grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
  // tarefas
  grunt.registerTask('default',['cssmin','uglify']);
};
