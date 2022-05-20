const getUserSync = (id) => {
  //   let nama = "";
  //   if (id === 1) {
  //     nama = "Fajar";
  //   } else {
  //     nama = "Siagian";
  //   }

  const nama = id === 1 ? "Fajar" : "Setiawan Siagian";
  return {
    id,
    nama,
  };
};

const userSatu = getUserSync(1);
console.log(userSatu);

const userDua = getUserSync(2);
console.log(userDua);

const halo = "Halo kawan ku";
console.log(halo);
