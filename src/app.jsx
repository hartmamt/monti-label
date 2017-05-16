import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { injectState } from 'freactal';

import appState from './state';
import Ticket from './components/Ticket';
import Tickets from './components/Tickets';
import BottomNav from './components/BottomNav';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const wrapComponentWithState = appState;

const App = wrapComponentWithState(
  injectState(({ state, effects }) => (
    <MuiThemeProvider>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F5f5f5',
          flexAlign: 'flex-end',
        }}
      >
        <div style={{ width: '100%', align: 'center', marginBottom: 60 }}>
          {state.currentNav === 'ticket' ? <Ticket /> : null}
          {state.currentNav === 'admin' ? <Tickets tickets={state.tickets} /> : null}
        </div>
        <div>
          <BottomNav
            currentNav={state.currentNav}
            handleBottomNavClick={effects.handleBottomNavClick}
          />
        </div>
      </div>
    </MuiThemeProvider>
  )),
);

export default App;
