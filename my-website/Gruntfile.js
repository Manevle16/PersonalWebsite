const webpackDev = require('./webpack.dev.js');
const webpackProd = require('./webpack.prod.js');
const prettierOptions = require('./prettier.config');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-prettier');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.initConfig({
    prettier: {
      options: { ...prettierOptions },
      files: {
        src: ['*.js', 'src/**/*.*'],
      },
    },
    eslint: {
      target: ['*.js', 'src/**/*.*', '!src/**/*.{scss,css}'],
    },
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['*.{js,jsx,json}', 'src/**/*.*', '!src/**/*.test.*'],
        tasks: ['webpack'],
        options: {
          interrupt: true,
        },
      },
    },
    connect: {
      server: {
        options: {
          host: 'localhost',
          port: 3000,
          base: 'dist/',
          livereload: true,
          open: true,
        },
      },
    },
    webpack: {
      myConfig: process.env.NODE_ENV === 'production' ? webpackProd : webpackDev,
    },
    githooks: {
      all: {
        'pre-commit': 'prettier eslint',
        options: {
          dest: '../.git/hooks',
        },
      },
    },
  });

  grunt.registerTask('default', ['prettier', 'eslint', 'webpack', 'connect', 'watch']);
};
