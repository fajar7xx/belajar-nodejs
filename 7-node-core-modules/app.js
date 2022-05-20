// import * as fs from "fs";
const fs = require("fs");

// console.log(fs);

// menuliskan string ke file (synchrounous)
// try {
//   fs.writeFileSync("tes.txt", "Hello sayangku secra synchronous!");
// } catch (e) {
//   console.log(e);
// }

// async
// fs.writeFile("tes.txt", "hello dunia async", (err) => {
//   console.log(err);
// });

// membaca isi file secara synchronous
// const tes = fs.readFileSync("tes.txt");
// console.log(tes.toString());

// asynchronous
// fs.readFile("tes.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// readline
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("masukkan nama anda: ", (nama) => {
  console.log(`terima kasih ${nama} telah mengunjungi`);
  rl.close();
});
