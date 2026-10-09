import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
    },

    experience: {
      type: Number,
    },

    phone: {
      type: String,
    },

    hospital: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("doctor", doctorSchema);

export default Doctor;