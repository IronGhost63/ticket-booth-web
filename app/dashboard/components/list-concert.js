"use client"

import { useEffect, useState } from "react";
import { ImUser, ImBin, ImNotification } from "react-icons/im";
import API from "@/app/lib/api";
import Modal from "@/app/ui/modal";

const ListConcert = () => {
  const [concerts, setConcerts] = useState([]);
  const [toDelete, setToDelete] = useState(0);
  const [toDeleteName, setToDeleteName] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleDeleteConcert = async () => {

  }

  const getConcertsData = async () => {
    const concertsData = await API.getAllConcerts();

    return concertsData;
  }

  useEffect(() => {
    const concertsData = getConcertsData();

    concertsData.then( (data) => {
      setConcerts( data );
    });
  }, []);

  useEffect(() => {
    if ( toDelete !== 0 ) {
      setConfirmDialogOpen(true);
    }
  }, [toDelete]);

  useEffect(() => {
    if ( !confirmDialogOpen ) {
      setToDelete(0);
    }
  }, [confirmDialogOpen])
  return(
    <div className="dashboard-list-concert">
      {concerts.map( (item, index) => (
        <div className="dashboard-concert-item" key={`concert-${index}-${item.id}`}>
          <h3 className="concert-name">{item.name}</h3>
          <div className="concert-description">{item.description}</div>
          <div className="concert-action">
            <p className="concert-seats"><ImUser /> {item.totalSeats}</p>
            <p>
              <button onClick={() => {setToDelete(item.id); setToDeleteName(item.name)}} className="admin-button delete-concert button"><ImBin /> Delete</button>
            </p>
          </div>
        </div>
      ))}
      <Modal modalState={confirmDialogOpen} closeLabel="Cancel" closeHandler={() => setConfirmDialogOpen(false)} actionLabel="Yes, Delete" actionHandler={handleDeleteConcert}>
        <div className="confirm-message">
          <p className="icon"><ImNotification /></p>
          <p>Are you sure to delete "{toDeleteName}"?</p>
        </div>
      </Modal>
    </div>
  )
}

export default ListConcert;
