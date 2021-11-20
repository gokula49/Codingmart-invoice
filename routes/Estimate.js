// Import controller
const estimateController = require("../controllers/estimateController");

const routes = [
  {
    method: "GET",
    url: "/estimates/:id",
    handler: estimateController.getEstimate,
  },
  {
    method: "GET",
    url: "/estimatesbyid/:id",
    handler: estimateController.getSingleEstimate,
  },
  {
    method: "GET",
    url: "/estimates/customer/:id/:userId",
    handler: estimateController.getEstimateByCustomer,
  },
  {
    method: "POST",
    url: "/estimates",
    handler: estimateController.addEstimate,
  },
  {
    method: "PUT",
    url: "/estimates/:id",
    handler: estimateController.updateEstimate,
  },
  {
    method: "DELETE",
    url: "/estimates/:id",
    handler: estimateController.deleteEstimate,
  },
];

module.exports = routes;
