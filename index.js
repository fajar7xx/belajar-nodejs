// const fs = require("fs"); // core module
// const cetakNama = require("./coba"); //lobal module
// const moment = require("moment"); //third party module/npm/node_modules

// console.log("index manggil coba");
// console.log(cetakNama("fajar"));

const coba = require("./coba");

console.log(
  coba.cetakNama("fajar siagian"),
  coba.PI,
  coba.mahasiswa.cetakMhs(),
  new coba.Orang()
);
