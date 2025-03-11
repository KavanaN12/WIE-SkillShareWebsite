const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

// Register Page
router.get("/register", (req, res) => res.render("register"));

// Handle Registration
router.post("/register", async (req, res) => {
    try {
        const { fullName, age, email, password, interests } = req.body;

        if (!fullName || !age || !email || !password || !interests.length) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        console.log("🔹 Registration Attempt:", { fullName, age, email });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("❌ Email already registered:", email);
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ fullName, age, email, password: hashedPassword, interests });
        await newUser.save();

        console.log("✅ User Registered:", newUser.email);
        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("🚨 Registration Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
});

// Login Page
router.get("/login", (req, res) => res.render("login"));

// Handle Login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error("❌ Authentication Error:", err);
            return next(err);
        }
        if (!user) {
            console.log("❌ Login Failed:", info?.message || "Invalid credentials");
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error("❌ Session Error:", err);
                return next(err);
            }
            console.log("✅ Login Successful:", user.email);
            return res.render("index")
        });
    })(req, res, next);
});

// Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.error("❌ Logout Error:", err);
            return next(err);
        }
        console.log("✅ User Logged Out");
        res.redirect("/login");
    });
});

module.exports = router;
