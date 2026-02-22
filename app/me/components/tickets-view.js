import { useState, useEffect } from 'react';
import API from "@/app/lib/api";

const TicketsView = () => {
  const [concerts, setConcerts] = useState([]);
  const [tickets, setTickets] = useState([]);

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
                  <button className="concert-ticket-cancel button">Cancel this ticket</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TicketsView;
