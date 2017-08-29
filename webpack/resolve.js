const PATHS = require('./paths');

module.exports = {
  modules: [PATHS.app, PATHS.modules],
  extensions: ['.js', '.pcss', '.css', '.json', '.html' ],
  alias:{
    // root: PATHS.root,
    // node: PATHS.modules,
    assets: PATHS.assets,
    img: PATHS.img,
    font: PATHS.font,
    src: PATHS.app,
    actions: PATHS.action,
    components: PATHS.components,
    lib: PATHS.lib,
    pages: PATHS.pages,
    reducers: PATHS.reducer,
    style: PATHS.style,
    theme: PATHS.theme,
  },
};

