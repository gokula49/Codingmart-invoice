var mongoose = require("mongoose");
var schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      default: " ",
    },
    location: {
      type: String,
      required: true,
      default: " ",
    },
    picture: {
      type: String,
      required: true,
      default:
        "https://img.icons8.com/external-becris-lineal-becris/64/000000/external-user-mintab-for-ios-becris-lineal-becris.png",
    },
    idToken: String,
    expireToken: String,
  },
  { timestamps: true },
  { collection: "users" }
);
//Schema pre hooks --i.e. This will be executed before saving details to the certain document.
userSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

//Schema methods ---bcrypt method
userSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
