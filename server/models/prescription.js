import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },

    medicines: [
      {
        name: {
          type: String,
          required: true,
        },

        dosage: String,

        frequency: String,

        duration: String,

        instructions: String,
      },
    ],

    diagnosis: {
      type: String,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model(
  "prescription",
  prescriptionSchema
);

export default Prescription;