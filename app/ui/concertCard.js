import Link from "next/link";
import constant from "../lib/constant";

const ConcertCard = ({ data }) => {

  return (
    <div className="concert-card">
      <div className="cover">
        <img className="cover-image" src={`${constant.API_URL}/public/uploads/${data.coverImage}`}/>
      </div>
      <div className="card-detail">
        <h4 className="title">{data.name}</h4>
        <Link href={`/concerts/${data.id}`} className="card-cta button dark outlined">Get Ticket</Link>
      </div>
    </div>
  )
}

export default ConcertCard;
