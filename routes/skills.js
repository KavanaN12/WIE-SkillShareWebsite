const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");

// Show all skills
router.get("/", async (req, res) => {
    const skills = await Skill.find();
    res.render("skills/index", { skills });
});

// Form to add new skill
router.get("/new", (req, res) => res.render("skills/new"));

// Add skill
router.post("/", async (req, res) => {
    await new Skill({ title: req.body.title, description: req.body.description }).save();
    res.redirect("/skills");
});

// Delete skill
router.delete("/:id", async (req, res) => {
    await Skill.findByIdAndDelete(req.params.id);
    res.redirect("/skills");
});

module.exports = router;
