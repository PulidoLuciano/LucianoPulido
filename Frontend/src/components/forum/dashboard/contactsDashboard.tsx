import { useFetch } from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Contact } from "../../../types";

export default function ContactsDashboard() {
  const { fetcher } = useFetch();
  const [contactsCount, setContactsCount] = useState<number>(0);
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const [offset, setOffset] = useState<number>(0);
  const limit: number = 10;

  useEffect(() => {
    async function fetchData() {
      let data: { count: number } = await fetcher("/contact/count", "GET");
      setContactsCount(data.count);
      await fetchFirstContacts();
    }

    fetchData();
  }, []);

  async function fetchFirstContacts() {
    const contactsData = await fetcher(
      `/contact/dashboard?limit=${limit}&offset=${0}`,
      "GET"
    );
    setContacts(contactsData);
    setOffset(0 + limit);
  }

  async function fetchMoreContacts() {
    const moreContacts = await fetcher(
      `/contact/dashboard?limit=${limit}&offset=${offset}`,
      "GET"
    );
    setOffset(offset + limit);
    setContacts([...contacts, ...moreContacts]);
  }

  async function deleteContact(contact: Contact) {
    try {
      await fetcher(`/contact/${contact.id}`, "DELETE");
    } catch (error) {
      if (
        (error as Error).message ==
        "Failed to execute 'json' on 'Response': Unexpected end of JSON input"
      ) {
        setContacts(contacts.filter((c) => c.id !== contact.id));
        setContactsCount(contactsCount - 1);
      } else {
        console.error("Error deleting article:", error);
      }
    }
  }

  return (
    <article>
      <section className="flex justify-between">
        <h2 className="text-2xl font-semibold">Contacts</h2>
      </section>
      <section className="flex justify-around py-4">
        <span>
          <p className="text-gray-500 italic">Quantity</p>
          <p className="text-2xl">{contactsCount}</p>
        </span>
      </section>
      <section className="border-2 border-primary-light rounded-3xl h-96 overflow-auto px-4 py-4">
        {contacts.length ? (
          contacts.map((contact) => (
            <article className="w-full justify-between mb-3" key={contact.id}>
              <details className="w-full">
                <summary className="font-semibold">
                  {contact.subject}
                </summary>
                <p className="text-gray-500">
                  Name: {contact.name}
                </p>
                <p className="text-gray-500">
                  E-mail: {contact.email}
                </p>
                <p className="text-gray-500">
                  Date: {new Date(contact.date).toLocaleString()}
                </p>
                <p>
                  {contact.message}
                </p>
                <button className="px-1" onClick={() => deleteContact(contact)}>
                  🗑️
                </button>
              </details>
            </article>
          ))
        ) : (
          <p>There's no contacts</p>
        )}
        {contacts.length < contactsCount ? (
          <button
            className="text-secondary-dark underline w-full"
            onClick={fetchMoreContacts}
          >
            Show more
          </button>
        ) : null}
      </section>
    </article>
  );
}
