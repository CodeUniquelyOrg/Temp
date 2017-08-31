const PATHS = require('./paths');

module.exports = {
  modules: [PATHS.client, PATHS.modules],
  extensions: ['.js', '.css', '.json', '.pcss', '.html' ],
  alias:{
    // root: PATHS.root,
    // node: PATHS.modules,

    src: PATHS.src,

    actions: PATHS.actions,
    api: PATHS.api,
    assets: PATHS.assets,
    components: PATHS.components,
    containers: PATHS.containers,
    reducers: PATHS.reducers,
    store: PATHS.store,

    font: PATHS.font,
    img: PATHS.img,

    client:  PATHS.client,
    server:  PATHS.server,
    common:  PATHS.common,

    // lib: PATHS.lib,
    // style: PATHS.style,
    // theme: PATHS.theme,
  },
};

