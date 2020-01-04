/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentClass, FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { Action, Store } from 'redux';

export function withReduxStore<State, Actions extends Action>(
  configureStore: () => Store<State, Actions>,
) {
  const store = configureStore();

  return function<Props = {}>(AppComponent: FunctionComponent<Props> | ComponentClass<Props>) {
    function AppWithReduxStore({ ...props }: any) {
      return (
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>
      );
    }

    return AppWithReduxStore;
  };
}
