import ReactDOM from 'react-dom';

import { LightList } from './components/LightList';
import { DeconzApiProvider } from './api/DeconzApiProvider';
import './index.css';

ReactDOM.render(
  <DeconzApiProvider>
    <LightList />
  </DeconzApiProvider>,
  document.getElementById('root'),
);
