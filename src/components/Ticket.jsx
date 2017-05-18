import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import PrintableTicket from './PrintableTicket';

const formStyle = {
  // display: 'inline-block',
  margin: '16px 16px 16px 16px',
  padding: '16px',
  // margin: '10px',
  align: 'center',
  //  height: '80vh',
};

class Ticket extends React.Component {
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
        <h1>Enter a Ticket</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              floatingLabelText="Part Number"
              disabled={this.props.readOnly}
              value={this.state.partNumber}
              onChange={event => this.setState({ partNumber: event.target.value })}
            />
            <TextField
              floatingLabelText="Quantity"
              disabled={this.props.readOnly}
              value={this.state.quantity}
              onChange={event => this.setState({ quantity: event.target.value })}
            />
            <TextField
              floatingLabelText="Job Number"
              disabled={this.props.readOnly}
              value={this.state.jobNumber}
              onChange={event => this.setState({ jobNumber: event.target.value })}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Hold By"
              disabled={this.props.readOnly}
              value={this.state.holdBy}
              onChange={event => this.setState({ holdBy: event.target.value })}
            />
          </div>
          <div>
            <DatePicker
              hintText="Date"
              autoOk
              floatingLabelText="Date"
              container="inline"
              disabled={this.props.readOnly}
              value={this.state.ticketDate}
              onChange={event => this.setState({ ticketDate: event.target.value })}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Reason For Hold"
              value={this.state.reason}
              disabled={this.props.readOnly}
              onChange={event => this.setState({ reason: event.target.value })}
              multiLine
              fullWidth
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexAlign: 'stretch' }}>
            <div style={{ padding: 20 }}>
              <RaisedButton label="Print" onTouchTap={this.handleOpen} primary />
            </div>
            <div style={{ padding: 20 }}><RaisedButton label="Reset" secondary /></div>
          </div>
        </div>

        <Dialog
          actions={[
            <RaisedButton
              className="no-print"
              label="Print"
              onClick={() => window.print()}
              primary
            />,
          ]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <PrintableTicket readOnly ticket={this.props.ticket} />
        </Dialog>

      </Paper>
    );
  }
}

Ticket.defaultProps = {
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

Ticket.propTypes = {
  ticket: PropTypes.shape({
    partNumber: PropTypes.string,
    quantity: PropTypes.number,
    jobNumber: PropTypes.string,
    holdBy: PropTypes.string,
    ticketDate: PropTypes.date,
    reason: PropTypes.string,
  }),
  readOnly: PropTypes.bool,
};

export default Ticket;
