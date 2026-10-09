import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    diagnosisDate: {
      type: Date,
    },

    description: {
      type: String,
    },

    treatment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MedicalHistory = mongoose.model(
  "medicalHistory",
  medicalHistorySchema
);

export default MedicalHistory;