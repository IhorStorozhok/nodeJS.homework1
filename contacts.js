const fs = require("fs/promises");
const path = require("path");
contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const allCurrentContacts = JSON.parse(data);
  return allCurrentContacts;
}

async function getContactById(contactId) {
  const currentContacts = await listContacts();
  const receivedContact = currentContacts.filter((el) => {
    return el.id === contactId;
  });
  return receivedContact;
}

async function removeContact(contactId) {
  const currentContacts = await listContacts();
  const deletedContact = currentContacts.find((el) => {
    return el.id === contactId;
  });
  const newContacts = currentContacts.filter((el) => {
    return el.id !== contactId;
  });
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const currentContacts = await listContacts();
  const contactsWithNew = [
    ...currentContacts,
    {
      id: `${currentContacts.length + 1}`,
      name,
      email,
      phone,
    },
  ];
  await fs.writeFile(contactsPath, JSON.stringify(contactsWithNew));
  return contactsWithNew;
}

const operations = { listContacts, getContactById, removeContact, addContact };

module.exports = operations;
