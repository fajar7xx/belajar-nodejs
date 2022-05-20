const { response } = require("express");
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

// ejs usage
//expressjs.com/en/guide/using-template-engines.html
https: app.set("view engine", "ejs");

// third party middleware
app.use(expressLayout);
app.use(morgan("dev"));

// built in middleware for access assets file
app.use(express.static("public"));

// application middleware
app.use((request, response, next) => {
  console.log("time: ", Date.now());
  next();
});

app.get("/", (request, response) => {
  // response.sendFile("./index.html", { root: __dirname });
  const students = [
    {
      name: "fajar setiawan siagian",
      email: "fajar7xx@gmail.com",
    },
    {
      name: "Azhari Siagian",
      email: "azhari@gmail.com",
    },
    {
      name: "Nadiah Siagian",
      email: "nadiah@gmail.com",
    },
  ];

  response.render("index", {
    layout: "layouts/main-layout",
    title: "Homepage",
    name: "Fajar Setiawan Siagian",
    students,
  });
});

app.get("/about", (request, response) => {
  // response.sendFile("./about.html", { root: __dirname });
  response.render("about", {
    layout: "layouts/main-layout",
    title: "About page",
  });
});

app.get("/contact", (request, response) => {
  // response.sendFile("./contact.html", { root: __dirname });
  response.render("contact", {
    layout: "layouts/main-layout",
    title: "Contact page",
  });
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
