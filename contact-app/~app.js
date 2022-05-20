const yargs = require("yargs");

// mengambil argumen dari terminal
// console.log(process.argv);
// const command = process.argv[2];
console.log(yargs.argv);

// const fs = require("fs");
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // cek folder if not exist create then
// const dirPath = "./data";
// if (!fs.existsSync(dirPath)) {
//   fs.mkdirSync(dirPath);
// }

// // create contact.json if not exist
// const dataPath = "./data/contact.json";
// if (!fs.existsSync(dataPath)) {
//   fs.writeFileSync(dataPath, "[]", "utf-8");
// }

// // jika pertanyaan nya banyak maka akan menyebabkan callback hell
// // hal ini berbahaya jika di teruskan maka kita akan menggunakan async await dengan meletakkanny pada block promise
// // rl.question("Masukkan nama anda: ", (nama) => {
// //   rl.question("Masukkan no Hp anda: ", (noHp) => {
// //     const contact = { nama, noHp };
// //     const fileBuffer = fs.readFileSync("data/contact.json", "utf-8");
// //     const contacts = JSON.parse(fileBuffer);

// //     contacts.push(contact);

// //     fs.writeFileSync("data/contact.json", JSON.stringify(contacts));

// //     console.log("terima kasih sudah memasukkann data.");
// //     fs.close();
// //   });
// // });

// // const pertanyaan1 = () => {
// //   return new Promise((resolve, reject) => {
// //     rl.question("masukkan nama anda: ", (nama) => {
// //       resolve(nama);
// //     });
// //   });
// // };

// // const pertanyaan2 = () => {
// //   return new Promise((resolve, reject) => {
// //     rl.question("masukkan email anda: ", (email) => {
// //       resolve(email);
// //     });
// //   });
// // };

// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (jawaban) => {
//       resolve(jawaban);
//     });
//   });
// };

// object distructuring dari pada panggil object lebih bagus ubah jadi variable nya
// const { tulisPertanyaan, simpanContact } = require("./contacts");

// const main = async () => {
//   //   const nama = await pertanyaan1();
//   //   const email = await pertanyaan2();

//   const nama = await tulisPertanyaan("masukkan nama anda: ");
//   const email = await tulisPertanyaan("masukkann email anda: ");
//   const noHp = await tulisPertanyaan("masukkan noHP anda: ");

//   // const contact = {
//   //   nama,
//   //   email,
//   //   noHp,
//   // };
//   // const fileBuffer = fs.readFileSync("data/contact.json", "utf-8");
//   // const contacts = JSON.parse(fileBuffer);

//   // contacts.push(contact);

//   // fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
//   // console.log("terima kasih sudah memasukkan data.");

//   // rl.close();
//   simpanContact(nama, email, noHp);
// };

// // call main function
// main();
