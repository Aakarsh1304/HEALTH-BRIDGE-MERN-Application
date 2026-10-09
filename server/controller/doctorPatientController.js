import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";
import DoctorPatientAccess from "../models/doctorPatientAcess.js";
import MedicalHistory from "../models/medicalHistory.js";

export const requestPatientAccess = async (req, res) => {
  try {
    const {
      patientId,
      permissions,
    } = req.body;

    const doctor = await Doctor.findOne({
      user: req.user.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const existingAccess = await DoctorPatientAccess.findOne({
      doctor: doctor._id,
      patient: patient._id,
      status: {
        $in: ["pending", "approved"],
      },
    });

    if (existingAccess) {
      return res.status(400).json({
        success: false,
        message: "Access request already exists",
      });
    }

    const accessRequest = await DoctorPatientAccess.create({
      doctor: doctor._id,
      patient: patient._id,
      permissions: {
        medicalHistory: permissions?.medicalHistory || false,
        allergies: permissions?.allergies || false,
        medications: permissions?.medications || false,
        prescriptions: permissions?.prescriptions || false,
        reports: permissions?.reports || false,
      },
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Patient access request sent successfully",
      accessRequest,
    });
  } catch (error) {
    console.error("Request patient access error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getPatientMedicalHistory = async (req, res) => {
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

    const { patientId } = req.params;

    const patient = await Patient.findById(patientId).populate(
      "user",
      "name email"
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const access = await DoctorPatientAccess.findOne({
      doctor: doctor._id,
      patient: patient._id,
      status: "approved",
    });

    if (!access) {
      return res.status(403).json({
        success: false,
        message: "Patient access has not been approved",
      });
    }

    if (!access.permissions.medicalHistory) {
      return res.status(403).json({
        success: false,
        message: "Medical history access is not permitted",
      });
    }

    const history = await MedicalHistory.find({
      patient: patient._id,
    }).sort({ diagnosisDate: -1 });

    res.status(200).json({
      success: true,
      patient,
      history,
    });
  } catch (error) {
    console.error(
      "Get patient medical history error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const approvePatientAccess = async (req, res) => {
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

    const { accessId } = req.params;

    const accessRequest = await DoctorPatientAccess.findOne({
      _id: accessId,
      patient: patient._id,
      status: "pending",
    });

    if (!accessRequest) {
      return res.status(404).json({
        success: false,
        message: "Pending access request not found",
      });
    }

    accessRequest.status = "approved";

    await accessRequest.save();

    res.status(200).json({
      success: true,
      message: "Patient access approved successfully",
      accessRequest,
    });
  } catch (error) {
    console.error("Approve patient access error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getPatientAccessRequests = async (req, res) => {
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

    const requests = await DoctorPatientAccess.find({
      patient: patient._id,
    })
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error(
      "Get patient access requests error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const rejectPatientAccess = async (req, res) => {
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

    const { accessId } = req.params;

    const accessRequest = await DoctorPatientAccess.findOne({
      _id: accessId,
      patient: patient._id,
      status: "pending",
    });

    if (!accessRequest) {
      return res.status(404).json({
        success: false,
        message: "Pending access request not found",
      });
    }

    accessRequest.status = "revoked";

    await accessRequest.save();

    res.status(200).json({
      success: true,
      message: "Patient access request rejected successfully",
      accessRequest,
    });
  } catch (error) {
    console.error("Reject patient access error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};