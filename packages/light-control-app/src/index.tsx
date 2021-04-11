import ReactDOM from 'react-dom';
import {
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';

import { DeconzApiProvider } from './api';
import { App } from './App';

const theme = createMuiTheme();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <DeconzApiProvider>
        <App />
      </DeconzApiProvider>
    </CssBaseline>
  </ThemeProvider>,
  document.getElementById('root'),
);
