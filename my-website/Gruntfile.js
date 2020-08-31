module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-prettier');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-contrib-watch');

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
      prettier: {
        files: ['*.js', 'src/**/*.*'],
        tasks: ['prettier']
      },
      eslint: {
        files: ['*.js', 'src/**.js'],
        tasks: ['eslint']
      }
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

  grunt.registerTask('default', ['githooks', 'prettier', 'eslint']);
};
