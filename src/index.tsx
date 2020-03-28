import { Provider } from "mobx-react"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import routerConfig from 'src/common/router'
import App from './App';
import './index.less';

import registerServiceWorker from './registerServiceWorker';
const stroes = {}
routerConfig.forEach(ele => {
  stroes[Object.getPrototypeOf(ele.store).constructor.name] = ele.store
})
// tslint:disable-next-line: no-console
console.log(stroes)
ReactDOM.render(
  <Provider {...stroes}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
