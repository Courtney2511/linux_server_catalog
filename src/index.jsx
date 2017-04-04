import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './containers/app.jsx'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

render( <AppContainer>
          <Provider store={store}>
            <App/>
          </Provider>
        </AppContainer>, document.querySelector("#app"))

if (module && module.hot) {
  module.hot.accept('./containers/app.jsx', () => {
    render(
      <AppContainer>
        <Provider store={store}>
          <App/>
        </Provider>
      </AppContainer>,
      document.querySelector("#app")
    )
  })
}
