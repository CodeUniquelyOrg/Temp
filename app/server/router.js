// Server Side Rendering based on routes matched by React-router.
// app.use((req, res, next) => {

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

// import Appliation stuff
import IntlWrapper from 'components/Intl/IntlWrapper';
import App from 'components/App';

// Server Support libraries
import renderFullPage from './renderFullPage';

export default function router(req, res) { // , next) {

  const store = configureStore();

  const context = {};

  // const componentHtml = renderToString(
  //   <Provider store={store}>
  //     <IntlWrapper>
  //       <StaticRouter location={req.url} context={context}>
  //         {renderRoutes(routes)}
  //       </StaticRouter>
  //     </IntlWrapper>
  //   </Provider>
  // );

  /* SIMPLER of the ASYNC above VERSION */
  const componentHtml = renderToString(
    <Provider store={store}>
      <IntlWrapper>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </IntlWrapper>
    </Provider>
  );

  if (context.url) {
    res.redirect(302, context.url);
  } else if (context.status === 404) {
    res.status(404);
  } else {
    // we're good, send the response
    const preloadedState = store.getState();
    const html = renderFullPage(componentHtml, preloadedState);
    res.set('content-type', 'text/html');
    res.send(html);
  }
}
