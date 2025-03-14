const mongoose = require("mongoose");

const ServiceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  services: [{ type: [mongoose.Schema.Types.ObjectId], ref: "Service" }],
});

module.exports = mongoose.model("Category", ServiceCategorySchema);
