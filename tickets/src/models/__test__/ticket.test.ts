import { Ticket } from '../tickets';

it('Implements a optimistic concurrency control', async () => {
    const ticket = Ticket.build({
        title: 'Ankur',
        userId: '123',
        price: 123,
    });

    await ticket.save();
    const firstTicketInstance = await Ticket.findById(ticket.id);
    const secondTicketInstance = await Ticket.findById(ticket.id);

    // Now both the instance have same version value
    firstTicketInstance!.set({
        price: 101,
    });

    await firstTicketInstance!.save();

    secondTicketInstance?.set({
        title: 'ankur1',
    });

    try {
        await secondTicketInstance?.save();
    } catch (Err) {
        return;
    }

    throw new Error('Flow should not reach that place.');
});

it('Checking My Doubt', async () => {
    const ticket = Ticket.build({
        title: 'DO EPIC SHIT',
        price: 100,
        userId: 'ankur',
    });

    await ticket.save();

    const findticket = await Ticket.find({
        _id: ticket.id,
        version: 0,
    });

    await findticket[0]!.save();

    console.log(findticket, 'HERE IS THE TICKET');

    const newFindTicket = await Ticket.find({
        _id: findticket[0]._id,
        version: 1,
    });

    console.log(newFindTicket, 'HERE IS THE SECOND TICKET');
    expect(findticket).not.toBeNull();
});
