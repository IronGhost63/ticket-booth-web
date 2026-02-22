import { useState, useEffect } from 'react';
import API from "@/app/lib/api";
import Modal from "@/app/ui/modal";

const TicketsView = () => {
  const [concerts, setConcerts] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(<></>);

  const handleCancelTicket = async (ticketId) => {
    try {
      await API.cancelTicket(ticketId);

      API.getUserTickets().then(data => setTickets(data));

      setModalMessage(
        <div className="text-center text-xl">
          <p className="mb-4">
            Your ticket is cancelled!
          </p>
        </div>
      )
      setConfirmModal(true);
    } catch( error ) {
      console.log(error.message);

      setModalMessage(
        <div className="text-center text-xl">
          <p className="mb-4">
            Unable to cancel this ticket!
          </p>
        </div>
      );
      setConfirmModal(true);
    }
  }

  useEffect(() => {
    API.getUserTickets().then(data => setTickets(data));
  }, []);

  useEffect(() => {
    if ( tickets ) {
      const concertsData = tickets.map(item => ({
        concertId: item.concertId,
        concert: item.concert,
        date: item.date === 'undefined' ? '-' : item.date,
      }));

      const concertUniqueId = new Set();
      const concertUnique = concertsData.filter(item => {
        if ( concertUniqueId.has(item.concertId) ) {
          return false;
        }

        concertUniqueId.add(item.concertId);

        return true;
      });

      setConcerts( concertUnique );
    }
  }, [tickets]);

  return (
    <div className="tickets-view">
      {concerts.map( item => (
        <div className="concert-tickets" key={`concert-${item.concertId}`}>
          <div className="concert-section-head">
            <h3 className="concert-name">{item.concert}</h3>
            <p className="concert-date">{item.date}</p>
          </div>
          <ul className="concert-tickets-list">
            {tickets.filter(ticket => item.concertId === ticket.concertId).map(ticket => (
              <li className="concert-tickets-item">
                <div className="concert-ticket-seat">Seat {ticket.seatNumber}</div>
                <div className="concert-ticket-action">
                  {ticket.status === 'active' && (
                    <button onClick={() => {handleCancelTicket(ticket.id)}} className="concert-ticket-cancel button">Cancel this ticket</button>
                  )}
                  {ticket.status !== 'active' && (
                    <p>Cancelled</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Modal modalState={confirmModal} closeLabel='OK' closeHandler={() => setConfirmModal(false)}>
        {modalMessage}
      </Modal>
    </div>
  );
}

export default TicketsView;
