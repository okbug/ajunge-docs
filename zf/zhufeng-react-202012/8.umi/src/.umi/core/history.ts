// @ts-nocheck
import { createBrowserHistory } from 'C:/Users/83687/AppData/Roaming/npm/node_modules/umi/node_modules/_@umijs_runtime@3.2.27@@umijs/runtime';

let options = {
  "basename": "/"
};
if ((<any>window).routerBase) {
  options.basename = (<any>window).routerBase;
}

// remove initial history because of ssr
let history: any = process.env.__IS_SERVER ? null : createBrowserHistory(options);
export const createHistory = (hotReload = false) => {
  if (!hotReload) {
    history = createBrowserHistory(options);
  }

  return history;
};

export { history };
