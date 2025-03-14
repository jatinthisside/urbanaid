const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    service_name: {
        type:String,
        trim:true,
        required:true,
    },
    about_service: {
        type:String,
        trim:true, 
    },
    vendor: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    rating_and_reviews: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
    ],
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
    },
    tags: {
		type: [String],
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Category",
	},
	happy_customers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	],
}, {timestamps: true});

module.exports = mongoose.model("Service", serviceSchema);