// External boom dependency (error objects)
const boom = require("boom");

// Acquire Data Model
const Estimate = require("../models/Estimate");

// Get all cars
exports.getEstimate = async (req, res) => {
  try {
    const estimates = await Estimate.find({ user_id: req.params.id });
    return estimates;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getEstimateByCustomer = async (req, res) => {
  try {
    const estimates = await Estimate.find({
      customer: req.params.id,
      userId: req.params.userId,
    });
    return estimates;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get car by ID
exports.getSingleEstimate = async (req, res) => {
  try {
    const estimate = await Estimate.findById({_id:req.params.id});
    return estimate;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new car to model
exports.addEstimate = async (req, res) => {
  try {
    const estimate = new Estimate(req.body);
    return estimate.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To update an estimate by id

exports.updateEstimate = async (req, res) => {
  try {
    const id = req.params.id;
    const estimate = req.body;
    const { ...updateData } = estimate;
    const update = await Estimate.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// To Delete estimate

exports.deleteEstimate = async (req, res) => {
  try {
    const id = req.params.id;
    const estimate = await Estimate.findByIdAndRemove(id);
    return estimate;
  } catch (err) {
    throw boom.boomify(err);
  }
};
