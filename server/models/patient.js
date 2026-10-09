import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
    },

    bloodGroup: {
      type: String,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("patient", patientSchema);

export default Patient;