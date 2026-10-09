import Patient from "../models/patient.js";
import MedicalHistory from "../models/medicalHistory.js";

export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      user: req.user.userId,
    }).populate("user", "-password");

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    res.status(200).json({
      success: true,
      patient,
    });
  } catch (error) {
    console.error("Get patient profile error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const updatePatientProfile = async (req, res) => {
  try {
    const {
      dateOfBirth,
      gender,
      bloodGroup,
      phone,
      address,
    } = req.body;

    const patient = await Patient.findOne({
      user: req.user.userId,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    patient.dateOfBirth = dateOfBirth;
    patient.gender = gender;
    patient.bloodGroup = bloodGroup;
    patient.phone = phone;
    patient.address = address;

    await patient.save();

    res.status(200).json({
      success: true,
      message: "Patient profile updated successfully",
      patient,
    });
  } catch (error) {
    console.error("Update patient profile error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const addMedicalHistory = async (req, res) => {
  try {
    const {
      condition,
      diagnosisDate,
      description,
      treatment,
    } = req.body;

    const patient = await Patient.findOne({
      user: req.user.userId,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    const history = await MedicalHistory.create({
      patient: patient._id,
      condition,
      diagnosisDate,
      description,
      treatment,
    });

    res.status(201).json({
      success: true,
      message: "Medical history added successfully",
      history,
    });
  } catch (error) {
    console.error("Add medical history error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getMedicalHistory = async (req, res) => {
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

    const history = await MedicalHistory.find({
      patient: patient._id,
    }).sort({ diagnosisDate: -1 });

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Get medical history error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
