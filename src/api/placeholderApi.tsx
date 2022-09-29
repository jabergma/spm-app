import { useState } from "react";
import { User } from "../interface/user";

export function useContacts(id: number) {
  const [contacts, setContacts] = useState<User[]>([]);
  const getContacts = async () => {
    try {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((res) => setContacts(res));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async () => {
    const result = await deleteRequest(id);
    if (result!) {
      const newContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(newContacts);
    } else console.log("could not delete contact");
  };

  return [contacts, getContacts, deleteContact] as const;
}

async function deleteRequest(id: number) {
  let result;
  try {
    await fetch("https://jsonplaceholder.typicode.com/users/" + id, {
      method: "DELETE",
    }).then(
      async (response) => await response.json().then((res) => (result = res))
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
