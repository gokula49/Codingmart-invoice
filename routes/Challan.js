// Import controller
const challanController = require("../controllers/challanController");

const routes = [
  {
    method: "GET",
    url: "/challans/:user_id",
    handler: challanController.getChallans,
  },
  {
    method: "GET",
    url: "/challansbyid/:id",
    handler: challanController.getSingleChallan,
  },
  {
    method: "GET",
    url: "/challans/customer/:id/:userId",
    handler: challanController.getChallanByCustomer,
  },
  {
    method: "POST",
    url: "/challans",
    handler: challanController.addChallan,
  },
  {
    method: "PUT",
    url: "/challans/:id",
    handler: challanController.updateChallan,
  },
  {
    method: "DELETE",
    url: "/challans/:id",
    handler: challanController.deleteChallan,
  },
];

module.exports = routes;
