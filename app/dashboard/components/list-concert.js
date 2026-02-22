"use client"

import { useEffect, useState } from "react";
import { ImUser, ImBin } from "react-icons/im";
import API from "@/app/lib/api";

const ListConcert = () => {
  const [concerts, setConcerts] = useState([]);

  const getConcertsData = async () => {
    const concertsData = await API.getAllConcerts();

    return concertsData;
  }

  useEffect(() => {
    const concertsData = getConcertsData();

    concertsData.then( (data) => {
      console.log(data);

      setConcerts( data );
    })
  }, []);
  return(
    <div className="dashboard-list-concert">
      {concerts.map( (item, index) => (
        <div className="dashboard-concert-item" key={`concert-${index}-${item.id}`}>
          <h3 className="concert-name">{item.name}</h3>
          <div className="concert-description">{item.description}</div>
          <div className="concert-action">
            <p className="concert-seats"><ImUser /> {item.totalSeats}</p>
            <p>
              <button className="admin-button delete-concert button"><ImBin /> Delete</button>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListConcert;
