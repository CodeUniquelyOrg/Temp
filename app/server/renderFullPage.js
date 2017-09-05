export default function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
    <head>
        <title>Your SSR React Router Node App initialised with data!</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `;
}

// Helper Function to build index.html contents
// export const renderFullPage2 = (html, initialState) => {
//   const head = Helmet.rewind();
//   const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
//   const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);
//
//   return `
//     <!doctype html>
//     <html>
//       <head>
//         ${head.base.toString()}
//         ${head.title.toString()}
//         ${head.meta.toString()}
//         ${head.link.toString()}
//         ${head.script.toString()}
//         ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
//         <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
//         <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
//       </head>
//       <body>
//         <div id="root">${html}</div>
//         <script>
//           window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
//           ${process.env.NODE_ENV === 'production' ? `//<![CDATA[window.webpackManifest = ${JSON.stringify(chunkManifest)};//]]>` : ''}
//         </script>
//         <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/polyfill.js'] : '/polyfill.js'}'></script>
//         <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
//         <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/bundle.js'] : '/bundle.js'}'></script>
//       </body>
//     </html>
//   `;
// };
