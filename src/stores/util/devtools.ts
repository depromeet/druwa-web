const isProduction = process.env.NODE_ENV === 'production';

const id = function<T>(x: T) {
  return x;
};

export const withDevTools = (() => {
  if (isProduction) {
    return id;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? id;
})();
