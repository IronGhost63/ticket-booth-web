"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Layout from "@/app/ui/layout/main";
import { isLoggedIn } from "@/app/lib/api";
import constant from "@/app/lib/constant";
import API from "@/app/lib/api";

export default function Page() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [concertDetail, setConcertDetail] = useState({});
  const [seatAvailability, setSeatAvailability] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(0);
  const params = useParams();

  const handleSelectSeat = (e) => {
    const seatNumber = Number(e.currentTarget.value);

    if ( selectedSeat === seatNumber ) {
      setSelectedSeat( 0 );
    } else {
      setSelectedSeat( Number(e.currentTarget.value) );
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
          <div className="concert-detail"></div>
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
                <button className="seat-confirm button">Confirm seat</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
