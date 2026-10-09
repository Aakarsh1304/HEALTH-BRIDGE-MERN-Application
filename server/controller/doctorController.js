import Doctor from "../models/doctor.js";

export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      user: req.user.userId,
    }).populate("user", "-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.error("Get doctor profile error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const updateDoctorProfile = async (req, res) => {
  try {
    const {
      specialization,
      qualification,
      experience,
      phone,
      hospital,
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

    doctor.specialization = specialization;
    doctor.qualification = qualification;
    doctor.experience = experience;
    doctor.phone = phone;
    doctor.hospital = hospital;

    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully",
      doctor,
    });
  } catch (error) {
    console.error("Update doctor profile error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Get all doctors error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};