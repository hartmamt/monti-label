import { provideState, softUpdate } from 'freactal';
import fetch from 'isomorphic-fetch';

const API = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001/api'
  : 'https://calm-meadow-75161.herokuapp.com/api';

export default provideState({
  initialState: () => ({
    currentNav: 'ticket',
    ticketsPending: false,
    tickets: [],
  }),
  effects: {
    handleBottomNavClick: (effects, page) =>
      state => Object.assign({}, state, { currentNav: page }),
    setTicketsPending: softUpdate((state, ticketsPending) => ({ ticketsPending })),
    createTicket: (effects, ticket) => {
      console.log('ticket', ticket);
      const payload = {
        holdBy: ticket.holdBy,
        jobNumber: ticket.jobNumber,
        partNumber: ticket.partNumber,
        quantity: ticket.quantity,
        reason: ticket.reason,
      };
      fetch(`${API}/ticket`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }).then(resp => console.log(resp));
    },
    updateTicket: (effects, ticket) => {
      const payload = {
        holdBy: ticket.holdBy,
        jobNumber: ticket.jobNumber,
        partNumber: ticket.partNumber,
        quantity: ticket.quantity,
        reason: ticket.reason,
        disposition: ticket.disposition,
        dispositionBy: ticket.dispositionBy,
        dispositionDate: ticket.dispositionDate,
      };
      fetch(`${API}/tickets/${ticket._id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }).then(resp => console.log(resp));
    },
    getTickets: effects =>
      effects
        .setTicketsPending(true)
        .then(() => fetch(`${API}/tickets`))
        .then(result => result.json())
        .then(tickets => effects.setTicketsPending(false).then(() => tickets))
        .then(tickets => state => Object.assign({}, state, { tickets })),
  },
});
