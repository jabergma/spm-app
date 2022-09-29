import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import ContactList from "./components/ContactList";
import Details from "./components/Details";
import { User } from "./interface/user";
import { useContacts } from "./api/placeholderApi";
import { DEFAULT_ID, SEARCH_RATIO } from "./const";

function App() {
  const [currentContactDetails, setCurrentContactDetails] = useState<User | null>();
  const [currentContactId, setcurrentContactId] = useState(DEFAULT_ID);
  const [search, setSearch] = useState<string>("");
  const [contacts, getContacts, deleteContact] = useContacts(currentContactId);
  const [searchedContacts, setsearchedContacts] = useState<User[] | undefined>();

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    currentContactDetails
      ? setcurrentContactId(currentContactDetails.id)
      : setcurrentContactId(DEFAULT_ID);
  }, [currentContactDetails]);

  useEffect(() => {
    const handleSearch =
      contacts.length > 0
        ? contacts.filter(
            (contact) =>
              fuzzySearch(contact.name.toLowerCase(), search) ||
              fuzzySearch(contact.email.toLowerCase(), search) ||
              fuzzySearch(contact.company.name.toLowerCase(), search)
          )
        : undefined;
    setsearchedContacts(handleSearch);
  }, [search, contacts]);

  function fuzzySearch(text: string, search: string): boolean {
    const fSearch = search.toLowerCase();
    let fSearchPos = 0;

    for (let i = 0; i < text.length; i++) {
      let char = text[i];

      if (fSearchPos < fSearch.length && char == fSearch[fSearchPos]) {
        fSearchPos++;
      }
    }
    if (fSearchPos / fSearch.length > SEARCH_RATIO) return true;
    else return false;
  }
  return (
    <>
      <div>
        <Search search={search} setSearch={setSearch} />
        <div className="flex-container">
          <div className="flex-content-column">
            {search != "" && searchedContacts ? (
              <ContactList
                setDetails={setCurrentContactDetails}
                contacts={searchedContacts}
              />
            ) : (
              <ContactList
                setDetails={setCurrentContactDetails}
                contacts={contacts}
              />
            )}
          </div>
          <div className="flex-content-column">
            {currentContactDetails ? (
              <Details
                details={currentContactDetails}
                setDetails={setCurrentContactDetails}
                deleteContact={deleteContact}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
