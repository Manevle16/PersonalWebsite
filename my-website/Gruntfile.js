const webpackDev = require('./webpack.dev.js');
const webpackProd = require('./webpack.prod.js');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-prettier');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.initConfig({
    prettier: {
      options: {
        singleQuote: true,
        jsxSingleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        semi: true,
        trailingComma: 'none',
        endOfLine: 'crlf'
      },
      files: {
        src: ['*.js', 'src/**/*.*']
      }
    },
    eslint: {
      target: ['*.js', 'src/**.js']
    },
    watch: {
      options: {
        livereload: true
      },
      prettier: {
        files: ['*.js', 'src/**/*.*'],
        tasks: ['prettier']
      },
      eslint: {
        files: ['*.js', 'src/**.js'],
        tasks: ['eslint']
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['webpack'],
        options: {
          interrupt: true
        }
      }
    },
    connect: {
      server: {
        options: {
          host: 'localhost',
          port: 3000,
          base: 'dist/'
        }
      }
    },
    webpack: {
      myConfig: process.env.NODE_ENV === 'production' ? webpackProd : webpackDev
    },
    githooks: {
      all: {
        'pre-commit': 'prettier eslint',
        options: {
          dest: '../.git/hooks'
        }
      }
    }
  });

  grunt.registerTask('default', ['webpack', 'connect', 'watch']);
};
