// Import controller
const itemController = require("../controllers/itemController");

const routes = [
  {
    method: "GET",
    url: "/items/:id",
    handler: itemController.getItems,
  },
  {
    method: "GET",
    url: "/itemsbyid/:id",
    handler: itemController.getSingleItem,
  },
  {
    method: "POST",
    url: "/items",
    handler: itemController.addItem,
  },
  {
    method: "PUT",
    url: "/items/:id",
    handler: itemController.updateItem,
  },
  {
    method: "DELETE",
    url: "/items/:id",
    handler: itemController.deleteItem,
  },
];

module.exports = routes;