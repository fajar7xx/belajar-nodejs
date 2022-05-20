const fs = require("fs");

// cek folder if not exist create then
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// create contact.json if not exist
const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contact.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);

  return contacts;
};

const findContact = (name) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  return contact;
};

const saveContacts = (contacts) => {
  fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
};

const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

const cekDuplikat = (name) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.name === name);
};

const deleteContact = (name) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => contact.name !== name);
  // console.log(newContacts);
  saveContacts(newContacts);
};

const updateContact = (newContacts) => {
  const contacts = loadContact();

  // delete old contact exist with oldname
  const filteredContact = contacts.filter(
    (contact) => contact.name !== newContacts.oldname
  );

  // console.log(filteredContact, newContacts);
  delete newContacts.oldname;
  filteredContact.push(newContacts);
  saveContacts(filteredContact);
};

module.exports = {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact,
};
