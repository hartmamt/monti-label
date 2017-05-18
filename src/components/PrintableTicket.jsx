import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

const formStyle = {
  margin: '16px 16px 16px 16px',
  padding: '16px',
  align: 'center',
};

class PrintableTicket extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...this.props.ticket, open: false };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <Paper style={formStyle}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textDecoration: 'underline',
            textAlign: 'center',
          }}
        >
          <ul>
            HOLD FOR QC REVIEW<br />
            DO NOT MOVE OR PROCESS WITHOUT APPROVAL FROM QC
          </ul>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <table>
              <tr>
                <td>Part #: </td>
                <td>{this.state.partNumber}</td>
              </tr>
              <tr>
                <td />
              </tr>
              <tr>
                <td>Qty: </td>
                <td>{this.state.quantity}</td>
              </tr>
              <tr>
                <td>Job #: </td>
                <td>{this.state.jobNumber}</td>
              </tr>
              <tr>
                <td />
              </tr>
              <tr>
                <td>On Hold By: </td>
                <td>{this.state.holdBy}</td>
              </tr>
              <tr>
                <td />
              </tr>
              <tr>
                <td>Date: </td>
                <td>{this.state.ticketDate.toLocaleDateString('en-US')}</td>
              </tr>
              <tr>
                <td />
              </tr>
              <tr>
                <td>Reason For Hold: </td>
                <td />
              </tr>
              <tr>
                <td colSpan="2">{this.state.reason}</td>
              </tr>
            </table>
          </div>
        </div>
      </Paper>
    );
  }
}

PrintableTicket.defaultProps = {
  ticket: {
    partNumber: '',
    quantity: undefined,
    jobNumber: '',
    holdBy: '',
    ticketDate: new Date(),
    reason: '',
  },
  readOnly: false,
};

PrintableTicket.propTypes = {
  ticket: PropTypes.shape({
    partNumber: PropTypes.string,
    quantity: PropTypes.number,
    jobNumber: PropTypes.string,
    holdBy: PropTypes.string,
    ticketDate: PropTypes.date,
    reason: PropTypes.string,
  }),
};

export default PrintableTicket;
