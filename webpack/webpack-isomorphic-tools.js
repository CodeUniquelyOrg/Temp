const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

// https://github.com/catamphetamine/webpack-isomorphic-tools#a-working-example
module.exports = {
  assets: {
    images: {
      extensions: ['jpeg', 'jpg', 'png', 'gif'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    fonts: {
      extensions: ['woff', 'woff2', 'ttf', 'eot'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },

    style_modules: {
      extensions: ['css', 'pcss', 'scss'],
      filter: function(module, regex, options, log) {
        if (options.development) {
          // In development mode there's Webpack "style-loader",
          // which outputs `module`s with `module.name == asset_path`,
          // but those `module`s do not contain CSS text.
          // The `module`s containing CSS text are
          // the ones loaded with Webpack "css-loader".
          // (which have kinda weird `module.name`)
          // Therefore using a non-default `filter` function here.
          return WebpackIsomorphicToolsPlugin.styleLoaderFilter(module, regex, options, log);
        }
        // In production mode there's no Webpack "style-loader",
        // so `module.name`s will be equal to the correct asset path
        return regex.test(module.name);
      },

      // How to correctly transform `module.name`s
      // into correct asset paths
      path: function(module, options, log) {
        if (options.development) {
          // In development mode there's Webpack "style-loader",
          // so `module.name`s of the `module`s created by Webpack "css-loader"
          // (those picked by the `filter` function above)
          // will be kinda weird, and this path extractor extracts
          // the correct asset paths from these kinda weird `module.name`s
          return WebpackIsomorphicToolsPlugin.styleLoaderPathExtractor(module, options, log);
        }

        // in production mode there's no Webpack "style-loader",
        // so `module.name`s will be equal to correct asset paths
        return module.name;
      },

      // How to extract these Webpack `module`s' javascript `source` code.
      // Basically takes `module.source` and modifies its `module.exports` a little.
      parser: function(module, options, log) {
        if (options.development) {
          // In development mode it adds an extra `_style` entry
          // to the CSS style class name map, containing the CSS text
          return WebpackIsomorphicToolsPlugin.cssModulesLoaderParser(module, options, log);
        }

        // In production mode there's Webpack Extract Text Plugin
        // which extracts all CSS text away, so there's
        // only CSS style class name map left.
        return module.source;
      }
    },

  },
};