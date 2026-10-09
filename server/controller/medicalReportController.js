import MedicalReport from "../models/medicalReport.js";
import Patient from "../models/patient.js";

// Upload medical report
export const uploadMedicalReport = async (req, res) => {
  try {
    console.log("========== MEDICAL REPORT UPLOAD ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("==========================================");

    const {
      title,
      reportType,
      reportDate,
      description,
    } = req.body;

    if (!title || !reportType) {
      return res.status(400).json({
        success: false,
        message: "Title and report type are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Report file is required",
      });
    }

    const patient = await Patient.findOne({
      user: req.user.userId,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    const medicalReport = await MedicalReport.create({
      patient: patient._id,
      title,
      reportType,
      fileUrl: `/uploads/${req.file.filename}`,
      reportDate,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Medical report uploaded successfully",
      report: medicalReport,
    });
  } catch (error) {
    console.error("Upload medical report error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get patient's own reports
export const getPatientReports = async (req, res) => {
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

    const reports = await MedicalReport.find({
      patient: patient._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.error("Get patient reports error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get single report
export const getMedicalReport = async (req, res) => {
  try {
    const report = await MedicalReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Medical report not found",
      });
    }

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("Get medical report error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete patient's report
export const deleteMedicalReport = async (req, res) => {
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

    const report = await MedicalReport.findOne({
      _id: req.params.id,
      patient: patient._id,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Medical report not found",
      });
    }

    await report.deleteOne();

    res.status(200).json({
      success: true,
      message: "Medical report deleted successfully",
    });
  } catch (error) {
    console.error("Delete medical report error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};