const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const adminEmail = "admin@portfolio.com";
const adminPassword = "yourpassword123";

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Reset admin users so local auth testing starts from a known state.
    await User.deleteMany({});

    await User.create({
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    console.log("Admin user created successfully");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    process.exit();
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seed();
