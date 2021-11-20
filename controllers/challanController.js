// External boom dependency (error objects)
const boom = require("boom");

// Acquire Data Model
const Challan = require("../models/Challan");

// Get all cars
exports.getChallans = async (req, reply) => {
  try {
    const challans = await Challan.find({ user_id: req.params.user_id});
    return challans;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getChallanByCustomer = async (req, res) => {
  try {
    const challans = await Challan.find({
      customer: req.params.id,
      userId: req.params.userId,
    });
    return challans;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get car by ID
exports.getSingleChallan = async (req, res) => {
  try {
    const challan = await Challan.findById({_id:req.params.id});
    return challan;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new car to model
exports.addChallan = async (req, res) => {
  try {
    const challan = new Challan(req.body);
    return challan.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To update an challan by id

exports.updateChallan = async (req, res) => {
  try {
    const id = req.params.id;
    const challan = req.body;
    const { ...updateData } = challan;
    const update = await Challan.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To Delete challan

exports.deleteChallan = async (req, res) => {
  try {
    const id = req.params.id;
    const challan = await Challan.findByIdAndRemove(id);
    return challan;
  } catch (err) {
    throw boom.boomify(err);
  }
};
