import { useState } from 'react';
import { ImFloppyDisk } from "react-icons/im";
import API from "@/app/lib/api";
import Modal from "@/app/ui/modal";

const CreateConcert = () => {
  const [concertName, setConcertName] = useState('');
  const [concertSeats, setConcertSeats] = useState(200);
  const [concertDescription, setConcertDescription] = useState('');
  const [concertDate, setConcertDate] = useState('');
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const handleNameChange = (e) => setConcertName(e.target.value);
  const handleSeatChange = (e) => setConcertSeats(e.target.value);
  const handleDescriptionChange = (e) => setConcertDescription(e.target.value);
  const handleDateChange = (e) => setConcertDate(e.target.value);

  const handleCreateConcert = async () => {
    try {
      const result = await API.createConcert(concertName, concertDescription, concertSeats, concertDate);

      setResultMessage(result.message);
      setConcertName('');
      setConcertSeats(200);
      setConcertDescription('');
      setConcertDate('')
    } catch( error ) {
      setResultMessage(error.message);
    }

    setResultDialogOpen(true);
  }

  return(
    <div className="dashboard-create-concert">
      <div className="dashboard-concert-item">
        <h3 className="concert-name">Create</h3>
        <div className="concert-form">
          <div className="field">
            <label className="field-label">Concert name</label>
            <input type="text" className="field-input" placeholder="Please input concert name" value={concertName} onChange={handleNameChange}/>
          </div>
          <div className="field">
            <label className="field-label">Total of seat</label>
            <input type="number" className="field-input" value={concertSeats} onChange={handleSeatChange}/>
          </div>
          <div className="field">
            <label className="field-label">Cover</label>
            <input type="file" className="field-input" placeholder="Select cover image"/>
          </div>
          <div className="field">
            <label className="field-label">Date</label>
            <input type="date" className="field-input" placeholder="Select date" onChange={handleDateChange}/>
          </div>
          <div className="field field-wide">
            <label className="field-label">Description</label>
            <textarea className="field-textarea" placeholder="Please input description" onChange={handleDescriptionChange} value={concertDescription} />
          </div>
          <div className="field field-wide text-right">
            <button onClick={handleCreateConcert} className="admin-button button save-concert"><ImFloppyDisk/> Save</button>
          </div>
        </div>
      </div>
      <Modal modalState={resultDialogOpen} closeLabel="OK" closeHandler={() => setResultDialogOpen(false)}>
        <div className="confirm-message">
          <p>{resultMessage}</p>
        </div>
      </Modal>
    </div>
  )
}

export default CreateConcert;
