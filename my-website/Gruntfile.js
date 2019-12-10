module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-prettier');

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
    }
  });

  grunt.registerTask('default', ['prettier', 'eslint', 'run:npm_start']);
  grunt.registerTask('test', ['run:npm_test_jest']);
};
