const express = require("express");
const expressLayout = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact,
} = require("./utils/contact");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// ejs usage
//expressjs.com/en/guide/using-template-engines.html
https: app.set("view engine", "ejs");

// third party middleware
app.use(expressLayout);

// built in middleware for access assets file
app.use(express.static("public"));
//untuk mengirim data post
app.use(express.urlencoded({ extended: true }));

// flash message configuration
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: {
      maxAge: 6000,
    },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (request, response) => {
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
  response.render("about", {
    layout: "layouts/main-layout",
    title: "About page",
  });
});

app.get("/contact", (request, response) => {
  const contacts = loadContact();
  // console.log(contacts);
  response.render("contact", {
    layout: "layouts/main-layout",
    title: "Contact page",
    contacts,
    msg: request.flash("msg"),
  });
});

app.get("/contact/add", (request, response) => {
  response.render("contact-add", {
    layout: "layouts/main-layout",
    title: "Add new contact",
  });
});

app.get("/contact/delete/:name", (request, response) => {
  const contact = findContact(request.params.name);
  if (!contact) {
    response.status(404);
    response.send(`<h1>404</h1>`);
  } else {
    // response.send("OK");
    deleteContact(request.params.name);
    request.flash("msg", "contach has been successfully deleted");
    response.redirect("/contact");
  }
});

app.get("/contact/edit/:name", (request, response) => {
  const contact = findContact(request.params.name);

  response.render("contact-edit", {
    layout: "layouts/main-layout",
    title: "Edit Contact",
    contact,
  });
});

app.get("/contact/:name", (request, response) => {
  const contact = findContact(request.params.name);
  // console.log(contacts);
  response.render("contact-detail", {
    layout: "layouts/main-layout",
    title: "Detail Contact",
    contact,
  });
});

app.post(
  "/contact",
  [
    body("name").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error(
          "fullname has been registered, pelase using differend name"
        );
      }
      return true;
    }),
    check("email", "not valid email, please using a valid email").isEmail(),
    check("nohp", "mobile phone not valid").isMobilePhone("id-ID"),
  ],
  (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      // return response.status(404).json({
      //   errors: errors.array(),
      // });
      response.render("contact-add", {
        layout: "layouts/main-layout",
        title: "Add new contact",
        errors: errors.array(),
      });
    } else {
      addContact(request.body);

      // send flash message
      request.flash("msg", "Contact has been successfully saved");

      response.redirect("/contact");
    }
    // console.log(request.body);
    // response.send("data has been successfully saved");
  }
);

app.post(
  "/contact/update",
  [
    body("name").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldname && duplikat) {
        throw new Error(
          "fullname has been registered, pelase using differend name"
        );
      }
      return true;
    }),
    check("email", "not valid email, please using a valid email").isEmail(),
    check("nohp", "mobile phone not valid").isMobilePhone("id-ID"),
  ],
  (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("contact-edit", {
        layout: "layouts/main-layout",
        title: "edit contact",
        errors: errors.array(),
        contact: request.body,
      });
    } else {
      updateContact(request.body);
      // send flash message
      request.flash("msg", "Contact has been successfully updated");
      response.redirect("/contact");
    }
  }
);

// middleware
app.use("/", (request, response) => {
  response.status(404);
  response.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`web server listening on port ${port}`);
});
