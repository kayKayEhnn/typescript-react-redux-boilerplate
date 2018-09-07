import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { rootReducer } from '../reducers/'
import { AppState } from '../state/AppState'

export function configureStore (preloadedState?: AppState) {
  const store = createStore(rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  )

  return store
}
