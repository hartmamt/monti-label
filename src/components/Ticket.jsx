import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import PrintableTicket from './PrintableTicket';

const formStyle = {
  margin: '16px 16px 16px 16px',
  padding: '16px',
  align: 'center',
};

class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.ticket,
      ticketDate: new Date(),
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
    if (!this.props.admin) {
      this.props.effects.createTicket({ ...this.state });
    }
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSave() {
    if (this.props.admin) {
      this.props.effects.updateTicket({ ...this.state });
    }
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
          className="no-print"
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
              onChange={(event, date) => this.setState({ ticketDate: date })}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Reason For Hold"
              value={this.state.reason}
              disabled={this.props.readOnly && !this.props.admin}
              onChange={event => this.setState({ reason: event.target.value })}
              multiLine
              fullWidth
            />
          </div>
          {this.props.admin
            ? <div style={{ display: 'flex', flexDirection: 'row', flexAlign: 'stretch' }}>
              <TextField
                floatingLabelText="Investigation / Disposition"
                value={this.state.disposition}
                onChange={event => this.setState({ disposition: event.target.value })}
                multiLine
                fullWidth
              />
            </div>
            : null}
          {this.props.admin
            ? <div style={{ display: 'flex', flexDirection: 'row', flexAlign: 'stretch' }}>
              <TextField
                floatingLabelText="Dispositioned By"
                value={this.state.dispositionBy}
                onChange={event => this.setState({ dispositionBy: event.target.value })}
              />
              <DatePicker
                autoOk
                hintText="Date"
                floatingLabelText="Date"
                container="inline"
                value={this.state.dispositionDate}
                onChange={(event, date) => this.setState({ dispositionDate: date })}
              />
            </div>
            : null}
          {this.props.admin
            ? <div style={{ display: 'flex', flexDirection: 'row', flexAlign: 'stretch' }}>
              <RaisedButton label="Save" onTouchTap={this.handleSave} primary />
            </div>
            : null}
          <div style={{ display: 'flex', flexDirection: 'row', flexAlign: 'stretch' }}>
            <div style={{ padding: 20 }}>
              <RaisedButton label="Print" onTouchTap={this.handleOpen} primary />
            </div>
            <div style={{ padding: 20 }}>
              <RaisedButton label="Reset" secondary />
            </div>
          </div>
        </div>

        <Dialog
          actions={[
            <RaisedButton
              className="no-print"
              style={{ margin: 10 }}
              label="Print"
              onClick={() => {
                window.print();
              }}
              primary
            />,
            <RaisedButton
              className="no-print"
              style={{ margin: 10 }}
              label="Close"
              onClick={() => {
                this.handleClose();
              }}
              primary
            />,
          ]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{ padding: 0 }}
          paperStyle={{ boxShadow: 'none' }}
          paperProps={{ zDepth: 0 }}
        >
          <PrintableTicket readOnly ticket={{ ...this.state }} />
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
  admin: false,
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
  admin: PropTypes.bool,
};

export default Ticket;
