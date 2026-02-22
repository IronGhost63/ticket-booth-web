"use client"

import { useEffect, useState } from "react";
import Layout from "../ui/layout/main";
import ConcertCard from "../ui/concertCard";
import API from "../lib/api";

export default function Page() {
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
  return (
    <Layout className="concert-listing-screen">
      <main>
        <div className="main-container">
          <h1 className="page-title text-center">Concerts</h1>
          <ul className="concert-list">
            {concerts.map( (item, index ) => (
              <li key={`concert-${index}-${item.id}`}>
                <ConcertCard data={item} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Layout>
  )
}
