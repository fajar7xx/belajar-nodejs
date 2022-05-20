const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3001;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const { mongoose, Schema } = require("mongoose");
const Contact = require("./models/contact");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");
const { ObjectId } = require("bson");

// ejs usage
//expressjs.com/en/guide/using-template-engines.html
https: app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

// override method
app.use(methodOverride("_method"));

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

app.get("/contact", async (request, response) => {
  const contacts = await Contact.find();

  console.log(contacts);
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

app.get("/contact/edit/:name", async (request, response) => {
  const contact = await Contact.findOne({ name: request.params.name });
  console.log(contact);
  response.render("contact-edit", {
    layout: "layouts/main-layout",
    title: "Edit Contact",
    contact,
  });
});

app.get("/contact/:name", async (request, response) => {
  const contact = await Contact.findOne({ name: request.params.name });
  response.render("contact-detail", {
    layout: "layouts/main-layout",
    title: "Detail Contact",
    contact,
  });
});

app.post(
  "/contact",
  [
    body("name").custom(async (value) => {
      const duplikat = await Contact.findOne({ name: value });
      if (duplikat) {
        throw new Error(
          "fullname has been registered, pelase using differend name"
        );
      }
      return true;
    }),
    check("email", "not valid email, please using a valid email").isEmail(),
    check("mobile", "mobile phone not valid").isMobilePhone("id-ID"),
  ],
  (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("contact-add", {
        layout: "layouts/main-layout",
        title: "Add new contact",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(request.body, (error, result) => {
        // send flash message
        request.flash("msg", "Contact has been successfully saved");
        response.redirect("/contact");
      });
    }
  }
);

app.put(
  "/contact",
  [
    body("name").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ name: value });
      if (value !== req.body.oldname && duplikat) {
        throw new Error(
          "fullname has been registered, pelase using different name"
        );
      }
      return true;
    }),
    check("email", "not valid email, please using a valid email").isEmail(),
    check("mobile", "mobile phone not valid").isMobilePhone("id-ID"),
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
      Contact.updateOne(
        {
          _id: request.body._id,
        },
        {
          $set: {
            name: request.body.name,
            email: request.body.email,
            mobile: request.body.mobile,
          },
        }
      )
        .then((result) => {
          // send flash message
          request.flash("msg", "Contact has been successfully updated");
          response.redirect("/contact");
        })
        .catch((error) => console.error(error));
    }
  }
);

app.delete("/contact", (request, response) => {
  // response.send(request.body.id);
  Contact.deleteOne({ name: request.body.name })
    .then((result) => {
      console.log(result);
      request.flash("msg", "contact has been successfully deleted");
      response.redirect("/contact");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(
    `Express Mongo Contact app - listening at http://localhost:${port}`
  );
});
