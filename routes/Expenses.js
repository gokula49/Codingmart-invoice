// Import controller
const expenseController = require("../controllers/expenseController");

const routes = [
  {
    method: "GET",
    url: "/expenses/:userId",
    handler: expenseController.getExpense, 
  },
  {
    method: "GET",
    url: "/expense/:id",
    handler:  expenseController.getSingleExpense,
  },
  {
    method: "POST",
    url: "/expense",
    handler:  expenseController.addExpense,
  },
  {
    method: "PUT",
    url: "/expense/:id",
    handler:  expenseController.updateExpense,
  },
  {
    method: "DELETE",
    url: "/expense/:id",
    handler:  expenseController.deleteExpense,
  },
];

module.exports = routes;