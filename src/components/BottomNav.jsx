import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;

export default class BottomNav extends React.Component {
  render() {
    let selected = 0;

    if (this.props.currentNav === 'ticket') {
      selected = 0;
    } else {
      selected = 1;
    }
    return (
      <Paper
        zDepth={1}
        className="no-print"
        style={{
          position: 'fixed',
          bottom: '0px',
          width: '100%',
          zIndex: 999,
        }}
      >
        <BottomNavigation selectedIndex={selected}>
          <BottomNavigationItem
            label="Enter Ticket"
            icon={recentsIcon}
            onTouchTap={() => this.props.handleBottomNavClick('ticket')}
          />
          <BottomNavigationItem
            label="Admin"
            icon={favoritesIcon}
            onTouchTap={() => this.props.handleBottomNavClick('admin')}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}
