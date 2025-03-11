const mongoose = require("mongoose");
const SkillSchema = new mongoose.Schema({
    title: String,
    description: String
});
module.exports = mongoose.model("Skill", SkillSchema);
