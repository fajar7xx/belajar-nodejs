const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

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

// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (jawaban) => {
//       resolve(jawaban);
//     });
//   });
// };

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contact.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);

  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const contact = {
    nama,
    email,
    noHp,
  };
  //   const fileBuffer = fs.readFileSync("data/contact.json", "utf-8");
  //   const contacts = JSON.parse(fileBuffer);

  const contacts = loadContact();
  //   console.log(contacts);

  //   cek duplikat nama
  const duplikat = contacts.find((contact) => contact.nama === nama);
  //   console.log(duplikat);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("contact has been registered, please try again!")
    );
    return false;
  }

  //   email validation
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(
        chalk.red.inverse.bold("Invalid email, please input valid email")
      );
      return false;
    }
  }

  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(
      chalk.red.inverse.bold(
        "Invalid phone number, please input valid phone number"
      )
    );
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contact.json", JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold("terima kasih sudah memasukkan data."));

  //   rl.close();
};

const listContact = () => {
  const contacts = loadContact();

  console.log(chalk.cyan.inverse.bold("list kontak"));
  contacts.forEach((contact, index) => {
    // console.table({ contact }, ["nama", "email", "noHp"]);
    console.log(`${index + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

const detailContact = (nama) => {
  //   console.log(nama);
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  //   console.log(contact);
  if (!contact) {
    console.log(chalk.red.inverse.bold("data not found"));
    return false;
  }

  console.group(chalk.cyan.inverse.bold("contact detail"));
  console.log(contact.nama);
  if (contact.email) {
    console.log(contact.email);
  }
  console.log(contact.noHp);
  console.groupEnd();
};

const deleteContact = (nama) => {
  const contacts = loadContact();

  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false;
  }

  fs.writeFileSync("data/contact.json", JSON.stringify(newContacts));
  console.log(chalk.green.inverse.bold(`${nama} telah berhasil dihappus.`));
};

// module.exports = { tulisPertanyaan, simpanContact };
module.exports = {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
};
