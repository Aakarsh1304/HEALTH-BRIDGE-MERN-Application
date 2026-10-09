import mongoose from "mongoose";

const doctorPatientAccessSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },

    permissions: {
      medicalHistory: {
        type: Boolean,
        default: false,
      },

      allergies: {
        type: Boolean,
        default: false,
      },

      medications: {
        type: Boolean,
        default: false,
      },

      prescriptions: {
        type: Boolean,
        default: false,
      },

      reports: {
        type: Boolean,
        default: false,
      },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "revoked"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const DoctorPatientAccess = mongoose.model(
  "doctorPatientAccess",
  doctorPatientAccessSchema
);

export default DoctorPatientAccess;