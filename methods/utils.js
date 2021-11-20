const jwt = require("jsonwebtoken");
const Company = require("../models/company");
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    "gowtham",
    {
      expiresIn: "20d",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    "gowtham",
    {
      expiresIn: "30d",
    }
  );
};
const authorizeToken = async (req, res, token) => {
  // const authHeader = req.headers.authorization;
  if (token) {
    // const userId = authHeader.split(" ")[1];
    //const userId = cookie;
    jwt.verify(token, "gowtham", (err, user) => {
      if (err) {
        return res.status(403).send({ msg: "Token is not valid!" });
      }
      req.user = user;
      return true;
    });
  } else {
    res.status(401).send({ msg: "You are not authenticated!" });
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authorizeToken,
};
