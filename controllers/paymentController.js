// External boom dependency (error objects)
const boom = require("boom");

// Acquire Data Model
const Paymentreceived = require("../models/Paymentreceived");

// Get all Payments
exports.getPayment = async (req, reply) => {
  try {
    const payment = await Paymentreceived.find({ user_id: req.params.id });
    reply.send(payment);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get Payment by ID
exports.getSinglePayment = async (req, reply) => {
  try {
   
    const payment = await Paymentreceived.findOne({_id:req.params.id});
     return reply.send(payment);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new Payment to model
exports.addPayment = async (req, reply) => {

const payment = new Paymentreceived({
  user_id:req.body.user_id,
  email:req.body.email,
  customer_name:req.body.customer_name,
  amount_received:req.body.amount_received,
   payment_date:req.body.payment_date,
   payment:req.body.payment,
   payment_mode:req.body.payment_mode,
   reference:req.body.reference,
   tax_deducted:req.body.tax_deducted

})

 
  try {
   
    const payments = await payment.save();
    reply.send(payments)
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To update an Customer by id

exports.updatePayment = async (req, res) => {
  try {
   
    const update = await Paymentreceived.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To Delete Customer

exports.deletePayment = async (req, reply) => {
  try {
    
    const payment = await Paymentreceived.deleteOne({_id:req.params.id})
    reply.send("Deleted Succesfully");
  } catch (err) {
    throw boom.boomify(err);
  }
};
