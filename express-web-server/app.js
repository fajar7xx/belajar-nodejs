const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (request, response) => {
  // response.send("hello world");
  response.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (request, response) => {
  // response.send("halaman about");
  response.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (request, response) => {
  // response.send("halaman contact kami");
  response.sendFile("./contact.html", { root: __dirname });
});

app.get("/produk/:id/category/:idcatagory", (request, response) => {
  response.send(
    `Produk id ${request.params.id} dengan category id ${request.params.idcatagory} dengan pencarian ${request.query.q}`
  );
});

// middleware
app.use("/", (request, response) => {
  response.status(404);
  response.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`web server listening on port ${port}`);
});

// const http = require("http");
// const fs = require("fs");
// const port = 3000;

// const renderHTML = (path, response) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       response.writeHead(404);
//       response.write("Error: file not found");
//     } else {
//       response.write(data);
//     }
//     response.end();
//   });
// };

// const server = http.createServer((request, response) => {
//   response.writeHead(200, {
//     "Content-Type": "text/html",
//   });

//   //   manual routing
//   const url = request.url;
//   console.log(url);
//   //   if (url === "/about") {
//   //     // response.write("<h1>Ini adalah halaman about</h1>");
//   //     // // response.end();
//   //     // fs.readFile("./about.html", (err, data) => {
//   //     //   if (err) {
//   //     //     response.writeHead(404);
//   //     //     response.write("Error: file not found");
//   //     //   } else {
//   //     //     response.write(data);
//   //     //   }
//   //     //   response.end();
//   //     // });
//   //     renderHTML("./about.html", response);
//   //   } else if (url === "/contact") {
//   //     // response.write("<h1>Ini adalah halaman contact</h1>");
//   //     // response.end();
//   //     renderHTML("./contact.html", response);
//   //   } else {
//   //     // response.write("server hello world");
//   //     // fs.readFile("./index.html", (err, data) => {
//   //     //   if (err) {
//   //     //     response.writeHead(404);
//   //     //     response.write("Error: file not found");
//   //     //   } else {
//   //     //     response.write(data);
//   //     //   }
//   //     //   response.end();
//   //     // });
//   //     renderHTML("./index.html", response);
//   //   }

//   switch (url) {
//     case "/about":
//       renderHTML("./about.html", response);
//       break;
//     case "/contact":
//       renderHTML("./contact.html", response);
//       break;
//     default:
//       renderHTML("./index.html", response);
//       break;
//   }
// });

// server.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
