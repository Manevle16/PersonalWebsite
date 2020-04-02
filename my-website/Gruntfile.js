module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-prettier');
  grunt.loadNpmTasks('grunt-githooks');

  grunt.initConfig({
    prettier: {
      options: {
        singleQuote: true
      },
      files: {
        src: ['*.js', 'src/**/*.*']
      }
    },
    eslint: {
      target: ['*.js', 'src/**.js']
    },
    run: {
      options: {
        // ...
      },
      npm_start: {
        exec: 'npm run start'
      },
      npm_test_jest: {
        exec: 'npm run test' // <-- use the exec key.
      }
    },

    githooks: {
      all: {
        'pre-commit': 'prettier eslint'
      }
    }
  });

  grunt.registerTask('default', [
    'githooks',
    'prettier',
    'eslint',
    'run:npm_start'
  ]);
  grunt.registerTask('test', ['run:npm_test_jest']);
};
