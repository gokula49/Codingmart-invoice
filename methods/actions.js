const nodeMailer = require("nodemailer");
const User = require("../models/user");
const Company = require("../models/company");
const Employee = require("../models/employee");
const { OAuth2Client } = require("google-auth-library");
const PasswordGenerator = require("generate-password");
const utils = require("./utils");
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
const { verify } = require("jsonwebtoken");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

let refreshTokens = [];
//nodemailer config
const transporter = nodeMailer.createTransport({
  service: "gmail",
  // host:'smptp.gmail.com',
  // port:465,
  // secure:true,
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRRESH_TOKEN,
  },
});

var functions = {
  Home: async (req, res) => {
    res.send({ msg: "Hello there he !", success: true });
  },
  CheckUser: async (req, res) => {
    const userId = req.cookies.accessToken;
    console.log(token);
    res.send({ msg: "you are logged in", token: token });
  },
  AuthenticateUser: async (req, res) => {
    const user = {
      id: "123344",
      name: "sarav",
      email: "sarav@gmail.com",
    };
    const accessToken = utils.generateAccessToken(user);
    const refreshToken = utils.generateRefreshToken(user);

    res
      .setCookie("accessToken", accessToken, {
        path: "/",
        sameSite: "none",
        httpOnly: true,
        secure: true,
        expires: new Date(new Date().getTime() + 500 * 1000),
      })
      .send({ accessToken: accessToken, refreshToken: refreshToken });
  },
  RegisterUser: async (req, res) => {
    const { fullName, email, password, companyName, location } = req.body;
    await User.findOne({ email: email }, async (err, user) => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .send({ success: false, msg: "Something went wrong ! Try again ." });
      }
      if (user) {
        console.log(user);
        res.code(408);
        res.send({
          success: false,
          msg: "User already exists ! Try with different email",
        });
      }
      const newUser = User({
        name: fullName,
        email: email,
        password: password,
        companyName: companyName,
        location: location,
      });
      await newUser.save(async function (err, newUser) {
        if (err || !newUser) {
          console.log(err);
          res.status(400).send({
            success: false,
            msg: "Something went wrong ! Try again .",
          });
        }
        if (newUser) {
          const accessToken = utils.generateAccessToken(newUser);
          const refreshToken = utils.generateRefreshToken(newUser);
          refreshTokens.push(refreshToken);
          res.status(200).send({
            success: true,
            msg: "User Created Successfully !",
            accessToken: accessToken,
            refreshToken: refreshToken,
            name: newUser.name,
            picture: newUser.picture,
            email: newUser.email,
            company: newUser.companyName,
            gps: newUser.location,
            _id:newUser._id
          });
        }
      });
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  },

  LoginUser: async (req, res) => {
    const { email, password } = req.body;
    await User.findOne({ email: email }, function (err, user) {
      if (err) {
        res.status(408);
        return res.send({
          success: false,
          msg: "Authentication Failed. ERROR :" + err,
        });
      }
      if (user === null) {
        res.status(401);
        return res.send({ success: false, msg: "User does not exist" });
      } else {
        console.log(user);
        user.comparePassword(password, async function (err, isMatch) {
          if (isMatch && !err) {
            var userCompany = await Company.findOne({ email: email });
            console.log(userCompany);
            const accessToken = utils.generateAccessToken(user);
            const refreshToken = utils.generateRefreshToken(user);
            refreshTokens.push(refreshToken);

            res.status(200).send({
              success: true,
              msg: "Login Successfull !",
              accessToken: accessToken,
              refreshToken: refreshToken,
              name: user.name,
              picture: user.picture,
              email: user.email,
              _id:user._id,
              companyDetails: JSON.stringify(userCompany),
            });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed ! Wrong password !",
            });
          }
        });
      }
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  },

  LoginUserGoogle: async (req, res) => {
    console.log(req.body.tokenid);
    const { tokenid } = req.body;
    await client
      .verifyIdToken({
        idToken: tokenid,
        audience:"420079793002-8lbp6op5qldho9oauim9ivnp8umqd7r0.apps.googleusercontent.com",
      })
      .then((response) => {
        const { email_verified, name, email, picture } = response.payload;
        const password = email.split("@");

        console.log(response.payload);

        if (email_verified) {
          User.findOne({ email }, async function (err, user) {
            if (err) {
              console.log(err);
              res.code(400);
              return res.send({
                success: false,
                msg: "Something went wrong ! Try again",
              });
            } else {
              if (user) {
                user.picture = picture;
                await user.save(async function (err, newUser) {
                  if (err) {
                    console.log(err);
                    res.code(408);
                    return res.send({
                      sucess: false,
                      msg: "Failed to create User !. Try again",
                    });
                  } else {
                    var userCompany = await Company.findOne({ email: email });
                    const accessToken = utils.generateAccessToken(newUser);
                    const refreshToken = utils.generateRefreshToken(newUser);

                    refreshTokens.push(refreshToken);
                    res.code(200);
                    return res.send({
                      success: true,
                      msg: "Successfully created user ! : " + response.mail,
                      accessToken: accessToken,
                      refreshToken: refreshToken,
                      name: newUser.name,
                      email: newUser.email,
                      picture: newUser.picture,
                      companyDetails: JSON.stringify(userCompany),
                      _id:newUser._id
                    });
                  }
                });
              } else {
                var newUser = User({
                  name: name,
                  email: email,
                  password: password[0],
                  picture: picture,
                  expireToken: Date.now() + 180000000,
                });
                await newUser.save(async function (err, newUser) {
                  if (err) {
                    console.log(err);
                    res.code(408);
                    return res.send({
                      sucess: false,
                      msg: "Failed to create User !. Try again",
                    });
                  } else {
                    const accessToken = utils.generateAccessToken(newUser);
                    const refreshToken = utils.generateRefreshToken(newUser);

                    refreshTokens.push(refreshToken);
                    res.code(200);
                    return res.send({
                      success: true,
                      msg: "Successfully created user ! : " + response.mail,
                      accessToken: accessToken,
                      refreshToken: refreshToken,
                      name: newUser.name,
                      email: newUser.email,
                      picture: newUser.picture,
                      companyDetails: null,
                    });
                  }
                });
              }
            }
          });
        } else {
          console.log("Email:" + email_verified);
          res.code(408);
          return res.send({
            success: false,
            msg: "Email not verified !. Try again",
          });
        }
      });
  },

  LoginUserFacebook: async (req, res) => {
    const { accessToken, userID } = req.body;
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
    fetch(urlGraphFacebook, {
      method: "GET",
    })
      .then((result) => result.json())
      .then((result) => {
        const email = result.email;
        const name = result.name;
        const picture = result.picture.data.url;
        const password = email.split("@");
        console.log(result);

        User.findOne({ email }, async function (err, user) {
          if (err) {
            console.log(err);
            res.code(400);
            return res.send({
              success: false,
              msg: "Something went wrong ! Try again",
            });
          } else {
            if (user) {
              user.picture = picture;
              await user.save(async function (err, newUser) {
                if (err) {
                  console.log(err);
                  res.code(408);
                  return res.send({
                    sucess: false,
                    msg: "Failed to create User !. Try again",
                  });
                } else {
                  var userCompany = await Company.findOne({ email: email });
                  const accessToken = utils.generateAccessToken(newUser);
                  const refreshToken = utils.generateRefreshToken(newUser);

                  refreshTokens.push(refreshToken);
                  res.code(200);
                  return res.send({
                    success: true,
                    msg: "Successfully created user !",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    name: newUser.name,
                    email: newUser.email,
                    picture: newUser.picture,
                    companyDetails: JSON.stringify(userCompany),
                  });
                }
              });
            } else {
              var freshUser = User({
                name: name,
                email: email,
                password: password[0],
                picture: picture,
                expireToken: Date.now() + 180000000,
              });
              await freshUser.save(function (err, newUser) {
                if (err) {
                  console.log(err);
                  res.code(408);
                  return res.send({
                    sucess: false,
                    msg: "Failed to create User !. Try again",
                  });
                } else {
                  const accessToken = utils.generateAccessToken(newUser);
                  const refreshToken = utils.generateRefreshToken(newUser);

                  refreshTokens.push(refreshToken);
                  res.code(200);
                  return res.send({
                    success: true,
                    msg: "Successfully created user !",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    name: newUser.name,
                    email: newUser.email,
                    picture: newUser.picture,
                    companyDetails: null,
                  });
                }
              });
            }
          }
        });
      });
  },

  CreateCompany: async (req, res) => {
    try {
      const { exp, email } = verify(
        req.body.token,
        "gowtham"
      );
      if (Date.now() >= exp * 1000) {
        console.log("Expired");
        res.code(401);
        res.send({ success: false, msg: "Token Expired !Login again" });
      } else {
        console.log("valid token" + email);
        User.findOne({ email: email }, async function (err, user) {
          if (err) {
            console.log(err);
            res.code(408);
            return res.send({
              success: false,
              msg: "Server Error ! Try Again",
            });
          } else {
            const companyDetails = req.body.companyDetails;
            const { organizationName } = companyDetails;
            var company = new Company({
              cname: organizationName,
              email: email,
              id: user._id,
              details: companyDetails,
            });
            await company.save(function (err, c) {
              if (err) {
                console.log(err);
                res.status(408);
                return res.send({
                  success: false,
                  msg: "Cannot Save Details ! Try Again",
                });
              } else {
                res.status(200);
                return res.send({
                  success: true,
                  msg: "Organization created Successfully !",
                  companyDetails: c.details,
                });
              }
            });
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.code(408);
      res.send({ msg: "" + err });
    }
  },

  CreateEmployee: async (req, res) => {
    Company.findOne(
      {
        cname: req.body.cname,
      },
      async (err, c) => {
        if (err) {
          return res.send({ msg: "failed" });
        } else {
          //const pass=crypto.randomBytes(6).toString();
          const pass = PasswordGenerator.generate({
            length: 8,
            numbers: true,
            uppercase: false,
          });
          var employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            password: pass,
            cname: req.body.cname,
          });
          await employee.save(function (err, user) {
            if (err) {
              return res.send({ msg: "failed" });
            } else {
              var mailopts = {
                to: user.email,
                from: "no-reply@gmail.com",
                subject: "Account activation- regarding",
                html: `<h4>Hello ${user.name}.</h4><br><p>Here is your <br><br>
                           <b>UserName : ${user.email}<br><br> Password : ${pass}</b><br><br>Login to ${user.cname} with the above given credentials</p>`,
              };
              transporter.sendMail(mailopts, function (err, info) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("EMail Sent: " + info);
                }
              });
              return res.send({
                msg: `Employee created ! Email: ${user.email} , Generated Password: ${pass}`,
              });
            }
          });
        }
      }
    );
  },

  LoginEmployee: async (req, res) => {
    Employee.findOne(
      {
        email: req.body.email,
        cname: req.body.cname,
      },
      function (err, user) {
        if (err) {
          res.status(408);
          return res.send({
            success: false,
            msg: "Authentication Failed. ERROR :" + err,
          });
        }
        if (user === null) {
          res.status(406);
          return res.send({ success: false, msg: "User does not exist" });
        } else {
          console.log(user);
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              var uid1 = "" + user._id;
              var mail = "" + user.email;
              var name = "" + user.name;

              console.log("in login success ! ID: " + uid1);
              res.code(200);
              return res.send({
                success: true,
                msg: `Successful Login !  UserEmail : ` + mail,
                id: uid1,
                email: mail,
                name: name,
              });
            } else {
              res.status(405);
              return res.send({
                success: false,
                msg: "Authentication failed, wrong password",
              });
            }
          });
        }
      }
    );
  },
};
module.exports = { functions };
