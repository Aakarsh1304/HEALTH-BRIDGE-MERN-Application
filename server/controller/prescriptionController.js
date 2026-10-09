import Prescription from "../models/prescription.js";
import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";

// Create prescription - Doctor only
export const createPrescription = async (req, res) => {
  try {
    const {
      patientId,
      medicines,
      diagnosis,
      notes,
    } = req.body;

    // Validate required fields
    if (!patientId || !medicines || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Patient ID and medicines are required",
      });
    }

    // Find logged-in doctor's profile
    const doctor = await Doctor.findOne({
      user: req.user.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    // Find patient
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // Create prescription
    const prescription = await Prescription.create({
      patient: patient._id,
      doctor: doctor._id,
      medicines,
      diagnosis,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      prescription,
    });
  } catch (error) {
    console.error("Create prescription error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Get patient's prescriptions - Patient only
export const getPatientPrescriptions = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      user: req.user.userId,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    const prescriptions = await Prescription.find({
      patient: patient._id,
    })
      .populate("doctor", "-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      prescriptions,
    });
  } catch (error) {
    console.error("Get patient prescriptions error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Get doctor's prescriptions - Doctor only
export const getDoctorPrescriptions = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      user: req.user.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    const prescriptions = await Prescription.find({
      doctor: doctor._id,
    })
      .populate("patient")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      prescriptions,
    });
  } catch (error) {
    console.error("Get doctor prescriptions error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};