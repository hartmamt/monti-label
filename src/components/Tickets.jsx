import React from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Ticket from './Ticket';

const formStyle = {
  // display: 'inline-block',
  margin: '16px 16px 16px 16px',
  padding: '16px',
  // margin: '10px',
  align: 'center',
  //  height: '80vh',
};

export default class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date('1961-12-31T03:24:00'),
      endDate: new Date('2020-12-31T03:24:00'),
      openedIndex: undefined,
    };
    this.props.effects.getTickets();
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleCloseAll = this.handleCloseAll.bind(this);
  }

  handleChangeStartDate(event, date) {
    this.setState({ startDate: date });
  }

  handleChangeEndDate(event, date) {
    this.setState({ endDate: date });
  }

  handleItemClick(ticketId) {
    if (ticketId === this.state.openedIndex) {
      this.setState({ openedIndex: undefined });
    } else {
      this.setState({ openedIndex: ticketId });
    }
  }

  handleCloseAll() {
    this.setState({ openedIndex: undefined });
  }

  render() {
    return (
      <Paper style={formStyle} className="no-print">
        <h1>Tickets</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <DatePicker
              hintText="Start Date"
              autoOk
              floatingLabelText="Start Date"
              container="inline"
              onChange={this.handleChangeStartDate}
            />
            <DatePicker
              hintText="End Date"
              autoOk
              floatingLabelText="End Date"
              container="inline"
              onChange={this.handleChangeEndDate}
            />
          </div>
          <List>
            {this.props.tickets.length > 0 &&
              this.props.tickets
                .filter(
                  ticket =>
                    new Date(ticket.ticketDate) >= this.state.startDate &&
                    new Date(ticket.ticketDate) <= this.state.endDate,
                )
                .sort(
                  (a, b) =>
                    a.ticketDate > b.ticketDate ? -1 : a.ticketDate < b.ticketDate ? 1 : 0,
                )
                .map((ticket, counter) =>
                  (<div>
                    <ListItem
                      value={1}
                      key={`list-ticket-${counter}`}
                      primaryText={new Date(ticket.ticketDate).toDateString()}
                      secondaryText={ticket.reason}
                      primaryTogglesNestedList
                      open={ticket._id === this.state.openedIndex}
                      nestedItems={[
                        <Ticket
                          key={`ticket-${counter}`}
                          effects={this.props.effects}
                          ticket={ticket}
                          readOnly
                          admin
                          handleCloseAll={this.handleCloseAll}
                        />,
                      ]}
                      onClick={() => this.handleItemClick(ticket._id)}
                    />
                    <Divider />
                  </div>),
                )}
          </List>
        </div>
      </Paper>
    );
  }
}
