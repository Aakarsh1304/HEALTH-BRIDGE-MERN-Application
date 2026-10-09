import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    dosage: {
      type: String,
    },

    frequency: {
      type: String,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Medication = mongoose.model("medication", medicationSchema);

export default Medication;