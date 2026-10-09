import mongoose from "mongoose";

const allergySchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    allergen: {
      type: String,
      required: true,
    },

    reaction: {
      type: String,
    },

    severity: {
      type: String,
      enum: ["mild", "moderate", "severe"],
    },
  },
  {
    timestamps: true,
  }
);

const Allergy = mongoose.model("allergy", allergySchema);

export default Allergy;