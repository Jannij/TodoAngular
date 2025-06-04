module.exports = function(config: any): void {
  config.set({
  basePath: '',
  frameworks: ['jasmine'], // this loads the adapter that implements __karma__.start
  files: [
    'src/**/*.spec.ts' // or .js, adjust based on your codebase
  ],
  preprocessors: {
    'src/**/*.spec.ts': ['webpack', 'sourcemap']
  },
  webpack: {
    // minimal config, add loaders as needed
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    }
  },
  reporters: ['progress'],
  port: 9876,
  colors: true,
  logLevel: config.LOG_INFO,
  browsers: ['ChromeHeadless'],
  autoWatch: false,
  singleRun: true,
  concurrency: Infinity
});
};
