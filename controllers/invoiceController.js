// External boom dependency (error objects)
const boom = require("boom");

// Acquire Data Model
const Invoice = require("../models/Invoice");

// Get all cars
exports.getInvoice = async (req, reply) => {
  try {
    const invoices = await Invoice.find({ user_id: req.params.id });
    return reply.send(invoices);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get car by ID
exports.getSingleInvoice = async (req, reply) => {
  try {
    const invoices = await Invoice.findOne({_id:req.params.id});
    return reply.send(invoices);
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getInvoiceByCustomer = async (req, reply) => {
  try {
    const invoices = await Invoice.find({
      customer: req.params.id,
      userId: req.params.userId,
    });
    return invoices;
  } catch (err) {
    throw boom.boomify(err);
  }
};



// Add a new car to model
exports.addInvoice = async (req, reply) => {
 
  
  try {
    const invoices = new Invoice(req.body);
    return invoices.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To update an invoice by id

exports.updateInvoice = async (req, res) => {
  try {
    const update = await Invoice.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To Delete invoice

exports.deleteInvoice = async (req, reply) => {
  try {
    const invoices = await Invoice.deleteOne({_id:req.params.id})
    return reply.send("Deleted Succesfully");
  } catch (err) {
    throw boom.boomify(err);
  }
};
