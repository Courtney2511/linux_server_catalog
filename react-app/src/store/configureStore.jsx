import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import ReduxPromise from 'redux-promise'
import * as reducers from '../reducers'

export default function configureStore(initialState) {
  const reducer = storage.reducer(combineReducers(reducers))
  const engine = createEngine('photobomb-storage')
  const storageMiddleware = storage.createMiddleware(engine)
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(ReduxPromise),
      applyMiddleware(storageMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  const load = storage.createLoader(engine)

  if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers').default
        store.replaceReducer(nextRootReducer)
      })
    }

    return load(store).then(() => store)
}
