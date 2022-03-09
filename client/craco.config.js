const { ESLINT_MODES } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  eslint: {
    mode: ESLINT_MODES.file,
  },
  configure: (webpackConfig, { env, paths }) => {
    webpackConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-typescript"],
          plugins: ["istanbul"]
        }
      }
    });
    return webpackConfig;
  }
};
