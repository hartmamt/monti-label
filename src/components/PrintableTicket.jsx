import React from 'react';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import Paper from 'material-ui/Paper';

const formStyle = {
  // margin: '16px 16px 16px 16px',
  // padding: '16px',
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
      <div style={formStyle} className="printable">
        <div
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          HOLD FOR QC REVIEW<br />
          DO NOT MOVE OR PROCESS WITHOUT APPROVAL FROM QC
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
                <td>
                  {this.state.partNumber}
                </td>
              </tr>
              <tr>
                <td />
              </tr>
              <tr>
                <td>Qty: </td>
                <td>
                  {this.state.quantity}
                </td>
              </tr>
              <tr>
                <td>Job #: </td>
                <td>
                  {this.state.jobNumber}
                </td>
              </tr>
              <tr>
                <td />
              </tr>
              <tr>
                <td>On Hold By: </td>
                <td>
                  {this.state.holdBy}
                </td>
              </tr>
              <tr>
                <td />
              </tr>
              <tr>
                <td>Date: </td>
                <td>
                  {this.state.ticketDate.toLocaleDateString('en-US')}
                </td>
              </tr>
              <tr>
                <td />
              </tr>
              <tr>
                <td>Reason For Hold: </td>
                <td />
              </tr>
              <tr>
                <td colSpan="2">
                  {this.state.reason}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Barcode
            displayValue
            width={1}
            value={`${this.state.ticketDate.toLocaleDateString('en-US')} - ${this.state
              .partNumber}`}
          />
        </div>
      </div>
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
    quantity: PropTypes.string,
    jobNumber: PropTypes.string,
    holdBy: PropTypes.string,
    ticketDate: PropTypes.date,
    reason: PropTypes.string,
  }),
};

export default PrintableTicket;
