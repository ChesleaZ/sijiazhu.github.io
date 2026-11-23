/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
exports.createPages = async () => {};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};

exports.onPostBuild = () => {
  const fs = require('fs');
  const { createHash } = require('crypto');
  const partsDirectory = path.join(__dirname, '.preprint-transfer');
  const parts = fs.readdirSync(partsDirectory).sort().map((name) =>
    fs.readFileSync(path.join(partsDirectory, name))
  );
  const pdf = Buffer.concat(parts);
  const digest = createHash('sha256').update(pdf).digest('hex');
  if (digest !== '6573c5a680d544112e912ed24427068747280fc18b056270a7e53e4e2f48a52f') {
    throw new Error('The assembled preprint does not match the uploaded PDF.');
  }
  fs.writeFileSync(path.join(__dirname, 'public/papers/single-cell-scaling/preprint.pdf'), pdf);
};
