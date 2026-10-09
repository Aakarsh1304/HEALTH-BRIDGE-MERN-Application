import bcrypt from "bcryptjs";

import User from "../models/user.js";
import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";

import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      dateOfBirth,
      gender,
      bloodGroup,
      phone,
      address,
      specialization,
      qualification,
      experience,
      hospital,
    } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and role are required",
      });
    }

    // 2. Validate role
    if (!["patient", "doctor"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be patient or doctor",
      });
    }

    // 3. Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // 6. Create patient/doctor profile
    if (role === "patient") {
      await Patient.create({
        user: user._id,
        dateOfBirth,
        gender,
        bloodGroup,
        phone,
        address,
      });
    }

    if (role === "doctor") {
      await Doctor.create({
        user: user._id,
        specialization,
        qualification,
        experience,
        phone,
        hospital,
      });
    }

    // 7. Generate token
    const token = generateToken(user._id, user.role);

    // 8. Send response
    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Generate JWT
    const token = generateToken(user._id, user.role);

    // 5. Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get me error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};