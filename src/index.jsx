import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './containers/app.jsx'

render( <AppContainer><App/></AppContainer>, document.querySelector("#app"))

if (module && module.hot) {
  module.hot.accept('./containers/app.jsx', () => {
    render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.querySelector("#app")
    )
  })
}
