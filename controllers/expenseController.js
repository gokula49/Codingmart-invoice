// External boom dependency (error objects)
const boom = require("boom");
const Expense = require("../models/Expense");

// Acquire Data Model
// const expense = require("../models/Expense");

// Get all Expense
exports.getExpense = async (req, reply) => {
  try {

    const expense = await Expense.find({ user_id: req.params.userId });
    return reply.send(expense);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get Expense by ID
exports.getSingleExpense = async (req, reply) => {
  try {
 
    const expense = await Expense.findById({_id:req.params.id});
    return reply.send(expense);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new Expense to model
exports.addExpense = async (req, reply) => {

  const exp = new Expense({

    user_id:req.body.user_id,
    date:req.body.date,
    category_name:req.body.category_name,
    amount:req.body.amount,
    invoice:req.body.invoice,
    notes:req.body.notes,
    customer_name:req.body.customer_name
   
  })


  try {
    // const expense = new Expense(req.body);
    const savedData = await exp.save();
  //  const savedData = expense.save();
    return reply.send(savedData);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To update an expense by id

exports.updateExpense = async (req, reply) => {
  try {
    // const id = req.params.id;
    const expense= req.body;
    const { ...updateData } = expense;
    const update = await Expense.findByIdAndUpdate({_id:req.params.id}, updateData, { new: true });
    return reply.send(update);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To Delete Expense

exports.deleteExpense = async (req, reply) => {
  try {
    // const id = req.params.id;
    const expense = await Expense.findByIdAndRemove({_id:req.params.id});
    return reply.send("Expense Deleted Successfully");
  } catch (err) {
    throw boom.boomify(err);
  }
};
