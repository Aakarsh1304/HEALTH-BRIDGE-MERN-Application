import Appointment from "../models/appointment.js";
import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";
import Notification from "../models/notification.js";

// ==========================================
// Patient books appointment
// ==========================================

export const createAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      appointmentDate,
      reason,
    } = req.body;

    if (!doctorId || !appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID and appointment date are required",
      });
    }

    // Find logged-in patient
    const patient = await Patient.findOne({
      user: req.user.userId,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    // Find doctor
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Check whether doctor already has appointment
    const existingAppointment = await Appointment.findOne({
      doctor: doctor._id,
      appointmentDate: new Date(appointmentDate),
      status: "scheduled",
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "Doctor is already booked for this time",
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patient: patient._id,
      doctor: doctor._id,
      appointmentDate,
      reason,
      status: "scheduled",
    });

    // Notify doctor
    await Notification.create({
      user: doctor.user,
      title: "New Appointment",
      message: "A patient has booked a new appointment with you.",
      type: "appointment",
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Create appointment error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ==========================================
// Patient views own appointments
// ==========================================

export const getPatientAppointments = async (req, res) => {
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

    const appointments = await Appointment.find({
      patient: patient._id,
    })
      .populate("doctor")
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get patient appointments error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ==========================================
// Doctor views own appointments
// ==========================================
export const getDoctorAppointments = async (req, res) => {
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

    const appointments = await Appointment.find({
      doctor: doctor._id,
    })
      .populate({
        path: "patient",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get doctor appointments error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================================
// Doctor updates appointment status
// ==========================================

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["scheduled", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status",
      });
    }

    const doctor = await Doctor.findOne({
      user: req.user.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    const appointment = await Appointment.findOne({
      _id: req.params.id,
      doctor: doctor._id,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = status;

    await appointment.save();

    // Notify patient
    const patient = await Patient.findById(appointment.patient);

    if (patient) {
      let message = "";

      if (status === "scheduled") {
        message = "Your appointment has been scheduled.";
      } else if (status === "completed") {
        message = "Your appointment has been marked as completed.";
      } else if (status === "cancelled") {
        message = "Your appointment has been cancelled.";
      }

      await Notification.create({
        user: patient.user,
        title: "Appointment Update",
        message,
        type: "appointment",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("Update appointment status error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
