"use client"

import { useEffect, useState } from "react";
import { ImUser, ImBin, ImNotification } from "react-icons/im";
import API from "@/app/lib/api";
import Modal from "@/app/ui/modal";

const UserPanel = () => {
  const [concerts, setConcerts] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(<></>);

  const getConcertsData = async () => {
    const concertsData = await API.getAllConcerts();

    return concertsData;
  }

  const getTicketsData = async () => {
    const ticketsData = (await API.getUserTickets()).filter(item => item.status === 'active');
    const purchasedConcert = new Set( ticketsData.map(item => item.concertId) );

    return [...purchasedConcert];
  }

  const handleCancelTicket = async (concertId) => {
    try {
      await API.cancelAllTicket(concertId);

      getTicketsData().then((data) => {
        setPurchased( data );
      });;

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

  const handleReserveTicket = async (concertId) => {
    try {
      await API.reserveTicket(concertId);

      getTicketsData().then((data) => {
        setPurchased( data );
      });;

      setModalMessage(
        <div className="text-center text-xl">
          <p className="mb-4">
            Your ticket is reserved!
          </p>
        </div>
      )
      setConfirmModal(true);
    } catch( error ) {
      console.log(error.message);

      setModalMessage(
        <div className="text-center text-xl">
          <p className="mb-4">
            Unable to reserve this ticket!
          </p>
        </div>
      );
      setConfirmModal(true);
    }
  }

  useEffect(() => {
    const concertsData = getConcertsData();
    const ticketsData = getTicketsData();

    concertsData.then((data) => {
      setConcerts( data );
    });

    ticketsData.then((data) => {
      setPurchased(data);
    })
  }, []);

  return (
    <div className="dashboard-list-concert">
      {concerts.map( (item, index) => (
        <div className="dashboard-concert-item" key={`concert-${index}-${item.id}`}>
          <h3 className="concert-name">{item.name}</h3>
          <div className="concert-description">{item.description}</div>
          <div className="concert-action">
            <p className="concert-seats"><ImUser /> {item.totalSeats}</p>
            <p>
              {purchased.includes(item.id) && (
                <button onClick={() => {handleCancelTicket(item.id)}} className="admin-button cancel-concert button">Cancel ticket</button>
              )}
              {!purchased.includes(item.id) && (
                <button onClick={() => {handleReserveTicket(item.id)}} className="admin-button reserve-concert button">Reserve ticket</button>
              )}
            </p>
          </div>
        </div>
      ))}
      <Modal modalState={confirmModal} closeLabel='OK' closeHandler={() => setConfirmModal(false)}>
        {modalMessage}
      </Modal>
    </div>
  )
}

export default UserPanel;
