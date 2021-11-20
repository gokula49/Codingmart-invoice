var mongoose = require("mongoose");
var schema = mongoose.Schema;

var companySchema = new schema(
  {
    cname: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      required: true,
    },
    details: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true },
  { collection: "companies" }
);

module.exports = mongoose.model("Company", companySchema);
