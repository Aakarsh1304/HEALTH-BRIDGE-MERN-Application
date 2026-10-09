import mongoose from "mongoose";

const medicalReportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    reportType: {
      type: String,
      enum: ["lab-report", "x-ray", "scan", "prescription", "other"],
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    reportDate: {
      type: Date,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MedicalReport = mongoose.model(
  "medicalReport",
  medicalReportSchema
);

export default MedicalReport;