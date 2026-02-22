import { useState } from 'react';
import { ImFloppyDisk } from "react-icons/im";
import API from "@/app/lib/api";

const CreateConcert = () => {
  const [concertName, setConcertName] = useState('');
  const [concertSeats, setConcertSeats] = useState(200);
  const [concertDescription, setConcertDescription] = useState('');

  const handleNameChange = (e) => setConcertName(e.target.value);
  const handleSeatChange = (e) => setConcertSeats(e.target.value);
  const handleDescriptionChange = (e) => setConcertDescription(e.target.value);

  const handleCreateConcert = async () => {

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
          <div className="field field-description">
            <label className="field-label">Description</label>
            <textarea className="field-textarea" placeholder="Please input description" onChange={handleDescriptionChange} value={concertDescription} />
          </div>
          <div className="field field-action text-right">
            <button className="admin-button button save-concert"><ImFloppyDisk/> Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateConcert;
