import React from "react";
import { User } from "../interface/user";

interface Props {
  setDetails: (contact: User) => void;
  contacts: User[];
}

export const ContactList: React.FC<Props> = ({ setDetails, contacts }) => {
  return (
    <div>
      {contacts.map((contact: User) => (
        <div
          style={{ cursor: "pointer" }}
          key={contact.id}
          onClick={() => setDetails(contact)}
        >
          <div className="contacts">
            <div>Name: {contact.name}</div>
            <div>Co: {contact.company.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
