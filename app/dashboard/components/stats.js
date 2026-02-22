"use client"

import { useEffect, useState } from 'react';
import { ImUser, ImTicket, ImCancelCircle } from "react-icons/im";
import API from "@/app/lib/api";
import { ApiError } from "next/dist/server/api-utils";

const Stats = () => {
  const [totalSeats, setTotalSeats] = useState(0);
  const [reservedSeats, setReservedSeats] = useState(0);
  const [cancelledSeats, setCancelledSeats] = useState(0);

  useEffect(() => {
    API.getStats().then(data => {
      setTotalSeats(data.totalSeats);
      setReservedSeats(data.reservedTickets);
      setCancelledSeats(data.cancelledTickets);
    })
  }, []);

  return (
    <div className="stats-block">
      <div className="stats-block-item bg-allports">
        <p className="stat-icon"><ImUser /></p>
        <p className="stat-label">Total seats</p>
        <p className="stat-number">{totalSeats}</p>
      </div>
      <div className="stats-block-item bg-persian-green">
        <p className="stat-icon"><ImTicket /></p>
        <p className="stat-label">Reserved seats</p>
        <p className="stat-number">{reservedSeats}</p>
      </div>
      <div className="stats-block-item bg-carnation">
        <p className="stat-icon"><ImCancelCircle /></p>
        <p className="stat-label">Cancelled seats</p>
        <p className="stat-number">{cancelledSeats}</p>
      </div>
    </div>
  );
}

export default Stats;
