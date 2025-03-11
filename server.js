require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const cors = require("cors");

const app = express();
app.use(cors());

// ✅ Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/skillshareDB", {
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
};
connectDB();

// ✅ Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

// ✅ Session & Passport Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "skillshareSecret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: true }, // Set secure: true in production with HTTPS
    })
);
app.use(passport.initialize());
app.use(passport.session());

// ✅ Passport Strategy
passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            console.log("🔍 Checking login for:", email);
            const user = await User.findOne({ email });

            if (!user) {
                console.log("❌ User Not Found:", email);
                return done(null, false, { message: "User not found" });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log("❌ Incorrect Password");
                return done(null, false, { message: "Incorrect password" });
            }

            console.log("✅ Password Matched! Logging in:", user.email);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// ✅ Debugging - Check Current User Session
app.use((req, res, next) => {
    console.log("🔍 Current User Session:", req.user);
    next();
});

// ✅ Routes
const skillRoutes = require("./routes/skills");
const authRoutes = require("./routes/authRoutes");

app.use("/skills", skillRoutes);
app.use("/", authRoutes);

// ✅ Homepage Route
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/p1", (req, res) => {
    res.render("p1");
});
// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
