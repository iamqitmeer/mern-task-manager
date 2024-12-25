import { UserModel } from "../db/models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;

    // Check for missing fields
    if (!fullName || !userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
        success: false,
      });
    }

    // Validate email format
    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Invalid email address.",
        success: false,
      });
    }

    // Check if user already exists
    const isAlreadyExist = await UserModel.findOne({ email });
    if (isAlreadyExist) {
      return res.status(400).json({
        message: "User with this email already exists.",
        success: false,
      });
    }

    // Sanitize and format userName
    const formattedUserName = userName.includes(" ")
      ? userName.replace(/\s+/g, "-").toLowerCase()
      : userName.toLowerCase();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const createUser = new UserModel({
      userName: formattedUserName,
      fullName,
      email,
      password: hashedPassword,
    });

    await createUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send success response
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000,
      })
      .json({
        message: "User registered successfully.",
        success: true,
      });
  } catch (error) {
    // Handle server errors
    return res.status(500).json({
      message: "An error occurred during registration.",
      error: error.message, // Optional: Include only in dev mode
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required.",
      success: false,
    });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long.",
      success: false,
    });
  }

  // Validate email format
  if (!email.includes("@")) {
    return res.status(400).json({
      message: "Invalid email address.",
      success: false,
    });
  }

  // Check if user already exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User with this email is not registered.",
      success: false,
    });
  }

  // Compare Password

  let comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) {
    return res.status(400).json({
      message: "Incorrect Password",
      success: false,
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res
    .status(201)
    .cookie("token", token, { maxAge: 900000, httpOnly: true })
    .json({
      message: "User login successfully.",
      token,
      success: true,
    });
};
