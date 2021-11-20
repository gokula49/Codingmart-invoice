// Import controller
const paymentController = require("../controllers/paymentController");

const routes = [
  {
    method: "GET",
    url: "/payments/:id",
    handler: paymentController.getPayment,
  },
  {
    method: "GET",
    url: "/paymentbyid/:id",
    handler: paymentController.getSinglePayment,
  },
  {
    method: "POST",
    url: "/payments",
    handler: paymentController.addPayment,
  },
  {
    method: "PUT",
    url: "/payment/:id",
    handler: paymentController.updatePayment,
  },
  { 
    method: "DELETE",
    url: "/payment/:id",
    handler: paymentController.deletePayment,
  },
];

module.exports = routes;