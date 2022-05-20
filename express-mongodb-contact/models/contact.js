const { mongoose, Schema } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
