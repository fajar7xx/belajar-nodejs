const { ObjectID } = require("bson");
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "test_contact";

const client = new MongoClient(uri);

// dengan callback bukan asynchronous
client.connect((error, client) => {
  if (error) {
    return console.error("koneksi gagal");
  }

  const db = client.db(dbName);
  const students = db.collection("students");

  // console.log("koneksi berhasil");
  // menambahkan 1 data ke collection students
  // students.insertOne(
  //   {
  //     name: "Siti BAdriah",
  //     email: "sitibadriah@mail.id",
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log("gagal menambahkan data");
  //     }
  //     console.log(result);
  //   }
  // );

  // menambahkan banyak data ke collection students
  // students.insertMany(
  //   [
  //     {
  //       name: "Fajar Setiawan",
  //       email: "fajarsetiawan@gmail.id",
  //     },
  //     {
  //       name: "alfarizi bakri",
  //       email: "alfarizibakri@mail.id",
  //     },
  //     {
  //       name: "annisa harun",
  //       email: "annisaharun@stas.co",
  //     },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.error("data gagal ditambahkan");
  //     }

  //     console.log(result);
  //   }
  // );

  // read semua data
  // console.log(
  //   students.find().toArray((error, result) => {
  //     console.log(result);
  //   })
  // );

  // menampilkan data berdasarkan kriteria
  // console.log(
  //   students
  //     .find({ _id: ObjectID("62835329f7aabeb3a07eb121") })
  //     .toArray((error, result) => {
  //       console.log(result);
  //     })
  // );

  // update 1 data dalam bentuk promise
  // const updatePromise = students.updateOne(
  //   {
  //     _id: ObjectID("62835329f7aabeb3a07eb121"),
  //   },
  //   {
  //     $set: {
  //       name: "fajarudin sitepu tepu",
  //     },
  //   }
  // );

  // updatePromise
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // update many data
  // students.updateMany(
  //   {
  //     nama: "siti fatimah",
  //   },
  //   {
  //     $set: {
  //       name: "siti fatimah imah",
  //     },
  //   }
  // );

  // hapus data
  // students
  //   .deleteOne({
  //     _id: ObjectID("62835329f7aabeb3a07eb121"),
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // multiple delete
  students.deleteMany({
    name: "siti fatimah",
  });
});
