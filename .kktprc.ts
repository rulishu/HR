import type { WebpackConfiguration, LoaderConfOptions } from 'kkt';
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
  overrideWebpack:(conf: WebpackConfiguration, env: 'development' | 'production', options: LoaderConfOptions | undefined)=>{
    conf.module = {
      rules: conf.module?.rules?.map((rule: any) => {
        if (typeof rule === 'object' && rule.oneOf) {
          const newRule = [
            {
              test: /\.svg$/,
              loader: 'svg-sprite-loader',
            },
          ];
          rule.oneOf = newRule.concat(rule.oneOf);
        }
        return rule
      })
    }
    return conf;
  }
};
