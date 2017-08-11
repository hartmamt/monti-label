import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const formStyle = {
  margin: '16px 16px 16px 16px',
  padding: '16px',
  align: 'center',
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }
  render() {
    return (
      <Paper style={formStyle}>
        <h1>Enter Admin Password</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          className="no-print"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              value={this.state.password}
              floatingLabelText="Password"
              onChange={event => this.setState({ password: event.target.value })}
              type="password"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <RaisedButton
              className="no-print"
              label="Login"
              onTouchTap={() => this.props.handleAdminAuth(this.state.password)}
              primary
            />
          </div>
        </div>
      </Paper>
    );
  }
}

// Login.defaultProps = {
//   ticket: {
//     partNumber: '',
//     quantity: undefined,
//     jobNumber: '',
//     holdBy: '',
//     ticketDate: new Date(),
//     reason: '',
//   },
//   readOnly: false,
//   admin: false,
// };
//
// Login.propTypes = {
//   ticket: PropTypes.shape({
//     partNumber: PropTypes.string,
//     quantity: PropTypes.number,
//     jobNumber: PropTypes.string,
//     holdBy: PropTypes.string,
//     ticketDate: PropTypes.date,
//     reason: PropTypes.string,
//   }),
//   readOnly: PropTypes.bool,
//   admin: PropTypes.bool,
// };

export default Login;
