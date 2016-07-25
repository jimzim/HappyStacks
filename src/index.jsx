import React from 'react';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppStore from './stores';
import App from './App';

useStrict(true);

const store = window.appStore = new AppStore();

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
