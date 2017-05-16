import { provideState } from 'freactal';

export default provideState({
  initialState: () => ({
    currentNav: 'ticket',
    tickets: [
      {
        partNumber: '39090',
        quantity: 33,
        jobNumber: 'TUV',
        holdBy: 'Matt H.',
        ticketDate: new Date('1997-01-17T03:24:00'),
        reason: 'This is not a good reason, just test reason',
      },
      {
        partNumber: '39090',
        quantity: 33,
        jobNumber: 'XYZ',
        holdBy: 'Matt H.',
        ticketDate: new Date('2017-04-17T03:24:00'),
        reason: 'Part had wrong diameter and there were too many burrs that needed to be sanded down..............................................................',
      },
      {
        partNumber: '39090',
        quantity: 33,
        jobNumber: 'AB',
        holdBy: 'Matt H.',
        ticketDate: new Date('2017-09-17T03:24:00'),
        reason: 'This is not a good reason, just test reason',
      },
      {
        partNumber: '39090',
        quantity: 33,
        jobNumber: 'QRS',
        holdBy: 'Matt H.',
        ticketDate: new Date('2017-12-17T03:24:00'),
        reason: 'This is not a good reason, just test reason',
      },
    ],
  }),
  effects: {
    handleBottomNavClick: (effects, page) =>
      state => Object.assign({}, state, { currentNav: page }),
  },
});
