const yargs = require("yargs");
const {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");

// yargs.command(
//   "add",
//   "Add new contact",
//   () => {},
//   (argv) => {
//     console.log(argv.nama);
//   }
// );

yargs
  .command({
    command: "add",
    describe: "Add new contact",
    builder: {
      nama: {
        describe: "Fullname",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email address",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "Mobile number",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      const contact = {
        nama: argv.nama,
        email: argv.email,
        noHp: argv.noHp,
      };
      // console.log(contact);

      simpanContact(contact.nama, contact.email, contact.noHp);
    },
  })
  .demandCommand();

// menampilkan semua contact
yargs.command({
  command: "list",
  describe: "List all contacts",
  handler() {
    listContact();
  },
});

// contact detail
yargs.command({
  command: "detail",
  describe: "View contact detail based on name",
  builder: {
    nama: {
      describe: "Fullname",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
    // console.log(argv);
  },
});

// delete contact by name
yargs.command({
  command: "delete",
  describe: "delete contact by name",
  builder: {
    nama: {
      describe: "Fullname",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
