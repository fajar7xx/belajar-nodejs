console.log("hello fajar");
const nama = "Fajar Setiawan Siagan";
console.log(nama);

const cetakNama = (nama) => `Hi, nama saya ${nama}`;
console.log(cetakNama("siagian"));

const PI = 3.14;

const mahasiswa = {
  nama: "Fajar Siagian",
  umur: 20,
  cetakMhs() {
    return `Halo, nama saya ${this.nama} dan berumur ${this.umur} tahun`;
  },
};

class Orang {
  constructor() {
    console.log("Object orang telah di buat!!!");
  }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// alternatife
module.exports = {
  cetakNama,
  PI,
  mahasiswa,
  Orang,
};
