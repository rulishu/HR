import pkg from './package.json';

export default {
  initEntery: true,
  initRoutes: {
    fallbackElement: '@/loading',
    routesOutletElement: '@/index'
  },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
