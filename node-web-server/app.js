const http = require("http");
const fs = require("fs");
const port = 3000;

const renderHTML = (path, response) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      response.writeHead(404);
      response.write("Error: file not found");
    } else {
      response.write(data);
    }
    response.end();
  });
};

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });

  //   manual routing
  const url = request.url;
  console.log(url);
  //   if (url === "/about") {
  //     // response.write("<h1>Ini adalah halaman about</h1>");
  //     // // response.end();
  //     // fs.readFile("./about.html", (err, data) => {
  //     //   if (err) {
  //     //     response.writeHead(404);
  //     //     response.write("Error: file not found");
  //     //   } else {
  //     //     response.write(data);
  //     //   }
  //     //   response.end();
  //     // });
  //     renderHTML("./about.html", response);
  //   } else if (url === "/contact") {
  //     // response.write("<h1>Ini adalah halaman contact</h1>");
  //     // response.end();
  //     renderHTML("./contact.html", response);
  //   } else {
  //     // response.write("server hello world");
  //     // fs.readFile("./index.html", (err, data) => {
  //     //   if (err) {
  //     //     response.writeHead(404);
  //     //     response.write("Error: file not found");
  //     //   } else {
  //     //     response.write(data);
  //     //   }
  //     //   response.end();
  //     // });
  //     renderHTML("./index.html", response);
  //   }

  switch (url) {
    case "/about":
      renderHTML("./about.html", response);
      break;
    case "/contact":
      renderHTML("./contact.html", response);
      break;
    default:
      renderHTML("./index.html", response);
      break;
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
