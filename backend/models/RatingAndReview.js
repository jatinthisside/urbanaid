const mongoose = require("mongoose");

const RatingAndReviewSchema = new mongoose.Schema({
  user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	rating: {
		type: Number,
		required: true,
	},
	review: {
		type: String,
		required: true,
	},
	service: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Service",
	},
}, {timestamps: true});

module.exports = mongoose.model("RatingAndReview", RatingAndReviewSchema);
