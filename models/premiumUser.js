const mongoose = require("mongoose");

const premiumUserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    level: {
        "type": Boolean,
        "default": false
    },
}); 

module.exports = mongoose.model("PremiumUser", premiumUserSchema);