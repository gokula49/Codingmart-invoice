const action = require("../methods/actions");
const methods = action.functions;
const verifyToken = require("../methods/utils");
const routes = [
  {
    method: "GET",
    url: "/",
    handler: methods.Home,
  },
  {
    method: "GET",
    url: "/api/",
    handler: methods.Home,
  },
  {
    method: "POST",
    url: "/api/login-employee",
    handler: methods.LoginEmployee,
  },
  {
    method: "POST",
    url: "/api/register-user",
    handler: methods.RegisterUser,
  },
  {
    method: "POST",
    url: "/api/login-user",
    handler: methods.LoginUser,
  },
  {
    method: "POST",
    url: "/api/login-user/google",
    handler: methods.LoginUserGoogle,
  },
  {
    method: "POST",
    url: "/api/login-user/facebook",
    handler: methods.LoginUserFacebook,
  },
  {
    method: "POST",
    url: "/api/login-user/linked-in",
    handler: methods.Home,
  },
  {
    method: "POST",
    url: "/api/create-company",
    handler: methods.CreateCompany,
  },
  {
    method: "POST",
    url: "/api/create-employee",
    handler: methods.CreateEmployee,
  },
  {
    method: "GET",
    url: "/api/authenticate-user",
    handler: methods.AuthenticateUser,
  },
  {
    method: "GET",
    url: "/api/check-user",

    handler: methods.CheckUser,
  },
];
module.exports = routes;
