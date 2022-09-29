import React from "react";
import { User } from "../interface/user";

interface Props {
  details: User;
  setDetails: (contact: User) => void;
  deleteContact: () => Promise<void>;
}

export const Details: React.FC<Props> = ({
  details,
  setDetails,
  deleteContact,
}) => {
  function handleClick() {
    deleteContact();
    setDetails(null!);
  }
  return (
    <div>
      <div className="details-header">
        <h3 className="details-name">{details.name}</h3>
        <div className="details-delete">
          <button onClick={handleClick}>Delete Contact</button>
        </div>
      </div>
      <p className="details-email">{details.email}</p>
      <div className="details-content-header">Adress</div>
      <div className="details-content">
        <div className="details-content-left">
          <p>City: {details.address.city}</p>
          <p>Zip: {details.address.zipcode}</p>
          <p>Street: {details.address.street}</p>
        </div>
        <div className="details-content-right">
          <p>Lat: {details.address.geo.lat}</p>
          <p>Long: {details.address.geo.lng}</p>
        </div>
      </div>
      <div className="details-content-header">Company</div>
      <div className="details-content">
        <div className="details-content-left">
          <p>Name: {details.company.name}</p>
          <p>{details.company.catchPhrase}</p>
        </div>
        <div className="details-content-right">
          <p>{details.company.bs}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
