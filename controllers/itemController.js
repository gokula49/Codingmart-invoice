// External boom dependency (error objects)
const boom = require("boom");

// Acquire Data Model
const Item = require("../models/Item");

// Get all Items
exports.getItems = async (req, reply) => {
  try {
    const item = await Item.find({ user_id: req.params.id });
    return reply.send(item);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get Items by ID
exports.getSingleItem = async (req, reply) => {
  try {
    const item = await Item.findOne({_id:req.params.id});
    return reply.send(item);
    return item;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new Items to model
exports.addItem = async (req, reply) => {
  const item = new Item(
    {
      user_id:req.body.user_id,
      type:req.body.type,
      name:req.body.name,
      unit:req.body.unit,
      selling_price:req.body.selling_price,
      selling_description:req.body.selling_description
  }
  )
  try {
    const item = new Item(req.body);
    return item.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To update an item by id

exports.updateItem = async (req, reply) => {
  try {
    const update = await Item.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To Delete Item

exports.deleteItem = async (req, reply) => {
  try {
    const item = await Item.deleteOne({_id:req.params.id})
    return reply.send("Deleted Succesfully");
  } catch (err) {
    throw boom.boomify(err);
  }
};
