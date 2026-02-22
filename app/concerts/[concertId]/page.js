"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { isLoggedIn } from "@/app/lib/api";
import Link from "next/link";
import Layout from "@/app/ui/layout/main";
import Modal from "@/app/ui/modal";
import API from "@/app/lib/api";

export default function Page() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [concertDetail, setConcertDetail] = useState({});
  const [seatAvailability, setSeatAvailability] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(0);
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [lastPurchased, setLastPurchased] = useState(0);
  const params = useParams();

  const handleSelectSeat = (e) => {
    const seatNumber = Number(e.currentTarget.value);

    if ( selectedSeat === seatNumber ) {
      setSelectedSeat( 0 );
    } else {
      setSelectedSeat( Number(e.currentTarget.value) );
    }
  }

  const handleTicketReserve = async () => {
    const concertId = params.concertId;
    const seatNumber = selectedSeat;

    try {
      await API.reserveTicket(concertId, seatNumber);
      const updatedDetail = API.getConcert(params.concertId);

      updatedDetail.then(( data ) => {
        const withSelect = [...data.availability].map((item) => {
          item.selected = false;

          return item;
        });

        setSeatAvailability(withSelect);
        setLastPurchased(selectedSeat)
        setSelectedSeat(0);
        setPurchaseModal(true);
      })
    } catch ( error ) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const detail = API.getConcert(params.concertId);

    detail.then((data) => {
      const withSelect = [...data.availability].map((item) => {
        item.selected = false;

        return item;
      });

      setConcertDetail(data.detail);
      setSeatAvailability(withSelect);
    });

    setUserLoggedIn( isLoggedIn() );
  }, []);

  return (
    <Layout className="concert-detail-screen">
      <main>
        <div className="main-container">
          <div className="concert-detail">
            <h1 className="concert-title">{concertDetail.name}</h1>
            {concertDetail.description && (
              <div className="concert-description">{concertDetail.description}</div>
            )}
          </div>
          {userLoggedIn && (
            <div className="seat-reserve">
              <div className="seat-list-wrapper">
                <ul className="seat-list">
                  {seatAvailability.map( item => (
                    <li className="seat-item" key={item.seat}>
                      <button disabled={item.status === 'sold'} value={item.seat} className={`seat-select ${selectedSeat === item.seat ? 'selected' : ''}`} onClick={handleSelectSeat}><span className="seat-icon">💺</span></button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="seat-detail">
                <h3 className="seat-number">{selectedSeat ? `Seat ${selectedSeat}` : 'Select a seat'} </h3>
                <button className="seat-confirm button" onClick={handleTicketReserve} disabled={!selectedSeat}>Confirm seat</button>
              </div>
            </div>
          )}
          {userLoggedIn && (
            <Modal modalState={purchaseModal} closeHandler={() => setPurchaseModal(false)}>
              <div className="text-center text-xl">
                <p className="mb-4">
                  Your ticket for seat number {lastPurchased} in event "{concertDetail.name}" is reserved!
                </p>
                <p>
                  <Link href="/me" className="hover:underline">Click here</Link> to view your ticket
                </p>
              </div>
            </Modal>
          )}
        </div>
      </main>
    </Layout>
  );
}
