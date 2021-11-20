// External boom dependency (error objects)
const boom = require("boom");

// Acquire Data Model
const Customer = require("../models/Customer");

// Get all Customer
exports.getCustomer = async (req, reply) => {
  try {
    const customer = await Customer.find({ user_id: req.params.id });
    return reply.send(customer);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get Customer by ID
exports.getSingleCustomer = async (req, reply) => {
  try {
    const customer = await Customer.findOne({_id:req.params.id});
    return reply.send(customer);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new Customer to model
exports.addCustomer = async (req, reply) => {
  // const customer = new Customer({
  //   user_id:req.body.user_id,
  //   customer_type:req.body.customer_type,
  //   primary_contact:req.body.primary_contact,
  //   first_name:req.body.first_name,
  //   last_name:req.body.last_name,
  //   company_name:req.body.company_name,
  //   customer_name:req.body.customer_name,
  //   customer_email:req.body.customer_email,
  //   work_phone:req.body.work_phone,
  //   mobile_phone:req.body.mobile_phone,
  //   website:req.body.website
  // })
  try {
    const customers = new Customer(req.body)
    await customers.save()
    reply.send(customers)
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To update an Customer by id

exports.updateCustomer = async (req, res) => {
  try {
    const update = await Customer.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To Delete Customer

exports.deleteCustomer = async (req, reply) => {
  try {
    const customer = await Customer.deleteOne({_id:req.params.id})
    reply.send("Deleted Succesfully");
  } catch (err) {
    throw boom.boomify(err);
  }
};
